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

// Get private messages
const requestInbox = await client.privatemessage.inbox()
if (!requestInbox.ok)
	throw new Error(`Couldn't get private messages: ${await requestInbox.text()}`)

const privateMessages = await requestInbox.json()
for (const message of privateMessages.data.children) {
	if (
		message.data.distinguished &&
		message.data.subreddit &&
		message.data.subject ===
			`invitation to moderate /r/${message.data.subreddit}`
	) {
		console.log("Received invitation:", message.data.subject)

		// Accept moderator invites
		const requestAccept = await client.modself.accept(
			message.data.subreddit,
			privateMessages.data.modhash ?? undefined,
		)
		if (!requestAccept.ok) {
			console.error(
				`Couldn't accept moderator invitation: ${await requestAccept.text()}`,
			)
			continue
		}
	}

	// Delete read message
	const deleteRequest = await client.privatemessage.delete(
		message.data.name,
		privateMessages.data.modhash ?? undefined,
	)
	if (!deleteRequest.ok) {
		console.error(`Couldn't delete message: ${await deleteRequest.text()}`)
		continue
	}
}

// Get moderating subreddits
const requestModerating = await client.mysubreddits.moderator()
if (!requestModerating.ok)
	throw new Error(
		`Couldn't get moderating subreddits: ${await requestModerating.text()}`,
	)

const moderating = await requestModerating.json()

for (const subreddit of moderating.data.children) {
	console.log("Moderating:", subreddit.data.display_name_prefixed)
	// Get their wiki `/config/.flam.yaml`
	// Check for new message input, delay
	// Check one page of new posts
	// Filter with local storage
	// In untouched posts, post a comment, save it in localstorage as post_id: {post, message}
}

// Wait for 1h

// Go to "Get moderating subreddits"

await client.revoke()
