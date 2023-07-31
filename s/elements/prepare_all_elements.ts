
import {Pipe, flatstate_reactivity, apply_theme, requirement} from "@benev/frog"

import {Context} from "../context/context.js"
import {SheepNav} from "./sheep-nav/element.js"
import {SheepCart} from "./sheep-cart/element.js"
import {SheepModal} from "./sheep-modal/element.js"
import {SheepSearch} from "./sheep-search/element.js"
import {SheepCatalog} from "./sheep-catalog/element.js"
import {SheepCartToggler} from "./sheep-cart-toggler/element.js"

export const prepare_all_components = (context: Context) => {
	return Pipe.with({
			SheepNav,
			SheepCart,
			SheepModal,
			SheepSearch,
			SheepCatalog,
			SheepCartToggler,
		})
		.to(requirement.provide(context))
		.to(flatstate_reactivity(context.flat))
		.to(apply_theme(context.theme))
		.done()
}

