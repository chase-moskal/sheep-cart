
export type PagingDetails = {
	after?: string
}

export type PageInfo = {
	endCursor: string
	hasNextPage: boolean
}

export type GqlEdges<N> = {
	cursor: string
	node: N
}

export type Fetcher<N> = ({}: PagingDetails) => Promise<{
	edges: GqlEdges<N>[]
	pageInfo: PageInfo
}>

