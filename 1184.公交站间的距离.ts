/*
 * @lc app=leetcode.cn id=1184 lang=typescript
 *
 * [1184] 公交站间的距离
 */

// @lc code=start
function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {
    // 面向测试用例，start 和 destination 大小可能不同
    [start, destination] = start > destination ? [destination, start] : [start, destination];


    // 顺时针从起点到终点的公交车
    let [clockwisePointer, sumOfClockwise] = [start, 0] 
    // 逆时针从终点到起点的公交车
    // 因为只是求距离的话，反着开，距离也是一样的
    let [counterclockwisePointer, sumOfCounterClockwise] = [destination, 0]

    const ringEnd = distance.length + start

    while (true) {
        if (
            clockwisePointer === destination
            && sumOfClockwise <= sumOfCounterClockwise
        ) {
            // 顺时针到终点了 且 顺时针的距离已经小于逆时针的距离了
            // 因为距离总是单调递增了，所以此时的顺时针距离 必然是最小距离
            return sumOfClockwise
        }

        if (
            counterclockwisePointer === ringEnd 
            && sumOfCounterClockwise <= sumOfClockwise 
        ) {
            // 同理以上
            return sumOfCounterClockwise 
        }
 
        if (
            clockwisePointer === destination
            && counterclockwisePointer === ringEnd 
        ) {
            // 如果两个指针都到达了终点，取最小值
            return Math.min(sumOfClockwise, sumOfCounterClockwise)
        }


        // 开车 统计距离

        // 顺时针
        if (clockwisePointer < destination) {
            sumOfClockwise += distance[clockwisePointer++]
        }

        // 逆时针
        if (counterclockwisePointer < ringEnd) {
            sumOfCounterClockwise += distance[counterclockwisePointer % distance.length]
            counterclockwisePointer++
        }
    }

}
// @lc code=end

