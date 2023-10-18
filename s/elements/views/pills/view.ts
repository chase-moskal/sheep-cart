
import {html} from "@benev/slate"
import {GqlProduct} from "shopify-shepherd"

import {styles} from "./styles.css.js"
import {obsidian} from "../../frontend.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"

export const Pills = obsidian({styles, name: "pills"}, use => (product: GqlProduct) => {
	const {state} = use.context
	const productHelper = use.prepare(() => new ProductHelper(product))
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
})

