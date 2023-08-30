
import {html} from "lit"
import {ChoiceHelper} from "../../product_focus/parts/choice_helper.js"
import {GqlImage, GqlVariant} from "shopify-shepherd"

export function render_one_dimension(
		choiceHelper: ChoiceHelper,
		set_choice: (name: string, value: string) => void,
	) {

	const {productHelper} = choiceHelper

	const select_variant = (v: GqlVariant) => {
		const [option] = v.selectedOptions
		return (event: MouseEvent) => {
			set_choice(option.name, option.value)
		}
	}

	return html`
		<div class="one-dimension">
			${productHelper.variants.map(v => {
				const img = productHelper.get_variant_image(v.id) ?? {
					altText: `${v.title} image`,
					url_tiny: "https://i.imgur.com/h1v2noQ.webp"
				}
				return html`
					<div @click=${select_variant(v)}>
						<img
							alt="${img.altText}"
							src="${img.url_tiny}"
							/>
						<p>${v.title}</p>
					</div>
				`
			})}
		</div>
	`
}
