
import {html} from "lit"
import {QuickElement, render_op} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"

export const SheepCatalog = ({state, router, views}: Context) => class extends QuickElement {
	static styles = style

	render() {
		return render_op(state.situation_op, situation => {
			switch (situation?.type) {

				case "collection_list":
					return views.CollectionList()({collections: situation.collections})

				case "products_in_collection":
					return views.ProductList()({situation})

				case "all_products":
					return views.ProductList()({situation})

				case "search_results":
					return views.ProductList()({situation})

				case "single_product":
					return views.ProductFocus({exportparts: "a"})(situation.product)

				case "not_found":
					return html`
						${situation.message
							? html`<h1>${situation.message}</h1>`
							: html`<h1>Not found</h1>`}
						<p>
							<a href="${router.routes.catalog().url}">
								back to catalog
							</a>
						</p>
					`

				default:
					return undefined
			}
		})
	}
}

