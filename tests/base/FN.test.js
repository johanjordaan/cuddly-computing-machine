"use strict";

const FN = require('../../src/base/FN')

describe("FN", () => {

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

    let linear_parameters =  [
        {name:'m'},
        {name:'x',dependent:true},
        {name:'c'}
    ];


    describe( "create", () => {
        it("should create a FN object", () =>{
            let parameter_values = { m:1, c:0};
            let fn = FN.create(linear_parameters,parameter_values,fn_fn,fn_inverse);

            expect(fn.parameters).toBe(linear_parameters);
            expect(fn.parameter_values).toBe(parameter_values);
        })
    })

    describe( "run", () => {
        it("should run a FN object and return the correct result", () =>{
            let parameter_values1 = { m:1, c:0};
            let fn1 = FN.create(linear_parameters,parameter_values1,fn_fn,fn_inverse);
            let result1 = FN.run(fn1,10);
            expect(result1).toEqual(10);


            let parameter_values2 = { m:0.6, c:-20};
            let fn2 = FN.create(linear_parameters,parameter_values2,fn_fn,fn_inverse);
            let result2 = FN.run(fn2,30);
            expect(result2).toEqual(0.6*30-20);

        })
    })


    describe( "run_inverse", () => {
        it("should run a FN object's inverse and return the correct result", () =>{
            let parameter_values1 = { m:1, c:0};
            let fn1 = FN.create(linear_parameters,parameter_values1,fn_fn,fn_inverse);
            let result1 = FN.run(fn1,10);
            let result11 = FN.run_inverse(fn1,result1);
            expect(result11).toEqual(10);


            let parameter_values2 = { m:0.6, c:-20};
            let fn2 = FN.create(linear_parameters,parameter_values2,fn_fn,fn_inverse);
            let result2 = FN.run(fn2,30);
            let result22 = FN.run_inverse(fn2,result2);
            expect(result22).toEqual(30);

        })
    })

})