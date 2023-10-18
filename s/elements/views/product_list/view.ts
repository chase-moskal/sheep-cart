
import {html} from "@benev/slate"

import {styles} from "./styles.css.js"
import {obsidian} from "../../frontend.js"
import {Options} from "./utils/options.js"
import {render_op} from "../../render_op.js"
import {ProductCard} from "../product_card/view.js"

export const ProductList = obsidian({styles, name: "product_list"}, _ => (props: Options) => {
	const {situation: {products, load_more_op, load_more}} = props

	return ((products.length > 0)
		? html`
			<div class=grid>
				${products.map(product =>
					ProductCard([product], {
						attrs: {part: "card", gpart: "card"}
					})
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
})

