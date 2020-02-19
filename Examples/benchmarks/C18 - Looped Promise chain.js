/**
 * Looped Promise chain
 */
[ 1, 2, 3, 4, 5 ].reduce( ( chain, i ) => {
	return chain.then( () => console.log( i ) );
}, Promise.resolve() );