/**
 * > Unreachable reaction (allSettled)
 *
 * Neither `p1` nor `p2` resolve, thus the `race` method waits indefinitely.
 */
const p1 = new Promise( r => r( 'p1' ) );

const p2 = new Promise( r => r( 'p2' ) );

const p3 = new Promise( ( rs, rj ) => rj( 'p3' ) );

const p4 = new Promise( r => console.log( 'p4 never resolves' ) );

Promise.allSettled( [ p1, p2, p3, p4 ] )
	.then( console.log.bind( console, 'resolved' ) )
;