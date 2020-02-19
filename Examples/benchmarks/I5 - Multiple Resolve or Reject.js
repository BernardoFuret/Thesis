/**
 * > Multiple Resolve or Reject
 *
 * Only the first will be called.
 */
const p = new Promise( ( resolve, reject ) => {
	resolve( 1 );
	reject( 0 );
} )
	.then( console.log )
	.catch( console.warn )
;