/*
 * @lc app=leetcode.cn id=816 lang=typescript
 *
 * [816] 模糊坐标
 *
 * https://leetcode.cn/problems/ambiguous-coordinates/description/
 *
 * algorithms
 * Medium (50.58%)
 * Likes:    129
 * Dislikes: 0
 * Total Accepted:    20.5K
 * Total Submissions: 33.3K
 * Testcase Example:  '"(123)"'
 *
 * 我们有一些二维坐标，如 "(1, 3)" 或 "(2,
 * 0.5)"，然后我们移除所有逗号，小数点和空格，得到一个字符串S。返回所有可能的原始字符串到一个列表中。
 * 
 * 原始的坐标表示法不会存在多余的零，所以不会出现类似于"00", "0.0", "0.00", "1.0", "001",
 * "00.01"或一些其他更小的数来表示坐标。此外，一个小数点前至少存在一个数，所以也不会出现“.1”形式的数字。
 * 
 * 最后返回的列表可以是任意顺序的。而且注意返回的两个数字中间（逗号之后）都有一个空格。
 * 
 * 
 * 
 * 
 * 示例 1:
 * 输入: "(123)"
 * 输出: ["(1, 23)", "(12, 3)", "(1.2, 3)", "(1, 2.3)"]
 * 
 * 
 * 
 * 示例 2:
 * 输入: "(00011)"
 * 输出:  ["(0.001, 1)", "(0, 0.011)"]
 * 解释: 
 * 0.0, 00, 0001 或 00.01 是不被允许的。
 * 
 * 
 * 
 * 示例 3:
 * 输入: "(0123)"
 * 输出: ["(0, 123)", "(0, 12.3)", "(0, 1.23)", "(0.1, 23)", "(0.1, 2.3)",
 * "(0.12, 3)"]
 * 
 * 
 * 
 * 示例 4:
 * 输入: "(100)"
 * 输出: [(10, 0)]
 * 解释: 
 * 1.0 是不被允许的。
 * 
 * 
 * 
 * 
 * 提示: 
 * 
 * 
 * 4 <= S.length <= 12.
 * S[0] = "(", S[S.length - 1] = ")", 且字符串 S 中的其他元素都是数字。
 * 
 * 
 * 
 * 
 */
export {}
// @lc code=start
const partitionIter = (s: string, keepLast?: boolean) => {
    let splitAt = 1
    const len = s.length
    const done = () => keepLast ? splitAt < len : splitAt <= len
    return {
        [Symbol.iterator]: function* () {
            while (done()) {
                yield [s.slice(0, splitAt), s.slice(splitAt)] as const
                splitAt++
            }
        }
    }
}

const isAllZero = (s: string) => {
    const set = new Set(s)
    return set.size === 1 && s[0] === "0"
}

/**
 * 判断一个值是否能作为坐标点
 */
const canBePoint = (s: string) => {
    if (s.length > 1) {
        return !isAllZero(s)
    } else if (s.length === 1) {
        return true
    } else {
        throw new Error()
    }
}

const canCombineToPoint = (cardinal: string, decimal: string) => {
    if (cardinal.length > 1) {
        // 大于一位数，必不能以 0 开头
        return !cardinal.startsWith("0") && !decimal.endsWith("0")
    } else if (cardinal.length === 1) {
        return !decimal.endsWith("0")
    } else {
        throw new Error()
    }
}

const combine = (cardinal: string, decimal: string) => {
    return `${cardinal}${decimal === '' ? '' : '.'+decimal}`
}

function ambiguousCoordinates(s: string): string[] {
    // 左右括号先不要
    const digits = s.slice(1, -1)

    const ans: Array<string> = []

    for (const [x, y] of partitionIter(digits, true)) {
        if (canBePoint(x) && canBePoint(y)) {
            for (const [a, b] of partitionIter(x)) {
                if (canCombineToPoint(a, b)) {
                    for (const [c, d] of partitionIter(y)) {
                        if (canCombineToPoint(c, d)) {
                            ans.push(
                                `(${combine(a, b)}, ${combine(c, d)})`
                            )
                        }
                    }
                }
            }
        }
    }

    return ans;

};
// @lc code=end

