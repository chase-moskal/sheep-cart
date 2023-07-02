
import {Fetcher, GqlEdges} from "./types/paginator_types.js"

export class Paginator<R> {
	#fetch: Fetcher<R>
	#after: string | undefined
	#fetch_count: number = 0

	static unwrap<N = any>(resource: {edges: GqlEdges<N>[]}) {
		return resource.edges.map(e => e.node)
	}

	constructor(fetch: Fetcher<R>) {
		this.#fetch = fetch
	}

	get there_are_more_pages() {
		return (this.#fetch_count === 0) || this.#after
	}

	async next_page() {
		this.#fetch_count += 1
		const result = await this.#fetch({after: this.#after})
		const {pageInfo: {hasNextPage, endCursor}} = result
		this.#after = hasNextPage ?endCursor :undefined
		return result
	}
}

