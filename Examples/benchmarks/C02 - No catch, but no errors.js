/**
 * Increments 1 to 2 and then logs.
 */
const logValue = console.log.bind( console, "Value should be 2:" ); //> D2

const increment = v => v + 1; //> D3

const p1 = new Promise( ( resolve, reject ) => { //> D1
	resolve( 1 );
} );

const p2 = p1.then( increment );

const p3 = p2.then( logValue );

/// D1 => D2 => D3 