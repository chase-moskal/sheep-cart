
export type Routes = {
	catalog: {zone: "catalog"}
	search: {zone: "search", query: string}
	collection: {zone: "collection", id: string, label: string}
	product: {zone: "product", id: string, label: string}
	not_found: {zone: "not-found"}
}

export type Route =
	| Routes["catalog"]
	| Routes["search"]
	| Routes["collection"]
	| Routes["product"]
	| Routes["not_found"]

export type SetHash = (hash: string) => void
export type OnRouteChange = (route: Route) => void

export type RouterOptions = {
	prefix?: string
	set_hash: SetHash
	on_route_change: OnRouteChange
}

