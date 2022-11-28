/*
 * @lc app=leetcode.cn id=813 lang=typescript
 *
 * [813] 最大平均值和的分组
 *
 * https://leetcode.cn/problems/largest-sum-of-averages/description/
 *
 * algorithms
 * Medium (56.38%)
 * Likes:    337
 * Dislikes: 0
 * Total Accepted:    22.2K
 * Total Submissions: 36.8K
 * Testcase Example:  '[9,1,2,3,9]\n3'
 *
 * 给定数组 nums 和一个整数 k 。我们将给定的数组 nums 分成 最多 k 个相邻的非空子数组 。 分数 由每个子数组内的平均值的总和构成。
 * 
 * 注意我们必须使用 nums 数组中的每一个数进行分组，并且分数不一定需要是整数。
 * 
 * 返回我们所能得到的最大 分数 是多少。答案误差在 10^-6 内被视为是正确的。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: nums = [9,1,2,3,9], k = 3
 * 输出: 20.00000
 * 解释: 
 * nums 的最优分组是[9], [1, 2, 3], [9]. 得到的分数是 9 + (1 + 2 + 3) / 3 + 9 = 20. 
 * 我们也可以把 nums 分成[9, 1], [2], [3, 9]. 
 * 这样的分组得到的分数为 5 + 2 + 6 = 13, 但不是最大值.
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: nums = [1,2,3,4,5,6,7], k = 4
 * 输出: 20.50000
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= nums.length <= 100
 * 1 <= nums[i] <= 10^4
 * 1 <= k <= nums.length
 * 
 * 
 */
export {}
// @lc code=start

/**
 * 对数组 array 进行划分为 k 个连续数组的结果集合
 */
const iterAllPartition = <T>(k: number, array: Array<T>): Array<Array<Array<T>>> => {
    if (k === 1) {
        return [[array]]
    } else {
        const len = array.length
        const range = len - k + 1 | 0
        return Array.from({length: range}, (_, idx) => idx + 1)
            .map(
                (it) => [array.slice(0, it), array.slice(it)] as const
            )
            .flatMap(
                ([part, rest]) => {
                    return iterAllPartition(k - 1 | 0, rest).map(
                        it => [part, ...it]
                    )
                }
            )
    }
}

/**
 * 计算 前缀和
 */
const getPrefixSum = (array: Array<number>): Array<number> => {
    return [0].concat(array.reduce<Array<number>>(
        (ans, cur, idx) => {
            const t = ans[idx - 1] ?? 0
            ans[idx] = t + cur
            return ans
        },
        []
    ))
}

function largestSumOfAverages(nums: number[], k: number): number {
    const len = nums.length
    const prefixSumArray = getPrefixSum(nums)

    // 用 dp[i][j] 表示 [0, i - 1] 中被分成 j 个分组时的最大 scope
    // 则题目所要求的解 为 dp[len][k]
    const dp = (() => {
        const ret = Array.from({length: len + 1}, (_, idx) => {
            return Array.from({length: idx + 1}, () => 0)
        })
        // 考虑 j = 0
        // 填充 dp[i][1] 的情况, [0, i - 1] 的平均值是也
        for (let i = 1; i <= len; i++) {
            ret[i]![1] = prefixSumArray[i]! / i;
        }

        // 考虑 j 在 [2, k] 的情况
        for (let j = 2; j <= k; j++) {
            for (let i = j; i <= len; i++) {
                for (let x = j - 1; x < i; x++) {
                    ret[i]![j] = Math.max(ret[i]![j]!, ret[x]![j - 1]! + (prefixSumArray[i]! - prefixSumArray[x]!) / (i - x));
                }
            }
        }
        return ret
    })()

    return dp[len]![k]!
};
// @lc code=end

