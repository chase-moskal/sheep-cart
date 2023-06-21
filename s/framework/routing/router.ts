
import {hash_to_route} from "./hashing/hash_to_route.js"
import {route_to_hash} from "./hashing/route_to_hash.js"
import {OnRouteChange, Route, RouterOptions, SetHash} from "./types.js"

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

	get route() {
		return this.#route
	}

	set route(r: Route) {
		this.#set_hash(route_to_hash(this.#prefix, r))
	}

	update_hash(hash: string) {
		const route = hash_to_route(this.#prefix, hash)
		this.#route = route
		this.#on_route_change(route)
	}

	go_catalog() {
		this.route = {zone: "catalog"}
	}

	go_search(query: string, tags: string[]) {
		this.route = {zone: "search", query, tags}
	}

	go_collection(id: string, label: string) {
		this.route = {zone: "collection", id, label}
	}

	go_product(id: string, label: string) {
		this.route = {zone: "product", id, label}
	}
}

