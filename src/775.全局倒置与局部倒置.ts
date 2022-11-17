/*
 * @lc app=leetcode.cn id=775 lang=typescript
 *
 * [775] 全局倒置与局部倒置
 *
 * https://leetcode.cn/problems/global-and-local-inversions/description/
 *
 * algorithms
 * Medium (45.82%)
 * Likes:    190
 * Dislikes: 0
 * Total Accepted:    29.1K
 * Total Submissions: 59.5K
 * Testcase Example:  '[1,0,2]'
 *
 * 给你一个长度为 n 的整数数组 nums ，表示由范围 [0, n - 1] 内所有整数组成的一个排列。
 * 
 * 全局倒置 的数目等于满足下述条件不同下标对 (i, j) 的数目：
 * 
 * 
 * 0 <= i < j < n
 * nums[i] > nums[j]
 * 
 * 
 * 局部倒置 的数目等于满足下述条件的下标 i 的数目：
 * 
 * 
 * 0 <= i < n - 1
 * nums[i] > nums[i + 1]
 * 
 * 
 * 当数组 nums 中 全局倒置 的数量等于 局部倒置 的数量时，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,0,2]
 * 输出：true
 * 解释：有 1 个全局倒置，和 1 个局部倒置。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [1,2,0]
 * 输出：false
 * 解释：有 2 个全局倒置，和 1 个局部倒置。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == nums.length
 * 1 <= n <= 10^5
 * 0 <= nums[i] < n
 * nums 中的所有整数 互不相同
 * nums 是范围 [0, n - 1] 内所有数字组成的一个排列
 * 
 * 
 */
export {}
// @lc code=start
const range = (count: number, offset = 0) =>
                Array.from({length: count}, (_, it) => it + offset | 0)

function isIdealPermutation(nums: number[]): boolean {
    let maxSeen = -1
    for (const idx of range(nums.length - 1)) {
        const [a, b] = [nums[idx]!, nums[idx+1]!]
        if (a > b) {
            // 发生了下降
            if (b < maxSeen) {
                return false
            } else {
                maxSeen = a
            }
        } else {
            // a < b
            // 判断 b 是否比当前的最大值还大
            if (b < maxSeen) {
                return false
            } else {
                maxSeen = Math.max(a, maxSeen)
            }
        }
    }

    return true
}
// @lc code=end

