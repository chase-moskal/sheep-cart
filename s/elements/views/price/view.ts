
import {html, css} from "lit"
import {flappy} from "../../flappy.js"
import {GqlPrice} from "shopify-shepherd"

export const Price = flappy("div", "price")
	.render(_ => _ => (price: GqlPrice) => {

		const [price_dollars, price_cents] = Number(price.amount).toFixed(2).split(".")

		return html`
			<span class=symbol>$</span>
			<span class=dollars>${price_dollars}</span>
			<span class=stack>
				<span class=cents>${price_cents}</span>
				<span class=currency>${price.currencyCode}</span>
			</span>
		`
	})
	.styles(css`

		:host {
			display: inline-flex;
			align-items: center;
			gap: 0.1em;
		}

		.symbol {
			font-size: 2em;
			align-self: center;
		}

		.dollars {
			font-size: 3em;
		}

		.stack {
			display: inline-flex;
			flex-direction: column;
			line-height: 1em;

			> .currency {
				opacity: 0.5;
			}
		}


	`)

