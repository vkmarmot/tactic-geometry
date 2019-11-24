export function lerp(v1: number, v2: number, alpha: number) {
    return v1*(1-alpha)+v2*alpha;
}
