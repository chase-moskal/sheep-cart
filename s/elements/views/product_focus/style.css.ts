
import {css} from "lit"

export const style = css`

:host {
	display: block;
	container-type: inline-size;
}

.grid {
	display: grid;
	gap: 1em;
	grid:
		"feature feature feature .       .       .      "
		"feature feature feature heading heading heading"
		"feature feature feature tags    tags    tags   "
		"feature feature feature options options options"
		"feature feature feature price   price   button "
		"feature feature feature .       .       .      "
		"side    side    essay   essay   essay   essay  ";
	grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
	align-items: start;
}

@container (width < 30em) {
	.grid {
		grid:
			"feature feature"
			"heading heading"
			"tags    tags   "
			"options options"
			"price   button "
			"essay   essay  "
			"side    side   "
			/ 1fr    1fr;
		grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
	}
}

.grid {
	> figure { grid-area: feature; }
	> h1 { grid-area: heading; }
	> .pills { grid-area: tags; }
	> .options { grid-area: options; }
	> .price { grid-area: price; }
	> button { grid-area: button; }
	> aside { grid-area: side; }
	> section { grid-area: essay; }

	> figure {
		background: #fff2;
		width: 100%;
		height: 100%;
		> img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	> .pills {
		font-size: var(--small);
	}

	> .options {
		justify-self: flex-end;
	}

	> aside {
		display: flex;
		flex-wrap: wrap;
		container-type: inline-size;

		> img {
			display: block;
			width: 50cqi;
			height: 50cqi;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

	&[data-no-side] {
		> aside {
			display: none;
		}
		> section {
			grid-area: side / side / essay / essay;
		}
	}

}

`

