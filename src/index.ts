import { Client } from "api/client.js"
import dotenv from "dotenv"
import { env } from "process"

dotenv.config()

const clientId = env["CLIENT_ID"],
	clientSecret = env["CLIENT_SECRET"],
	username = env["REDDIT_USERNAME"],
	password = env["REDDIT_PASSWORD"],
	name = process.env["npm_package_name"],
	version = process.env["npm_package_version"]

if (!clientId) throw new Error("Missing $CLIENT_ID.")
if (!clientSecret) throw new Error("Missing $CLIENT_SECRET.")
if (!username) throw new Error("Missing $REDDIT_USERNAME.")
if (!password) throw new Error("Missing $REDDIT_PASSWORD.")

if (!name) throw new Error("Missing `name` in `package.json`.")
if (!version) throw new Error("Missing `version` in `package.json`.")

const userAgent = `${process.platform}:${name}:${version} (by u/NatoBoram)`
console.log(`Starting ${userAgent}...`)

const client = await Client.newClient(
	userAgent,
	clientId,
	clientSecret,
	username,
	password,
)

console.log(`Started ${userAgent}!`)

await client.revoke()
