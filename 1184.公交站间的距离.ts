/*
 * @lc app=leetcode.cn id=1184 lang=typescript
 *
 * [1184] 公交站间的距离
 */

// @lc code=start
function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {
    // 交换起点和终点 使得起点小于终点 并不会影响结果
    [start, destination] = start <= destination ? [start, destination] : [destination, start];

    const sum = (s: number, e: number) => distance.slice(s, e).reduce((a, b) => a + b, 0);

    // 内环距离和
    const a = sum(start, destination);
    // 外圈距离和
    const b = sum(0, start) + sum(destination, distance.length);

    return Math.min(a, b)
}
// @lc code=end

