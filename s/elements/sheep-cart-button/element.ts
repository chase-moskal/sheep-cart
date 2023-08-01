
import {css, html, svg} from "lit"
import {QuickElement} from "@benev/frog"

import {Context} from "../../context/context.js"

import icon_shopping_cart from "../../icons/feather/icon_shopping_cart.js"

export const SheepCartButton = (context: Context) => class extends QuickElement {

	render() {
		return html`
			<button
				part=button
				@click=${() => context.toggle_cart_open()}>

				${icon_shopping_cart(svg)}
			</button>
		`
	}

	static styles = css`
		button {
			padding: 1em;
			background: #eeee;
			color: #222;
			border: none;
			border-radius: 1em;
			box-shadow: 0.1em 0.1em 0.3em #0008;
		}
	`
}

