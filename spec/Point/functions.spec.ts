import {add, clamp} from "../../src/Point/functions/functions";

describe("geometry/Point", () => {
    describe("functions", () => {
        test("clamp", () => {
            expect(clamp(1, 0, 5)).toEqual(1);
            expect(clamp(0, 0, 5)).toEqual(0);
            expect(clamp(5, 0, 5)).toEqual(5);
            expect(clamp(-1, 0, 5)).toEqual(0);
            expect(clamp(6, 0, 5)).toEqual(5);
        });
        test("add", () => {
            expect(add([1, 2], [3, 4])).toEqual([4, 6]);
        });
    });
});
