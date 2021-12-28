"use strict";

const FN = require('../../src/base/FN')
const FN_Linear = require('../../src/base/FN_Linear')

describe("FN_Linear", () => {

    describe( "create", () => {
        it("should create a FN object", () =>{
            let fn = FN_Linear.create(5,-20);
            expect(fn.parameters).toEqual([
                {name:'m',label:'slope'},
                {name:'x',dependent:true},
                {name:'c',label:'y intercept'}
            ]);
            expect(fn.parameter_values).toEqual(
                {
                    m:5,
                    c:-20
                }
            )
        })
    })


    describe( "run", () => {
        it("should run a FN_Linear object and return the correct result", () =>{
            let fn1 = FN_Linear.create(1,0);
            let result1 = FN.run(fn1,10);
            expect(result1).toEqual(10);

            let fn2 = FN_Linear.create(0.6,-20);
            let result2 = FN.run(fn2,30);
            expect(result2).toEqual(0.6*30-20);
        })
    })

    describe( "run_inverse", () => {
        it("should run a FN object's inverse and return the correct result", () =>{

            let fn1 = FN_Linear.create(1,0);
            let result1 = FN.run(fn1,10);
            let result11 = FN.run_inverse(fn1,result1);
            expect(result11).toEqual(10);

            let fn2 = FN_Linear.create(0.6,-20);
            let result2 = FN.run(fn2,30);
            let result22 = FN.run_inverse(fn2,result2);
            expect(result22).toEqual(30);
        })
    })



})