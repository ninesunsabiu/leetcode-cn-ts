/*
 * @lc app=leetcode.cn id=793 lang=typescript
 *
 * [793] 阶乘函数后 K 个零
 *
 * https://leetcode.cn/problems/preimage-size-of-factorial-zeroes-function/description/
 *
 * algorithms
 * Hard (40.76%)
 * Likes:    165
 * Dislikes: 0
 * Total Accepted:    19.4K
 * Total Submissions: 41.3K
 * Testcase Example:  '0'
 *
 *  f(x) 是 x! 末尾是 0 的数量。回想一下 x! = 1 * 2 * 3 * ... * x，且 0! = 1 。
 * 
 * 
 * 例如， f(3) = 0 ，因为 3! = 6 的末尾没有 0 ；而 f(11) = 2 ，因为 11!= 39916800 末端有 2 个 0 。
 * 
 * 
 * 给定 k，找出返回能满足 f(x) = k 的非负整数 x 的数量。
 * 
 * 
 * 
 * 示例 1： 
 * 
 * 
 * 输入：k = 0
 * 输出：5
 * 解释：0!, 1!, 2!, 3!, 和 4! 均符合 k = 0 的条件。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：k = 5
 * 输出：0
 * 解释：没有匹配到这样的 x!，符合 k = 5 的条件。
 * 
 * 示例 3:
 * 
 * 
 * 输入: k = 3
 * 输出: 5
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 0 <= k <= 10^9
 * 
 * 
 */

// @lc code=start
/**
 * 对 k 进行特征识别，满足某一特征的 k 返回值是 0  
 * 即 无法出现 末尾连续 k 个零 的数阶乘  
 * 否则 返回值为 5 ，因为从最小符合 末尾连续 k 个 零的数开始  
 * 再经过连续的 4 个数，都不会增加 5 的因素个数 所以末尾连续 0 的个数相同  
 * 而到之后的第 5 个数之后，末尾 0 的个数将会增加，而增加的0的个数，为这个数 5 的因素的个数  
 * 
 * 对 k 的判断方法来自 LeetCode 题解 [白](https://leetcode.cn/u/vclip/)
 */
function preimageSizeFZF(k: number): number {
    return isSpecialK(k) ? 0 : 5
};

const isSpecialK = (k: number): boolean => {
    let longK = BigInt(k)
    let p = 5n
    while ((5n * p - 1n) / 4n <= longK) {
        p *= 5n
    }

    while (longK > 0) {
        const b = (p - 1n) / 4n
        if ((longK / b) >= 5n) {
            return true
        }
        longK = longK % b
        p = p / 5n
    }

    return false
}
// @lc code=end

