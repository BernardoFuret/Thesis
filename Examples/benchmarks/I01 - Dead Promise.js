/**
 * > Dead Promise
 * No resolve nor reject call.
 */
const p = new Promise( ( resolve, reject ) => { //> C1
	console.log( 'fulfills nothing' );
} );

const p2 = p.then( value => { //> C2
	console.log( value );
} );
