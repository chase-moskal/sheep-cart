
import {html} from "lit"
import {ShaleView} from "@benev/slate"

import {styles} from "./styles.css.js"
import {Options} from "./utils/options.js"
import {render_op} from "../../render_op.js"
import {view, views} from "../../frontend.js"
import {ProductCard} from "../product_card/view.js"

export const ProductList = view(context => class extends ShaleView {
	static name = "product-list"
	static styles = styles

	#views = views(context, {
		ProductCard
	})

	render({situation: {products, load_more_op, load_more}}: Options) {

		return ((products.length > 0)
			? html`
				<div class=grid>
					${products.map(product =>
						this.#views.ProductCard({part: "card", gpart: "card", props: [product]})
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
	}
})

