
import {debounce} from "@chasemoskal/magical"

export type Listener<S> = (s: S) => void

export class Cue<S> {
	#state: S
	#listeners = new Set<Listener<S>>()
	#promise: Promise<S>

	constructor(s: S) {
		this.#state = s
		this.#promise = Promise.resolve(s)
	}

	subscribe(listener: Listener<S>) {
		this.#listeners.add(listener)
		return () => void this.#listeners.delete(listener)
	}

	clear_all_subscriptions() {
		return this.#listeners.clear()
	}

	#invoke_listeners = debounce(0, () => {
		const state = this.#state

		for (const listener of this.#listeners)
			listener(state)

		return state
	})

	get promise() {
		return this.#promise
	}

	get state() {
		return this.#state
	}

	set state(s: S) {
		this.#state = s
		this.#promise = this.#invoke_listeners()
	}
}

