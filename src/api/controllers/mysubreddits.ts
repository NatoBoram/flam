import { Subreddits } from "api/types/subreddit.js"
import { Client } from "../client.js"

/** Access the list of subreddits I moderate, contribute to, and subscribe to.
 *
 * @see https://www.reddit.com/dev/api/oauth#scope_mysubreddits
 */
export class MysubredditsController {
	private readonly baseUrl = "https://oauth.reddit.com"

	constructor(private client: Client) {}

	/** Get information about a specific 'friend', such as notes.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#GET_api_v1_me_friends_{username}
	 */
	friends(username: string) {
		return this.client.fetch(
			`${this.baseUrl}/api/v1/me/friends/${username}.json`,
		)
	}

	/** Return a breakdown of subreddit karma.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#GET_api_v1_me_karma
	 */
	karma() {
		return this.client.fetch(`${this.baseUrl}/api/v1/me/karma.json`)
	}

	/** Get subreddits the user is subscribed to.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#GET_subreddits_mine_{where}
	 */
	subscriber() {
		return this.client.fetch<Subreddits>(
			`${this.baseUrl}/subreddits/mine/subscriber.json`,
		)
	}

	/** Get subreddits the user is an approved user in.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#GET_subreddits_mine_{where}
	 */
	contributor() {
		return this.client.fetch<Subreddits>(
			`${this.baseUrl}/subreddits/mine/contributor.json`,
		)
	}

	/** Get subreddits the user is a moderator of.
	 *
	 * @see https://www.reddit.com/dev/api/oauth#GET_subreddits_mine_{where}
	 */
	moderator() {
		return this.client.fetch<Subreddits>(
			`${this.baseUrl}/subreddits/mine/moderator.json`,
		)
	}
}
