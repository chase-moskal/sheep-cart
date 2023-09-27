
import {requirement} from "@benev/slate"

import {components} from "./frontend.js"
import {Context} from "../context/context.js"
import {SheepNav} from "./sheep-nav/element.js"
import {SheepCart} from "./sheep-cart/element.js"
import {SheepModal} from "./sheep-modal/element.js"
import {SheepSearch} from "./sheep-search/element.js"
import {SheepCatalog} from "./sheep-catalog/element.js"
import {SheepCartButton} from "./sheep-cart-button/element.js"

export const elements = requirement<Context>()(context => components(context, {
	SheepNav,
	SheepCart,
	SheepModal,
	SheepSearch,
	SheepCatalog,
	SheepCartButton,
}))

