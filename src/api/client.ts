import { AccessToken } from "./access_token.js"
import { GrantType } from "./grant_type.js"

export class Client {
	private revoked = false

	constructor(
		readonly userAgent: string,
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

		const headers = Client.basicHeaders(userAgent, clientId, clientSecret)
		const req = await fetch(url, { method: "POST", headers })
		if (!req.ok)
			throw new Error(`Couldn't login to the Reddit API: ${await req.text()}`)

		const accessToken = (await req.json()) as AccessToken,
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

	getRevoked() {
		return this.revoked
	}

	async maybeRenew() {
		if (this.bestBefore < new Date()) return this.refresh()
		return
	}

	async refresh() {
		const body = new FormData()
		body.append("grant_type", GrantType.refresh_token)
		body.append("refresh_token", this.accessToken.access_token)

		const req = await fetch("https://www.reddit.com/api/v1/access_token", {
			method: "POST",
			headers: this.basicHeaders(),
			body,
		})
		if (!req.ok)
			throw new Error(`Couldn't refresh the token: ${await req.text()}`)

		this.accessToken = (await req.json()) as AccessToken
		this.bestBefore = new Date(
			new Date().getTime() + this.accessToken.expires_in * 1_000,
		)

		return { accessToken: this.accessToken, bestBefore: this.bestBefore }
	}

	async revoke() {
		const body = new FormData()
		body.append("token", this.accessToken.access_token)
		body.append("token_type_hint", this.accessToken.token_type)

		const req = await fetch("https://www.reddit.com/api/v1/revoke_token", {
			method: "POST",
			headers: this.basicHeaders(),
			body,
		})
		if (!req.ok)
			throw new Error(`Couldn't revoke the token: ${await req.text()}`)
	}

	private static basicHeaders(
		userAgent: string,
		clientId: string,
		clientSecret: string,
	) {
		const headers = new Headers(),
			basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
		headers.set("Authorization", `Basic ${basic}`)
		headers.set("User-Agent", userAgent)
		return headers
	}

	private basicHeaders() {
		return Client.basicHeaders(this.userAgent, this.clientId, this.clientSecret)
	}

	private bearerHeaders() {
		const headers = new Headers()
		headers.set("Authorization", `bearer ${this.accessToken.access_token}`)
		headers.set("User-Agent", this.userAgent)
		return headers
	}
}
