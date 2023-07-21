
import {html} from "lit"
import {QuickElement} from "@benev/frog"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {style} from "./style.css.js"
import {render_op} from "../utils/render_op.js"
import {Context} from "../../context/context.js"
import {NotFoundSituation, ProductFocusSituation, ProductListingSituation} from "../../context/types/situation.js"

export const SheepCatalog = ({state, router}: Context) => class extends QuickElement {
	static styles = style

	#on_click_product(product: GqlProduct) {
		return (event: MouseEvent) => {
			router.routes.product(product.id, product.handle).go()
			event.preventDefault()
		}
	}

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
			<div class=product>
				<p>${product.title}<p>
				<ul>
					${product.tags.map(tag => html`<li>${tag}</li>`)}
				</ul>
				<div>${unsafeHTML(product.descriptionHtml)}</div>
			</div>
		`
	}

	#render_not_found({}: NotFoundSituation) {
		return html`
			not found
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
}

