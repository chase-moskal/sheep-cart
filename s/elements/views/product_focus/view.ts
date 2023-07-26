
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {style} from "./style.css.js"
import {viewbase} from "../../viewbase.js"
import {Choice, get_primary_img, get_selected_variant, render_featured_image, render_image_for_variant, render_img, render_options, render_side_images, render_tags_and_collections} from "./parts/sketch.js"

export const ProductFocus = viewbase(context => v => v
	.tag("article")
	.name("product-focus")
	.state({
		choices: [] as Choice[],
	})
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
		<div class=grid>

			<figure>
				${render_img(get_primary_img(product, state.choices))}
			</figure>

			<h1>${product.title}</h1>

			<ul>
				${render_tags_and_collections(
					product,
					context.state.collections,
				)}
			</ul>

			${product.variants.edges.length > 1
				? html`
					<div class=options>
						${render_options(product, state.choices, actions.set_choice)}
					</div>
				`
				: undefined}

			<div class=price>price</div>

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
)

