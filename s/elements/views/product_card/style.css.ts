
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
	max-width: 25em;
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
	grid-area: price;
}

.tag {
	margin: 0.3em;
	border: 1px solid white;
	padding: 0.3em;
	border-radius: 15px;
}

button {
	border: none;
	background-color: #F6D8AE;
	color: #2E4057;
	grid-area: button;
	cursor: pointer;
	border-radius: 5px;
	width: 7.8em;
	height: 2em;
	justify-self: flex-end;
	align-self: self-end;
	margin: 0 0.2em 0.2em 0;
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

	[data-view="price"] {
		font-size: 0.75em;
	}
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

[data-view="pills"] {
	grid-area: pills;
	color: black;
	font-size: var(--tiny);
}

`

