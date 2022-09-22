/*
 * @lc app=leetcode.cn id=498 lang=typescript
 *
 * [498] 对角线遍历
 */

// @lc code=start
type NonEmptyArray<T> = [T, ...T[]];

function findDiagonalOrder(mat: NonEmptyArray<NonEmptyArray<number>>): Array<number> {
    // 获取矩阵的大小，看作是一个笛卡尔坐标系的坐标点范围
    const [maxX, maxY] = [mat.length - 1, mat[0].length - 1]
    // 按照所有对角线都满足 y = -x + b 的函数
    // 举例坐标原点最远的一条对角线是满足 (maxX, maxY) 落在函数上
    // 所以求出此时的 b 应该等于 b = maxX + maxY
    // 正好为截距式的截距
    // 所以从原点开始，到结局 b，所有对角线的数量为 b + 1 条
    const diagonalCount = maxX + maxY + 1

    return Array
    .from(
        { length: diagonalCount },
        (_, idx) => {
            // 生成 y = idx - x 的对角线函数
            // 并根据 题目中的遍历顺序，对应的坐标生成函数

            // dualNumber(point) = idx - number(point)
            // 也就是 y = idx - x 函数
            const number = (point: number) => point
            const dualNumber = (point: number) => idx - point
            // 坐标生成函数 统一让 x 的坐标从零开始递增，所以 调整 x 的生成函数
            // 并让 y 的生成函数满足 y = idx - x 性质
            const rangePoints = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => i + start);
            const [x, y, points] =
                idx % 2 === 0
                    ? (() => {
                          const start = Math.max(0, idx - maxX)
                          const end = Math.min(maxY, idx)
                          return [dualNumber, number, rangePoints(start, end)] as const;
                      })()
                    : (() => {
                          const start = Math.max(0, idx - maxY)
                          const end = Math.min(maxX, idx)
                          return [number, dualNumber, rangePoints(start, end)] as const;
                      })(); 

            return { x, y, points }
        }
    )
    .flatMap(
        ({ x, y, points }) => {
            // 生成所有即将在矩阵中取值坐标点
            return points.map(point => ({ x: x(point), y: y(point)})) 
        }
    )
    .reduce(
        (acc: Array<number>, { x, y }) => {
            const dataInMat = mat[x]?.[y];
            return dataInMat != null ? [...acc, dataInMat] : acc;
        },
        []
    )
}
// @lc code=end

