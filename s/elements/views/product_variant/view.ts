
import {html} from "lit"
import {ShaleView} from "@benev/slate"
import {GqlProduct, GqlVariant} from "shopify-shepherd"

import {styles} from "./styles.css.js"
import {Price} from "../price/view.js"
import {view, views} from "../../frontend.js"
import {Coolbutton} from "../coolbutton/view.js"
import {VariantGridSituation} from "./parts/types.js"
import {add_button} from "../coolbutton/helpers/add_button.js"
import {ChoiceHelper} from "../product_focus/parts/choice_helper.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"
import {render_1d_variant_selector} from "./parts/render_1d_variant_selector.js"
import {render_2d_variant_selector} from "./parts/render_2d_variant_selector.js"
import {render_variant_selector_dropdowns} from "./parts/render_variant_selector_dropdowns.js"
import {ascertain_variant_situation_for_product} from "./parts/ascertain_variant_situation_for_product.js"

interface VariantOptions {
	product: GqlProduct
	on_variant_change: (variant: GqlVariant) => void
}

export const ProductVariant = (product: GqlProduct) => view(context => class extends ShaleView {
	static name = "product-variant"
	static styles = styles

	get product_helper() {
		return new ProductHelper(product)
	}

	#state = context.flat.state<ReturnType<typeof ascertain_variant_situation_for_product>>(
		ascertain_variant_situation_for_product(product, this.product_helper)
	)

	#views = views(context, {
		Price,
		Coolbutton,
	})

	render({product, on_variant_change}: VariantOptions) {
		const {cart} = context
		const {product_helper} = this

		if (!this.#state.situation) {
			return undefined
		}

		const selected_variant = (() => {
			let variant = product_helper.first_variant
			if (this.#state.situation.kind === "n-dimensional") {
				const choice_helper = new ChoiceHelper(product_helper, this.#state.situation.choices)
				variant = choice_helper.selected_variant
			}
			else {
				variant = this.#state.situation.variant
			}
			return variant
		})()

		const render_variant_selector = () => {
			switch (this.#state.situation!.kind) {

				case "1-dimensional": {
					const set_variant = (variant: GqlVariant) => {
						this.#state.situation = {
							...this.#state.situation, variant
						} as VariantGridSituation.OneDimensional
	
						on_variant_change(variant)
					}
					return render_1d_variant_selector({
						cart,
						set_variant,
						product_helper,
						selected_variant,
					})
				}

				case "2-dimensional": {
					const set_variant = (variant: GqlVariant) => {
						this.#state.situation = {
							...this.#state.situation, variant
						} as VariantGridSituation.TwoDimensional

						on_variant_change(variant)
					}
					return render_2d_variant_selector({
						cart,
						set_variant,
						product_helper,
						selected_variant,
					})
				}

				case "n-dimensional": {
					const set_choices = (name: string, value: string) => {
						const situation = this.#state.situation as VariantGridSituation.NDimensional
						const choices = situation.choices
							.filter(choice => choice.name !== name)

						if (value !== undefined)
							choices.push({name, value})

						this.#state.situation = {
							...this.#state.situation, choices
						} as VariantGridSituation.NDimensional

						const choice_helper = new ChoiceHelper(
							product_helper, this.#state.situation.choices
						)

						on_variant_change(choice_helper.selected_variant)
					}
					return render_variant_selector_dropdowns({
						cart,
						set_choices,
						product_helper,
						choices: this.#state.situation!.choices,
					})
				}
			}
		}

		const has_options = product_helper.variants.length > 1
		return html`
			${has_options
					? html`
						<div part=options class=options>
							${render_variant_selector()}
						</div>
					`
					: undefined
			}

			<div part=buy class=buy>
				${this.#views.Price({class: "price", props: [selected_variant]})}
				${add_button({
					Coolbutton: this.#views.Coolbutton,
					cart,
					product,
					variant_id: selected_variant.id,
					allow_select: false,
				})}
			</div>
		`
	}
})
