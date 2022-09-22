/*
 * @lc app=leetcode.cn id=1260 lang=typescript
 *
 * [1260] 二维网格迁移
 */

// @lc code=start
function shiftGrid(grid: number[][], k: number): number[][] {

    // 得到行列数 范围
    const [m, n] = [grid.length, grid[0]?.length ?? 1];

    // 将矩阵转换为一位数组
    const flatten: Array<number> = grid.flat(1)

    const size = flatten.length

    const modK = k % size;

    // 移动末尾的 k 个元素到开头
    const afterMove = [flatten.slice(-modK), flatten.slice(0, size - modK)].flat(1)

    // 重新转换为二维数组
    const ans: Array<Array<number>> = Array.from({ length: m }, (_, row) => {
        return Array.from({ length: n }, (_, col) => {
            return afterMove[row * n + col]
        })
    })

    return ans
}
// @lc code=end

