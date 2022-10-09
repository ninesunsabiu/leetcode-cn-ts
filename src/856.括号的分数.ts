/*
 * @lc app=leetcode.cn id=856 lang=typescript
 *
 * [856] 括号的分数
 *
 * https://leetcode.cn/problems/score-of-parentheses/description/
 *
 * algorithms
 * Medium (63.36%)
 * Likes:    432
 * Dislikes: 0
 * Total Accepted:    45K
 * Total Submissions: 66.1K
 * Testcase Example:  '"()"'
 *
 * 给定一个平衡括号字符串 S，按下述规则计算该字符串的分数：
 * 
 * 
 * () 得 1 分。
 * AB 得 A + B 分，其中 A 和 B 是平衡括号字符串。
 * (A) 得 2 * A 分，其中 A 是平衡括号字符串。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入： "()"
 * 输出： 1
 * 
 * 
 * 示例 2：
 * 
 * 输入： "(())"
 * 输出： 2
 * 
 * 
 * 示例 3：
 * 
 * 输入： "()()"
 * 输出： 2
 * 
 * 
 * 示例 4：
 * 
 * 输入： "(()(()))"
 * 输出： 6
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * S 是平衡括号字符串，且只含有 ( 和 ) 。
 * 2 <= S.length <= 50
 * 
 * 
 */
export {}
// @lc code=start
function scoreOfParentheses(s: string): number {
    // make ()() -> () + ()
    const explicitPlus = s.replace(/\)\(/g, ")+(")
    // make (()) -> (1)
    const explicitInitScore = explicitPlus.replace(/\(\)/g, "1")

    const computeRegex = /\((?<exp>[\d+]+)\)/g
    const computeExp = (s: string) => s.split("+").map(it => Number(it)).reduce((a, b) => a + b)
    const program = (s: string): number => {
        if (computeRegex.test(s)) {
            const runOnce = s.replace(
                computeRegex,
                (_, exp) => `${2 * computeExp(exp)}`
            )
            return program(runOnce)
        } else {
            return computeExp(s)
        }
    }
    return program(explicitInitScore)
};
// @lc code=end

