"use strict";

/* istanbul ignore next */
if(typeof FN === 'undefined') {
    global.FN = require('../base/FN')
}

const MODES = {
    ONCE:0,
    REPEAT:1,
    BOUNCE:2,
}

const create = (y_from,y_to,fn,steps,mode) => {
    let x_from = fn.fn(y_from);
    let x_to = fn.inverse(y_to);
    let x_delta = (x_to-x_from)/steps;

    let state = {
        y_from,
        y_to,
        fn,
        steps,
        mode,

        x_from,
        x_to,
        x_delta,
    }
    return reset(state);
}

const peek = (state) => {
    return [state, state.current_y];
}

const reset = (state) => {
    state.current_step = 0;
    state.step_delta = 1;
    state.current_x = state.x_from;
    state.current_y = state.y_from;

    return peek(state)
}

const next = (state) => {
    if(state.current_step>=state.steps && state.step_delta>0) {
        if(state.mode === MODES.ONCE) {
            return [state, null]
        }
        if(state.mode === MODES.REPEAT) {
            return reset(state)
        }
        if(state.mode === MODES.BOUNCE) {
            state.step_delta *= -1
        }
    }

    if(state.current_step<=0 && state.step_delta<0) {
        if(state.mode === MODES.BOUNCE) {
            state.step_delta *= -1
        }
    }

    state.current_step += state.step_delta
    state.current_x = state.x_from + state.current_step* state.x_delta
    state.current_y = FN.run(state.fn, state.current_x)
    return peek(state)
}


/* istanbul ignore next */
if(module!==null) {
    module.exports = {
        MODES,
        create,
        peek,
        reset,
        next,
    }
}