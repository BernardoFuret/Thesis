/**
 * > Unexpected execution order
 *
 * 
 */
async function promiseFunction() {
	await null;
	console.log( "async" );
}

function timerFunction() {
	setTimeout( () => console.log( "time" ) )
}

function syncFunction() {
	const st = Date.now();
	while ( Date.now() - st < 2000 ) {
		// do nothing
	}
	console.log( "sync" );
}

timerFunction();
promiseFunction();
syncFunction();