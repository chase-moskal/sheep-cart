
import {html} from "lit"
import {clone} from "@benev/frog"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {img} from "./parts/img.js"
import {style} from "./style.css.js"
import {flappy} from "../../flappy.js"
import {Choice} from "./parts/types.js"
import {Viewbase} from "../../viewbase.js"
import {render_img} from "./parts/render_img.js"
import {ChoiceHelper} from "./parts/choice_helper.js"
import {ProductHelper} from "./parts/product_helper.js"
import {render_options} from "./parts/render_options.js"
import { add_to_cart_button } from "../coolbutton/helpers/add_to_cart_button.js"

export const ProductFocus = flappy("article", "product-focus")
	.render(context => use => (product: GqlProduct) => {
		const {views} = context

		const state = use.state({
			choices: [] as Choice[],
		})

		const productHelper = new ProductHelper(product)
		const choiceHelper = new ChoiceHelper(productHelper, state.choices)

		function set_choice(name: string, value: undefined | string) {
			state.choices = state.choices
				.filter(choice => choice.name !== name)

			if (value !== undefined) {
				state.choices.push({name, value})
			}
		}

		return html`
			<div
				class=grid
				?data-no-additional-images=${productHelper.images.length < 2}
				?data-no-options=${productHelper.variants.length < 2}>

				<figure>
					${render_img(img.large(choiceHelper.chosen_image))}
				</figure>

				<h1>${product.title}</h1>

				${views.Pills({class: "pills"})(product)}

				<div class=options>
					${render_options(choiceHelper, set_choice)}
				</div>

				<div class=buy>
					${views.Price({class: "price"})(
						choiceHelper.selected_variant.price
					)}
					${views.Coolbutton()(
						add_to_cart_button(
							context.cart,
							choiceHelper.selected_variant.id,
							product,
						)
					)}
				</div>

				<aside>
					${choiceHelper.side_images.map(image => render_img(img.large(image)))}
				</aside>

				<section class="standard-content">
					${unsafeHTML(product.descriptionHtml)}
				</section>

			</div>
			<h2>Product recommendations:</h2>
			${views.ProductRecommendation({exportparts: "title, price, plate, card"})(product.id, 3)}
		`
	})
	.styles(style) as Viewbase<[GqlProduct]>

