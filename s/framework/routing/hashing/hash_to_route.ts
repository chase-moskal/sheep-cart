
import {Route} from "../types.js"
import {parse_hash_parts} from "./parts/parse_hash_parts.js"

export function hash_to_route(prefix: string, hash: string): Route {
	const [zone, ...rest] = parse_hash_parts(prefix, hash)

	switch (zone) {
		case "":
			return {zone: "catalog"}

		case "search":
			const [query, tags_raw] = rest[0].split(":")
			const tags = tags_raw.split(",")
			return {zone: "search", query, tags}

		case "collection":
			return {zone: "collection", id: rest[0], label: rest[1]}

		case "product":
			return {zone: "product", id: rest[0], label: rest[1]}

		default:
			return {zone: "not-found"}
	}
}

