
import {html} from "lit"
import {GqlProduct, GqlVariant} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {img} from "./parts/img.js"
import {Img} from "./parts/types.js"
import {view} from "../../frontend.js"
import {Pills} from "../pills/view.js"
import {Price} from "../price/view.js"
import {styles} from "./styles.css.js"
import {Coolbutton} from "../coolbutton/view.js"
import {render_img} from "./parts/render_img.js"
import {ProductHelper} from "./parts/product_helper.js"
import {ProductVariant} from "../product_variant/view.js"
import {ProductRecommendation} from "../product_recommendation/view.js"

export const ProductFocus = view({
		styles,
		name: "product-focus",
		views: {
			Pills,
			Price,
			Coolbutton,
			ProductVariant,
			ProductRecommendation,
		},
	}).render(({modal}) => views => use => (product: GqlProduct) => {

	const product_helper = new ProductHelper(product)

	const state = use.state({
		selected_varaint: product_helper.first_variant,
	})

	function set_selected_variant(variant: GqlVariant) {
		state.selected_varaint = variant
	}

	return html`
		<div
			part=grid
			?data-no-additional-images=${product_helper.images.length < 2}
			?data-no-options=${product_helper.variants.length < 2}>

			<figure part=figure>
				${render_img({
					part: "img",
					img: img.large(product_helper.get_variant_chosen_image(state.selected_varaint)),
					onclick: (_: MouseEvent, img: Img) => (
						modal.open({
							kind: "image",
							img,
						})
					),
				})}
			</figure>

			<h1 part=title>${product.title}</h1>

			${views.Pills({class: "pills", part: "pills", gpart: "pills", props: [product]})}

			${views.ProductVariant(
				{
					part: "variant",
					class: "product-variant",
					props: [{
						product,
						on_variant_change: (variant) => set_selected_variant(variant)
					}]
				}
			)}

			<aside part=aside class=aside>
				${product_helper.get_variant_side_images(state.selected_varaint).map(image =>
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
			${views.ProductRecommendation({
				part: "recommendations",
				props: [product.id, 3],
			})}
		</div>
	`
})

