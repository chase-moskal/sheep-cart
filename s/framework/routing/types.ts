
export type Routes = {
	catalog: {zone: "catalog"}
	search: {zone: "search", query: string}
	collection: {zone: "collection", id: string, label: string}
	product: {zone: "product", id: string, label: string}
}

export type Route =
	| Routes["catalog"]
	| Routes["search"]
	| Routes["collection"]
	| Routes["product"]

export type SetHash = (hash: string) => void
export type OnRouteChange = (route: Route) => void

export type RouterOptions = {
	set_hash: SetHash
	on_route_change: OnRouteChange
}

