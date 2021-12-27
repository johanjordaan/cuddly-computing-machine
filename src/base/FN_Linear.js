"use strict";

/* istanbul ignore next */
if(typeof FN === 'undefined') {
    global.FN = require('../base/FN')
}

let FN_Linear = new function() {
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

        let parameters = [
            {name:'m',value:m},
            {name:'x',dependent:true},
            {name:'c',value:c}
        ];
        let fn = FN.create(parameters,fn_fn,fn_inverse);
        return fn;
    }
}


/* istanbul ignore next */
if(module!==null) {
    module.exports = {
        create: FN_Linear.create
    }
}