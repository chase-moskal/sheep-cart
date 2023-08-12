
import {html} from "lit"

import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {render_op} from "../../render_op.js"
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
				${products
					.filter(p => p.availableForSale)
					.map(product =>
						context.views.ProductCard({
							part: "card",
							exportparts: "a, plate, title, price, pill-collection, pill-tag",
						})(product)
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
	.css(context.theme, style)
) as Viewbase<[Options]>

