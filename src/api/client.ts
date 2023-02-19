import { AccessToken } from "./access_token.js"
import { GrantType } from "./grant_type.js"

export class Client {
	constructor(
		private readonly userAgent: string,
		private readonly clientId: string,
		private readonly clientSecret: string,
		private accessToken: AccessToken,
		private bestBefore: Date,
	) {}

	static async newClient(
		userAgent: string,
		clientId: string,
		clientSecret: string,
		username: string,
		password: string,
	) {
		const url = new URL("https://www.reddit.com/api/v1/access_token")
		url.searchParams.set("grant_type", GrantType.password)
		url.searchParams.set("username", username)
		url.searchParams.set("password", password)

		const headers = new Headers(),
			basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
		headers.set("Authorization", `Basic ${basic}`)
		headers.set("User-Agent", userAgent)

		const req = await fetch(url, { headers })
		if (!req.ok)
			throw new Error(`Couldn't login to the Reddit API: ${await req.text()}`)

		const accessToken: AccessToken = await req.json(),
			bestBefore = new Date(
				new Date().getTime() + accessToken.expires_in * 1_000,
			)
		return new Client(
			userAgent,
			clientId,
			clientSecret,
			accessToken,
			bestBefore,
		)
	}

	async maybeRenew() {
		if (this.bestBefore < new Date()) return this.renew()
		return
	}

	async renew() {
		const url = new URL("https://www.reddit.com/api/v1/access_token")

		const headers = new Headers(),
			basic = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
				"base64",
			)
		headers.set("Authorization", `Basic ${basic}`)

		const body = new FormData()
		body.append("grant_type", GrantType.refresh_token)
		body.append("refresh_token", this.accessToken.access_token)

		const req = await fetch(url, { method: "POST", headers, body })
		if (!req.ok)
			throw new Error(`Couldn't refresh the token: ${await req.text()}`)

		this.accessToken = await req.json()
		this.bestBefore = new Date(
			new Date().getTime() + this.accessToken.expires_in * 1_000,
		)

		return { accessToken: this.accessToken, bestBefore: this.bestBefore }
	}

	async revoke() {
		const url = new URL("https://www.reddit.com/api/v1/revoke_token")
		const body = new FormData()
		body.append("token", this.accessToken.access_token)
		body.append("token_type_hint", this.accessToken.token_type)
		fetch(url, { headers: this.headers(), body })
	}

	private headers() {
		const headers = new Headers()
		headers.set("Authorization", `bearer ${this.accessToken.access_token}`)
		headers.set("User-Agent", this.userAgent)
		return headers
	}
}
