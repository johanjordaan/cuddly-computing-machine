"use strict";

/* istanbul ignore next */
if(typeof FN === 'undefined') {
    global.FN = require('../base/FN')
}

/* istanbul ignore next */
if(typeof FNStepper === 'undefined') {
    global.FNStepper = require('../base/FNStepper')
}

// fnstepopers is an array of two value [fnstepperstate,current value]
const create = (fnsteppers) => {
    const fn_fn = (args) => {
        let x = args.x;
        let array = args.array;
        return array[x];
    }
    const fn_inverse = (args) => {
        let y = args.y;
        let array = args.array;
        return array.indexOf(y);
    }
    let parameters = [
        {name:'array',value:fnsteppers},
        {name:'x',dependent:true},
    ];
    let fn = FN.create(parameters,fn_fn,fn_inverse);

    let state =  FNStepper.create(fnsteppers[0],fnsteppers[fnsteppers.length-1], fn, fnsteppers.length);
    return FNStepper.peek(state);
}

const reset = (state) => {
    let new_fnsteppers = FNStepper.map(state,(v)=>{ return FNStepper.reset(v); })
    return create(new_fnsteppers)
}


/* istanbul ignore next */
if(module!==null) {
    module.exports = {
        create,
        reset,
    }
}