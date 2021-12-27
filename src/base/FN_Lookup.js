"use strict";

/* istanbul ignore next */
if(typeof FN === 'undefined') {
    global.FN = require('../base/FN')
}

let FN_Lookup = new function() {
    this.create = (array) => {
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
            {name:'array',value:array},
            {name:'x',dependent:true},
        ];
        let fn = FN.create(parameters,fn_fn,fn_inverse);
        return fn;
    }
}


/* istanbul ignore next */
if(module!==null) {
    module.exports = {
        create: FN_Lookup.create
    }
}