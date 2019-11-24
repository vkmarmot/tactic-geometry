import { Point, point } from "../../src/Point";

describe("geometry/Point", () => {
    test("clamp", () => {
        expect(point(1, 2).clamp(point(0, 0), point(5, 5))).toEqual(point(1, 2));
        expect(point(-1, 2).clamp(point(0, 0), point(5, 5))).toEqual(point(0, 2));
        expect(point(-1, 9).clamp(point(0, 0), point(5, 5))).toEqual(point(0, 5));
    });

    test("creation", () => {
        expect(point(1, 2)).toEqual({ x: 1, y: 2 });
        const ptInstance = point(1, 2);
        const pointCopy = point(ptInstance);
        expect(pointCopy).toEqual({ x: 1, y: 2 });
        expect(pointCopy === ptInstance).toBeTruthy();
        const ptModification = point(ptInstance, undefined, false, true);
        expect(ptModification).toEqual({ x: 1, y: 2 });
        expect(ptModification === ptInstance).toBeFalsy();
        expect(point([1, 2])).toEqual({ x: 1, y: 2 });
        expect(point(null as any)).toBeNull();
        expect(point(undefined as any)).toBeUndefined();
        const pointFromMap = point({ x: 1, y: 2 });
        expect(pointFromMap).toBeInstanceOf(Point);
        expect(pointFromMap).toEqual(point(1, 2));
        expect(point(1.5, 4.1, true)).toEqual(point(2, 4));
    });
    test("clone", () => {
        const pt = point(1, 2);
        expect(pt.clone() === pt).toBeFalsy();
        expect(pt.clone()).toEqual(pt);
    });
    test("add", () => {
        const pt = point(1, 2);
        expect(pt.add([1, 0]) === pt).toBeFalsy();
        expect(pt.add([1, 4])).toEqual(point(2, 6));
        expect(pt._add(point([1, 0])) === pt).toBeTruthy();
    });
    test("subtract", () => {
        const pt = point(1, 2);
        expect(pt.subtract([1, 0]) === pt).toBeFalsy();
        expect(pt.subtract([1, 4])).toEqual(point(0, -2));
        expect(pt._subtract(point([1, 0])) === pt).toBeTruthy();
    });
    test("divideBy", () => {
        const pt = point(9, 6);
        expect(pt.divideBy(2) === pt).toBeFalsy();
        expect(pt.divideBy(3)).toEqual(point(3, 2));
    });
    test("multiplyBy", () => {
        const pt = point(9, 6);
        expect(pt.multiplyBy(2) === pt).toBeFalsy();
        expect(pt.multiplyBy(3)).toEqual(point(27, 18));
    });
    test("round", () => {
        const pt = point(9.1, 6.6);
        expect(pt.round() === pt).toBeFalsy();
        expect(pt.round()).toEqual(point(9, 7));
        expect(pt).toEqual(point(9.1, 6.6));
    });
    test("floor", () => {
        const pt = point(9.1, 6.6);
        expect(pt.floor() === pt).toBeFalsy();
        expect(pt.floor()).toEqual(point(9, 6));
        expect(pt).toEqual(point(9.1, 6.6));
    });
    test("ceil", () => {
        const pt = point(9.1, 6.6);
        expect(pt.ceil() === pt).toBeFalsy();
        expect(pt.ceil()).toEqual(point(10, 7));
        expect(pt).toEqual(point(9.1, 6.6));
    });
    test("distanceTo", () => {
        const pt = point(10, 20);
        const pt2 = point(30, 50);
        expect(pt.distanceTo(pt)).toEqual(0);
        expect(pt.distanceTo(pt2) - 36.05551).toBeLessThan(0.00001);
    });
    test("equals", () => {
        const pt = point(10, 20);
        const pt2 = point(30, 50);
        expect(pt.equals(pt2)).toBeFalsy();
        expect(pt.equals(point(10, 20))).toBeTruthy();
        expect(pt.equals([10, 20])).toBeTruthy();
        expect(pt.equals([11, 20])).toBeFalsy();
    });
    test("toString", () => {
        expect(point(10, 0).toString()).toEqual("Point(10, 0)");
    });
    test("angleTo", () => {
        expect(point(10, 0).angleTo(point(0, 10))).toEqual(2.356194490192345);
    });
    test("vecttorAngleTo", () => {
        expect(point(10, 0).vectorAngleTo(point(0, 10))).toEqual(90 * Math.PI / 180);
    });
    test("abs", () => {
        const pt = point(9.1, 6.6);
        const pt2 = point(-9.1, -6.6);
        expect(pt.abs() === pt).toBeFalsy();
        expect(pt.abs()).toEqual(point(9.1, 6.6));
        expect(pt2.abs()).toEqual(point(9.1, 6.6));
    });
    test("pointTo", () => {
        expect(point(10, 0).pointTo(90, 20)).toEqual(point(-7.879933272011158, -8.961472322583404));
    });
    test("rotate", () => {
        expect(point(10, 0).rotate(90).round()).toEqual({x: 0, y: -10});
    });
    test("fill", () => {
        const pt = point(10, 20);
        pt.fill(1, 2);
        expect(pt).toEqual(point(1, 2));
        pt.fill([3, 4]);
        expect(pt).toEqual(point(3, 4));
        pt.fill(undefined as any);
        expect(pt).toEqual(point(3, 4));
        pt.fill(null as any);
        expect(pt).toEqual(point(3, 4));
        pt.fill({ x: 11, y: 12 });
        expect(pt).toEqual(point(11, 12));
    });

    test("to array", () => {
        expect(point(10, 20).toArray()).toEqual([10, 20]);
    });
    test("close to", () => {
        expect(point(10, 20).closeTo(point(10.0000000001, 20))).toBeTruthy();
        expect(point(10, 20).closeTo(point(10.0000001, 20))).toBeFalsy();
        expect(point(10, 20).contains(point(10.0000001, 20))).toBeFalsy();
    });
    test("toFixed", () => {
        expect(point(10.12345, 20.12345).toFixed(100)).toEqual(point(10.12, 20.12));
    });
    test("lerp", () => {
        expect(Point.lerp(point(10, 20), point(20, 40), .5)).toEqual(point(15, 30));
    });
});
