
import {html} from "lit"
import {Attrs, QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {component} from "../frontend.js"
import {render_op} from "../render_op.js"
import {ProductList} from "../views/product_list/view.js"
import {ProductFocus} from "../views/product_focus/view.js"
import {CollectionList} from "../views/collection_list/view.js"
import {bgstyle} from "../views/collection_list/utils/bgstyle.js"

export const SheepCatalog = component.views({
	CollectionList,
	ProductList,
	ProductFocus,
}).element(({state, router}) => views => class extends QuickElement {
	static styles = style

	#attrs = Attrs.base<{
		"prioritized-collections": string
		"hidden-collections": string
	}>(this)

	get #prioritized_collections() {
		const raw: string = this.#attrs.string["prioritized-collections"]
		return raw
			? raw.split(/\s+/).map(id => id.trim())
			: []
	}

	get #hidden_collections() {
		const raw: string = this.#attrs.string["hidden-collections"]
		return raw
			? raw.split(/\s+/).map(id => id.trim())
			: []
	}

	#render_collections_tab = () => {
		const active_collection = state.route.zone === "collection"
			? state.route.label
			: ""

		if(!active_collection)
			return undefined

		return html`
			<div part="collections-tab">
				${state.collections.map(c => html`
					<a
						style="${bgstyle(c)}"
						href="${router.routes.collection(c).url}"
						?data-active-collection=${c.title.toLowerCase() === active_collection}>
						${c.title}
					</a>
				`)}
			</div>
		`
	}

	render() {
		const prioritized = this.#prioritized_collections
		const hidden = this.#hidden_collections

		return html`
			<div>
				${this.#render_collections_tab()}
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

						case "products_in_collection":
							return views.ProductList({part: "product-list", props: [{situation}]})

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

