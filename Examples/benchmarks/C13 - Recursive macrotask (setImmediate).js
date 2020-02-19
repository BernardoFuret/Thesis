/**
 * > Recursive macrotask
 *
 * Macrotasks will be executed on the next iteration of the
 * event loop. Meaning that if they are called from another
 * macrotask, their execution will be postponed to the next
 * cycle, rather than executing right away, as microtasks do.
 */
function recursiveMacrotask() {
	setImmediate( recursiveMacrotask );
}

recursiveMacrotask();