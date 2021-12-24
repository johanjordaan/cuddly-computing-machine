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

    describe( "create", () => {
        it("should create a FN object", () =>{
            let parameters = [
                {name:'m',value:1},
                {name:'x',dependent:true},
                {name:'c',value:0}
            ];
            let fn = FN.create(parameters,fn_fn,fn_inverse);

            expect(fn.parameters).toBe(parameters);
        })
    })

    describe( "run", () => {
        it("should run a FN object and return the correct result", () =>{
            let parameters1 = [
                {name:'m',value:1},
                {name:'x',independent:true},
                {name:'c',value:0}
            ];
            let fn1 = FN.create(parameters1,fn_fn,fn_inverse);
            let result1 = FN.run(fn1,10);
            expect(result1).toEqual(10);


            let parameters2 = [
                {name:'m',value:0.6},
                {name:'x',independent:true},
                {name:'c',value:-20}
            ];
            let fn2 = FN.create(parameters2,fn_fn,fn_inverse);
            let result2 = FN.run(fn2,30);
            expect(result2).toEqual(0.6*30-20);

        })
    })


    describe( "run_inverse", () => {
        it("should run a FN object's inverse and return the correct result", () =>{
            let parameters1 = [
                {name:'m',value:1},
                {name:'x',independent:true},
                {name:'c',value:0}
            ];
            let fn1 = FN.create(parameters1,fn_fn,fn_inverse);
            let result1 = FN.run(fn1,10);
            let result11 = FN.run_inverse(fn1,result1);
            expect(result11).toEqual(10);


            let parameters2 = [
                {name:'m',value:0.6},
                {name:'x',independent:true},
                {name:'c',value:-20}
            ];
            let fn2 = FN.create(parameters2,fn_fn,fn_inverse);
            let result2 = FN.run(fn2,30);
            let result22 = FN.run_inverse(fn2,result2);
            expect(result22).toEqual(30);

        })
    })


})