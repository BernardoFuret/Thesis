/**
 * A
 * Succession of requests, but we only care about the last one made.
 * The others should be ignored.
 * The CBG won't be able to understand that despite earlier requests
 * finishing later, we will only process the last one made (regardless
 * of the order of resolution).
 * 
 * Based on https://medium.com/@slavik57/async-race-conditions-in-javascript-526f6ed80665
 */
function A() {
	let last;

	function request( url, id ) {
		return fetch( url ) //> A1
			.then( data => data.json() ) //> A2
			.then( items => new Promise( //> A3
				r => setTimeout( r, Math.random() * 50000, [ items, id ] )
			) )
			.then( ( [ items, id ] ) => { //> A4
				if ( id === last ) {
					return {
						id,
						state: 'last',
						data: items.map( r => r.full_name ),
					};
				}
			} )
			.catch( error => { //> A5
				if ( id === last ) {
					return {
						state: 'last',
						error: error,
					};
				}
			} )
		;
	}


	const URL = 'https://api.github.com/users/BernardoFuret/repos';

	const logEnd = ( n ) => console.log.bind( console, 'Request', n, 'finished' );

	return new Promise( r => {
		const all = [];

		for ( let i = 0; i < 10; i += 1 ) {
			last = i;

			all.push( request( URL, i ).then( logEnd( i ) ) ); //> A6
		}

		Promise.all( all ).then( r );
	} );
}

