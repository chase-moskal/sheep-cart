
import {css, html} from "lit"
import {flatview} from "@benev/frog"
import {GqlProduct, GqlVariant} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {Context} from "../../../context/context.js"

export const Product = (context: Context) => flatview(context.flat)
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => {

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
		`})

	.css(context.theme, css`
		:host {
			display: flex;

			& button {
				border: 2px solid #38f538;
				padding: 0.5em 1em;
				color: #38f538;
				background-color: transparent;
				cursor: pointer;

				&:hover {
					background-color: #0080004d;
				}
			}
		}
	`)

