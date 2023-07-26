
import {css} from "lit"

export const style = css`

:host {
	display: flex;
	background-color: white;
	box-shadow: 0px 0px 10px gray;
}

header, .corner, .product-card-info {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}

.product-card-info {
	flex: 1;
}

h1 {
	font-size: var(--small);
}

.tags, h1, .price, .corner {
	padding: 0em 0.6em;
}

.price {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	font-size: var(--small);
}

.tag {
	margin: 0.3em;
	border: 1px solid white;
	padding: 0.3em;
	border-radius: 15px;
}

button {
	border: 2px solid #38f538;
	color: #38f538;
	background-color: transparent;
	cursor: pointer;
	font-size: var(--tiny);
	&:hover {
		background-color: #0080004d;
	}
}

:is(.tags, .product-card-info > div) {
	display: flex;
	margin-top: auto;
	margin-bottom: 0.3em;
	justify-content: end;
	color: black;
}

.price-text {
	font-size: var(--medium);
	color: black;
}

.option {
	font-size: 0.8em;
}

.tags, .options {
	list-style-type: none;
	font-size: var(--tiny);
}

.thumbnail {
	width: 45%;
}
`

