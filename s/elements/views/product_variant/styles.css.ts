
import {css} from "@chasemoskal/magical"

export const styles = css`

:host {
	display: block;
}
.grid {
	> .options {
			font-size: 1.2em;
			justify-self: end;
	
			display: flex;
			flex-direction: column;
			align-items: end;
			gap: 1em;
			padding: 1em;
	
			& select {
				padding: 0.5em;
				margin-left: 1em;
			}
		}
	
		.buy {
			display: flex;
			justify-content: end;
			font-size: 1em;
			gap: 1rem;
	
			> .price {
				flex: 1;
				display: flex;
				justify-content: center;
			}
	
			> [view="coolbutton"] {
				flex: 2;
				&::part(button) {
					padding: 1em;
				}
			}
		}
}



`
