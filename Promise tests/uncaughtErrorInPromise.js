
const p = new Promise( ( resolve, reject ) => {
	reject( "ERROR" );
} );

p.then( console.log.bind( console, "Success!" ) );

p
	.catch( console.warn.bind( console, "Error:" ) )
	.then( _ => console.log( "But then proceeds." ) )
;

console.log( "Will log first." );

setTimeout(
	console.log.bind( console ),
	2000,
	"Will still log, despite the uncaught error in Promise.",
); 