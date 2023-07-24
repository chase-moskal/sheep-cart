
import {html} from "lit"
import {QuickElement} from "@benev/frog"
import {GqlCollection} from "shopify-shepherd"

import {style} from "./style.css.js"
import {render_op} from "../utils/render_op.js"
import {Context} from "../../context/context.js"
import {Situations} from "../../context/types/situations.js"

export const SheepCatalog = ({state, router, views}: Context) => class extends QuickElement {
	static styles = style

	#render_collection_listing({collections}: Situations.CollectionListing) {
		const link = (collection: GqlCollection) => (
			router.routes.collection(collection.id, collection.handle).url
		)
		return html`
			${collections.map(collection => html`
				<a href="${link(collection)}">
					${collection.title}
				</a>
			`)}
		`
	}

	#render_product_listing({
			products,
			load_more_op,
			load_more,
		}: Situations.ProductListing) {
		return html`
			<ol>
				${products.map(product => html`
					<li>
						<a href="${router.routes.product(product.id, product.handle).url}">
							${product.title}
						</a>
					</li>
				`)}
			</ol>
			${render_op(load_more_op, () => load_more
				? html`<button @click=${load_more}>load more</button>`
				: undefined)}
		`
	}

	#render_single_product({product}: Situations.SingleProduct) {
		return html`
			${views.Product(product)}
		`
	}

	#render_not_found({message}: Situations.NotFound) {
		return html`
			${message
				? html`<h1>${message}</h1>`
				: html`<h1>Not found</h1>`}
			<p><a href="${router.routes.catalog().url}">back</a></p>
		`
	}

	render() {
		const {route, situation_op} = state
		return html`
			<p>route: zone ${route.zone}</p>

			${render_op(situation_op, situation => {
				switch (situation?.type) {

					case "collection_listing":
						return this.#render_collection_listing(situation)

					case "product_listing":
						return this.#render_product_listing(situation)

					case "single_product":
						return this.#render_single_product(situation)

					case "not_found":
						return this.#render_not_found(situation)

					default:
						return undefined
				}
			})}
		`
	}
}

