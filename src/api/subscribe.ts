import { Client } from "./client.js"
import { Kind } from "./kind.js"

export class SubscribeController {
	private readonly baseUrl = "https://oauth.reddit.com"

	constructor(private client: Client) {}

	/** Create or update a "friend" relationship.
	 *
	 * This operation is idempotent. It can be used to add a new friend, or update
	 * an existing friend (e.g., add/change the note on that friend)
	 *
	 * @see https://www.reddit.com/dev/api/oauth#PUT_api_v1_me_friends_{username}
	 */
	friend(username: string, body: FriendRequest) {
		return this.client.fetch<FriendResponse>(
			`${this.baseUrl}/api/v1/me/friends/${username}.json`,
			{ body: JSON.stringify(body), method: "PUT" },
		)
	}

	/** Stop being friends with a user.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#DELETE_api_v1_me_friends_{username}
	 */
	unfriend(username: string) {
		return this.client.fetch<undefined>(
			`${this.baseUrl}/api/v1/me/friends/${username}.json`,
			{ method: "DELETE" },
		)
	}
}

export interface FriendRequest {
	/** A valid, existing reddit username */
	name?: string
	/** A string no longer than 300 characters */
	note?: string
}

export interface FriendResponse {
	date: number
	rel_id: string
	name: string
	id: `${Kind.account}_${string}`
}
