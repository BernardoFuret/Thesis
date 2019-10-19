function execWithOnlyLast() {
	const requests = [];

	let callCount = 0;

	function request( url, n ) {
		const thisCallCount = callCount++;
		requests[ thisCallCount ] = n;

		return fetch( url )
			.then( data => data.json() )
			.then( items => new Promise( r => setTimeout( r, Math.random() * 10000, items ) ) )
			.then( items => {
				if ( requests[ n ] !== requests[ requests.length - 1 ] ) {
					console.log( requests[ thisCallCount ], requests[ requests.length - 1] )
					return;
				}

				return {
					state: 'last',
					data: items.map( r => r.full_name ),
				};
			} )
			.catch( error =>{
				if ( requests[ thisCallCount ] !== requests[ requests.length - 1 ] ) {
					return;
				}

				return {
					state: 'last',
					error: error,
				};
			} )
		;
	}


	const URL = 'https://api.github.com/users/BernardoFuret/repos';

	const logEnd = ( n ) => console.log.bind( console, 'Request', n, 'finished' );

	return new Promise( r => {
		const all = [];

		for ( let i = 0; i < 10; i += 1 ) {
			all.push( request( URL, i ).then( logEnd( i ) ) );
		}

		Promise.all( all ).then( r.bind( Promise, requests ) );
	} );
}

