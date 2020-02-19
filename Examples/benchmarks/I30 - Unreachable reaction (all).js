/**
 * > Unreachable reaction (all)
 *
 * `p1` never resolves, thus the `all` method waits indefinitely.
 */
const p1 = new Promise( r => console.log( 'p1 never resolves' ) );

const p2 = Promise.resolve( 2 );

Promise.all( [ p1, p2 ] )
	.then( console.log.bind( console, 'resolved p1 and p2:' ) )
;