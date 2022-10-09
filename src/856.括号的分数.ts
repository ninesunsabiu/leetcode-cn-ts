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
    const program = (k: (score: number) => number, s: string): number => {
        const [balanced, rest] = takeWhileBalanceParentheses(s)
        if (balanced !== "()") {
            const inner = balanced.slice(1, -1)
            return program(
                (score) => {
                    const curScore = 2 * score
                    if (rest.length > 0) {
                        return program(
                            (it) => k(curScore + it),
                            rest
                        )
                    } else {
                        return k(curScore)
                    }
                },
                inner
            )
        } else {
            return rest.length > 0 ? program((score) => k(1 + score), rest) : k(1)
        }
    
    }

    return program(it => it, s)
};

type TakeWhileRet = [balanced: string, rest: string]
const takeWhileBalanceParentheses = (s: string): TakeWhileRet => {
    const leftParenthesis = "("
    const getMarkScore = (it: string) => it === leftParenthesis ? -1 : 1

    const program = (p: { result: string; score: number }, matching: string): TakeWhileRet => {
        const { result, score } = p
        if (score === 0) {
            return [result, matching]
        } else {
            if (matching.length > 0) {
                const [hd, rest] = [matching.slice(0, 1), matching.slice(1)]
                return program(
                    { result: result + hd, score: score + getMarkScore(hd) | 0 },
                    rest
                )
            } else {
                return [result, ""]
            }
        }
    }
    const [hd, rest] = [s.slice(0, 1), s.slice(1)]
    return program({ result: hd, score: getMarkScore(hd) }, rest)
}
// @lc code=end

