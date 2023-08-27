
import {html} from "lit"
import {Attrs, QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {component} from "../frontend.js"
import {render_op} from "../render_op.js"
import {ProductList} from "../views/product_list/view.js"
import {ProductFocus} from "../views/product_focus/view.js"
import {bg_img} from "../views/collection_list/utils/bg_img.js"
import {CollectionList} from "../views/collection_list/view.js"
import {process_comma_list} from "./utils/process_comma_list.js"
import {sort_collections} from "../views/collection_list/utils/sort_collections.js"

export const SheepCatalog = component.views({
		CollectionList,
		ProductList,
		ProductFocus,
	}).element(({state, router}) => views => class extends QuickElement {

	static styles = style

	#attrs = Attrs.base(this) as Attrs<{
		"prioritized-collections": string
		"hidden-collections": string
	}>

	get #option_attributes() {
		return {
			hidden: process_comma_list(this.#attrs.string["hidden-collections"]),
			prioritized: process_comma_list(this.#attrs.string["prioritized-collections"]),
		}
	}

	#render_collections_tabs = (prioritized: string[], hidden: string[]) => {
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

	render() {
		const {hidden, prioritized} = this.#option_attributes
		return html`
			<div>
				${this.#render_collections_tabs(prioritized, hidden)}
				${render_op(state.situation_op, situation => {
					switch (situation?.type) {

						case "collection_list":
							return views.CollectionList({
								part: "collection-list",
								props: [{
									hidden,
									prioritized,
									collections: situation.collections,
								}],
							})

						case "products_in_collection": {
							return views.ProductList({part: "product-list", props: [{situation}]})
						}

						case "all_products":
							return views.ProductList({part: "product-list", props: [{situation}]})

						case "search_results":
							return views.ProductList({part: "product-list", props: [{situation}]})

						case "single_product":
							return views.ProductFocus({part: "product-focus", props: [situation.product]})

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
			</div>
		`
	}
})

