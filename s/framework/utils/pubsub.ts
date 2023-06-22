
type Listener<X> = (x: X) => void

export class Pubsub<X> {
	#listeners = new Set<Listener<X>>()

	sub(listener: Listener<X>) {
		this.#listeners.add(listener)
		return () => void this.#listeners.delete(listener)
	}

	pub(x: X) {
		for (const listener of this.#listeners)
			listener(x)
	}

	clear() {
		this.#listeners.clear()
	}
}

