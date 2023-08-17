
import {html} from "lit"

import {style} from "./style.css.js"
import {view, View} from "../../view.js"
import {GqlProduct} from "shopify-shepherd"

export const ProductRecommendation = view("product-recommendation")
	.render(context => use => (id: string, count: number) => {
		const {views} = context
		const state = use.state({recommendations: [] as GqlProduct[]})

		use.setup(() => {
			void async function () {
				const products = await context
					.shopify
					.product_recommendations({product_id: id})

				state.recommendations = products
			}()
			return () => {}
		})

		return html`
			${state.recommendations.slice(0, count).map(r =>
				views.ProductCard({part: "card"})(r)()
			)}
	`})
	.styles(style) as View<[string, number]>

