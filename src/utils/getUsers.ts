import fs from "fs"
import * as core from "@actions/core"
import * as glob from "@actions/glob"

async function getUsers(): Promise<string[]> {
  const filePath = core.getInput("ban-file", { required: true })
  const files = await getBannedUsersFile(filePath)

  if (files.length === 0) {
    core.setFailed(
      "File with the users banned not found. You must set valid " +
        `banned user list file. ${filePath} is not a valid file.`
    )
    throw new Error("File not found")
  }

  const fileContent = fs.readFileSync(files[0], "utf8")
  return fileContent.split("\n")
}

async function getBannedUsersFile(filePath: string) {
  const globber = await glob.create(filePath)
  const files = await globber.glob()
  return files
}

export default getUsers
