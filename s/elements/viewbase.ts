
import {Context} from "../context/context.js"
import {Flatview, ShadowableTag, flatview} from "@benev/frog"

export type Viewbase<P extends any[]> = (context: Context) => Flatview<P>

export type V = {
	tag(tag: ShadowableTag): {
		name(name: string): ReturnType<typeof flatview>
	}
}

export function viewbase<P extends any[]>(
		fun: (context: Context) => (v: V) => Flatview<P>
	): Viewbase<P> {

	return (context: Context) => fun(context)({
		tag: tag => ({
			name: name => flatview(context.flat, {tag, name})
		})
	})
}

