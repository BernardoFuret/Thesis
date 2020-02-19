/**
 * > Promise rejection handled asynchronously (macrotask - setTimeout)
 *
 * A rejection reaction is registered, but too late.
 */
const p1 = new Promise( ( resolve, reject ) => {
	reject( 1 );
} );

setTimeout( () => p1.catch( console.warn ), 1000 );