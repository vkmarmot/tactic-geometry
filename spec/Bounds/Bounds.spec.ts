import { Bounds, bounds } from "../../src/Bounds";
import { point } from "../../src/Point";

describe("Bounds", () => {
    test("creation", () => {
        const p1 = point(1, 2);
        const p2 = point(2, 3);
        const boundsResult = { min: point({ x: 1, y: 2 }), max: point({ x: 2, y: 3 }) };
        expect(bounds(p1, p2)).toEqual(boundsResult);
        expect(bounds([p1, p2])).toEqual(boundsResult);
        expect(bounds(bounds([p1, p2]))).toEqual(boundsResult);
        expect(bounds(undefined as any)).toBeUndefined();
        expect(bounds(null as any)).toBeNull();
        expect(() => {
            bounds(p1);
        }).toThrow("incorrect input");
        expect(new Bounds(undefined as any)).toEqual({});
    });
    test("getCenter", () => {
        expect(bounds([point(10, 10), point(30, 50)]).getCenter()).toEqual(point(20, 30));
    });

    test("extend", () => {
        expect(bounds([point(10, 10), point(30, 50)]).extend([-1, 66])).toEqual(bounds(point(-1, 10), point(30, 66)));
    });
    test("get corners", () => {
        const boundsInstance = bounds([point(10, 20), point(30, 50)]);
        expect(boundsInstance.getBottomLeft()).toEqual(point(10, 50));
        expect(boundsInstance.getTopRight()).toEqual(point(30, 20));
    });
    test("get size", () => {
        const boundsInstance = bounds([point(10, 20), point(30, 50)]);
        expect(boundsInstance.getSize()).toEqual(point(20, 30));
    });
    test("contains", () => {
        const boundsInstance = bounds([point(10, 20), point(30, 50)]);
        expect(boundsInstance.contains(point(20, 30))).toBeTruthy();
        expect(boundsInstance.contains([20, 30])).toBeTruthy();
        expect(boundsInstance.contains(bounds([20, 30], [22, 33]))).toBeTruthy();
        expect(boundsInstance.contains(bounds([20, 30], [220, 33]))).toBeFalsy();
        expect(boundsInstance.contains(point(2, 30))).toBeFalsy();
        expect(boundsInstance.contains(point(52, 30))).toBeFalsy();
        expect(boundsInstance.contains(point(20, 60))).toBeFalsy();
        expect(boundsInstance.contains(point(20, 6))).toBeFalsy();
    });
    test("intersects", () => {
        const boundsInstance = bounds([point(10, 20), point(30, 50)]);
        expect(boundsInstance.intersects([point(20, 30), point(22, 33)])).toBeTruthy();
        expect(boundsInstance.intersects(bounds([point(20, 30), point(22, 33)]))).toBeTruthy();
        expect(boundsInstance.intersects([point(-20, 30), point(22, 33)])).toBeTruthy();
        expect(boundsInstance.intersects([point(20, 30), point(220, 330)])).toBeTruthy();
        expect(boundsInstance.intersects([point(200, 30), point(220, 330)])).toBeFalsy();
    });
    test("isValid", () => {
        expect(new Bounds(undefined as any).isValid()).toBeFalsy();
        expect(new Bounds(point(1, 2), point(3, 4)).isValid()).toBeTruthy();
    });
    test("toString", () => {
        expect(new Bounds(point(1, 2), point(3, 4)).toString()).toEqual("{min:Point(1, 2), max:Point(3, 4)}");
    });
    test("diagonal", () => {
        expect(new Bounds(point(1, 2), point(3, 4)).diagonal()).toEqual(Math.hypot(2, 2));
    });
    test("rotate", () => {
        const bInstance = new Bounds(point(1, 2), point(3, 4));
        expect(bInstance.rotate(180)).toEqual({
            max: { x: 3, y: 4 },
            min: { x: 0.9999999999999998, y: 1.9999999999999998 }
        });
        expect(bInstance.rotate(0)).toEqual(bInstance);
    });
    test("get intersects", () => {
        const bInstance = new Bounds(point(1, 2), point(3, 4));
        expect(bInstance.getIntersect(new Bounds(point(2, 3), point(5, 6)))).toEqual(bounds(point(2, 3), point(3, 4)));
        expect(bInstance.getIntersect(new Bounds(point(6, 3), point(5, 6)))).toBeUndefined();
    });

    test("equals", () => {
        expect(
            new Bounds(point(1, 2), point(3, 4)).equals(
                new Bounds(point(1, 2), point(3, 4))
            )
        ).toBeTruthy();
        expect(
            new Bounds(point(1, 2), point(3, 4)).equals(
                new Bounds(point(1.1, 2), point(3, 4))
            )
        ).toBeFalsy();
    });

    test("clone", () => {
        const bInstance = new Bounds(point(1, 2), point(3, 4));
        expect(
            bInstance
        ).toEqual(bInstance.clone());
        expect(bInstance === bInstance.clone()).toBeFalsy();
    });

    test("to array", () => {
        const bInstance = new Bounds(point(1, 2), point(3, 4));
        expect(bInstance.toArray()).toEqual([[1, 2], [3, 4]]);
    });

});
