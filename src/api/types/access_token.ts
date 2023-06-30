export interface AccessToken {
	/** Your access token */
	readonly access_token: string

	/** Seconds until the token expires */
	readonly expires_in: number

	/** The scope of the token */
	readonly scope: string

	/** The string "bearer" */
	readonly token_type: "bearer"
}
