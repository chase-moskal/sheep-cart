
import {CSSResultGroup} from "lit"
import {LiteElementClass} from "../utils/lite-element.js"

export function mixinCss(...newStyles: (undefined | CSSResultGroup)[]) {
	return function<C extends LiteElementClass>(Base: C): C {
		return class extends Base {
			static styles = combineStyles(
				Base.styles,
				newStyles,
			)
		}
	}
}

function arrayize<T>(item: T | T[]) {
	return <T[]>[item].flat().filter(i => !!i)
}

const notUndefined = (x: any) => x !== undefined

function combineStyles(
		parentStyles: CSSResultGroup | undefined,
		newStyles: (undefined | CSSResultGroup)[]
	) {
	const styles = [
		...(arrayize(parentStyles) ?? []),
		...arrayize(newStyles),
	]
	return styles
		.flat()
		.filter(notUndefined)
}

