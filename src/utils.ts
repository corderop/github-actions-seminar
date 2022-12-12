import * as core from "@actions/core"
import * as github from "@actions/github"
import fetch from "node-fetch"
import { ResponseBody } from "./types"

function getActionInput() {
  let GITHUB_TOKEN: string
  let RAPID_API_KEY: string

  core.startGroup("Getting action input")

  try {
    GITHUB_TOKEN = core.getInput("GITHUB_TOKEN", { required: true })
    RAPID_API_KEY = core.getInput("RAPID_API_KEY", { required: true })
  } catch (error) {
    core.setFailed(
      "Some required inputs are missing. Please provide all of them."
    )
    throw Error("Action failed")
  }

  core.endGroup()

  return { GITHUB_TOKEN, RAPID_API_KEY }
}

function getPRInfo() {
  core.startGroup("Getting PR comment")

  const context = github.context
  const { pull_request: pullRequest } = context.payload
  const comment = pullRequest?.body
  const id = pullRequest?.number

  if (!comment) {
    core.warning("No comment found in the PR")
  }

  core.endGroup()

  return { comment, id }
}

async function translateText(text: string, RAPID_API_KEY: string) {
  core.startGroup("Translating comment with Google Translate")

  const encodedParams = new URLSearchParams()
  encodedParams.append("target", "en")
  encodedParams.append("q", text)

  const url = "https://google-translate1.p.rapidapi.com/language/translate/v2"

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: encodedParams,
  }

  const response = await fetch(url, options)
  const body = (await response.json()) as ResponseBody
  const translatedText = body?.data?.translations?.[0].translatedText

  if (!translatedText) {
    core.setFailed("Could not translate comment")
    throw Error("Action failed")
  }

  core.endGroup()

  return translatedText
}

export { getActionInput, getPRInfo, translateText }
