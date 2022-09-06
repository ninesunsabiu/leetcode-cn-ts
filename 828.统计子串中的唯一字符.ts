/*
 * @lc app=leetcode.cn id=828 lang=typescript
 *
 * [828] 统计子串中的唯一字符
 *
 * https://leetcode.cn/problems/count-unique-characters-of-all-substrings-of-a-given-string/description/
 *
 * algorithms
 * Hard (55.78%)
 * Likes:    260
 * Dislikes: 0
 * Total Accepted:    22K
 * Total Submissions: 34.2K
 * Testcase Example:  '"ABC"'
 *
 * 我们定义了一个函数 countUniqueChars(s) 来统计字符串 s 中的唯一字符，并返回唯一字符的个数。
 * 
 * 例如：s = "LEETCODE" ，则其中 "L", "T","C","O","D" 都是唯一字符，因为它们只出现一次，所以
 * countUniqueChars(s) = 5 。
 * 
 * 本题将会给你一个字符串 s ，我们需要返回 countUniqueChars(t) 的总和，其中 t 是 s 的子字符串。输入用例保证返回值为 32
 * 位整数。
 * 
 * 注意，某些子字符串可能是重复的，但你统计时也必须算上这些重复的子字符串（也就是说，你必须统计 s 的所有子字符串中的唯一字符）。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入: s = "ABC"
 * 输出: 10
 * 解释: 所有可能的子串为："A","B","C","AB","BC" 和 "ABC"。
 * ⁠    其中，每一个子串都由独特字符构成。
 * ⁠    所以其长度总和为：1 + 1 + 1 + 2 + 2 + 3 = 10
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入: s = "ABA"
 * 输出: 8
 * 解释: 除了 countUniqueChars("ABA") = 1 之外，其余与示例 1 相同。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s = "LEETCODE"
 * 输出：92
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 10^5
 * s 只包含大写英文字符
 * 
 * 
 */
export {}
// @lc code=start
function uniqueLetterString(s: string): number {

    const getContributionCountFn = getContributionCount(s.length)

    return ofLazyPipe(() => Array.from(s))
        .pipe(getAllCharIndexArray)
        .pipe(
            // 稀疏数组使用 map API 会跳过空洞
            it => it.map(getContributionCountFn)
        )
        .pipe(sumNumberArray)
        .calc()
};

type Char = string;

const upperCaseAlphaASCIICode = 'A'.charCodeAt(0)

/**
 * 获得一个 26 个大写字母的 稀疏数组  
 * 该数组的第 i 项，代表第 i 个字母在给定字符串中的所有索引位置
 */
const getAllCharIndexArray = (s: Array<Char>): Array<Array<number>> => {
    // 稀疏数组
    const ans: Array<Array<number>> = []

    for (const [idxOfS, c] of s.entries()) {
        const idxOfAns = c.charCodeAt(0) - upperCaseAlphaASCIICode | 0
        const arrayInAns = ans[idxOfAns] ?? [];
        ans[idxOfAns] = arrayInAns;
        ans[idxOfAns]?.push(idxOfS);
    }

    return ans

}

/**
 * 根据间隔索引范围，计算一个某个字符的贡献度
 */
const getContributionCount = (endForRight: number) => {
    return (indexInterval: Array<number>) => {
        // 当 indexInterval 的 0 项做差值时，其前一个索引处为 -1
        const startOfLeft = -1
        let ans = 0
        for (const [idx, point] of indexInterval.entries()) {
            // 前一项
            const prevPoint = indexInterval[idx - 1 | 0] ?? startOfLeft
            const successorPoint = indexInterval[idx + 1 | 0] ?? endForRight
            ans += (point - prevPoint) * (successorPoint - point) | 0
        }
        return ans
    }
}


const sumInt = (a: number, b: number) => a + b | 0
const sumNumberArray = (as: Array<number>) => as.reduce(sumInt, 0)

type Pipeable<A> = {
    pipe: <B>(fn: (a: A) => B) => Pipeable<B>
    calc: () => A
}


const ofLazyPipe = <A>(lazyInput: () => A): Pipeable<A> => {
    return {
        pipe: <B>(fn: (a: A) => B) => ofLazyPipe(() => fn(lazyInput())),
        calc: lazyInput
    }
}


// @lc code=end

