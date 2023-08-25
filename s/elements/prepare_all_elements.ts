
import {RequirementGroupProvided, Pipe, flatstate_reactivity, apply_theme, requirement} from "@benev/frog"

import {Context} from "../context/context.js"
import {SheepNav} from "./sheep-nav/element.js"
import {SheepCart} from "./sheep-cart/element.js"
import {SheepModal} from "./sheep-modal/element.js"
import {SheepSearch} from "./sheep-search/element.js"
import {SheepCatalog} from "./sheep-catalog/element.js"
import {SheepCartModal} from "./sheep-cart-modal/element.js"
import {SheepCartButton} from "./sheep-cart-button/element.js"

const elements = {
	SheepNav,
	SheepCart,
	SheepModal,
	SheepSearch,
	SheepCatalog,
	SheepCartModal,
	SheepCartButton,
}

export const prepare_all_elements = (context: Context) => {
	return Pipe.with(elements)
		.to(requirement.provide(context))
		.to(flatstate_reactivity(context.flat))
		.to(apply_theme(context.theme))
		.done() as RequirementGroupProvided<typeof elements>
}

