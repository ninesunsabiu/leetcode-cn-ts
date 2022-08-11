/*
 * @lc app=leetcode.cn id=1417 lang=typescript
 *
 * [1417] 重新格式化字符串
 *
 * https://leetcode.cn/problems/reformat-the-string/description/
 *
 * algorithms
 * Easy (51.97%)
 * Likes:    73
 * Dislikes: 0
 * Total Accepted:    35.7K
 * Total Submissions: 64.5K
 * Testcase Example:  '"a0b1c2"'
 *
 * 给你一个混合了数字和字母的字符串 s，其中的字母均为小写英文字母。
 * 
 * 请你将该字符串重新格式化，使得任意两个相邻字符的类型都不同。也就是说，字母后面应该跟着数字，而数字后面应该跟着字母。
 * 
 * 请你返回 重新格式化后 的字符串；如果无法按要求重新格式化，则返回一个 空字符串 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：s = "a0b1c2"
 * 输出："0a1b2c"
 * 解释："0a1b2c" 中任意两个相邻字符的类型都不同。 "a0b1c2", "0a1b2c", "0c2a1b" 也是满足题目要求的答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入：s = "leetcode"
 * 输出：""
 * 解释："leetcode" 中只有字母，所以无法满足重新格式化的条件。
 * 
 * 
 * 示例 3：
 * 
 * 输入：s = "1229857369"
 * 输出：""
 * 解释："1229857369" 中只有数字，所以无法满足重新格式化的条件。
 * 
 * 
 * 示例 4：
 * 
 * 输入：s = "covid2019"
 * 输出："c2o0v1i9d"
 * 
 * 
 * 示例 5：
 * 
 * 输入：s = "ab123"
 * 输出："1a2b3"
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 500
 * s 仅由小写英文字母和/或数字组成。
 * 
 * 
 */

// @lc code=start

/**
 * 对一个数组进行分离操作，符合 `pred` 条件的将会划入 left 否则，划入 right
 * @example
 * ```typescript
 * partition(isEven)([1,2,3,4,5,6]) // { left: [2,4,6], right: [1,3,5] }
 * ```
 */
const partition = <A>(pred: (it: A) => boolean) => {
    return (as: Array<A>): Record<"left" | "right", Array<A>> => {
        return as.reduce(
            (acc: Record<"left" | "right", Array<A>>, cur) => {
                if (pred(cur)) {
                    return { ...acc, left: [...acc.left, cur] }
                } else {
                    return { ...acc, right: [...acc.right, cur] }
                }
            },
            { left: [], right: [] }
        )
    }
}

const digitRegexp = /\d/

const isDigit: (it: string) => boolean = digitRegexp.test.bind(digitRegexp)

const partitionByDigit = partition(isDigit)

/**
 * 拉链数组    
 * 将两个数组 [a,b,c] 和 [A,B,C] 像拉链一样合在一起，得到 [a,A,b,B,c,C]  
 * 当其中一个数组提前结束时，另一个数组的剩余元素将被全部"接上"  
 */
const zip = <A, B>(left: Array<A>, right: Array<B>): Array<A | B> => {
    const recursionDo = (acc: Array<A | B>) => {
        return (left: Array<A>, right: Array<B>) => {
            if (left.length === 0) {
                return [...acc, ...right]
            } else if(right.length === 0) {
                return [...acc, ...left]
            } else {
                const [a, ...tailA] = left
                const [b, ...tailB] = right
                return recursionDo([...acc, a, b])(tailA, tailB)
            }
        }
    }
    return recursionDo([])(left, right)
}

function reformat(s: string): string {
    const { left: digitArray, right: alphaArray } = partitionByDigit(Array.from(s))
    const  sizeForDigit = digitArray.length
    const  sizeForAlpha = alphaArray.length
    if (Math.abs(sizeForDigit - sizeForAlpha) > 1) {
        // 无法组合交错，因此无法“格式化”，返回空串
        return ''
    } else {
        return zip(
            // 以长度大的数组为拉链头，对两个数组进行 zip
            ...(sizeForDigit > sizeForAlpha ? [digitArray, alphaArray] as const: [alphaArray, digitArray] as const),
        ).join('')
    }
};
// @lc code=end

