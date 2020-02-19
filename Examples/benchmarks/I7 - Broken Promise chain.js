/**
 * > Broken Promise chain.
 *
 * Should be sequential, but the developer registered the
 * `logValue` reaction on the original Promise, instead 
 * of registering it on the resulting Promise after incrementing. 
 */
const logValue = console.log.bind( console, "Value should be 2:" ); //> D2

const increment = v => v + 1; //> D3

const p = new Promise( ( resolve, reject ) => { //> D1
	resolve( 1 );
} );

p.then( increment );

p.then( logValue );
