/**
 * graph
 */

/**
 * from http://www.tcse.cn/~gaoyu15/paper/2017-ase-nodecb.pdf (PDF page 4)
 */
var bundle = client.bundle('someBundle');
bundle.create( something, function(){ // create is async
	//bundle.uploadStr( something );
} );
bundle.uploadStr( something ); // uploadStr is async

/// A9 | A12 but A12 depends on A9 


/**
 * No resolve nor reject call:
 * p and p2 will never be resolved.
 * (p2's callback will never be called.) 
 */
const p = new Promise( ( resolve, reject ) => {
	//resolve( 42 );
} );
const p2 = p.then( value => {
	console.log( value )

	return value + 42;
} ):

/// A21 | A24

/**
 * Should increment 1 to 2 and then log,
 * but the callbacks are registered on the original promise.
 */
const logValue = console.log.bind( console, "Value should be 2:" );

const increment = v => v + 1;

const p3 = new Promise( ( resolve, reject ) => {
	resolve( 1 );
} );

p3.then( increment );

p3.then( logValue );

/// P43 => P47 | P43 => P49 