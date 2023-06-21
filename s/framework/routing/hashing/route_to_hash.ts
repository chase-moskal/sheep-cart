
import {Route} from "../types.js"
import {encode_for_hash} from "./parts/encode_for_hash.js"

export function route_to_hash(p: string, route: Route): string {
	const e = (s: string) => encode_for_hash(s)

	switch (route.zone) {
		case "catalog":
			return `${p}/`

		case "search":
			return `${p}/search/${e(route.query)}:${route.tags.join(",")}`

		case "collection":
			return `${p}/collection/${e(route.id)}/${e(route.label)}`

		case "product":
			return `${p}/product/${e(route.id)}/${e(route.label)}`

		default:
			return `${p}/`
	}
}

