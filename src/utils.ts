import * as core from "@actions/core"
import * as github from "@actions/github"

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

export { getActionInput, getPRInfo }
