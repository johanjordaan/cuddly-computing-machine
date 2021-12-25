"use strict";

/* istanbul ignore next */
if(typeof FN === 'undefined') {
    global.FN = require('../base/FN')
}

const create = (y_from,y_to,fn,steps) => {
    let x_from = fn.fn(y_from);
    let x_to = fn.inverse(y_to);
    let x_delta = (x_to-x_from)/(steps);

    let state = {
        y_from,
        y_to,
        fn,
        steps,

        x_from,
        x_to,
        x_delta,

        current_step: 0,
        current_x:x_from,
        current_y:y_from
    }

    return peek(state);
}

const peek = (state) => {
    return [state, state.current_y];
}

const reset = (state) => {
    return create(state.y_from,state.y_to,state.fn,state.steps);
}

const next = (state) => {
    if(state.current_step>=state.steps) {
        return [state, null]
    }

    state.current_step += 1
    state.current_x = state.x_from + state.current_step* state.x_delta
    state.current_y = FN.run(state.fn, state.current_x)
    return peek(state)
}

// Iterates over the state and return the results of applying f to each value
// leaving the state unaffected
const map = (state,f) => {
    let ret_val = [];
    let state_copy = { ...state };
    let current_y;

    [state_copy, current_y] = reset(state_copy);
    while(current_y !== null) {
        ret_val.push(f(current_y));
        [state_copy, current_y] = next(state_copy);
    }

    return ret_val;
}


/* istanbul ignore next */
if(module!==null) {
    module.exports = {
        create,
        peek,
        reset,
        next,
        map,
    }
}