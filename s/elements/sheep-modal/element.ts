
import {TemplateResult, html, render, svg} from "lit"
import {QuickElement} from "@benev/frog"

import icon_x_circle from "../../icons/feather/icon_x_circle.js"

import {styles} from "./styles.css.js"
import {component} from "../frontend.js"
import {ModalSpec} from "../../modaling/spec.js"

type ModalDetails = {
	content: TemplateResult
	on_backdrop_click: () => void
}

export const SheepModal = component(({modal}) => class extends QuickElement {
	static styles = styles

	#modal_dressing(id: string, content: TemplateResult) {
		return html`
			<div class=actions>
				<button class=close @click=${() => this.close(id)}>
					${icon_x_circle(svg)}
				</button>
			</div>
			<div class=contents>
				${content}
			</div>
		`
	}

	#distinguish_modal_details(
			id: string,
			modal: ModalSpec.Whatever,
		): ModalDetails {

		switch (modal.kind) {

			case "image": {
				const {img: {src, alt}} = modal
				return {
					on_backdrop_click: () => this.close(id),
					content: html`
						<img part=img src="${src}" alt="${alt}"/>
					`,
				}
			}

			case "cart": {
				return {
					on_backdrop_click: () => this.close(id),
					content: html`
						<sheep-cart part=cart></sheep-cart>
					`,
				}
			}
		}
	}

	#open({id, modal}: {id: string, modal: ModalSpec.Whatever}) {
		const dialog = document.createElement("dialog")
		dialog.setAttribute("data-id", id)

		const {content, on_backdrop_click} = (
			this.#distinguish_modal_details(id, modal)
		)

		dialog.onclick = event => {
			if (event.target === dialog)
				on_backdrop_click()
		}

		render(this.#modal_dressing(id, content), dialog)

		this.root.appendChild(dialog)
		dialog.showModal()
	}

	close(id: string) {
		const dialog = this
			.root
			.querySelector<HTMLDialogElement>(`[data-id="${id}"]`)

		if (dialog) {
			dialog.close()
			dialog.remove()
		}
	}

	init() {
		modal.on.open(o => this.#open(o))
	}
})

