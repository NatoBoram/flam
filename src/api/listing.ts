import { Fullname } from "./fullname.js"
import { Kind } from "./kind.js"
import { Thing } from "./thing.js"

export interface Listing<T> extends Thing<ListingData<T>> {
	readonly kind: Kind.listing
	readonly data: ListingData<T>
}

/**
 * Used to [paginate](http://en.wikipedia.org/wiki/Pagination) content that is
 * too long to display in one go. Add the query argument `before` or `after`
 * with the value given to get the previous or next page. This is usually used
 * in conjunction with a `count` argument.
 *
 * **Exception**: Unlike the other classes documented on this page, `Listing` is
 * not a `thing` subclass, as it inherits directly from the Python base class,
 * `Object`. Although it does have `data` and `kind` as parameters, it does not
 * have `id` and `name`. A listing's `kind` will always be `Listing` and its
 * data will be a list of `thing`s.
 *
 * @see https://github.com/reddit-archive/reddit/wiki/JSON#listing */
export interface ListingData<T> {
	readonly after: Fullname
	readonly before: Fullname | null
	readonly children: Thing<T>[]
	readonly dist: number | null
	readonly geo_filter: string
	readonly modhash: string | null
}
