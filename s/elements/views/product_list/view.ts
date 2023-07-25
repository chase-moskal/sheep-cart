
import {html} from "lit"
import {Flatview, flatview} from "@benev/frog"

import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {Context} from "../../../context/context.js"

export const ProductList = (context: Context): Flatview<[Options]> => flatview(context.flat)
	.state()
	.actions()
	.setup()
	.render(() => ({situation: {products}}: Options) => products.length > 0
		? html`
			${products.map(product => html`
				${context.views.ProductCard()(product)}
			`)}
		`
		: html`
			<p>No products found</p>
		`)
	.css(context.theme, style)

