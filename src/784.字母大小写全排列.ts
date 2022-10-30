/*
 * @lc app=leetcode.cn id=784 lang=typescript
 *
 * [784] 字母大小写全排列
 *
 * https://leetcode.cn/problems/letter-case-permutation/description/
 *
 * algorithms
 * Medium (70.36%)
 * Likes:    466
 * Dislikes: 0
 * Total Accepted:    88.1K
 * Total Submissions: 122.7K
 * Testcase Example:  '"a1b2"'
 *
 * 给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。
 * 
 * 返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "a1b2"
 * 输出：["a1b2", "a1B2", "A1b2", "A1B2"]
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: s = "3z4"
 * 输出: ["3z4","3Z4"]
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= s.length <= 12
 * s 由小写英文字母、大写英文字母和数字组成
 * 
 * 
 */
export {}
// @lc code=start
const letterReg = /\D/

const getLetterIndex = (s: string) => Array.from(s).reduce<Array<number>>(
    (i, it, idx) => letterReg.test(it) ? [...i, idx] : i,
    []
)

function letterCasePermutation(s: string): string[] {
    const toLower = s.toLowerCase()
    const letterIndexArray = getLetterIndex(toLower)
    const len = letterIndexArray.length

    // 构造全排列
    const goRec = (ans: Array<Array<number>>, count: number): typeof ans => {
        if (count < len) {
            const letterIndex = letterIndexArray[count]!
            return goRec([...ans, [letterIndex], ...ans.map((it) => [...it, letterIndex])], count + 1 | 0)
        } else {
            return ans
        }
    }

    const toUpper = goRec([], 0)
        .map((toggleIndex) => {
            return Array.from(toLower).map(
                (it, idx) => toggleIndex.includes(idx) ? it.toUpperCase() : it
            ).join("")
        })

    return [toLower, ...toUpper]
};

// @lc code=end

