
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {img} from "./parts/img.js"
import {style} from "./style.css.js"
import {view, View} from "../../view.js"
import {Choice, Img} from "./parts/types.js"
import {render_img} from "./parts/render_img.js"
import {ChoiceHelper} from "./parts/choice_helper.js"
import {ProductHelper} from "./parts/product_helper.js"
import {render_options} from "./parts/render_options.js"
import {add_button} from "../coolbutton/helpers/add_button.js"

export const ProductFocus = view("article", "product-focus")
	.render(({cart, views, modal}) => use => (product: GqlProduct) => {

		const state = use.state({
			choices: [] as Choice[],
		})

		const productHelper = new ProductHelper(product)
		const choiceHelper = new ChoiceHelper(productHelper, state.choices)

		function set_choice(name: string, value: undefined | string) {
			state.choices = state.choices
				.filter(choice => choice.name !== name)

			if (value !== undefined)
				state.choices.push({name, value})
		}

		return html`
			<div
				class=grid
				?data-no-additional-images=${productHelper.images.length < 2}
				?data-no-options=${productHelper.variants.length < 2}>

				<figure>
					${render_img({
						part: "img",
						img: img.large(choiceHelper.chosen_image),
						onclick: (_: MouseEvent, img: Img) => modal.enlarge_image(img),
					})}
				</figure>

				<h1>${product.title}</h1>

				${views.Pills({class: "pills"})(product)()}

				<div class=options>
					${render_options(choiceHelper, set_choice)}
				</div>

				<div class=buy>
					${views.Price({class: "price"})(choiceHelper.selected_variant)()}
					${add_button({
						Coolbutton: views.Coolbutton,
						cart,
						product,
						variant_id: choiceHelper.selected_variant.id,
						allow_select: false,
					})}
				</div>

				<aside>
					${choiceHelper.side_images.map(image =>
						render_img({
							part: "img",
							img: img.large(image),
							onclick: (_: MouseEvent, img: Img) => modal.enlarge_image(img)
						})
					)}
				</aside>

				<section class="standard-content">
					${unsafeHTML(product.descriptionHtml)}
				</section>

			</div>
			<div class=recommendations>
				<h2>Customers also bought:</h2>
				${views.ProductRecommendation()(product.id, 3)()}
			</div>
		`
	})
	.styles(style) as View<[GqlProduct]>

