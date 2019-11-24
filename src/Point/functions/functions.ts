export const add = ([x1, y1]: number[], [x2, y2]: number[]): number[] => [x1 + x2, y1 + y2];

export const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
};
