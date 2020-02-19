/**
 * Looped Promise chain, with Timeout
 */
[ 1, 2, 3, 4, 5 ].reduce( ( chain, i ) => {
	return chain.then( () => new Promise( r => {
		window.setTimeout( () => {
			console.log( i );
			r();
		}, 1000 );
	} ) );
}, Promise.resolve() );