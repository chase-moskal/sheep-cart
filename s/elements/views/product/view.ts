
import {css, html} from "lit"
import {flatview} from "@benev/frog"
import {edges, GqlProduct, GqlVariant} from "shopify-shepherd"
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
			// actions.increment()
		}, 1000)
		return () => clearInterval(interval)
	})

	.render(({state, actions}) => (product: GqlProduct) => {

		const imageEdge = product.images.edges
			.find(n => n.node.id === product.featuredImage?.id)
		const more_than_one_variant = product.variants.edges.length > 1
		const all_the_same_price = product.variants.edges
			.every(p => p.node.price.amount === product.variants.edges[0].node.price.amount)
		function price_for({node: variant}: {node: GqlVariant}) {
			return parseFloat(variant.price.amount)
		}
		const lowest_price = product.variants.edges.reduce(
			(previous, current) => (price_for(current) < previous)
				? price_for(current)
				: previous,
			price_for(product.variants.edges[0])
		)

		return html`
			<div class=product>
				<img src="${imageEdge!.node.url_tiny}"/>
				<div>
					<p>${product.title}</p>
					<ul>${product.tags.map(tag => html`<li>${tag}</li>`)}</ul>
					<div>${unsafeHTML(product.descriptionHtml)}</div>
					<p>variants: ${product.variants.edges.length}</p>
					${more_than_one_variant && !all_the_same_price
						? html`starts at ${lowest_price}`
						: html`${lowest_price}`}
					<button>ADD TO CART</button>
				</div>
			</div>
		`})

	.css(context.theme, css`
		.product {
			color: lime;
		}
	`)

