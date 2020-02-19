/**
 * > queueMicrotask (simple)
 *
 * Will only execute its callback after sync code is done.
 */
console.log( 'start' );

queueMicrotask( () => console.log( 'Sync code loaded.' ) );

const ago = Date.now();

while ( Date.now() - ago < 2000 );

console.log( 'finish' );