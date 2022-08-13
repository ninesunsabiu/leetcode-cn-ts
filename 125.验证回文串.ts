/*
 * @lc app=leetcode.cn id=125 lang=typescript
 *
 * [125] 验证回文串
 *
 * https://leetcode.cn/problems/valid-palindrome/description/
 *
 * algorithms
 * Easy (46.89%)
 * Likes:    561
 * Dislikes: 0
 * Total Accepted:    391.7K
 * Total Submissions: 835.3K
 * Testcase Example:  '"A man, a plan, a canal: Panama"'
 *
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * 
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: "A man, a plan, a canal: Panama"
 * 输出: true
 * 解释："amanaplanacanalpanama" 是回文串
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: "race a car"
 * 输出: false
 * 解释："raceacar" 不是回文串
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 字符串 s 由 ASCII 字符组成
 * 
 * 
 */

export {}
// @lc code=start
/**
 * 正规化字符串  
 * 去掉非字母和数字的其余字符
 */
const filterOutAlphaAndDigit = (s: string) => {
    return s.replace(/[^\da-zA-Z]/g, '')
}

const check = (s: string) => {
    const lengthOfS = s.length
    return lengthOfS <= 1 ? true : (() => {
        // 判断头尾是否相等，如果是的话，剥离头尾，递归判断
        return new RegExp(s[lengthOfS - 1], 'i').test(s[0]) ? check(s.slice(1, lengthOfS - 1)) : false
    })()
}

function isPalindrome(s: string): boolean {
    const str = filterOutAlphaAndDigit(s);
    return check(str);
};
// @lc code=end

