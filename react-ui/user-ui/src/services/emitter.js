import EventEmitter from 'eventemitter3'


// https://medium.com/@krzakmarek88/eventemitter-instead-of-lifting-state-up-f5f105054a5
// https://www.npmjs.com/package/eventemitter3

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload)
}

Object.freeze(Emitter);

export default Emitter;