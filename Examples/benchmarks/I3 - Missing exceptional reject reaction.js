/**
 * > Missing exceptional reject reaction
 * 
 * No `catch`.
 */
const p1 = new Promise( ( resolve, reject ) => {
	reject( 1 );
} );

p1.then( console.log );
