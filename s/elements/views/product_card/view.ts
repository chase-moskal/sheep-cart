
import {html} from "lit"
import {flatview} from "@benev/frog"
import {GqlProduct, GqlVariant} from "shopify-shepherd"

import {style} from "./style.css.js"
import {Context} from "../../../context/context.js"

export const ProductCard = (context: Context) => flatview(context.flat)
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

		const link = context.router.routes.product(product.id, product.handle).url

		return html`
			<img src="${imageEdge!.node.url_tiny}"/>
			<div>
				<p><a href="${link}">${product.title}</a></p>
				<ul>${product.tags.map(tag => html`<li>${tag}</li>`)}</ul>
				<p>variants: ${product.variants.edges.length}</p>
				${more_than_one_variant && !all_the_same_price
					? html`starts at ${lowest_price}`
					: html`${lowest_price}`}
				<button>ADD TO CART</button>
			</div>
		`})

	.css(context.theme, style)

