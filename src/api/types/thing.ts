import { Kind } from "./kind.js"

/** https://github.com/reddit-archive/reddit/wiki/JSON#thing-reddit-base-class */
export interface Thing<T> {
	/** All things have a `kind`. The `kind` is a `string` identifier that denotes
	 * the object's type. Some examples: `Listing`, `more`, `t1`, `t2` */
	readonly kind: Kind

	/** A custom data structure used to hold valuable information. This object's format will follow the data structure respective of its kind. See below for specific structures. */
	readonly data: T
}
