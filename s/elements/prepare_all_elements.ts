
import {Pipe, flatstate_reactivity, apply_theme, requirement} from "@benev/frog"

import {Context} from "../context/context.js"
import {SheepCart} from "./sheep-cart/element.js"
import {SheepSearch} from "./sheep-search/element.js"
import {SheepCatalog} from "./sheep-catalog/element.js"

export const prepare_all_components = (context: Context) => {
	return Pipe.with({
			SheepCart,
			SheepSearch,
			SheepCatalog,
		})
		.to(requirement.provide(context))
		.to(flatstate_reactivity(context.flat))
		.to(apply_theme(context.theme))
		.done()
}

