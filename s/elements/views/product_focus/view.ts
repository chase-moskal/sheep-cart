
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {style} from "./style.css.js"
import {Viewbase, viewbase} from "../../viewbase.js"
import {Choice, get_primary_img, render_img, render_options, render_side_images, number_of_images, number_of_variants} from "./parts/sketch.js"

export const ProductFocus = viewbase(context => v => v
	.tag("article")
	.name("product-focus")
	.state({choices: [] as Choice[]})
	.actions(state => ({

		set_choice(name: string, value: undefined | string) {
			state.choices = state.choices
				.filter(choice => choice.name !== name)
			if (value !== undefined) {
				state.choices.push({
					name,
					value,
				})
			}
		},

	}))
	.setup()
	.render(({state, actions}) => (product: GqlProduct) => html`
		<div
			class=grid
			?data-no-additional-images=${number_of_images(product) < 2}
			?data-no-options=${number_of_variants(product) < 2}>

			<figure>
				${render_img(get_primary_img(product, state.choices))}
			</figure>

			<h1>${product.title}</h1>

			${context.views.Pills({class: "pills"})(product)}

			<div class=options>
				${render_options(product, state.choices, actions.set_choice)}
			</div>

			<div class=price>${context.views.Price()(product.variants.edges[0].node.price)}</div>

			<button>button</button>

			<aside>
				${render_side_images(product, state.choices)}
			</aside>

			<section class="standard-content">
				${unsafeHTML(product.descriptionHtml)}
			</section>

		</div>
	`)
	.css(context.theme, style)
) as Viewbase<[GqlProduct]>

