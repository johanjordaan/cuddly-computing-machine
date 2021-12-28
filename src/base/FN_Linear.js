"use strict";

/* istanbul ignore next */
if(typeof FN === 'undefined') {
    global.FN = require('../base/FN')
}

let FN_Linear = new function() {
    this.parameters = [
        {name:'m',label:"slope"},
        {name:'x',dependent:true},
        {name:'c',label:"y intercept"}
    ];

    this.create = (m,c) => {
        let fn_fn = (args) => {
            let m = args.m;
            let x = args.x;
            let c = args.c;

            return m*x +c;
        }
        let fn_inverse = (args) => {
            let m = args.m;
            let y = args.y;
            let c = args.c;

            return (y-c)/m;
        }

        let parameter_values = {m,c};
        let fn = FN.create(this.parameters,parameter_values,fn_fn,fn_inverse);
        return fn;
    }
}


/* istanbul ignore next */
if(typeof module !== 'undefined') {
    module.exports = {
        parameters: FN_Linear.parameters,
        create: FN_Linear.create
    }
}