import { getActionInput, getPRInfo } from "./utils"

async function run() {
  const { GITHUB_TOKEN, RAPID_API_KEY } = getActionInput()
  const { comment: prComment, id: prId } = getPRInfo()
}

run()
