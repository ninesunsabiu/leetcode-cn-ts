/*
 * @lc app=leetcode.cn id=1441 lang=typescript
 *
 * [1441] 用栈操作构建数组
 *
 * https://leetcode.cn/problems/build-an-array-with-stack-operations/description/
 *
 * algorithms
 * Medium (65.03%)
 * Likes:    86
 * Dislikes: 0
 * Total Accepted:    43.7K
 * Total Submissions: 61.5K
 * Testcase Example:  '[1,3]\n3'
 *
 * 给你一个数组 target 和一个整数 n。每次迭代，需要从  list = { 1 , 2 , 3 ..., n } 中依次读取一个数字。
 * 
 * 请使用下述操作来构建目标数组 target ：
 * 
 * 
 * "Push"：从 list 中读取一个新元素， 并将其推入数组中。
 * "Pop"：删除数组中的最后一个元素。
 * 如果目标数组构建完成，就停止读取更多元素。
 * 
 * 
 * 题目数据保证目标数组严格递增，并且只包含 1 到 n 之间的数字。
 * 
 * 请返回构建目标数组所用的操作序列。如果存在多个可行方案，返回任一即可。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：target = [1,3], n = 3
 * 输出：["Push","Push","Pop","Push"]
 * 解释： 
 * 读取 1 并自动推入数组 -> [1]
 * 读取 2 并自动推入数组，然后删除它 -> [1]
 * 读取 3 并自动推入数组 -> [1,3]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：target = [1,2,3], n = 3
 * 输出：["Push","Push","Push"]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：target = [1,2], n = 4
 * 输出：["Push","Push"]
 * 解释：只需要读取前 2 个数字就可以停止。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= target.length <= 100
 * 1 <= n <= 100
 * 1 <= target[i] <= n
 * target 严格递增
 * 
 * 
 */
export {}
// @lc code=start
function buildArray(target: number[], N: number): string[] {
    type Operate = "Push" | "Pop"
    const push: Operate = "Push"
    const pop: Operate = "Pop"

    return target.reduce<{ ans: Array<Operate>; prev: number }>(
        (acc, cur) => {
            // 相邻两数缺少的元素个数
            const count = cur - acc.prev - 1
            // 缺少个数有几个 ，就有几个 [Push, Pop]
            const middle = Array.from({ length: count }).flatMap(() => [push, pop])
            return {
                // 更新结果集
                ans: [...acc.ans,  ...middle, push],
                // 更新 前一个数
                prev: cur 
            }
        },
        { ans: [], prev: 0 }
    ).ans
};
// @lc code=end

