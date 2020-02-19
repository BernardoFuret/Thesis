/**
 * > Promise allSettled
 *
 * Correct example of Promise allSettled use.
 */
const p1 = new Promise( r => setTimeout( r, Math.random() * 1000, 'p1' ) );

const p2 = new Promise( r => setTimeout( r, Math.random() * 1000, 'p2' ) );

const p3 = new Promise( ( rs, rj ) => setTimeout( rj, Math.random() * 1000, 'p3' ) );

const p4 = new Promise( ( rs, rj ) => setTimeout( rj, Math.random() * 1000, 'p4' ) );

Promise.allSettled( [ p1, p2, p3, p4 ] )
	.then( console.log.bind( console, 'resolved promises:' ) )
;