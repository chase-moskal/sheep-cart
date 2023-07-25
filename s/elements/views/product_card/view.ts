
import {html} from "lit"
import {flatview} from "@benev/frog"
import {GqlProduct} from "shopify-shepherd"

import {style} from "./style.css.js"
import {Context} from "../../../context/context.js"
import {display_price} from "./parts/display_price.js"
import {featured_thumbnail} from "./parts/featured_thumbnail.js"
import {number_of_variants} from "./parts/number_of_variants.js"

export const ProductCard = (context: Context) => flatview(context.flat)
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => html`

		<img alt="" src="${featured_thumbnail(product)}"/>

		<div>
			<p>
				<a href="${context.router.routes.product(product).url}">
					${product.title}
				</a>
			</p>

			<ul>${product.tags.map(tag => html`<li>${tag}</li>`)}</ul>

			<p>variants: ${number_of_variants(product)}</p>

			${display_price({
				product,
				single_price: price => html`
					${price}
				`,
				multiple_prices: price => html`
					starts at ${price}
				`,
			})}

			<button>ADD TO CART</button>
		</div>
	`)
	.css(context.theme, style)

