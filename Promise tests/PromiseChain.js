/**
 * async/await vs chain tests.
 * passing values down iterative chain
 */


function* g( s, f ) {
	while ( s < f ) {
		yield s += 1;
	}
}

function checkValue( v ) {
	return Promise[ Math.random() > 0.5 ? 'resolve' : 'reject' ]( v )
		.then( isV => console.log( 'checkValue succ', isV ) || isV )
		.catch( isV => console.warn( 'checkValue err', isV ) || isV )
	;
}

function withChain() {
	const START = 1;

	let chain = Promise.resolve( START );

	for ( const i of g( START, 10 ) ) {
		chain = chain.then( function( v ) {
			return new Promise( function( resolve ) {
				checkValue( v ).finally( () => resolve( i ) );
			} );
		} );

		chain = chain.then( function( res ) {
			return new Promise( resolve => {
				window.setTimeout( function() {
					resolve( res );
				}, 1000 );
			} );
		} )
	}

	chain.then( function( res ) {
		console.log( 'end', res );
	} );
}

async function withAsyncAwait() {
	const sleep = () => new Promise( r => window.setTimeout( r, 1000 ) );
	
	let res = 0;

	for ( const i of g( 0, 10 ) ) {
		try {
			res = await checkValue( i );
		} catch ( err ) {
			console.error( err );
		}

		await sleep();
	}

	console.log( 'end', res );
}

// NOTE: Not equivalent