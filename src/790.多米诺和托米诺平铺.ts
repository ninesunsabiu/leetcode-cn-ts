/*
 * @lc app=leetcode.cn id=790 lang=typescript
 *
 * [790] 多米诺和托米诺平铺
 *
 * https://leetcode.cn/problems/domino-and-tromino-tiling/description/
 *
 * algorithms
 * Medium (46.44%)
 * Likes:    229
 * Dislikes: 0
 * Total Accepted:    19.7K
 * Total Submissions: 35.5K
 * Testcase Example:  '3'
 *
 * 有两种形状的瓷砖：一种是 2 x 1 的多米诺形，另一种是形如 "L" 的托米诺形。两种形状都可以旋转。
 * 
 * 
 * 
 * 给定整数 n ，返回可以平铺 2 x n 的面板的方法的数量。返回对 10^9 + 7 取模 的值。
 * 
 * 平铺指的是每个正方形都必须有瓷砖覆盖。两个平铺不同，当且仅当面板上有四个方向上的相邻单元中的两个，使得恰好有一个平铺有一个瓷砖占据两个正方形。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 
 * 
 * 输入: n = 3
 * 输出: 5
 * 解释: 五种不同的方法如上所示。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: n = 1
 * 输出: 1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= n <= 1000
 * 
 * 
 */

// @lc code=start
const mod = 1e9 + 7

function numTilings(n: number): number {
    // f(1) => 1
    // f(2) => 2
    // f(3) => 5
    // f(4) => 11
    // f(n) => 2 * f(n - 1) + f(n - 3)
    const f: Array<number> = [1, 1, 2, 5]
    if (n <= 3) {
        return f[n]!
    } else {
        for (const i of Array.from({length: n - 3}, (_, idx) => idx + 4)) {
            f[i] = (2 * f[i-1]! + f[i-3]!) % mod
        } 
        return f[n]!
    }
};
// @lc code=end

