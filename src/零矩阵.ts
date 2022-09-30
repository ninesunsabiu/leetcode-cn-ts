// link https://leetcode.cn/problems/zero-matrix-lcci/
// 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。

/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    // 整体思路
    // 扫描一遍矩阵 遇到 0 时记录其所在的行列，在后续扫描过程中
    // 如果是记录在册的行列，则将其改写为 0

    /**
     * 记录某个行列是否需要重置为 0  
     * - 1 为 行 需要写 0  
     * - 2 为 列 需要写 0  
     * - nil 为读取不操作状态
     */
    const writeZero: Array<number | undefined | null> = []

    // 扫表记录需要复写 0 的行列
    for (const [rowIdx, row] of matrix.entries()) {
        for (const [columnIdx, cell] of row.entries()) {
            if (cell === 0) {
                writeZero[rowIdx] = (writeZero[rowIdx] ?? 0) | 1
                writeZero[columnIdx] = (writeZero[columnIdx] ?? 0) | 2
            }
        }
    }

    // 扫表进行复写 0
    for (const [rowIdx, row] of matrix.entries()) {
        for (const [columnIdx] of row.entries()) {
            if (((writeZero[rowIdx] ?? 0) & 1) === 1) {
                // 行写 0
                row[columnIdx] = 0
            }
            if (((writeZero[columnIdx] ?? 0) & 2) === 2) {
                // 列写 0
                row[columnIdx] = 0
            }
        }
    }

}