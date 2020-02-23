/**
 * Simple Promise chain
 */
function increment( v ) {
	return v + 1;
}
function decrement( v ) {
	return v - 1;
}

const p = new Promise( ( resolve, reject ) => {
	resolve( 1 );
} )
	.then( increment )
	.then( decrement )
	.then( increment )
	.then( decrement )
	.then( increment )
	.then( decrement )
	.then( console.log, console.warn )
;

increment( 10 );
decrement( 10 );
increment( 10 );
decrement( 10 );