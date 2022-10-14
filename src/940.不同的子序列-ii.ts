/*
 * @lc app=leetcode.cn id=940 lang=typescript
 *
 * [940] 不同的子序列 II
 *
 * https://leetcode.cn/problems/distinct-subsequences-ii/description/
 *
 * algorithms
 * Hard (43.40%)
 * Likes:    277
 * Dislikes: 0
 * Total Accepted:    23.8K
 * Total Submissions: 44.9K
 * Testcase Example:  '"abc"'
 *
 * 给定一个字符串 s，计算 s 的 不同非空子序列 的个数。因为结果可能很大，所以返回答案需要对 10^9 + 7 取余 。
 * 
 * 字符串的 子序列 是经由原字符串删除一些（也可能不删除）字符但不改变剩余字符相对位置的一个新字符串。
 * 
 * 
 * 例如，"ace" 是 "abcde" 的一个子序列，但 "aec" 不是。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "abc"
 * 输出：7
 * 解释：7 个不同的子序列分别是 "a", "b", "c", "ab", "ac", "bc", 以及 "abc"。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "aba"
 * 输出：6
 * 解释：6 个不同的子序列分别是 "a", "b", "ab", "ba", "aa" 以及 "aba"。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s = "aaa"
 * 输出：3
 * 解释：3 个不同的子序列分别是 "a", "aa" 以及 "aaa"。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 2000
 * s 仅由小写英文字母组成
 * 
 * 
 * 
 * 
 */
export {}
// @lc code=start
const mod = 1e9 + 7
function distinctSubseqII(s: string): number {
    let ans = 0 
    const charAns: Array<number> = []
    for (const char of s) {
        const ascIICode = char.charCodeAt(0)
        const prev = charAns[ascIICode] ?? 0
        const cur = (ans + 1) % mod
        charAns[ascIICode] = cur
        ans = (ans + cur - prev + mod) % mod
    }
    return ans
};
// @lc code=end

