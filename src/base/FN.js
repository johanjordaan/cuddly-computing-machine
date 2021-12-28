"use strict";

let FN = new function() {
    this.create = (parameters,parameter_values,fn,inverse) => {
        let args = {};
        parameters.forEach((parameter)=>{
            args[parameter.name] = (parameter.dependent===true)?null:parameter_values[parameter.name];
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
            parameter_values,
        }
    }

    this.run = (fn,input) => {
        return fn.fn(input);
    }

    this.run_inverse = (fn,input) => {
        return fn.inverse(input);
    }
}



/* istanbul ignore next */
if(typeof module !== 'undefined') {
    module.exports = {
        create:FN.create,
        run:FN.run,
        run_inverse:FN.run_inverse,
    }
}