
import {debounce} from "@chasemoskal/magical"
import {CSSResultGroup, TemplateResult, adoptStyles, html, render} from "lit"

import {finalizeStyles} from "./utils/finalize-styles.js"
import {explode_promise} from "./utils/explode_promise.js"

export class QuickElement<S> extends HTMLElement {
	#state!: S
	#root: ShadowRoot | HTMLElement
	#update_promise?: Promise<void>
	#update_promise_initial = explode_promise<void>()

	static styles?: CSSResultGroup

	get state(): S {
		return this.#state
	}

	set state(s: S) {
		this.#state = s
		this.#update()
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

	#update() {
		const promise = this.#render_debounced()

		if (!this.#update_promise)
			promise.then(this.#update_promise_initial.resolve)

		this.#update_promise = promise
		return promise
	}

	constructor() {
		super()
		this.#root = this.attachShadow({mode: "open"})
		const styles = finalizeStyles((this.constructor as any).styles)
		adoptStyles(this.#root, styles)
	}

	render(): TemplateResult | void {
		return html``
	}
}

