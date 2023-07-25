
import {html} from "lit"
import {QuickElement, render_op} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"

export const SheepCatalog = ({state, router, views}: Context) => class extends QuickElement {
	static styles = style

	render() {
		return render_op(state.situation_op, situation => {
			switch (situation?.type) {

				case "collection_listing":
					return views.CollectionList()({
						collections: situation.collections,
						make_link: collection => (
							router.routes.collection(collection).url
						)
					})

				case "product_listing":
					return views.ProductList()({
						situation,
						make_link: product => (
							router.routes.product(product).url
						),
					})

				case "single_product":
					return views.ProductFocus({exportparts: "a"})(situation.product)

				case "not_found":
					return html`
						${situation.message
							? html`<h1>${situation.message}</h1>`
							: html`<h1>Not found</h1>`}
						<p><a href="${router.routes.catalog().url}">back</a></p>
					`

				default:
					return undefined
			}
		})
	}
}

