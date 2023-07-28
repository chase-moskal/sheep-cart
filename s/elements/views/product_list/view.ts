
import {html} from "lit"
import {render_op} from "@benev/frog"

import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {Viewbase, viewbase} from "../../viewbase.js"

export const ProductList = viewbase(context => v => v
	.tag("section")
	.name("product-list")
	.state()
	.actions()
	.setup()
	.render(() => ({situation: {products, load_more_op, load_more}}: Options) => products.length > 0
		? html`

			<div class=grid>
				${products.map(product => html`${
					context.views.ProductCard({part: "card", exportparts: "a, plate, title, price"})(product)
				}`)}
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
	.css(context.theme, style)
) as Viewbase<[Options]>

