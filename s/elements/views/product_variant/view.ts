
import {html} from "lit"

import {styles} from "./styles.css.js"
import {view} from "../../frontend.js"
import {Price} from "../price/view.js"
import {GqlProduct} from "shopify-shepherd"
import {Coolbutton} from "../coolbutton/view.js"
import {add_button} from "../coolbutton/helpers/add_button.js"
import {ChoiceHelper} from "../product_focus/parts/choice_helper.js"
import {render_variant_options} from "./parts/render_variant_options.js"

interface VariantOptions {
	product: GqlProduct
	choiceHelper: ChoiceHelper
	set_choice: (name: string, value: string) => void
}

export const ProductVariant = view({
		styles,
		views: {
			Price,
			Coolbutton,
		},
		name: "product-variant",
	}).render(({cart}) => views => _ => ({choiceHelper, product, set_choice}: VariantOptions) => {

	const {productHelper} = choiceHelper

	return html`
		<div class=grid>
			${productHelper.variants.length < 2
				? undefined
				: html`
					<div part=options class=options>
						${render_variant_options(choiceHelper, set_choice)}
					</div>
				`
			}
	
			<div part=buy class=buy>
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
})
