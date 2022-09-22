/*
 * @lc app=leetcode.cn id=761 lang=typescript
 *
 * [761] 特殊的二进制序列
 *
 * https://leetcode.cn/problems/special-binary-string/description/
 *
 * algorithms
 * Hard (59.08%)
 * Likes:    184
 * Dislikes: 0
 * Total Accepted:    13.2K
 * Total Submissions: 17.6K
 * Testcase Example:  '"11011000"'
 *
 * 特殊的二进制序列是具有以下两个性质的二进制序列：
 * 
 * 
 * 0 的数量与 1 的数量相等。
 * 二进制序列的每一个前缀码中 1 的数量要大于等于 0 的数量。
 * 
 * 
 * 给定一个特殊的二进制序列 S，以字符串形式表示。定义一个操作 为首先选择 S
 * 的两个连续且非空的特殊的子串，然后将它们交换。（两个子串为连续的当且仅当第一个子串的最后一个字符恰好为第二个子串的第一个字符的前一个字符。)
 * 
 * 在任意次数的操作之后，交换后的字符串按照字典序排列的最大的结果是什么？
 * 
 * 示例 1:
 * 
 * 
 * 输入: S = "11011000"
 * 输出: "11100100"
 * 解释:
 * 将子串 "10" （在S[1]出现） 和 "1100" （在S[3]出现）进行交换。
 * 这是在进行若干次操作后按字典序排列最大的结果。
 * 
 * 
 * 说明:
 * 
 * 
 * S 的长度不超过 50。
 * S 保证为一个满足上述定义的特殊 的二进制序列。
 * 
 * 
 */
// @lc code=start
const sortedDescending = (s: Array<string>): Array<string> => {
    return [...s].sort((a, b) => b.localeCompare(a))
}

/**
 * 将形如 101100 分割成 [[10], [1100]] 的数组
 */
const splitStrByRule = (s: string): Array<string> => {
    const stack: Array<string> = []
    let ans = ''
    for (const char of s) {
        ans += char
        if (char === '1') {
            stack.push(char)
        } else {
            stack.pop()
            if (stack.length === 0) {
                // 栈被清空，意味着需要进入另外一个分组
                ans += '#'
            }
        }
    }
    return ans.replace(/#$/, '').split('#')
}

const sortSpecialRec = (s: string): string => {
    if (s.length <= 2) {
        return s
    } else {
        const innerS = s.replace(/^1|0$/g, '')
        const part = splitStrByRule(innerS);
        const sorted = sortedDescending(part.map(sortSpecialRec))

        return `1${sorted.join('')}0`
    }
}

function makeLargestSpecial(s: string): string {
    const allPart = splitStrByRule(s)
    return sortedDescending(allPart.map(sortSpecialRec)).join('')
};
// @lc code=end

