
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {style} from "./style.css.js"
import {img} from "../product_focus/parts/img.js"
import {Viewbase, viewbase} from "../../viewbase.js"
import {display_price} from "./parts/display_price.js"
import {prefix_parts} from "../../../tools/prefix_parts.js"
import {render_img} from "../product_focus/parts/render_img.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"
import {add_button, addbutton_states} from "../coolbutton/helpers/add_button.js"

export const ProductCard = viewbase(context => v => v
	.tag("article")
	.name("product-card")
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => html`
		<a href="${context.router.routes.product(product).url}">

			${render_img({
				part: "img",
				img: img.tiny(new ProductHelper(product).featured_image),
			})}

			<div part=plate>
				<h1 part="a title">
					${product.title}
				</h1>

				${context.views.Pills({
					part: "pills",
					exportparts: "pill-collection, pill-tag",
				})(product)}

				<div class=action>
					${add_button({
						product,
						cart: context.cart,
						allow_select: true,
						Coolbutton: context.views.Coolbutton,
						variant_id: new ProductHelper(product).first_variant.id,
					})}

					<div class=pricebox>
						${display_price({
							product,
							single_price: variant => html`
								${context.views.Price({part: "price"})(variant)}
							`,
							multiple_prices: variant => html`
								<div class=info>starts at</div>
								${context.views.Price({part: "price"})(variant)}
							`,
						})}
					</div>

				</div>
			</div>
		</a>
	`)
	.css(context.theme, style)
) as Viewbase<[GqlProduct]>

export const card_parts = `
	card,
	a,
	price,
	pill-collection,
	pill-tag,
	addbutton,
	${addbutton_states}
	${prefix_parts("card", `
		price,
		pill-collection,
		pill-tag,
		addbutton,
		img,
		plate,
		title,
	`)}
`

