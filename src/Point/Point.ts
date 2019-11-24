import {clamp} from "./functions";
import {lerp} from "../functions";

export const point =  (
    x: Point | number | number[] | { x: number; y: number },
    y?: number, round = false,
    forcenew = false
): Point => {
/* eslint-disable @typescript-eslint/no-use-before-define */
    if (x instanceof Point) {
        if (forcenew) {
            return new Point(x.x, x.y, round);
        }
        return x;
    }
    if (Array.isArray(x)) {
        return new Point(x[0], x[1], round);
    }

    if (x === undefined || x === null) {
        return x as any;
    }

    if (typeof x === "object" && "x" in x) {
        return new Point(x.x, x.y, round);
    }
    return new Point(x, y!, round);
};

export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number, round = false) {
        this.x = round ? Math.round(x) : x;
        this.y = round ? Math.round(y) : y;
    };

    clone() {
        return new Point(this.x, this.y);
    }

    add(p: Point | number[]) {
        return this.clone()._add(point(p));
    }

    // destructive, used directly for performance in situations where it's safe to modify existing point
    _add(pt: Point) {
        this.x += pt.x;
        this.y += pt.y;
        return this;
    }

    subtract(p: Point | number[]) {
        return this.clone()._subtract(point(p));
    }

    _subtract(pt: Point) {
        this.x -= pt.x;
        this.y -= pt.y;
        return this;
    }

    divideBy(num: number) {
        return this.clone()._divideBy(num);
    }

    _divideBy(num: number) {
        this.x /= num;
        this.y /= num;
        return this;
    }

    multiplyBy(num: number) {
        return this.clone()._multiplyBy(num);
    }

    _multiplyBy(num: number) {
        this.x *= num;
        this.y *= num;
        return this;
    }

    round() {
        return this.clone()._round();
    }

    _round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    floor() {
        return this.clone()._floor();
    }

    _floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    distanceTo(p: Point | number[]) {
        p = point(p);

        const x = p.x - this.x,
            y = p.y - this.y;

        return Math.sqrt(x * x + y * y);
    }

    equals(p: Point | number[]) {
        p = point(p);

        return p.x === this.x && p.y === this.y;
    }

    toString() {
        return `Point(${(this.x)}, ${(this.y)})`;
    }

    angleTo(p: Point) {
        return Math.atan2(p.y - this.y, p.x - this.x);
    }

    vectorAngleTo(p: Point) {
        const sqrtSelf = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        const sqrtTo = Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
        return Math.acos((this.x * p.x + this.y * p.y) / (sqrtSelf * sqrtTo));
    }

    abs() {
        return point(Math.abs(this.x), Math.abs(this.y));
    }

    pointTo(angle: number, distance: number) {
        return point(-Math.sin(angle) * distance, Math.cos(angle) * distance)._add(this);
    }

    rotate(angle: number) {
        return this.clone()._rotate(angle);
    }

    _rotate(angle: number) {
        const angleDeg = (-angle * Math.PI) / 180;
        const {x, y} = this;
        this.x = x * Math.cos(angleDeg) - y * Math.sin(angleDeg);
        this.y = x * Math.sin(angleDeg) + y * Math.cos(angleDeg);
        return this;
    }

    fill(a: number[] | number | Point | { x: number; y: number }, b?: number) {
        if (Array.isArray(a)) {
            [this.x, this.y] = a;
        } else if (typeof a === "number" && typeof b === "number") {
            this.x = a;
            this.y = b;
        } else if (a === undefined || a === null) {
            return a;
        } else if (typeof a === "object" && "x" in a) {
            this.x = a.x;
            this.y = a.y;
        }
        return this;
    }

    toArray() {
        return [this.x, this.y];
    }

    clamp(min: Point, max: Point) {
        const {x, y} = this;
        return point(clamp(x, min.x, max.x), clamp(y, min.y, max.y));
    }

    contains(src: Point | number[]) {
        console.log("contains is deprecated. use closeTo")
        return this.closeTo(src);
    }

    closeTo(src: Point | number[]) {
        const pt = point(src);
        const diff = 1.0e-8;
        return Math.abs(pt.x) - Math.abs(this.x) <= diff && Math.abs(pt.y) - Math.abs(this.y) <= diff;
    }

    ceil() {
        return this.clone()._ceil();
    }

    toFixed(precision: number) {
        return this.multiplyBy(precision)
            ._floor()
            .divideBy(precision);
    }

    _ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    public static lerp(p1: Point, p2: Point, a: number) {
        return point(lerp(p1.x, p2.x, a), lerp(p1.y, p2.y, a));
    };
}




