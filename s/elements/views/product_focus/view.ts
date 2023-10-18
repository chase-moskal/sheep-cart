
import {html} from "@benev/slate"
import {GqlProduct, GqlVariant} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {img} from "./parts/img.js"
import {Img} from "./parts/types.js"
import {Pills} from "../pills/view.js"
import {styles} from "./styles.css.js"
import {obsidian} from "../../frontend.js"
import {render_img} from "./parts/render_img.js"
import {ProductHelper} from "./parts/product_helper.js"
import {ProductVariant} from "../product_variant/view.js"
import {ProductRecommendation} from "../product_recommendation/view.js"

export const ProductFocus = obsidian({styles, name: "product-focus"}, use => (product: GqlProduct) => {
	const {modal} = use.context
	const product_helper = new ProductHelper(product)
	const selected_variant = use.signal(product_helper.first_variant)

	const set_selected_variant = (variant: GqlVariant) => {
		selected_variant.value = variant
	}

	return html`
		<div
			part=grid
			?data-no-additional-images=${product_helper.images.length < 2}
			?data-no-options=${product_helper.variants.length < 2}>

			<figure part=figure>
				${render_img({
					part: "img",
					img: img.large(product_helper.get_variant_chosen_image(selected_variant.value)),
					onclick: (_: MouseEvent, img: Img) => (
						modal.open({
							kind: "image",
							img,
						})
					),
				})}
			</figure>

			<h1 part=title>${product.title}</h1>

			${Pills([product],{
				attrs: {class: "pills", part: "pills", gpart: "pills"}
			})}

			${ProductVariant([{
					product,
					on_variant_change: (variant) => set_selected_variant(variant)
				}], {attrs: {part: "variant", class: "product-variant"}}
			)}

			<aside part=aside class=aside>
				${product_helper.get_variant_side_images(selected_variant.value).map(image =>
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
			${ProductRecommendation([product.id, 3], {attrs: {part: "recommendations"}})}
		</div>
	`
})

