
import {Route} from "../types.js"
import {prefix} from "./prefix.js"

export function route_to_hash(route: Route) {
	const enc = (s: string) => encodeURIComponent(s)

	switch (route.zone) {

		case "catalog":
			return `${prefix}/`

		case "search":
			return `${prefix}/search/${enc(route.query)}`

		case "collection":
			return `${prefix}/collection/${enc(route.id)}/${enc(route.label)}`

		case "product":
			return `${prefix}/product/${enc(route.id)}/${enc(route.label)}`

		default:
			throw new Error(`unknown route zone`)
	}
}

