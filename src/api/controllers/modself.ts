import { Client } from "../client.js"
import { Fullname } from "../types/fullname.js"

/** Make changes to your subreddit moderator and contributor status
 *
 * Accept invitations to moderate a subreddit. Remove myself as a moderator or
 * contributor of subreddits I moderate or contribute to.
 *
 * @see https://www.reddit.com/dev/api/oauth#scope_modself
 */
export class ModselfController {
	private readonly baseUrl = "https://oauth.reddit.com"

	constructor(private client: Client) {}

	/** Accept an invite to moderate the specified subreddit.
	 *
	 * The authenticated user must have been invited to moderate the subreddit by
	 * one of its current moderators.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#POST_api_accept_moderator_invite
	 */
	accept(subreddit: string, modhash?: string) {
		const headers = new Headers()
		if (modhash) headers.set("X-Modhash", modhash)

		return this.client.fetch<AcceptResponse>(
			`${this.baseUrl}/r/${subreddit}/api/accept_moderator_invite.json`,
			{ method: "POST", headers, body: JSON.stringify({ api_type: "json" }) },
		)
	}

	/** Abdicate approved user status in a subreddit.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#POST_api_leavecontributor
	 */
	leaveContributor(id: Fullname, modhash?: string) {
		const headers = new Headers()
		if (modhash) headers.set("X-Modhash", modhash)

		return this.client.fetch(`${this.baseUrl}/api/leavecontributor.json`, {
			method: "POST",
			headers,
			body: JSON.stringify({ id }),
		})
	}

	/** Abdicate moderator status in a subreddit.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#POST_api_leavemoderator
	 */
	leaveModerator(id: Fullname, modhash?: string) {
		const headers = new Headers()
		if (modhash) headers.set("X-Modhash", modhash)

		return this.client.fetch(`${this.baseUrl}/api/leavemoderator.json`, {
			method: "POST",
			headers,
			body: JSON.stringify({ id }),
		})
	}
}

export interface AcceptResponse {
	jquery: (string[] | number | string)[][]
	success: boolean
}
