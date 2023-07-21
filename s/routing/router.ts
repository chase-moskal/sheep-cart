
import {pub} from "@benev/frog"

import {Translation} from "./hashing/translation.js"
import {Route, RouterOptions, SetHash} from "./types.js"

export class Router {
	#set_hash: SetHash
	#translation: Translation
	#route: Route = {zone: "catalog"}

	on_route_change = pub<Route>()

	constructor({prefix = "", set_hash}: RouterOptions) {
		this.#set_hash = set_hash
		this.#translation = new Translation(prefix)
	}

	static setup(prefix: string = "") {
		const router = new Router({
			prefix,
			set_hash: hash => location.hash = hash,
		})
		router.apply_hash(location.hash)
		addEventListener("hashchange", router.hashchange)
		return router
	}

	get route() {
		return this.#route
	}

	set route(r: Route) {
		const hash = this.#translation.hashify(r)
		this.#set_hash(hash)
	}

	apply_hash(hash: string) {
		const route = this.#translation.routify(hash)
		this.#route = route
		this.on_route_change.publish(route)
	}

	hashchange = (event: HashChangeEvent) => {
		const {hash} = new URL(event.newURL)
		this.apply_hash(hash)
	}

	#routefor(route: Route) {
		const hash = this.#translation.hashify(route)
		return {
			url: "#" + hash,
			go: () => this.#set_hash(hash),
		}
	}

	routes = {
		catalog: () => this.#routefor({zone: "catalog"}),
		search: (terms: string[], tags: string[]) => this.#routefor({zone: "search", terms, tags}),
		collection: (id: string, label: string) => this.#routefor({zone: "collection", id, label}),
		product: (id: string, label: string) => this.#routefor({zone: "product", id, label}),
	}

	get search_terms() {
		const route = this.#route
		return (route && route.zone === "search")
			? route.terms
			: []
	}

	get search_tags() {
		const route = this.#route
		return (route && route.zone === "search")
			? route.tags
			: []
	}
}

