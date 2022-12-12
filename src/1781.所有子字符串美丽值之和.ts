/*
 * @lc app=leetcode.cn id=1781 lang=typescript
 *
 * [1781] 所有子字符串美丽值之和
 *
 * https://leetcode.cn/problems/sum-of-beauty-of-all-substrings/description/
 *
 * algorithms
 * Medium (54.31%)
 * Likes:    74
 * Dislikes: 0
 * Total Accepted:    18.7K
 * Total Submissions: 28.6K
 * Testcase Example:  '"aabcb"'
 *
 * 一个字符串的 美丽值 定义为：出现频率最高字符与出现频率最低字符的出现次数之差。
 * 
 * 
 * 比方说，"abaacc" 的美丽值为 3 - 1 = 2 。
 * 
 * 
 * 给你一个字符串 s ，请你返回它所有子字符串的 美丽值 之和。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "aabcb"
 * 输出：5
 * 解释：美丽值不为零的字符串包括 ["aab","aabc","aabcb","abcb","bcb"] ，每一个字符串的美丽值都为 1 。
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "aabcbaa"
 * 输出：17
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * s 只包含小写英文字母。
 * 
 * 
 */
export {}
// @lc code=start
function beautySum(s: string): number {
    const prefixSumFreq = Array.from(s)
        .reduce<Array<Record<string, number>>>(
            (a, b) => {
                const prev = a[0] ?? {}
                const prevv = prev[b] ?? 0
                const cur = { ...prev, [b]: prevv + 1 | 0 };
                a.unshift(cur)
                return a
            },
            []
        ).reverse();

    let ans = 0
    for (let idx = 0; idx < s.length; idx++) {
        for (let j = idx + 1; j < s.length; j++) {
            const y = s[j]!
            const record = (() => {
                const ans: Record<string, number> = {}
                for (const i of "abcdefghijklmnopqrstuvwxyz") {
                    const diff = (prefixSumFreq[j]![i] ?? 0) - (prefixSumFreq[idx - 1]?.[i] ?? 0) | 0
                    if (diff > 0) {
                        ans[i] = diff
                    }
                }
                return ans
            })()
            const freq = Object.values(record)
            const beauty = Math.max(...freq) - Math.min(...freq) | 0
            ans += beauty
        }
    }
    return ans
};
// @lc code=end

