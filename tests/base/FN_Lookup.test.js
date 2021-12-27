"use strict";

const FN = require('../../src/base/FN')
const FN_Lookup = require('../../src/base/FN_Lookup')

describe("FN_Lookup", () => {

    describe( "create", () => {
        it("should create a FN object", () =>{
            let fn = FN_Lookup.create([1,3,5,7,9]);
            expect(fn.parameters).toEqual([
                {name:'array',value:[1,3,5,7,9]},
                {name:'x',dependent:true},
            ]);
        })
    })


    describe( "run", () => {
        it("should run a FN_Lookup object and return the correct result", () =>{
            let fn1 = FN_Lookup.create([1,3,5,7,9]);
            let result1 = FN.run(fn1,2);
            expect(result1).toEqual(5);

            let fn2 = FN_Lookup.create(["a","b","c"]);
            let result2 = FN.run(fn2,2);
            expect(result2).toEqual("c");
        })
    })

    describe( "run_inverse", () => {
        it("should run a FN object's inverse and return the correct result", () =>{

            let fn1 = FN_Lookup.create([1,3,4,5,9]);
            let result1 = FN.run(fn1,2);
            let result11 = FN.run_inverse(fn1,result1);
            expect(result11).toEqual(2);

            let fn2 = FN_Lookup.create(["a","b","c","e","f"]);
            let result2 = FN.run(fn2,3);
            let result22 = FN.run_inverse(fn2,result2);
            expect(result22).toEqual(3);
        })
    })
})