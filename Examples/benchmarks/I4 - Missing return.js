/**
 * > Missing return
 *
 * This may not be a bug,
 * depending on the case.
 */
const p = new Promise( ( resolve, reject ) => {
	resolve( 1 );
} )
	.then( v => {
		const res = v + 1
	} )
	.then( console.log )
;