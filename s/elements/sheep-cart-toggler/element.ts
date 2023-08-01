
import {css, html} from "lit"
import {QuickElement} from "@benev/frog"
import {Context} from "../../context/context.js"

export const SheepCartToggler = (context: Context) => class extends QuickElement {

	render() {
		const close = () => context.toggle_cart_open(false)
		return html`
			${context.state.cart_open
				? html`

					<div class=backdrop @click=${close}></div>

					<slot
						@click=${(event: MouseEvent) => {
							const target = event.target as HTMLElement
							if (target.tagName.toLowerCase() === "slot")
								close()
						}}>
					</slot>
				`
				: undefined}
		`
	}

	static styles = css`

		.backdrop {
			position: fixed;
			z-index: 1;
			inset: 0;
			background: #2228;
			backdrop-filter: blur(1em);
		}

		slot {
			display: block;
			position: absolute;
			z-index: 2;
			inset: 0;
			top: 0;
			margin-top: 1em;
		}
	`
}

