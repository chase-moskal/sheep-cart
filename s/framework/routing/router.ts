
import {hash_to_route} from "./utils/hash_to_route.js"
import {route_to_hash} from "./utils/route_to_hash.js"
import {OnRouteChange, Route, RouterOptions, SetHash} from "./types.js"

export class Router {
	#route: Route = {zone: "catalog"}
	#set_hash: SetHash
	#on_route_change: OnRouteChange

	constructor({set_hash, on_route_change}: RouterOptions) {
		this.#set_hash = set_hash
		this.#on_route_change = on_route_change
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

