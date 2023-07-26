
import {html} from "lit"

import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {View, view} from "../../view-base.js"

export const ProductList = view("section", "product-list", context => v => v
	.state()
	.actions()
	.setup()
	.render(() => ({situation: {products}}: Options) => products.length > 0
		? html`
			${products.map(product => html`${context.views.ProductCard()(product)}`)}
		`
		: html`
			<p>No products found</p>
		`)
	.css(context.theme, style)
) as View<[Options]>

