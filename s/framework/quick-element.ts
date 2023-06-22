
import {debounce} from "@chasemoskal/magical"
import {TemplateResult, adoptStyles, html, render} from "lit"

import {LiteElement} from "./utils/lite_element.js"
import {finalize_styles} from "./utils/finalize_styles.js"
import {explode_promise} from "./utils/explode_promise.js"

export class QuickElement<S> extends HTMLElement implements LiteElement {
	#state!: S
	#root: ShadowRoot | HTMLElement
	#update_promise?: Promise<void>
	#update_promise_initial = explode_promise<void>()

	constructor() {
		super()
		this.#root = this.attachShadow({mode: "open"})
		const styles = finalize_styles((this.constructor as any).styles)
		adoptStyles(this.#root, styles)
	}

	get root() {
		return this.#root
	}

	get state(): S {
		return this.#state
	}

	set state(s: S) {
		this.#state = s
		this.update()
	}

	get updated() {
		return this.#update_promise ?? this.#update_promise_initial.promise
	}

	#render = () => {
		const root = this.#root
		const template = this.render()
		render(template, root, {host: this})
	}

	#render_debounced = debounce(0, this.#render)

	async update() {
		const promise = this.#render_debounced()

		if (!this.#update_promise)
			promise.then(this.#update_promise_initial.resolve)

		this.#update_promise = promise
		return promise
	}

	async requestUpdate() {
		await this.update()
	}

	connectedCallback() {}
	disconnectedCallback() {}

	render(): TemplateResult | void {
		return html``
	}
}

