"use strict";

let create = (parameters,fn,inverse) => {

    let args = {};
    parameters.forEach((parameter)=>{
        args[parameter.name] = (parameter.independent===true)?null:parameter.value;
    })


    let closed_fn = (x) => {
        args.x = x;
        return fn(args);
    }

    let closed_fn_inverse = (y) => {
        args.y = y;
        return inverse(args);
    }


    return {
        fn:closed_fn,
        inverse:closed_fn_inverse,
        parameters,
    }
}

let run = (fn,input) => {
    return fn.fn(input);
}

let run_inverse = (fn,input) => {
    return fn.inverse(input);
}

/* istanbul ignore next */
if(module!==null) {
    module.exports = {
        create,
        run,
        run_inverse,

    }
}