/**
 * > Promise rejection handled asynchronously (macrotask - setImmediate)
 *
 * A rejection reaction is registered, but too late.
 */
const p1 = new Promise( ( resolve, reject ) => {
	reject( 1 );
} );

setImmediate( () => p1.catch( console.warn ) );