/*
 * @lc app=leetcode.cn id=640 lang=typescript
 *
 * [640] 求解方程
 *
 * https://leetcode.cn/problems/solve-the-equation/description/
 *
 * algorithms
 * Medium (42.45%)
 * Likes:    171
 * Dislikes: 0
 * Total Accepted:    30.2K
 * Total Submissions: 67.7K
 * Testcase Example:  '"x+5-3+x=6+x-2"'
 *
 * 求解一个给定的方程，将x以字符串 "x=#value" 的形式返回。该方程仅包含 '+' ， '-' 操作，变量 x 和其对应系数。
 * 
 * 如果方程没有解，请返回 "No solution" 。如果方程有无限解，则返回 “Infinite solutions” 。
 * 
 * 题目保证，如果方程中只有一个解，则 'x' 的值是一个整数。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入: equation = "x+5-3+x=6+x-2"
 * 输出: "x=2"
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: equation = "x=x"
 * 输出: "Infinite solutions"
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入: equation = "2x=x"
 * 输出: "x=0"
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 3 <= equation.length <= 1000
 * equation 只有一个 '='.
 * equation 方程由整数组成，其绝对值在 [0, 100] 范围内，不含前导零和变量 'x' 。 ​​​
 * 
 * 
 */

// @lc code=start
type 分离系数 = [未知数系数: number, 常数系数: number]
/**
 * 对一个 形如 1-42x+4-x+32x+x 的表达式进行拆解
 */
const 移项合并同类项 = (exp: string): 分离系数 => {
    // 目的是为了让 +x 和 -x 的系数 1 能够显式的表达
    const 正规化表达式 = exp
                        .replace(/^x/, '1x')
                        .replace(/[\-+]?0x/, '')
                        .replace(/([\-+])x/g, '$11x')

    // 利用正则的肯定后向匹配 分离各项
    // 1-3+4-5x+6x+x 会被分离成 [1, -3, +4, -5x, +6x, +x]
    const 分离各项 = 正规化表达式.split(/(?=[\-+])/)

    // 按未知数和常数进行分离，过程中顺便转化为数字并做加减
    let 未知数系数 = 0
    let 常数项系数 = 0

    for (const item of 分离各项) {
        if (/x/.test(item)) {
            未知数系数 += parseInt(item.replace(/x/, '')) 
        } else {
            常数项系数 += item === '' ? 0 : parseInt(item)
        }
    }

    return [未知数系数, 常数项系数]
}

function solveEquation(equation: string): string {

    const [left, right] = equation.split(/=/)
    const [ll, lr] = 移项合并同类项(left)
    const [rl, rr] = 移项合并同类项(right)

    if (ll === rl) {
        return lr !== rr ? "No solution" : "Infinite solutions"
    } else {
        const v = (rr - lr) / (ll - rl)
        return `x=${v}`
    }
};
// @lc code=end

