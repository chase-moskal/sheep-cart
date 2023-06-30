
import {Fetcher} from "./types/paginator_types.js"

export class Paginator<R> {
	#fetch: Fetcher<R>
	#after: string | undefined
	#fetch_count: number = 0

	constructor(fetch: Fetcher<R>) {
		this.#fetch = fetch
	}

	get there_are_more_pages() {
		return (this.#fetch_count === 0) || this.#after
	}

	async next_page() {
		this.#fetch_count += 1
		const {objective, pageInfo: {hasNextPage, endCursor}} = (
			await this.#fetch({after: this.#after})
		)
		this.#after = hasNextPage ?endCursor :undefined
		return objective
	}
}

