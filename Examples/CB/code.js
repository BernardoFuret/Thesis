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