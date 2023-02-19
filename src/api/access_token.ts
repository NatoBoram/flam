export interface AccessToken {
	/** Your access token */
	access_token: string

	/** Seconds until the token expires */
	expires_in: number

	/** The scope of the token */
	scope: string

	token_type: string
}
