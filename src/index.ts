import { getActionInput } from "./utils"

async function run() {
  const { GITHUB_TOKEN, RAPID_API_KEY } = getActionInput()
}

run()
