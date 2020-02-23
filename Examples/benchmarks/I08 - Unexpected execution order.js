/**
 * > Unexpected execution order
 *
 * Event loop will go as:
 * 1 - Synchronous code
 * 2 - Microtasks (Promises)
 * 3 - Timers
 */
function timerFunction() {
	setTimeout( () => console.log( 'time' ) )
}

async function promiseFunction() {
	return Promise.resolve( 'promise' )
		.then( console.log )
	;
}

function syncFunction() {
	const st = Date.now();

	while ( Date.now() - st < 2000 ) {
		// do nothing
	}

	console.log( 'sync' );
}

timerFunction();
promiseFunction();
syncFunction();