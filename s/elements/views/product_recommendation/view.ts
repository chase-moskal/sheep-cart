
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {view} from "../../frontend.js"
import {styles} from "./styles.css.js"
import {ProductCard} from "../product_card/view.js"

export const ProductRecommendation = view({
		name: "product-recommendation",
		styles,
		views: {ProductCard},
	}).render(context => views => use => (id: string, count: number) => {

	const state = use.state({recommendations: [] as GqlProduct[]})

	use.setup(() => {
		void async function () {
			const products = await context
				.shopify
				.product_recommendations({product_id: id})

			state.recommendations = products
		}()
		return {
			result: undefined,
			setdown: () => {},
		}
	})

	return html`
		${state.recommendations.slice(0, count).map(r =>
			views.ProductCard({part: "card", gpart: "card", props: [r]})
		)}
	`
})

