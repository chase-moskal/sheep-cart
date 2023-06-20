
import {registerElements} from "@chasemoskal/magical"

import {Context} from "./components/context.js"
import {Router} from "./framework/routing/router.js"
import {prepareAllComponents} from "./components/prepare-all-components.js"

const router = new Router({
	set_hash: hash => location.hash = hash,
	on_route_change: route => console.log(route),
})

addEventListener("hashchange", () => router.update_hash(location.hash))
router.update_hash(location.hash)

;(window as any).router = router

const context = new Context(router)

registerElements(prepareAllComponents(context))

