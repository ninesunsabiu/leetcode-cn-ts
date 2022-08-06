/*
 * @lc app=leetcode.cn id=48 lang=typescript
 *
 * [48] 旋转图像
 *
 * https://leetcode.cn/problems/rotate-image/description/
 *
 * algorithms
 * Medium (74.34%)
 * Likes:    1381
 * Dislikes: 0
 * Total Accepted:    359.3K
 * Total Submissions: 483.3K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[7,4,1],[8,5,2],[9,6,3]]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == matrix.length == matrix[i].length
 * 1 <= n <= 20
 * -1000 <= matrix[i][j] <= 1000
 * 
 * 
 * 
 * 
 */

// @lc code=start
/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    const n = matrix.length;
    const rounds = n / 2;
    for (let round = 0; round < rounds; round++) {
        // y 从 (round, round) 开始，到 (round, x) 结束
        // 比如最外圈就是从 (0,0) 开始，一直到 (0,n - 2 - 0) 结束
        // 下一圈就是从 (1,1) 开始，一直到 (0,n - 2 - 1) 结束
        // 所以 通项公式是 (round,round) 开始，到 (0,n - 2 - round)
        for (let y = round; y <= n - 2 - round; y++) {
            // 每次圈的某个点开始「旋转」时
            // 由对应的四个点按顺时针交换值
            // (0, 0) -> (0, n - 1),                (x, y) -> (y, n - 1 - x)
            // (0, n - 1) -> (n - 1, n - 1),        (y, n - 1 - x) -> (n - 1 - x, n - 1 - y)
            // (n - 1, n - 1) -> (n - 1, 0),        (n - 1 - x, n - 1 - y) -> (n - 1 - y, x)
            // (n - 1, 0) -> (0, 0),                (n - 1 - y, x) -> (x, y)
            const x = round
            const n1Y = n - 1 - y
            const n1X = n - 1 - x
            const tmp = matrix[x][y];

            matrix[x][y] = matrix[n1Y][x];
            matrix[n1Y][x] = matrix[n1X][n1Y];
            matrix[n1X][n1Y] = matrix[y][n1X];
            matrix[y][n1X] = tmp;
        }
    }

};
// @lc code=end

