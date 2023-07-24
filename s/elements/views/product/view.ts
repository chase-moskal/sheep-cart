
import {css, html} from "lit"
import {flatview} from "@benev/frog"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {Context} from "../../../context/context.js"

export const Product = (context: Context) => flatview(context.flat)

	.state({count: 0})

	.actions(state => ({
		increment() {
			state.count++
		},
	}))

	.setup(({actions}) => {
		const interval = setInterval(() => {
			actions.increment()
		}, 1000)
		return () => clearInterval(interval)
	})

	.render(({state, actions}) => (product: GqlProduct) => html`
		<div class=product>
			<p>${product.title}<p>
			<ul>${product.tags.map(tag => html`<li>${tag}</li>`)}</ul>
			<div>${unsafeHTML(product.descriptionHtml)}</div>
			<p>count: ${state.count}</p>
			<button @click=${actions.increment}>increment</button>
			<a href="https://github.com/" part="a">github.com</a>
		</div>
	`)

	.css(context.theme, css`
		.product {
			color: lime;
		}
	`)

