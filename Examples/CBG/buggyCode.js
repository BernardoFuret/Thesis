/**
 * graph
 */

/**
 * A
 * from http://www.tcse.cn/~gaoyu15/paper/2017-ase-nodecb.pdf (PDF page 4)
 */
var bundle = client.bundle('someBundle');
bundle.create( something, function(){ // create is async //> A1
	//bundle.uploadStr( something );
} );
bundle.uploadStr( something ); // uploadStr is async //> A2

/// A1 | A2
/// but A2 depends on A1


/**
 * B
 * No then/catch reactions.
 */
const p = new Promise( ( resolve, reject ) => { //> B1
	resolve( 42 );
} );

/// B1


/**
 * C
 * No resolve nor reject call:
 * p and p2 will never be resolved.
 * (p2's callback will never be called.)
 * AKA dead promise
 * TODO: check if the CBG does note this issue
 *       (or simply shows A=>B and accepts).
 *       Check if CBG notes `return`, `resolve`, `reject`.
 */
const p = new Promise( ( resolve, reject ) => { //> C1
	console.log( 'nothing' );
} );
const p2 = p.then( value => { //> C2
	console.log( value );
} );

/// C1 =/> C2


/**
 * D
 * Should increment 1 to 2 and then log,
 * but the callbacks are registered on the original promise.
 * AKA broken promise (forked)
 */
const logValue = console.log.bind( console, "Value should be 2:" ); //> D2

const increment = v => v + 1; //> D3

const p3 = new Promise( ( resolve, reject ) => { //> D1
	resolve( 1 );
} );

p3.then( increment );

p3.then( logValue );

/// D1 => D2 | D1 => D3 


/**
 * E
 * Real example using MediaWiki JS code.
 * In this case, the modules containing
 * the api code will be loaded asynchronously
 * using the `mw.loader.using` function.
 * So when the next line of code is reached,
 * `mw.Api` might not be defined yet, thus
 * generating an error due to racing issues.
 * 
 */
mw.loader.using( "mediawiki.api" ); //> E1

const api = new mw.Api(); //> E2

/// E1 | E2

/**
 * F
 * In this case, even though an `onRejection` reaction
 * is regsitered, it's being registered too late. The 
 * error propagates to the top level as uncaught.
 * However, since the reaction is registered on a
 * Promise that has been rejected, the chain will
 * resume from there.
 * TODO: check the CBG result. This might not be noticed
 * by the CBG.
 */
const p = new Promise( ( resolve, reject ) => { //> F1
	reject( "ERROR" );
} );
p.then( console.log.bind( console, "Success!" ) ); //> F2
p.catch( console.warn.bind( console, "Error:" ) ); //> F3

/// F1 => F2 | F1 => F3


/**
 * G
 * Here, the execution order is different than
 * the order of the calls.
 */
async function asyncFunction() { //> G1
	await null;
	console.log( "async" );
}

function timedFunction() { //> G2
	setTimeout( () => console.log( "time" ) )
}

function syncFunction() { //> G3
	const st = Date.now();
	while ( Date.now() - st < 2000 ) {
		// do nothing
	}
	console.log( "sync" );
}

timedFunction();
asyncFunction();
syncFunction();
/// G3 | G1 | G2
// vs:
Promise.resolve()
	.then( timedFunction )
	.then( asyncFunction )
	.then( syncFunction )
;
/// G1 | G3 | G2
// Doesn't wait for the timer, because the function is scheduled.

// To have a similar result to the first case, would be: TODO: maybe not possible without scheduling asyncFunction with timers.
// To solve this correctly, would be:
function timedFunctionChanged() {
	return new Promise( r => setTimeout( () => console.log( "time" ) || r() ) );
}

/**
 * H
 * In this example, a server is being created, using Node.js `net` API.
 * The method `listen` will start a TCP server listening on the given port.
 * Once that method is called, it will emit the `listening` event. If no callback
 * is provided with this method, the handler can still be registered through
 * the `on` method.
 * However, like the example shows, the developer may register the handler only
 * after the call of the `listen` method, meaning the handler will never be called.
 */
const server = net.createServer( () => {} ).listen( 8080 ); //> H1

server.on( 'listening', () => { //> H2
	console.log( 'Listening' );
} );

/// H1