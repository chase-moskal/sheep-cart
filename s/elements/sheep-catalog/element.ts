
import {html} from "@benev/slate"

import {carbon} from "../frontend.js"
import {render_op} from "../render_op.js"
import {style as styles} from "./style.css.js"
import {ProductList} from "../views/product_list/view.js"
import {ProductFocus} from "../views/product_focus/view.js"
import {bg_img} from "../views/collection_list/utils/bg_img.js"
import {CollectionList} from "../views/collection_list/view.js"
import {process_comma_list} from "./utils/process_comma_list.js"
import {sort_collections} from "../views/collection_list/utils/sort_collections.js"

export const SheepCatalog = carbon({styles}, use => {
	const {state, router} = use.context

	const attributes = use.attrs({
		"prioritized-collections": String,
		"hidden-collections": String
	})

	const render_collections_tabs = (prioritized: string[], hidden: string[]) => {
		const active_collection_id = state.route.zone === "collection"
			? state.route.id
			: undefined

		if (!active_collection_id)
			return undefined

		const collections = sort_collections(state.collections, prioritized, hidden)

		return html`
			<div part=collection-tab-list>
				${collections.map(collection => html`
					<a
						part=collection-tab
						href="${router.routes.collection(collection).url}"
						?data-active-collection=${collection.id === active_collection_id}>
						<span class=bgimg style="${bg_img(collection)}"></span>
						<span class=text>${collection.title}</span>
					</a>
				`)}
			</div>
		`
	}

	const hidden = process_comma_list(
		attributes["hidden-collections"]!
	)
	const prioritized = process_comma_list(
		attributes["prioritized-collections"]!
	)

	return html`
		${render_collections_tabs(prioritized, hidden)}
		${render_op(state.situation_op, situation => {
			switch (situation?.type) {

				case "collection_list":
					return html`${CollectionList([{
						hidden,
						prioritized,
						collections: situation.collections,
					}], {attrs: {part: "collection-list"}})}`

				case "products_in_collection": {
					return html`${ProductList([{situation}], {
						attrs: {part: "product-list"}
					})}`
				}

				case "all_products":
					return html`${ProductList([{situation}], {
						attrs: {part: "product-list"}
					})}`

				case "search_results":
					return html`${ProductList([{situation}], {
						attrs: {part: "product-list"}
					})}`

				case "single_product":
					return html`${ProductFocus([situation.product], {
						attrs: {part: "product-focus"}
					})}`

				case "not_found":
					return html`
						${situation.message
							? html`<h1>${situation.message}</h1>`
							: html`<h1>Not found</h1>`}
						<p>
							<a part=a href="${router.routes.home().url}">
								back
							</a>
						</p>
					`

				default:
					return undefined
			}
		})}
	`
})
