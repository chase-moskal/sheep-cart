
import {register_to_dom} from "@benev/frog"
import {install_sheep_cart} from "./setup/install.js"

const {elements, load} = install_sheep_cart({
	domain: "dev-bakery.myshopify.com",
	storefront_access_token: "5f636be6b04aeb2a7b96fe9306386f25",
})

register_to_dom(elements)

await load()

console.log("🐑")

