import {point as asPoint, Point, point} from "../Point";

const isNumberArray = (data: object): data is number[] =>Array.isArray(data) && typeof data[0] === "number";

export const bounds = (a: Bounds | Point[] | Point | number[][] | number[], b?: Point | number[]): Bounds => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (!a || a instanceof Bounds) {
        return a;
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new Bounds(a, b);
};

export class Bounds {
    public min: Point;
    public max: Point;

    public constructor(a: Point | Point[] | number[][] | number[], b?: Point | number[]) { //(Point, Point) or Point[]
        if (!a) {
            return;
        }

        if (!b && !Array.isArray(a)) {
            throw new Error("incorrect input");
        }

        const points: Point[] = b ? [a, b] : a as any;

        for (let i = 0, len = points.length; i < len; i++) {
            this.extend(points[i]);
        }
    }


    public extend(pt: Point | number[]): this { // (Point)
        pt = point(pt);

        if (!this.min && !this.max) {
            this.min = pt.clone();
            this.max = pt.clone();
        } else {
            this.min.x = Math.min(pt.x, this.min.x);
            this.max.x = Math.max(pt.x, this.max.x);
            this.min.y = Math.min(pt.y, this.min.y);
            this.max.y = Math.max(pt.y, this.max.y);
        }
        return this;
    }

    public getCenter(round = false): Point {
        return new Point(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2, round);
    }

    public getBottomLeft(): Point {
        return new Point(this.min.x, this.max.y);
    }

    public getTopRight(): Point {
        return new Point(this.max.x, this.min.y);
    }

    public getSize(): Point {
        return this.max.subtract(this.min);
    }

    public contains(obj: Bounds | Point | number[] | Point[]): boolean {
        let min: Point;
        let max: Point;


        if (isNumberArray(obj) || obj instanceof Point) {
            obj = point(obj);
        } else {
            obj = bounds(obj);
        }

        if (obj instanceof Bounds) {
            min = obj.min;
            max = obj.max;
        } else {
            min = max = obj as any;
        }

        return (min.x >= this.min.x) &&
            (max.x <= this.max.x) &&
            (min.y >= this.min.y) &&
            (max.y <= this.max.y);
    }

    public intersects(boundsInput: Bounds | Point[]): boolean { // (Bounds) -> Boolean
        const b = bounds(boundsInput);

        const min = this.min,
            max = this.max,
            min2 = b.min,
            max2 = b.max,
            xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
            yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

        return xIntersects && yIntersects;
    }

    public isValid(): boolean {
        return !!(this.min && this.max);
    }

    public toString(): string {
        return "{min:" +
            this.min.toString() + ", max:" +
            this.max.toString() +
            "}";
    }

    public diagonal(): number {
        const size = this.getSize();
        return Math.hypot(this.getSize().x, size.y);
    }

    public rotate(angle: number, offset = this.getCenter()): Bounds {
        if (angle) {
            angle = -angle;
            const p1 = offset.add(
                this.min.subtract(offset).rotate(angle)
            );
            const p2 = offset.add(
                this.max.subtract(offset).rotate(angle)
            );
            const boundsNew = bounds(p1, p2);
            boundsNew.extend(
                offset.add(
                    asPoint(this.max.x, this.min.y).subtract(offset).rotate(angle)
                )
            );
            boundsNew.extend(
                offset.add(
                    asPoint(this.min.x, this.max.y).subtract(offset).rotate(angle)
                )
            );
            return boundsNew;
        }
        return this;
    }

    public getIntersect(b: Bounds): Bounds | undefined {
        if (!b || !this.intersects(b)) {
            return;
        }
        const setlfMin = this.min,
            otherMin = b.min,
            selfMax = this.max,
            otherMax = b.max,
            southWest = asPoint(Math.max(setlfMin.x, otherMin.x), Math.max(setlfMin.y, otherMin.y)),
            northEast = asPoint(Math.min(selfMax.x, otherMax.x), Math.min(selfMax.y, otherMax.y));
        return bounds(southWest, northEast);
    }

    public equals(b: Bounds): boolean {
        return !b || (b.min.equals(this.min) && b.max.equals(this.max));
    }

    public clone(): Bounds {
        return bounds(this.min.clone(), this.max.clone());
    }

    public toArray(): number[][] {
        return [this.min.toArray(), this.max.toArray()];
    }
}



