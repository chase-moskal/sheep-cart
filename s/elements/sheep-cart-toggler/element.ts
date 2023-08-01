
import {css, html} from "lit"
import {QuickElement, attributes} from "@benev/frog"
import {Context} from "../../context/context.js"

export const SheepCartToggler = (context: Context) => class extends QuickElement {

	#attrs = attributes<{open: string}>(this)

	get #dialog() {
		return this.root.querySelector("dialog")!
	}

	init() {
		this.setup(() => context.flat.auto({
			debounce: false,
			discover: false,
			collector: () => ({cart_open: context.state.cart_open}),
			responder: ({cart_open}) => {
				this.#attrs.boolean.open = cart_open
				if (cart_open)
					this.#dialog.showModal()
				else
					this.#dialog.close()
			},
		}))
	}

	#close = () => context.toggle_cart_open(false)

	#backdrop_close = (event: MouseEvent) => {
		if (event.target === this.#dialog)
			this.#close()
	}

	render() {
		return html`
			<dialog @click=${this.#backdrop_close}>
				<slot></slot>
				<div class=actions>
					<button class=close @click=${this.#close}>
						close
					</button>
				</div>
			</dialog>
		`
	}

	static styles = css`

		dialog {
			margin: auto;
			background: transparent;
			border: none;

			&::backdrop {
				background: #000a;
				backdrop-filter: blur(1em);
			}

			> .actions {
				display: flex;
				justify-content: center;
				align-items: center;

				> .close {
					padding: 0.5em 1em;
					font-size: 1.2em;
				}
			}
		}
	`
}

