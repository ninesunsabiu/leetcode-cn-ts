/*
 * @lc app=leetcode.cn id=1582 lang=typescript
 *
 * [1582] 二进制矩阵中的特殊位置
 *
 * https://leetcode.cn/problems/special-positions-in-a-binary-matrix/description/
 *
 * algorithms
 * Easy (66.88%)
 * Likes:    65
 * Dislikes: 0
 * Total Accepted:    26.4K
 * Total Submissions: 38.1K
 * Testcase Example:  '[[1,0,0],[0,0,1],[1,0,0]]'
 *
 * 给你一个大小为 rows x cols 的矩阵 mat，其中 mat[i][j] 是 0 或 1，请返回 矩阵 mat 中特殊位置的数目 。
 * 
 * 特殊位置 定义：如果 mat[i][j] == 1 并且第 i 行和第 j 列中的所有其他元素均为 0（行和列的下标均 从 0 开始 ），则位置 (i,
 * j) 被称为特殊位置。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：mat = [[1,0,0],
 * [0,0,1],
 * [1,0,0]]
 * 输出：1
 * 解释：(1,2) 是一个特殊位置，因为 mat[1][2] == 1 且所处的行和列上所有其他元素都是 0
 * 
 * 
 * 示例 2：
 * 
 * 输入：mat = [[1,0,0],
 * [0,1,0],
 * [0,0,1]]
 * 输出：3
 * 解释：(0,0), (1,1) 和 (2,2) 都是特殊位置
 * 
 * 
 * 示例 3：
 * 
 * 输入：mat = [[0,0,0,1],
 * [1,0,0,0],
 * [0,1,1,0],
 * [0,0,0,0]]
 * 输出：2
 * 
 * 
 * 示例 4：
 * 
 * 输入：mat = [[0,0,0,0,0],
 * [1,0,0,0,0],
 * [0,1,0,0,0],
 * [0,0,1,0,0],
 * [0,0,0,1,1]]
 * 输出：3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * rows == mat.length
 * cols == mat[i].length
 * 1 <= rows, cols <= 100
 * mat[i][j] 是 0 或 1
 * 
 * 
 */
export {}
// @lc code=start
function numSpecial(mat: number[][]): number {
    const getCol = memoFn((colId: number) => {
        return mat.map((row) => row[colId]!)
    })

    const findOnlyOneIIndexMemo = memoFn(findOnlyOneIIndex)

    // 答案数 必然小于等于 x, y 的最小值
    // 因此无论用谁做外层迭代 都可以
    return mat.filter(
        (row) => {
            // 如果行满足 只有 一个 1 的话
            // 以 1 判断 1 所在的列 是否满足只有一个 1
            const colIdx = findOnlyOneIIndexMemo(row)
            return colIdx !== false && findOnlyOneIIndexMemo(getCol(colIdx)) !== false
        }
    )
    .length
};

const memoFn = <T extends (args: any) => any>(fn: T) => {
    type P = Parameters<T>[0]
    type R = ReturnType<T>
    const cache = new Map<P, R>()
    return (param: P): R => {
        if (cache.has(param)) {
            return cache.get(param)!
        } else {
            const r = fn(param)
            cache.set(param, r)
            return r;
        }
    }
}

/**
 * 判断一个数组 是否 仅仅包含一个 数字 1
 */
const findOnlyOneIIndex = (num: Array<number>): false | number => {
    const isI = (it: number) => it === 1
    const l = num.findIndex(isI)

    if (l !== -1) {
        const r = num.slice().reverse().findIndex(isI)
        return num.length - 1 - r === l ? l : false
    } else {
        return false
    }
}

// @lc code=end

