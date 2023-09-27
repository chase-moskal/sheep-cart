
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {view} from "../../frontend.js"
import {styles} from "./styles.css.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"
import {ShaleView} from "@benev/slate"

export const Pills = view(context => class extends ShaleView {
	static name = "pills"
	static styles = styles

	render(product: GqlProduct) {
		const {state} = context
		const productHelper = new ProductHelper(product)

		const collections = productHelper
			.cross_reference_collections(state.collections)

		return html`
			<ol part=list>

				${collections.map(collection => html`
					<li part=collection>${collection.title}</li>
				`)}

				${product.tags.map(tag => html`
					<li part=tag>${tag}</li>
				`)}
			</ol>
		`
	}
})

