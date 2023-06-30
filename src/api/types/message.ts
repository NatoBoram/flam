import { Distinguished } from "./distinguished.js"
import { Fullname } from "./fullname.js"
import { Kind } from "./kind.js"
import { Listing } from "./listing.js"
import { Thing } from "./thing.js"

export type Messages = Listing<MessageData>

export interface Message extends Thing<MessageData> {
	readonly kind: Kind.message
	readonly data: MessageData
}

export interface MessageData {
	readonly first_message: null
	readonly first_message_name: null
	readonly subreddit: string | null
	readonly likes: null
	readonly replies: string
	readonly author_fullname: null | Fullname<Kind.account>
	readonly id: string
	readonly subject: string
	readonly associated_awarding_id: null
	readonly score: number
	readonly author: string | null
	readonly num_comments: null
	readonly parent_id: null
	readonly subreddit_name_prefixed: `r/${string}` | null
	readonly new: boolean
	readonly type: "unknown"
	readonly body: string
	readonly dest: string
	readonly was_comment: boolean
	readonly body_html: string
	readonly name: Fullname<Kind.message>
	readonly created: number
	readonly created_utc: number
	readonly context: string
	readonly distinguished: Distinguished
}
