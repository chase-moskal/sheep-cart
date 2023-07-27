
import {html, css} from "lit"
import {flappy} from "../../flappy.js"
import {GqlPrice} from "shopify-shepherd"

export const Price = flappy("div", "price")

	.render(_ => use => (price: GqlPrice) => {
		const state = use.state({count: 0})

		function increment() {
			state.count++
		}

		return html`
			<p>\$${price.amount}</p>
			<button @click=${() => increment()}>inc ${state.count}</button>
		`
	})

	.styles(css`
		p { color: lime; }
	`)

