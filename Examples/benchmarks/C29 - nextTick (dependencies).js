/**
 * > nextTick (dependencies)
 *
 * `o.print` will only be available on the next iteration.
 */
const o = {};

process.nextTick( () => o.print( 'Sync code loaded.' ) );

o.print = console.log;