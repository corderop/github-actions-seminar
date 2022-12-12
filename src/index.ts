import * as core from "@actions/core"
import { getActionInput, getPRInfo, sendComment, translateText } from "./utils"

async function run() {
  const { GITHUB_TOKEN, RAPID_API_KEY } = getActionInput()
  const { comment: prComment, id: prId } = getPRInfo()

  if (!prComment) {
    core.info("No comment found in the PR")
    return
  }

  const translatedText = await translateText(prComment, RAPID_API_KEY)
  sendComment(translatedText, prId, GITHUB_TOKEN)
}

run()
