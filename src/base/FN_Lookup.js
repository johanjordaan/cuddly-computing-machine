"use strict";

/* istanbul ignore next */
if(typeof FN === 'undefined') {
    global.FN = require('../base/FN')
}

let FN_Lookup = new function() {
    this.parameters = [
        {name:'array',label:'array'},
        {name:'x',dependent:true},
    ];


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
        let parameter_values = { array }
        let fn = FN.create(this.parameters,parameter_values,fn_fn,fn_inverse);
        return fn;
    }
}


/* istanbul ignore next */
if(module!==null) {
    module.exports = {
        parameters: FN_Lookup.parameters,
        create: FN_Lookup.create
    }
}