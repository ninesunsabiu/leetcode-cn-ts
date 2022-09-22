/*
 * @lc app=leetcode.cn id=1184 lang=typescript
 *
 * [1184] 公交站间的距离
 */

// @lc code=start
function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {
    // 交换起点和终点 使得起点小于终点 并不会影响结果
    [start, destination] = start <= destination ? [start, destination] : [destination, start];

    const sum = (s: number, e: number) => {
        let sum = 0;
        for (let i = s; i < e; i++) {
            sum = distance[i] + sum | 0;
        }
        return sum;
    };

    const all = sum(0, distance.length);
    const inner = sum(start, destination);

    return Math.min(inner, all - inner | 0)
}
// @lc code=end

