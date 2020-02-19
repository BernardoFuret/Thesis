/**
 * > Promise all with rejection
 *
 * Neither `p1` nor `p2` resolve, thus the `race` method waits indefinitely.
 */
const p1 = new Promise( (rs, rj) => setTimeout( rs, 5000, 'p1' ) );

const p2 = new Promise( (rs, rj) => setTimeout( rj, 1000, 'p2' ) );

Promise.all( [ p1, p2 ] )
	.then( console.log.bind( console, 'resolved p1 and p2:' ) )
	.catch( console.warn.bind( console, 'promise failed' ) )
;