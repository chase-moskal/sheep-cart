
import {html, svg} from "lit"
import {QuickElement, attributes} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"

import icon_x_circle from "../../icons/feather/icon_x_circle.js"

export const SheepModal = (context: Context) => class extends QuickElement {
	static styles = style

	#attrs = attributes<{open: string}>(this)

	get #dialog() {
		return this.root.querySelector("dialog")!
	}

	init() {
		this.setup(() => context.flat.auto({
			debounce: false,
			discover: false,
			collector: () => ({modal_open: context.modal.state.open}),
			responder: ({modal_open}) => {
				this.#attrs.boolean.open = modal_open
				if (modal_open)
					this.#dialog.showModal()
				else
					this.#dialog.close()
			},
		}))
	}

	#close = () => context.modal.toggle_modal_open(false)

	#backdrop_close = (event: MouseEvent) => {
		if (event.target === this.#dialog)
			this.#close()
	}

	render() {
		return html`
			<dialog
				@click=${this.#backdrop_close}
				@close=${this.#close}
				>

				<div class=actions>
					<button class=close @click=${this.#close}>
						${icon_x_circle(svg)}
					</button>
				</div>

				<div class=contents>
					${context.modal.state.content}
				</div>

			</dialog>
		`
	}
}
