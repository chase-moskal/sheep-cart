
import {debounce} from "@chasemoskal/magical"
import {finalizeStyles} from "./utils/finalize-styles.js"
import {CSSResultGroup, TemplateResult, adoptStyles, html, render} from "lit"

export class QuickElement<S> extends HTMLElement {
	#root: ShadowRoot | HTMLElement
	#state: S | undefined
	#update_promise: Promise<void>

	static styles?: CSSResultGroup

	get state(): S | undefined {
		return this.#state
	}

	set state(s: S) {
		this.#state = s
		this.#update()
	}

	get updated() {
		return this.#update_promise
	}

	#render = () => {
		const {state} = this
		const root = this.#root
		const template = this.render(state)
		render(template, root, {host: this})
	}

	#render_debounced = debounce(0, this.#render)

	#update() {
		const promise = this.#render_debounced()
		this.#update_promise = promise
		return promise
	}

	constructor() {
		super()
		this.#root = this.attachShadow({mode: "open"})
		this.#update_promise = this.#update()

		const styles = finalizeStyles((this.constructor as any).styles)
		adoptStyles(this.#root, styles)
	}

	render(state: S | undefined): TemplateResult | void {
		void state
		return html``
	}
}

