"use strict";

const FN = require("../../src/base/FN");
const FNStepper = require('../../src/base/FNStepper')

describe("FNStepper", () => {

    let fn_fn = (args) => {
        let m = args.m;
        let x = args.x;
        let c = args.c;

        return m * x + c;
    }
    let fn_inverse = (args) => {
        let m = args.m;
        let y = args.y;
        let c = args.c;

        return (y - c) / m;
    }
    let parameters = [
        {name: 'm', value: 1},
        {name: 'x', dependent: true},
        {name: 'c', value: 0}
    ]
    let fn = FN.create(parameters, fn_fn, fn_inverse)

    describe("create", () => {
        it("should create a FNStepper object", () => {
            let [state, current_y] = FNStepper.create(10, 20, fn, 5, FNStepper.MODES.ONCE)

            expect(state.y_from).toEqual(10)
            expect(state.y_to).toEqual(20)
            expect(state.fn).toBe(fn)
            expect(state.steps).toEqual(5)
            expect(state.mode).toEqual(FNStepper.MODES.ONCE)

            expect(state.x_from).toEqual(10)
            expect(state.x_to).toEqual(20)
            expect(state.x_delta).toEqual((20 - 10) / 5)

            expect(state.current_step).toEqual(0)
            expect(state.step_delta).toEqual(1)
            expect(state.current_x).toEqual(10)
            expect(state.current_y).toEqual(10)

            expect(current_y).toEqual(10)
        })
    })

    describe("next", () => {
        it("return the next step and the new state", () => {
            let [state, current_y] = FNStepper.create(10, 20, fn, 5, FNStepper.MODES.ONCE)

            let [next_state,next_current_y] = FNStepper.next(state)

            expect(next_state.current_step).toEqual(1)
            expect(next_state.step_delta).toEqual(1)
            expect(next_state.current_x).toEqual(12)
            expect(next_state.current_y).toEqual(12)

            expect(next_current_y).toEqual(12)
        })

        it("return null if there is not more values to fetch", () => {
            let state,current_y;
            [state,current_y] =  FNStepper.create(10, 20, fn, 5, FNStepper.MODES.ONCE);

            for(let i=0;i<5;i++) {
                [state,current_y] = FNStepper.next(state);
            }
            [state,current_y] = FNStepper.next(state);

            expect(state.current_step).toEqual(5)
            expect(state.step_delta).toEqual(1)
            expect(state.current_x).toEqual(20)
            expect(state.current_y).toEqual(20)

            expect(current_y).toEqual(null)
        })

    })
})