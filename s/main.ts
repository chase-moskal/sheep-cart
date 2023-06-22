
import {registerElements} from "@chasemoskal/magical"

import {Context} from "./components/context.js"
import {Router} from "./framework/routing/router.js"
import {prepare_all_components} from "./components/prepare_all_components.js"

const router = new Router({
	prefix: "",
	set_hash: hash => location.hash = hash,
})

router.apply_hash(location.hash)
addEventListener("hashchange", router.hashchange)

;(window as any).router = router

const context = new Context(router)

registerElements(prepare_all_components(context))

