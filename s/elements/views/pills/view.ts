
import {html} from "lit"
import {css} from "@chasemoskal/magical"
import {GqlProduct} from "shopify-shepherd"

import {flappy} from "../../flappy.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"

export const Pills = flappy("div", "pills")
	.render(context => _ => (product: GqlProduct) => {

		const productHelper = new ProductHelper(product)

		const collections = productHelper
			.cross_reference_collections(context.state.collections)

		return html`
			<ol>

				${collections.map(collection => html`
					<li data-collection>${collection.title}</li>
				`)}

				${product.tags.map(tag => html`
					<li data-tag>${tag}</li>
				`)}
			</ol>
		`
	})
	.styles(css`

		ol {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			gap: 0.1em;
		}

		li {
			border: 1px solid currentColor;
			padding: 0 0.3em;

			&[data-collection] {
				border-radius: 0.3em;
			}

			&[data-tag] {
				opacity: 0.7;
				border-radius: 1em;
			}
		}
	`)

