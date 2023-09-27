
import {html} from "lit"
import {ShaleView} from "@benev/slate"
import {GqlProduct, GqlVariant} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {img} from "./parts/img.js"
import {Img} from "./parts/types.js"
import {view, views} from "../../frontend.js"
import {Pills} from "../pills/view.js"
import {Price} from "../price/view.js"
import {styles} from "./styles.css.js"
import {Coolbutton} from "../coolbutton/view.js"
import {render_img} from "./parts/render_img.js"
import {ProductHelper} from "./parts/product_helper.js"
import {ProductVariant} from "../product_variant/view.js"
import {ProductRecommendation} from "../product_recommendation/view.js"

export const ProductFocus = (product: GqlProduct) => view(context => class extends ShaleView{
	static name = "product-focus"
	static styles = styles

	get product_helper() {
		return new ProductHelper(product)
	}


	#state = context.flat.state({
		selected_variant: this.product_helper.first_variant
	})

	#set_selected_variant = (variant: GqlVariant) => {
		this.#state.selected_variant = variant
	}

	#views = views(context, {
		Pills,
		Price,
		Coolbutton,
		ProductVariant: ProductVariant(product),
		ProductRecommendation: ProductRecommendation(product.id),
	})

	render(product: GqlProduct) {
		const {modal} = context
		const {product_helper} = this

		return html`
			<div
				part=grid
				?data-no-additional-images=${product_helper.images.length < 2}
				?data-no-options=${product_helper.variants.length < 2}>

				<figure part=figure>
					${render_img({
						part: "img",
						img: img.large(product_helper.get_variant_chosen_image(this.#state.selected_variant!)),
						onclick: (_: MouseEvent, img: Img) => (
							modal.open({
								kind: "image",
								img,
							})
						),
					})}
				</figure>

				<h1 part=title>${product.title}</h1>

				${this.#views.Pills({class: "pills", part: "pills", gpart: "pills", props: [product]})}

				${this.#views.ProductVariant(
					{
						part: "variant",
						class: "product-variant",
						props: [{
							product,
							on_variant_change: (variant) => this.#set_selected_variant(variant)
						}]
					}
				)}

				<aside part=aside class=aside>
					${product_helper.get_variant_side_images(this.#state.selected_variant!).map(image =>
						render_img({
							part: "img",
							img: img.large(image),
							onclick: (_: MouseEvent, img: Img) => (
								modal.open({
									kind: "image",
									img,
								})
							),
						})
					)}
				</aside>

				<section part=standard-content class="standard-content">
					${unsafeHTML(product.descriptionHtml)}
				</section>

			</div>
			<div part=recbox class=recommendations>
				<h2>Customers also bought:</h2>
				${this.#views.ProductRecommendation({
					part: "recommendations",
					props: [product.id, 3],
				})}
			</div>
		`

	}
})

