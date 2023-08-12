
import {html} from "lit"
import {QuickElement, attributes} from "@benev/frog"

import {style} from "./style.css.js"
import {render_op} from "../render_op.js"
import {Context} from "../../context/context.js"

export const SheepCatalog = ({state, router, views}: Context) => class extends QuickElement {
	static styles = style

	#attrs = attributes<{
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

	render() {
		const prioritized = this.#prioritized_collections
		const hidden = this.#hidden_collections
		return render_op(state.situation_op, situation => {
			switch (situation?.type) {

				case "collection_list":
					return views.CollectionList()({collections: situation.collections, prioritized, hidden})

				case "products_in_collection":
					return views.ProductList({
						exportparts: "a, card, plate:card-plate, title:card-title, price:card-price, pill-collection, pill-tag",
					})({situation})

				case "all_products":
					return views.ProductList({
						exportparts: "a, card, plate:card-plate, title:card-title, price:card-price, pill-collection, pill-tag",
					})({situation})

				case "search_results":
					return views.ProductList({
						exportparts: "a, card, plate:card-plate, title:card-title, price:card-price, pill-collection, pill-tag",
					})({situation})

				case "single_product":
					return views.ProductFocus({
						exportparts: "a, card, title:card-title, price:card-price, plate:card-plate, pill-collection, pill-tag",
					})(situation.product)

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
		})
	}
}

