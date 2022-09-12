/*
 * @lc app=leetcode.cn id=1608 lang=typescript
 *
 * [1608] 特殊数组的特征值
 *
 * https://leetcode.cn/problems/special-array-with-x-elements-greater-than-or-equal-x/description/
 *
 * algorithms
 * Easy (59.42%)
 * Likes:    145
 * Dislikes: 0
 * Total Accepted:    41.8K
 * Total Submissions: 68.1K
 * Testcase Example:  '[3,5]'
 *
 * 给你一个非负整数数组 nums 。如果存在一个数 x ，使得 nums 中恰好有 x 个元素 大于或者等于 x ，那么就称 nums 是一个 特殊数组
 * ，而 x 是该数组的 特征值 。
 * 
 * 注意： x 不必 是 nums 的中的元素。
 * 
 * 如果数组 nums 是一个 特殊数组 ，请返回它的特征值 x 。否则，返回 -1 。可以证明的是，如果 nums 是特殊数组，那么其特征值 x 是
 * 唯一的 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：nums = [3,5]
 * 输出：2
 * 解释：有 2 个元素（3 和 5）大于或等于 2 。
 * 
 * 
 * 示例 2：
 * 
 * 输入：nums = [0,0]
 * 输出：-1
 * 解释：没有满足题目要求的特殊数组，故而也不存在特征值 x 。
 * 如果 x = 0，应该有 0 个元素 >= x，但实际有 2 个。
 * 如果 x = 1，应该有 1 个元素 >= x，但实际有 0 个。
 * 如果 x = 2，应该有 2 个元素 >= x，但实际有 0 个。
 * x 不能取更大的值，因为 nums 中只有两个元素。
 * 
 * 示例 3：
 * 
 * 输入：nums = [0,4,3,0,4]
 * 输出：3
 * 解释：有 3 个元素大于或等于 3 。
 * 
 * 
 * 示例 4：
 * 
 * 输入：nums = [3,6,7,7,0]
 * 输出：-1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 1000
 * 
 * 
 */

// @lc code=start
function specialArray(nums: number[]): number {
    const size = nums.length
    return nums
        .slice()
        .sort((a, b) => a < b ? -1 : a === b ? 0 : 1)
        // reduce 可以优化成自定义递归，实现短路操作
        .reduce<[ans: number, prevV: number]>(
            ([ret, prevV], item, idx) => {
                if (ret !== -1) {
                    // 成功需找到的短路逻辑
                    // 不再需要执行后续操作
                    return [ret, prevV] 
                }
                // 特征值的可能取值
                const specialSplitNum = size - idx
                // 如果该值符合在区间 (prevV, item] 中，则为符合条件的特征值
                const nextRet = prevV < specialSplitNum  && specialSplitNum <= item ? specialSplitNum : ret
                return [nextRet, item]
            },
            [-1, -1]
        )[0]
}
// @lc code=end

