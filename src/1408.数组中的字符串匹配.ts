/*
 * @lc app=leetcode.cn id=1408 lang=typescript
 *
 * [1408] 数组中的字符串匹配
 *
 * https://leetcode.cn/problems/string-matching-in-an-array/description/
 *
 * algorithms
 * Easy (61.92%)
 * Likes:    72
 * Dislikes: 0
 * Total Accepted:    32.9K
 * Total Submissions: 51.2K
 * Testcase Example:  '["mass","as","hero","superhero"]'
 *
 * 给你一个字符串数组 words ，数组中的每个字符串都可以看作是一个单词。请你按 任意 顺序返回 words 中是其他单词的子字符串的所有单词。
 * 
 * 如果你可以删除 words[j] 最左侧和/或最右侧的若干字符得到 word[i] ，那么字符串 words[i] 就是 words[j]
 * 的一个子字符串。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：words = ["mass","as","hero","superhero"]
 * 输出：["as","hero"]
 * 解释："as" 是 "mass" 的子字符串，"hero" 是 "superhero" 的子字符串。
 * ["hero","as"] 也是有效的答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入：words = ["leetcode","et","code"]
 * 输出：["et","code"]
 * 解释："et" 和 "code" 都是 "leetcode" 的子字符串。
 * 
 * 
 * 示例 3：
 * 
 * 输入：words = ["blue","green","bu"]
 * 输出：[]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= words.length <= 100
 * 1 <= words[i].length <= 30
 * words[i] 仅包含小写英文字母。
 * 题目数据 保证 每个 words[i] 都是独一无二的。
 * 
 * 
 */
// @lc code=start
/**
 * 判断一个字符串 `a` 是否是 `b` 的子字符串
 */
const isSub = (a: string) => {
    // 先使用内置字符串方法进行判断 节省时间
    // 否则，这里似乎可以引入 KMP 算法匹配
    return (b: string) => b.includes(a)
}

function stringMatching(words: string[]): string[] {
    const joinedStr = words.join('#')

    return words.filter(
        (it) => {
            // 每个单词，若在 `joinedStr` 中出现了 两次 （自己存在必然有一次）或以上
            // 则表明 这个单词，是其他单词的子字符串
            const count = joinedStr.match(new RegExp(it, 'g'))?.length ?? 0
            return count > 1
        }
    )
};
// @lc code=end

