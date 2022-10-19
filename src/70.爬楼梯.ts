/*
 * @lc app=leetcode.cn id=70 lang=typescript
 *
 * [70] 爬楼梯
 *
 * https://leetcode.cn/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (53.98%)
 * Likes:    2700
 * Dislikes: 0
 * Total Accepted:    985.1K
 * Total Submissions: 1.8M
 * Testcase Example:  '2'
 *
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：n = 2
 * 输出：2
 * 解释：有两种方法可以爬到楼顶。
 * 1. 1 阶 + 1 阶
 * 2. 2 阶
 * 
 * 示例 2：
 * 
 * 
 * 输入：n = 3
 * 输出：3
 * 解释：有三种方法可以爬到楼顶。
 * 1. 1 阶 + 1 阶 + 1 阶
 * 2. 1 阶 + 2 阶
 * 3. 2 阶 + 1 阶
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= n <= 45
 * 
 * 
 */

// @lc code=start
function climbStairs(n: number): number {
    const record: Record<number, number> = {
        1: 1,
        2: 2,
        3: 3
    }
    const range = Array.from({ length: n - 3 }, (_, idx) => idx + 4)

    const ans = range.reduce(
        (acc, cur) => {
            return {
                ...acc,
                [cur]: (acc[cur - 1] ?? 0) + (acc[cur - 2] ?? 0) | 0
            }
        },
        record
    )

    return ans[n] ?? 0
};
// @lc code=end

