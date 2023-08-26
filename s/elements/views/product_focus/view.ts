
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {img} from "./parts/img.js"
import {view} from "../../frontend.js"
import {Pills} from "../pills/view.js"
import {Price} from "../price/view.js"
import {styles} from "./styles.css.js"
import {Choice, Img} from "./parts/types.js"
import {Coolbutton} from "../coolbutton/view.js"
import {render_img} from "./parts/render_img.js"
import {ChoiceHelper} from "./parts/choice_helper.js"
import {ProductHelper} from "./parts/product_helper.js"
import {render_options} from "./parts/render_options.js"
import {add_button} from "../coolbutton/helpers/add_button.js"
import {ProductRecommendation} from "../product_recommendation/view.js"

export const ProductFocus = view({
		styles,
		name: "product-focus",
		views: {
			Pills,
			Price,
			Coolbutton,
			ProductRecommendation,
		},
	}).render(({cart, modal}) => views => use => (product: GqlProduct) => {

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
					onclick: (_: MouseEvent, img: Img) =>
						modal.toggle_modal_open(
							true,
							html`
								<img
								alt="${img.alt}"
								src="${img.src}"
								@click=${() => modal.toggle_modal_open()}
								/>
							`
						)
				})}
			</figure>

			<h1>${product.title}</h1>

			${views.Pills({class: "pills", gpart: "pills", props: [product]})}

			<div class=options>
				${render_options(choiceHelper, set_choice)}
			</div>

			<div class=buy>
				${views.Price({class: "price", props: [choiceHelper.selected_variant]})}
				${add_button({
					Coolbutton: views.Coolbutton,
					cart,
					product,
					variant_id: choiceHelper.selected_variant.id,
					allow_select: false,
				})}
			</div>

			<aside class=aside>
				${choiceHelper.side_images.map(image =>
					render_img({
						part: "img",
						img: img.large(image),
						onclick: (_: MouseEvent, img: Img) =>
							modal.toggle_modal_open(
								true,
								html`
									<img
										alt="${img.alt}"
										src="${img.src}"
										@click=${() => modal.toggle_modal_open()}
									/>
								`
							)
					})
				)}
			</aside>

			<section class="standard-content">
				${unsafeHTML(product.descriptionHtml)}
			</section>

		</div>
		<div class=recommendations>
			<h2>Customers also bought:</h2>
			${views.ProductRecommendation({props: [product.id, 3]})}
		</div>
	`
})

