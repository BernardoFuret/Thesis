/**
 * > setTimeout (simple)
 *
 * Will only execute its callback after sync code is done.
 */
console.log( 'start' );

setTimeout( console.log, 500, 'Program ended; Stack is empty; Sync code is done.' );

const ago = Date.now();

while ( Date.now() - ago < 2000 );

console.log( 'finish' );