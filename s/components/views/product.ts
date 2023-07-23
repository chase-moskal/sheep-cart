
import {css, html} from "lit"
import {flatview} from "@benev/frog"
import {flat} from "../../context/flat.js"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

export const PlainView = flatview({flat, shadow: false, strict: true})
	.state({})
	.actions(() => ({}))
	.setup(() => () => {})
	.render(() => () => html`
		<p>hello</p>
	`)
	.css()

export const ProductView = flatview({flat, shadow: false, strict: true})
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
	.css(css`
		.product {
			color: red;
		}
	`)

