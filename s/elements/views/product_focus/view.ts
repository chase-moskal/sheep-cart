
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {style} from "./style.css.js"
import {viewbase} from "../../viewbase.js"
import {render_featured_image, render_side_images, render_tags_and_collections} from "./parts/sketch.js"

export const ProductFocus = viewbase(context => v => v
	.tag("article")
	.name("product-focus")
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => html`
		<div class=grid>
			<figure>
				${render_featured_image(product)}
			</figure>

			<h1>${product.title}</h1>

			<ul>
				${render_tags_and_collections(
					product,
					context.state.collections,
				)}
			</ul>

			<div class=options>options</div>

			<div class=price>price</div>

			<button>button</button>

			<aside>
				${render_side_images(product)}
			</aside>

			<section class="standard-content">
				${unsafeHTML(product.descriptionHtml)}
			</section>
		</div>
	`)
	.css(context.theme, style)
)

