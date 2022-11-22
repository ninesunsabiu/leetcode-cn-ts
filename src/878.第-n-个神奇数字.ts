/*
 * @lc app=leetcode.cn id=878 lang=typescript
 *
 * [878] 第 N 个神奇数字
 *
 * https://leetcode.cn/problems/nth-magical-number/description/
 *
 * algorithms
 * Hard (30.61%)
 * Likes:    184
 * Dislikes: 0
 * Total Accepted:    18.1K
 * Total Submissions: 47.7K
 * Testcase Example:  '1\n2\n3'
 *
 * 一个正整数如果能被 a 或 b 整除，那么它是神奇的。
 * 
 * 给定三个整数 n , a , b ，返回第 n 个神奇的数字。因为答案可能很大，所以返回答案 对 10^9 + 7 取模 后的值。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：n = 1, a = 2, b = 3
 * 输出：2
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：n = 4, a = 2, b = 3
 * 输出：6
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= n <= 10^9
 * 2 <= a, b <= 4 * 10^4
 * 
 * 
 * 
 * 
 */
export {}
// @lc code=start

/**
 * 辗转相除法 求 最大公约数
 * 
 * 另，查询到一种对于大素数的算法 [stein算法](https://en.wikipedia.org/wiki/Binary_GCD_algorithm)
 */
const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
}

const lcm = (a: number, b: number) => {
    return Math.floor(a * b / gcd(a, b))
}

const mod = 1e9 + 7

function nthMagicalNumber(n: number, a: number, b: number): number {
    // 下界
    let l = Math.min(a, b)
    // 上界 
    let r = n * l
    const c = lcm(a, b)
    while (l <= r) {
        const mid = Math.floor((l + r) / 2)
        // a 的约数 + b 的约数 - a b 共同的约数 (容斥原理)
        const count = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / c)
        if (count >= n) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return (r + 1) % mod

};
// @lc code=end

