
import {Route} from "../types.js"
import {prefix} from "./prefix.js"

export function hash_to_route(hash: string): Route {
	const [, body] = hash.split(prefix)
	const [zone, ...rest] = body.split("/")

	switch (zone) {
		case "catalog":
			return {zone: "catalog"}

		case "search":
			return {zone: "search", query: rest[0]}

		case "collection":
			return {zone: "collection", id: rest[0], label: rest[1]}

		case "product":
			return {zone: "product", id: rest[0], label: rest[1]}

		default:
			throw new Error(`unknown route zone "${zone}"`)
	}
}

