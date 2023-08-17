
import {html} from "lit"

import {style} from "./style.css.js"
import {view, View} from "../../view.js"
import {Options} from "./utils/options.js"
import {render_op} from "../../render_op.js"

export const ProductList = view("section", "product-list")
	.render(({views}) => _ => ({situation: {products, load_more_op, load_more}}: Options) => products.length > 0
		? html`

			<div class=grid>
				${products.map(product =>
					views.ProductCard({part: "card", "data-gpart": "card"})(product)()
				)}
			</div>

			<footer>
				${render_op(load_more_op, () => load_more
					? html`<button @click=${load_more}>load more</button>`
					: undefined)}
			</footer>

		`
		: html`
			<p>No products found</p>
		`)
	.styles(style) as View<[Options]>

