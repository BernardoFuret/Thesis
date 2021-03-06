/**
 * > Recursive microtask (queueMicrotask)
 *
 * Microtasks are executed on the same cycle they are scheduled.
 * So if a microtask schedules itself recursively,
 * it creates an infinite loop of microtasks.
 */
function recursiveMicrotask() {
	queueMicrotask( recursiveMicrotask );
}

recursiveMicrotask();