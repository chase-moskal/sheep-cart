
import {html} from "lit"

import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {Viewbase, viewbase} from "../../viewbase.js"

export const ProductList = viewbase(context => v => v
	.tag("section")
	.name("product-list")
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
) as Viewbase<[Options]>

