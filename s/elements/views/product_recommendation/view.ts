
import {html} from "lit"
import {ShaleView} from "@benev/slate"
import {GqlProduct} from "shopify-shepherd"

import {styles} from "./styles.css.js"
import {view, views} from "../../frontend.js"
import {ProductCard} from "../product_card/view.js"

export const ProductRecommendation = (product_id: string) => view(context => class extends ShaleView {
	static name = "product-recommendation"
	static styles = styles

	#state = context.flat.state({
		recommendations: [] as GqlProduct[]
	})

	#views = views(context, {
		ProductCard
	})

	setup = () => () => {
		(async () => {
			const products = await context
				.shopify
				.product_recommendations({product_id})
			
			this.#state.recommendations = products
		})()
	}

	render(id: string, count: number) {

		return html`
			${this.#state.recommendations!.slice(0, count).map(r =>
				this.#views.ProductCard({part: "card", gpart: "card", props: [r]})
			)}
		`
	}
})

