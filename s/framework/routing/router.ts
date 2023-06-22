
import {Pubsub} from "../utils/pubsub.js"
import {hash_to_route} from "./hashing/hash_to_route.js"
import {route_to_hash} from "./hashing/route_to_hash.js"
import {Route, RouterOptions, SetHash} from "./types.js"

export class Router {
	#prefix: string
	#set_hash: SetHash
	#route: Route = {zone: "catalog"}

	on_route_change = new Pubsub<Route>()

	constructor({prefix = "", set_hash}: RouterOptions) {
		this.#prefix = prefix
		this.#set_hash = set_hash
	}

	get route() {
		return this.#route
	}

	set route(r: Route) {
		this.#set_hash(route_to_hash(this.#prefix, r))
	}

	apply_hash(hash: string) {
		const route = hash_to_route(this.#prefix, hash)
		this.#route = route
		this.on_route_change.pub(route)
	}

	hashchange = (event: HashChangeEvent) => {
		const {hash} = new URL(event.newURL)
		this.apply_hash(hash)
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

