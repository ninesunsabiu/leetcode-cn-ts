/*
 * @lc app=leetcode.cn id=792 lang=typescript
 *
 * [792] 匹配子序列的单词数
 *
 * https://leetcode.cn/problems/number-of-matching-subsequences/description/
 *
 * algorithms
 * Medium (47.83%)
 * Likes:    331
 * Dislikes: 0
 * Total Accepted:    31.1K
 * Total Submissions: 62K
 * Testcase Example:  '"abcde"\n["a","bb","acd","ace"]'
 *
 * 给定字符串 s 和字符串数组 words, 返回  words[i] 中是s的子序列的单词个数 。
 * 
 * 字符串的 子序列 是从原始字符串中生成的新字符串，可以从中删去一些字符(可以是none)，而不改变其余字符的相对顺序。
 * 
 * 
 * 例如， “ace” 是 “abcde” 的子序列。
 * 
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: s = "abcde", words = ["a","bb","acd","ace"]
 * 输出: 3
 * 解释: 有三个是 s 的子序列的单词: "a", "acd", "ace"。
 * 
 * 
 * Example 2:
 * 
 * 
 * 输入: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
 * 输出: 2
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= s.length <= 5 * 10^4
 * 1 <= words.length <= 5000
 * 1 <= words[i].length <= 50
 * words[i]和 s 都只由小写字母组成。
 * 
 * ​​​​
 */
export {}
// @lc code=start
const memoFn = <T extends (args: any) => any>(fn: T) => {
    type P = Parameters<T>[0]
    type R = ReturnType<T>
    const cache = new Map<P, R>()
    return (param: P): R => {
        if (cache.has(param)) {
            return cache.get(param)!
        } else {
            const r = fn(param)
            cache.set(param, r)
            return r;
        }
    }
}

const isSubSeq = (maybeSub: string) => {
    const lenMaybeSub = maybeSub.length

    const test = (str: string) => {
        const len = str.length
        if (lenMaybeSub > len) {
            return false
        } else if (lenMaybeSub === len) {
            return maybeSub === str
        } else {
            // lenMaybeSub < str
            let j = 0 
            for (const char of str) {
                if (j === lenMaybeSub) {
                    return true
                }
                if (char === maybeSub[j]) {
                    j += 1 
                }
            }
            return j === lenMaybeSub
        }
    }

    return memoFn(test)
}

const apply = <T>(i: T) => <K>(fn: (it: T) => K) => fn(i)

function numMatchingSubseq(s: string, words: string[]): number {
    const memoized = memoFn(isSubSeq)
    return words.map(memoized).filter(apply(s)).length
};
// @lc code=end

