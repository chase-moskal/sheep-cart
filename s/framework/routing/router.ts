
import {hash_to_route} from "./utils/hash_to_route.js"
import {route_to_hash} from "./utils/route_to_hash.js"
import {OnRouteChange, Route, RouterOptions, SetHash} from "./types.js"

function encode_for_hash(s: string) {
	return encodeURIComponent(s)
		.replace(/%20/g, "+")
}

function decode_from_hash(s: string) {
	return decodeURIComponent(s.replace(/\+/g, "%20"))
}

function parse_hash_parts(prefix: string, hash: string) {
	if (hash && hash[0] === "#")
		hash = hash.slice(1)

	if (prefix && hash && hash.startsWith(prefix))
		hash = hash.slice(prefix.length)

	return hash.includes("/")
		? hash.split("/").slice(1)
		: [hash]
}

export class Router {
	#prefix: string
	#set_hash: SetHash
	#on_route_change: OnRouteChange
	#route: Route = {zone: "catalog"}

	constructor({prefix = "", set_hash, on_route_change}: RouterOptions) {
		this.#prefix = prefix
		this.#set_hash = set_hash
		this.#on_route_change = on_route_change
	}

	#hash_to_route(hash: string) {
		const [zone, ...rest] = parse_hash_parts(this.#prefix, hash)
		switch (zone) {
			case "":
				return {zone: "catalog"}

			case "search":
				return {zone: "search", query: rest[0]}

			case "collection":
				return {zone: "collection", id: rest[0], label: rest[1]}

			case "product":
				return {zone: "product", id: rest[0], label: rest[1]}

			default:
				return {zone: "not-found"}
		}
	}

	#route_to_hash(route: Route) {
	}

	get route() {
		return this.#route
	}

	set route(r: Route) {
		this.#set_hash(route_to_hash(r))
	}

	update_hash(hash: string) {
		const route = hash_to_route(hash)
		this.#route = route
		this.#on_route_change(route)
	}

	go_catalog() {
		this.route = {zone: "catalog"}
	}

	go_search(query: string) {
		this.route = {zone: "search", query}
	}

	go_collection(id: string, label: string) {
		this.route = {zone: "collection", id, label}
	}

	go_product(id: string, label: string) {
		this.route = {zone: "product", id, label}
	}
}

