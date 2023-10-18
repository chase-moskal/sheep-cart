
import {html} from "@benev/slate"
import {GqlProduct} from "shopify-shepherd"

import {styles} from "./styles.css.js"
import {obsidian} from "../../frontend.js"
import {ProductCard} from "../product_card/view.js"

export const ProductRecommendation = obsidian({styles}, use => (id: string, count: number) => {
	const {shopify} = use.context
	const recommendations = use.signal<GqlProduct[]>([])

	use.prepare(async () => {
		const products = await shopify
			.product_recommendations({product_id: id})
		recommendations.value = products
	})

	return html`
		${recommendations.value.slice(0, count).map(r =>
			ProductCard([r], {attrs: {part: "card", gpart: "card"}})
		)}
	`
})

