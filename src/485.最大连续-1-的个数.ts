/*
 * @lc app=leetcode.cn id=485 lang=typescript
 *
 * [485] 最大连续 1 的个数
 *
 * https://leetcode.cn/problems/max-consecutive-ones/description/
 *
 * algorithms
 * Easy (61.12%)
 * Likes:    348
 * Dislikes: 0
 * Total Accepted:    175.2K
 * Total Submissions: 286.6K
 * Testcase Example:  '[1,1,0,1,1,1]'
 *
 * 给定一个二进制数组 nums ， 计算其中最大连续 1 的个数。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,1,0,1,1,1]
 * 输出：3
 * 解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入：nums = [1,0,1,1,0,1]
 * 输出：2
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^5
 * nums[i] 不是 0 就是 1.
 * 
 * 
 */
export {}
// @lc code=start
function findMaxConsecutiveOnes(nums: number[]): number {

    const [ret, temp] = nums.reduce(
        ([ret, temp], b) => {
            if (b === 1) return [ret, temp + 1]
            else return [Math.max(ret, temp), 0]
        },
        [0, 0]
    )    

    return Math.max(ret, temp)
};
// @lc code=end

