
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {style} from "./style.css.js"
import {flappy} from "../../flappy.js"
import {Viewbase} from "../../viewbase.js"
import {Choice, get_primary_img, render_img, render_options, render_side_images, number_of_images, number_of_variants} from "./parts/sketch.js"

export const ProductFocus = flappy("article", "product-focus")
	.render(context => use => (product: GqlProduct) => {

		const state = use.state({
			choices: [] as Choice[],
		})

		function set_choice(name: string, value: undefined | string) {
			state.choices = state.choices
				.filter(choice => choice.name !== name)
			if (value !== undefined) {
				state.choices.push({
					name,
					value,
				})
			}
		}

		return html`
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
					${render_options(product, state.choices, set_choice)}
				</div>

				<div class=buy>
					${context.views.Price({class: "price"})(product.variants.edges[0].node.price)}
					<button>Add to Cart</button>
				</div>

				<aside>
					${render_side_images(product, state.choices)}
				</aside>

				<section class="standard-content">
					${unsafeHTML(product.descriptionHtml)}
				</section>

			</div>
		`
	})
	.styles(style) as Viewbase<[GqlProduct]>

