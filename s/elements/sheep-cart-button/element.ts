
import {html, svg} from "lit"
import {css} from "@chasemoskal/magical"
import {QuickElement} from "@benev/frog"

import {Context} from "../../context/context.js"

import icon_shopping_cart from "../../icons/feather/icon_shopping_cart.js"

export const SheepCartButton = (context: Context) => class extends QuickElement {

	render() {
		const {units} = context.cart
		return html`
			<button
				part=button
				@click=${() => context.toggle_cart_open()}>

				${icon_shopping_cart(svg)}

				<div class=count ?hidden=${units.length === 0}>
					${units.length}
				</div>
			</button>
		`
	}

	static styles = css`
		button {
			position: relative;
			padding: 1em;
			background: #eeee;
			color: #222;
			border: none;
			border-radius: 1em;
			box-shadow: 0.1em 0.1em 0.3em #0008;
			cursor: pointer;
		}

		.count {
			position: absolute;
			top: -0.5em;
			right: -0.5em;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 1.5em;
			height: 1.5em;
			border-radius: 1em;
			background: red;
			font-family: sans-serif;
			font-weight: bold;
			color: white;
			text-shadow: 0.1em 0.1em 0.1em #0008;
			&[hidden] { display: none; }
		}
	`
}

