
import {Route} from "../types.js"
import {parse_hash_parts} from "./parts/parse_hash_parts.js"

export function hash_to_route(prefix: string, hash: string): Route {
	const [zone, ...rest] = parse_hash_parts(prefix, hash)

	switch (zone) {
		case "":
			return {zone: "catalog"}

		case "search": {
			const [raw] = rest
			if (raw.includes(":")) {
				const [query, tags_raw] = raw.split(":")
				const tags = tags_raw.split(",").filter(t => t.length > 0)
				return {zone: "search", query, tags}
			}
			else
				return {zone: "search", query: raw, tags: []}
		}

		case "collection":
			return {zone: "collection", id: rest[0], label: rest[1]}

		case "product":
			return {zone: "product", id: rest[0], label: rest[1]}

		default:
			return {zone: "not-found"}
	}
}

