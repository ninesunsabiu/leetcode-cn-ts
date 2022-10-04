/*
 * @lc app=leetcode.cn id=921 lang=typescript
 *
 * [921] 使括号有效的最少添加
 *
 * https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/description/
 *
 * algorithms
 * Medium (74.58%)
 * Likes:    183
 * Dislikes: 0
 * Total Accepted:    43.9K
 * Total Submissions: 59.3K
 * Testcase Example:  '"())"'
 *
 * 只有满足下面几点之一，括号字符串才是有效的：
 * 
 * 
 * 它是一个空字符串，或者
 * 它可以被写成 AB （A 与 B 连接）, 其中 A 和 B 都是有效字符串，或者
 * 它可以被写作 (A)，其中 A 是有效字符串。
 * 
 * 
 * 给定一个括号字符串 s ，移动N次，你就可以在字符串的任何位置插入一个括号。
 * 
 * 
 * 例如，如果 s = "()))" ，你可以插入一个开始括号为 "(()))" 或结束括号为 "())))" 。
 * 
 * 
 * 返回 为使结果字符串 s 有效而必须添加的最少括号数。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "())"
 * 输出：1
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "((("
 * 输出：3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 1000
 * s 只包含 '(' 和 ')' 字符。
 * 
 * 
 */

// @lc code=start
function minAddToMakeValid(s: string): number {
    const regex = /\(\)/g
    const 去掉有效子字符串 = (s: string): string => {
        const 去掉后 = s.replace(regex, "")
        if (去掉后.length === s.length) {
            // 不再发生变化 说明已经没有 “有效” 的串
            return s
        } else {
            return 去掉有效子字符串(去掉后)
        }
    }

    return 去掉有效子字符串(s).length
};
// @lc code=end

