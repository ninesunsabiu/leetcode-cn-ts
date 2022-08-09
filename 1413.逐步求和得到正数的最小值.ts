/*
 * @lc app=leetcode.cn id=1413 lang=typescript
 *
 * [1413] 逐步求和得到正数的最小值
 *
 * https://leetcode.cn/problems/minimum-value-to-get-positive-step-by-step-sum/description/
 *
 * algorithms
 * Easy (69.60%)
 * Likes:    44
 * Dislikes: 0
 * Total Accepted:    17.1K
 * Total Submissions: 24.2K
 * Testcase Example:  '[-3,2,-3,4,2]\r'
 *
 * 给你一个整数数组 nums 。你可以选定任意的 正数 startValue 作为初始值。
 * 
 * 你需要从左到右遍历 nums 数组，并将 startValue 依次累加上 nums 数组中的值。
 * 
 * 请你在确保累加和始终大于等于 1 的前提下，选出一个最小的 正数 作为 startValue 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [-3,2,-3,4,2]
 * 输出：5
 * 解释：如果你选择 startValue = 4，在第三次累加时，和小于 1 。
 * ⁠               累加求和
 * startValue = 4 | startValue = 5 | nums
 * (4 -3 ) = 1  | (5 -3 ) = 2    |  -3
 * (1 +2 ) = 3  | (2 +2 ) = 4    |   2
 * (3 -3 ) = 0  | (4 -3 ) = 1    |  -3
 * (0 +4 ) = 4  | (1 +4 ) = 5    |   4
 * (4 +2 ) = 6  | (5 +2 ) = 7    |   2
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [1,2]
 * 输出：1
 * 解释：最小的 startValue 需要是正数。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [1,-2,-3]
 * 输出：5
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 100
 * -100 <= nums[i] <= 100
 * 
 * 
 */

// @lc code=start
const foldRight = <A, B>(zero: B, fn: (a: A, b: B) => B) => {
    return (as: Array<A>): B => {
        const rec = (ret: B, as: Array<A>): B => {
            const splitIdx = as.length - 1;
            const [init, last] = [as.slice(0, splitIdx), as.slice(splitIdx)[0]];
            return last != null ? rec(fn(last, ret), init) : ret;
        }

        return rec(zero, as);
    }
}

function minStartValue(nums: number[]): number {
    const minAccumulator = 1
    // 由右往左，进行不等式关系的传递
    // 得到 minStart + nums[0] >= x
    // 所以  minStart >= x - nums[0]
    // 当取得等号时，为最小
    return foldRight<number, number>(
        minAccumulator,
        (cur, minSum) => {
            // 设 cur 左边的总和是 x，则 x 必须满足以下要求
            // x + cur >= minSum  <=> x >= minSum - cur
            // 又 x 也是某次累加的结果，由题意对于任意累加的结果又 x >= 1
            // 所以 x >= 1 && x >= minSum - cur
            // 要想同时满足，则 x >= Max(1, minSum - cur)
            return Math.max(minSum - cur, minAccumulator);
        }
    )(nums)
};
// @lc code=end

