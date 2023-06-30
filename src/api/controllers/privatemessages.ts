import { Client } from "../client.js"
import { Fullname } from "../types/fullname.js"
import { Kind } from "../types/kind.js"
import { Messages } from "../types/message.js"

/** Access my inbox and send private messages to other users. */
export class PrivateMessagesController {
	private readonly baseUrl = "https://oauth.reddit.com"

	constructor(private client: Client) {}

	/** Delete messages from the recipient's view of their inbox.
	 *
	 * @param id fullname of a thing
	 *
	 * @see https://www.reddit.com/dev/api/oauth#POST_api_del_msg
	 */
	delete(id: Fullname<Kind.message>, modhash?: string) {
		const headers = new Headers()
		if (modhash) headers.set("X-Modhash", modhash)

		return this.client.fetch<Record<string, never>>(
			`${this.baseUrl}/api/del_msg.json`,
			{
				method: "POST",
				body: JSON.stringify({ id }),
				headers,
			},
		)
	}

	inbox() {
		return this.client.fetch<Messages>(`${this.baseUrl}/message/inbox.json`)
	}

	messages() {
		return this.client.fetch<Messages>(`${this.baseUrl}/message.json`)
	}

	sent() {
		return this.client.fetch<Messages>(`${this.baseUrl}/message/sent.json`)
	}

	unread() {
		return this.client.fetch<Messages>(`${this.baseUrl}/message/unread.json`)
	}
}
