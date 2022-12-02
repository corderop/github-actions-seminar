import * as core from "@actions/core"
import getUsers from "./utils/getUsers"

async function run() {
  core.startGroup("Get banned users from file")
  const bannedUsers = await getUsers()
  console.log("Banned users: ", bannedUsers)
  core.endGroup()
}

run()
