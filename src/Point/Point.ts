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

    public constructor(x: number, y: number, round = false) {
        this.x = round ? Math.round(x) : x;
        this.y = round ? Math.round(y) : y;
    };

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public add(p: Point | number[]): Point {
        return this.clone()._add(point(p));
    }

    // destructive, used directly for performance in situations where it's safe to modify existing point
    public _add(pt: Point): this {
        this.x += pt.x;
        this.y += pt.y;
        return this;
    }

    public subtract(p: Point | number[]): Point {
        return this.clone()._subtract(point(p));
    }

    public _subtract(pt: Point): this {
        this.x -= pt.x;
        this.y -= pt.y;
        return this;
    }

    public divideBy(num: number): Point {
        return this.clone()._divideBy(num);
    }

    public _divideBy(num: number): this {
        this.x /= num;
        this.y /= num;
        return this;
    }

    public multiplyBy(num: number): Point {
        return this.clone()._multiplyBy(num);
    }

    public _multiplyBy(num: number): this {
        this.x *= num;
        this.y *= num;
        return this;
    }

    public round(): Point {
        return this.clone()._round();
    }

    public _round(): this {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    public floor(): Point {
        return this.clone()._floor();
    }

    public _floor(): this {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    public distanceTo(p: Point | number[]): number {
        p = point(p);

        const x = p.x - this.x,
            y = p.y - this.y;

        return Math.sqrt(x * x + y * y);
    }

    public equals(p: Point | number[]): boolean {
        p = point(p);

        return p.x === this.x && p.y === this.y;
    }

    public toString(): string {
        return `Point(${(this.x)}, ${(this.y)})`;
    }

    public angleTo(p: Point): number {
        return Math.atan2(p.y - this.y, p.x - this.x);
    }

    public vectorAngleTo(p: Point): number {
        const sqrtSelf = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        const sqrtTo = Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
        return Math.acos((this.x * p.x + this.y * p.y) / (sqrtSelf * sqrtTo));
    }

    public abs(): Point {
        return point(Math.abs(this.x), Math.abs(this.y));
    }

    public pointTo(angle: number, distance: number): Point {
        return point(-Math.sin(angle) * distance, Math.cos(angle) * distance)._add(this);
    }

    public rotate(angle: number): Point {
        return this.clone()._rotate(angle);
    }

    public _rotate(angle: number): this {
        const angleDeg = (-angle * Math.PI) / 180;
        const {x, y} = this;
        this.x = x * Math.cos(angleDeg) - y * Math.sin(angleDeg);
        this.y = x * Math.sin(angleDeg) + y * Math.cos(angleDeg);
        return this;
    }

    public fill(a: number[] | number | Point | { x: number; y: number }, b?: number): this {
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

    public toArray(): number[] {
        return [this.x, this.y];
    }

    public clamp(min: Point, max: Point): Point {
        const {x, y} = this;
        return point(clamp(x, min.x, max.x), clamp(y, min.y, max.y));
    }

    public contains(src: Point | number[]): boolean {
        return this.closeTo(src);
    }

    public closeTo(src: Point | number[]): boolean {
        const pt = point(src);
        const diff = 1.0e-8;
        return Math.abs(pt.x) - Math.abs(this.x) <= diff && Math.abs(pt.y) - Math.abs(this.y) <= diff;
    }

    public ceil(): Point {
        return this.clone()._ceil();
    }

    public toFixed(precision: number): Point {
        return this.multiplyBy(precision)
            ._floor()
            .divideBy(precision);
    }

    public _ceil(): this {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    public static lerp(p1: Point, p2: Point, a: number): Point {
        return point(lerp(p1.x, p2.x, a), lerp(p1.y, p2.y, a));
    };
}




