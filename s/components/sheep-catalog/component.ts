
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {setup} from "../setup.js"
import {style} from "./style.css.js"
import {render_op} from "../utils/render_op.js"
import {NotFoundSituation, ProductFocusSituation, ProductListingSituation} from "../../context/types/situation.js"

export const SheepCatalog = setup(({state, router, views}) => class extends QuickElement {
	static styles = style

	#render_product_listing({
			products,
			load_more_op,
			load_more,
		}: ProductListingSituation) {
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

	#render_product_focus({product}: ProductFocusSituation) {
		return html`
			${views.Product(product)}
		`
	}

	#render_not_found({message}: NotFoundSituation) {
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

					case "ProductListing":
						return this.#render_product_listing(situation)

					case "ProductFocus":
						return this.#render_product_focus(situation)

					case "NotFound":
						return this.#render_not_found(situation)

					default:
						return undefined
				}
			})}
		`
	}
})

