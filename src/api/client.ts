import { AccessToken } from "./types/access_token.js"
import { ModselfController } from "./controllers/modself.js"
import { MysubredditsController } from "./controllers/mysubreddits.js"
import { PrivateMessagesController } from "./controllers/privatemessages.js"
import { SubscribeController } from "./controllers/subscribe.js"
import { GrantType } from "./types/grant_type.js"

export class Client {
	private revoked = false

	readonly modself = new ModselfController(this)
	readonly mysubreddits = new MysubredditsController(this)
	readonly privatemessage = new PrivateMessagesController(this)
	readonly subscribe = new SubscribeController(this)

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

	async fetch<T>(
		input: URL | RequestInfo,
		init?: RequestInit | undefined,
	): Promise<Response<T>> {
		if (this.revoked) throw new Error("This client has already been revoked.")
		await this.maybeRenew()

		const headers =
			init?.headers instanceof Headers
				? this.bearerHeaders(init.headers)
				: this.bearerHeaders()
		headers.set("raw_json", "1")
		return fetch(input, { ...init, headers })
	}

	isRevoked() {
		return this.revoked
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

		this.revoked = true
	}

	private static basicHeaders(
		userAgent: string,
		clientId: string,
		clientSecret: string,
		headers?: Headers,
	): Headers {
		headers = headers ?? new Headers()
		const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
		headers.set("Authorization", `Basic ${basic}`)
		headers.set("User-Agent", userAgent)
		return headers
	}

	private basicHeaders(headers?: Headers) {
		return Client.basicHeaders(
			this.userAgent,
			this.clientId,
			this.clientSecret,
			headers,
		)
	}

	private bearerHeaders(headers?: Headers): Headers {
		headers = headers ?? new Headers()
		headers.set(
			"Authorization",
			`${this.accessToken.token_type} ${this.accessToken.access_token}`,
		)
		headers.set("User-Agent", this.userAgent)
		return headers
	}

	private async maybeRenew() {
		if (this.bestBefore < new Date()) return this.refresh()
		return
	}

	private async refresh() {
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
}

interface Response<T> extends globalThis.Response {
	json(): Promise<T>
}
