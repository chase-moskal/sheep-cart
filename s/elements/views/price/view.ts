
import {html, svg} from "lit"

import {style} from "./style.css.js"
import {flappy} from "../../flappy.js"
import {VariantPricing} from "./parts/types.js"
import {parse_money} from "./parts/parse_money.js"
import {render_sale_tag} from "./parts/render_sale_tag.js"
import {render_money_value} from "./parts/render_money_value.js"
import iconstretchy_x from "../../../icons/feather/iconstretchy_x.js"

export const Price = flappy("div", "price")
	.render(_ => _ => (variant: VariantPricing) => {
		const {value, comparison} = parse_money(variant)

		return html`
			${comparison
				? render_sale_tag(value, comparison)
				: undefined}

			<div class=coolstack>
				<div class="pricetag" ?data-sale=${!!comparison}>
					${render_money_value(value)}
				</div>

				${comparison
					? html`
						<div class="pricetag comparison">
							${render_money_value(comparison)}
							${iconstretchy_x(svg)}
							<div part=slash></div>
						</div>
					`
					: undefined}
			</div>
		`
	})
	.styles(style)

