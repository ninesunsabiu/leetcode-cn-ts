/*
 * @lc app=leetcode.cn id=14 lang=typescript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode.cn/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (42.78%)
 * Likes:    2400
 * Dislikes: 0
 * Total Accepted:    911.5K
 * Total Submissions: 2.1M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 
 * 如果不存在公共前缀，返回空字符串 ""。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 * 
 * 
 */
export {}
// @lc code=start
/**
 * 寻找两个字符串的公共前缀
 */
const getCommonPrefix = (str1: string, str2: string): string => {

    const doRecursion = (prefix: string, a: string, b: string): string => {
        const [charOfA, charOfB] = [a[0], b[0]]
        const equal = charOfA != null && charOfB !== null && charOfA === charOfB
        return equal ? doRecursion(prefix + charOfA, a.slice(1), b.slice(1)) : prefix
    } 

    return doRecursion('', str1, str2)
}

type NonEmptyArray<T> = [T, ...T[]]

function longestCommonPrefix(strs: NonEmptyArray<string>): string {
    return strs.reduce((maxLengthPrefix, str) => {
        // 寻找当前最大前缀和当前字符串的公共前缀
        return getCommonPrefix(maxLengthPrefix, str);
    });
};
// @lc code=end

