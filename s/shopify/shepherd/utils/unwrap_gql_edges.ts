
export function unwrap_gql_edges(resource: {edges: {cursor: string, node: any}[]}) {
	return resource.edges.map(e => e.node)
}

