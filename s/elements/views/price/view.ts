
import {html} from "lit"

import {style} from "./style.css.js"
import {flappy} from "../../flappy.js"
import {VariantPricing} from "./parts/types.js"
import {parse_money} from "./parts/parse_money.js"
import {render_sale_tag} from "./parts/render_sale_tag.js"
import {render_money_value} from "./parts/render_money_value.js"

export const Price = flappy("div", "price")
	.render(_ => _ => (variant: VariantPricing) => {
		const {value, comparison} = parse_money(variant)

		return html`
			<div class=pricetag ?data-sale=${!!comparison}>
				${comparison
					? render_sale_tag(value, comparison)
					: undefined}
				${render_money_value(value)}
			</div>

			${comparison
				? html`
					<div class=comparetag>
						${render_money_value(comparison)}
					</div>
				`
				: undefined}
		`
	})
	.styles(style)

