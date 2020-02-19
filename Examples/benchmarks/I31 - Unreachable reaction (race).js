/**
 * > Unreachable reaction (race)
 *
 * Neither `p1` nor `p2` resolve, thus the `race` method waits indefinitely.
 */
const p1 = new Promise( r => console.log( 'p1 never resolves' ) );

const p2 = new Promise( r => console.log( 'p2 never resolves' ) );

Promise.race( [ p1, p2 ] )
	.then( console.log.bind( console, 'resolved p1 or p2:' ) )
;