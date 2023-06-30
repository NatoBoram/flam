import { Kind } from "./kind.js"

/**
 * A fullname is a combination of a thing's type (e.g. `Link`) and its unique ID
 * which forms a compact encoding of a globally unique ID on reddit.
 *
 * Fullnames start with the type prefix for the object's type, followed by the
 * thing's unique ID in [base 36](https://en.wikipedia.org/wiki/Base36). For
 * example, `t3_15bfi0`.
 *
 * @see https://www.reddit.com/dev/api/oauth#fullnames
 */
export type Fullname<T extends Kind = Kind> = `${T}_${string}`
