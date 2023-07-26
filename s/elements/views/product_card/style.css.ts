
import {css} from "lit"

export const style = css`

:host {
	display: grid;
	gap: 0.3em;
	background-color: white;
	box-shadow: 0px 0px 10px gray;
	grid:
		"image title title"
		"image pills pills"
		"image info options"
		"image price button";
	grid-template-columns: repeat(3, minmax(1em, 1fr));
}


.corner, .product-card-info {
	gap: 0.5em;
}

h1 {
	grid-area: title;
	font-size: var(--small);
}

.price-info {
	grid-area: info;
	color: black;
}

.price {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	font-size: var(--small);
	grid-area: price;
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
	grid-area: button;
	cursor: pointer;
	font-size: var(--tiny);
	&:hover {
		background-color: #0080004d;
	}
}

:is(.tags, .product-card-info > div) {
	margin-top: auto;
	margin-bottom: 0.3em;
	justify-content: end;
	color: black;
}

.price {
	font-size: var(--medium);
	color: black;
}

.option {
	font-size: 0.8em;
	color: black;
}

.options {
	list-style-type: none;
	grid-area: options;
	font-size: var(--tiny);
}

.thumbnail {
	width: 100%;
	grid-area: image;
	height: 100%;
	object-fit: cover;
}

div[data-name="pills"] {
	grid-area: pills;
	color: black;
	font-size: var(--tiny);
}
`

