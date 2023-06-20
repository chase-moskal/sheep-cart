
import {obtool} from "@chasemoskal/magical"
import {LiteElementClass} from "./lite-element.js"

type ElementFuncs<C> = {[key: string]: (context: C) => LiteElementClass}

export function passContextToElements<C, E extends ElementFuncs<C>>(
		context: C,
		elements: E,
	) {

	return obtool(elements).map(
		fun => fun(context)
	) as {[P in keyof E]: ReturnType<E[P]>}
}

