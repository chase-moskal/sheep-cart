
import {css, html} from "lit"
import {flatview} from "@benev/frog"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {setup} from "../../setup.js"

export const Product = setup(({flat, theme}) => flatview({flat, strict: true})

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
		</div>
	`)

	.css(theme, css`
		.product {
			color: lime;
		}
	`)
)

