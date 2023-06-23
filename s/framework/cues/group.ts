
import {Cue} from "./cue.js"
import {debounce} from "@chasemoskal/magical"

export class CueGroup {
	#cues = new Set<Cue<any>>()

	create<S>(s: S) {
		const cue = new Cue(s)
		this.#cues.add(cue)
		return cue
	}

	track(reader: () => any, actor: () => any) {
		const cues_that_were_accessed: Cue<any>[] = []
		const actuate = debounce(0, actor)

		for (const cue of this.#cues) {
			cue.accessed = false
			reader()
			if (cue.accessed)
				cues_that_were_accessed.push(cue)
		}

		const unsubscribe_functions = cues_that_were_accessed
			.map(cue => cue.subscribe(() => actuate()))

		return () => unsubscribe_functions
			.forEach(unsub => unsub())
	}
}

