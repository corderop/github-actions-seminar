import * as core from "@actions/core"

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

export { getActionInput }
