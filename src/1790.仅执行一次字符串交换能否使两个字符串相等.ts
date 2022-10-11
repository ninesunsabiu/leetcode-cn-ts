/*
 * @lc app=leetcode.cn id=1790 lang=typescript
 *
 * [1790] 仅执行一次字符串交换能否使两个字符串相等
 *
 * https://leetcode.cn/problems/check-if-one-string-swap-can-make-strings-equal/description/
 *
 * algorithms
 * Easy (54.28%)
 * Likes:    86
 * Dislikes: 0
 * Total Accepted:    51.7K
 * Total Submissions: 96.7K
 * Testcase Example:  '"bank"\n"kanb"'
 *
 * 给你长度相等的两个字符串 s1 和 s2 。一次 字符串交换 操作的步骤如下：选出某个字符串中的两个下标（不必不同），并交换这两个下标所对应的字符。
 * 
 * 如果对 其中一个字符串 执行 最多一次字符串交换 就可以使两个字符串相等，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：s1 = "bank", s2 = "kanb"
 * 输出：true
 * 解释：例如，交换 s2 中的第一个和最后一个字符可以得到 "bank"
 * 
 * 
 * 示例 2：
 * 
 * 输入：s1 = "attack", s2 = "defend"
 * 输出：false
 * 解释：一次字符串交换无法使两个字符串相等
 * 
 * 
 * 示例 3：
 * 
 * 输入：s1 = "kelb", s2 = "kelb"
 * 输出：true
 * 解释：两个字符串已经相等，所以不需要进行字符串交换
 * 
 * 
 * 示例 4：
 * 
 * 输入：s1 = "abcd", s2 = "dcba"
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s1.length, s2.length <= 100
 * s1.length == s2.length
 * s1 和 s2 仅由小写英文字母组成
 * 
 * 
 */
export {}
// @lc code=start
function areAlmostEqual(s1: string, s2: string): boolean {
    const len = s1.length

    const scanStr = (acc: Array<[string, string]>, count: number): boolean => {
        if (count === 0) {
            // 全串扫描完毕
            const lenOfDiff = acc.length
            // 无不相等 或者 仅有两个不等且互换相等时 返回 true
            return lenOfDiff === 0 
                    || (lenOfDiff === 2 && acc[0]![0] === acc[1]![1] && acc[0]![1] === acc[1]![0])
        } else {
            const idx = count - 1
            const a = s1.charAt(idx)
            const b = s2.charAt(idx)
            return a !== b 
                    // 如果此时 不等字符已经超过 2 个 则直接返回 false 否则 递归处理
                    ? acc.length >= 2 ? false : scanStr([...acc, [a, b]], count - 1)
                    // 相等时继续递归，执行次数减 1
                    : scanStr(acc, count - 1)
        }
    }

    return scanStr([], len)
};
// @lc code=end

