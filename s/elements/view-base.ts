
import {Context} from "../context/context.js"
import {Flatview, flatview} from "@benev/frog"

export type View<P extends any[]> = (context: Context) => Flatview<P>

export function view<P extends any[]>(
		tag: string,
		name: string,
		fun: (context: Context) => (v: ReturnType<typeof flatview>) => Flatview<P>,
	): View<P> {

	return (context: Context) => fun(context)(flatview(context.flat, {tag, name}))
}

