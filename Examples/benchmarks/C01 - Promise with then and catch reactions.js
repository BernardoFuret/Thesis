/**
 * Promise with `then` and `catch` reactions.
 */
const p = new Promise( ( resolve, reject ) => { //> B1
	if ( Math.random() < 0.5 ) {
		resolve( "A" );
	} else {
		reject( "B" );
	}
} ).then(
	console.log.bind( console, "Result is A:" ) //> B2
).catch(
	console.warn.bind( console, "Result is B:" ) //> B3
);
