
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {view} from "../../frontend.js"
import {Price} from "../price/view.js"
import {Pills} from "../pills/view.js"
import {styles} from "./styles.css.js"
import {Coolbutton} from "../coolbutton/view.js"
import {img} from "../product_focus/parts/img.js"
import {Choice} from "../product_focus/parts/types.js"
import {display_price} from "./parts/display_price.js"
import {add_button} from "../coolbutton/helpers/add_button.js"
import {render_img} from "../product_focus/parts/render_img.js"
import {ChoiceHelper} from "../product_focus/parts/choice_helper.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"
import {render_options} from "../product_focus/parts/render_options.js"

export const ProductCard = view({
		styles,
		name: "product-card",
		views: {Price, Pills, Coolbutton},
	}).render(({router, cart}) => views => use => (product: GqlProduct) => {

	const state = use.state({
		show_popup: false,
		choices: [] as Choice[]
	})

	function set_show_popup(show = !state.show_popup) {
		state.show_popup = show
	}

	const productHelper = new ProductHelper(product)
	const choiceHelper = new ChoiceHelper(productHelper, state.choices)

	function set_choice(name: string, value: undefined | string) {
		state.choices = state.choices
			.filter(choice => choice.name !== name)

		if (value !== undefined)
			state.choices.push({name, value})
	}

	return html`
		<div class=card>

			${render_img({
				part: "img",
				img: img.tiny(new ProductHelper(product).featured_image),
			})}

			<div part=plate>
				<h1 part="title a" data-gpart="a" @click=${() => router.routes.product(product).go()}>
					${product.title}
				</h1>

				${views.Pills({part: "pills", gpart: "pills", props: [product]})}

				<div class=action>
					${add_button({
						set_show_popup,
						product,
						cart,
						allow_select: true,
						Coolbutton: views.Coolbutton,
						variant_id: new ProductHelper(product).first_variant.id,
					})}

					<div class=pricebox>
						${display_price({
							product,
							single_price: variant => html`
								${views.Price({part: "price singleprice", props: [variant]})}
							`,
							multiple_prices: variant => html`
								<div class=info>starts at</div>
								${views.Price({part: "price multiprice", props: [variant]})}
							`,
						})}
					</div>

					${state.show_popup
						? html`
							<div @click=${() => set_show_popup()} class=blanket></div>
							<div class=popup>
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
							</div>
						`
						: undefined}

				</div>
			</div>
		</div>
	`
})

