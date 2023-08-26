
import {html} from "lit"

import {view} from "../../frontend.js"
import {styles} from "./styles.css.js"
import {Options} from "./utils/options.js"
import {render_op} from "../../render_op.js"
import {ProductCard} from "../product_card/view.js"

export const ProductList = view({
		styles,
		name: "product-list",
		views: {ProductCard},
	}).render(_ => views => _ =>

	({situation: {products, load_more_op, load_more}}: Options) =>
		products.length > 0
			? html`
				<div class=grid>
					${products.map(product =>
						views.ProductCard({part: "card", gpart: "card", props: [product]})
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
			`
)

