/*
 * @lc app=leetcode.cn id=592 lang=typescript
 *
 * [592] 分数加减运算
 *
 * https://leetcode.cn/problems/fraction-addition-and-subtraction/description/
 *
 * algorithms
 * Medium (52.82%)
 * Likes:    110
 * Dislikes: 0
 * Total Accepted:    19.2K
 * Total Submissions: 32.5K
 * Testcase Example:  '"-1/2+1/2"'
 *
 * 给定一个表示分数加减运算的字符串 expression ，你需要返回一个字符串形式的计算结果。 
 * 
 * 这个结果应该是不可约分的分数，即最简分数。 如果最终结果是一个整数，例如 2，你需要将它转换成分数形式，其分母为 1。所以在上述例子中, 2
 * 应该被转换为 2/1。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: expression = "-1/2+1/2"
 * 输出: "0/1"
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: expression = "-1/2+1/2+1/3"
 * 输出: "1/3"
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入: expression = "1/3-1/2"
 * 输出: "-1/6"
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 输入和输出字符串只包含 '0' 到 '9' 的数字，以及 '/', '+' 和 '-'。 
 * 输入和输出分数格式均为 ±分子/分母。如果输入的第一个分数或者输出的分数是正数，则 '+' 会被省略掉。
 * 输入只包含合法的最简分数，每个分数的分子与分母的范围是  [1,10]。 如果分母是1，意味着这个分数实际上是一个整数。
 * 输入的分数个数范围是 [1,10]。
 * 最终结果的分子与分母保证是 32 位整数范围内的有效整数。
 * 
 * 
 */

// @lc code=start
/**
 * 辗转相除法 求 最大公约数
 * 
 * 另，查询到一种对于大素数的算法 [stein算法](https://en.wikipedia.org/wiki/Binary_GCD_algorithm)
 */
const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
}

type Fraction = [numerator: number, denominator: number];

const zeroFraction: Fraction = [0, 1];

/**
 * 对一个字符串，从左边开始，读取到一个完整的分数
 * 返回这个分数，和剩余的字符串
 * 
 * @example
 * ```typescript
 * const [[numerator, denominator], restStr] = popHeadFraction('-1/2+1/2+4/31+5/1')
 * 
 * assert(numerator).toBe(-1)
 * assert(denominator).toBe(2)
 * assert(restStr).toBe('+1/2+4/31+5/1')
 * ```
 */
const popHeadFraction = (str: string): [Fraction, string] => {
    // 分子分母捕获表达式
    const regexp = /^(?<numerator>[-+]?\d+?)\/(?<denominator>\d+)(?<rest>.*)/;
    const match = regexp.exec(str)?.groups;
    return match ? [
        [Number.parseInt(match.numerator), Number.parseInt(match.denominator)],
        match.rest
    ] : [zeroFraction, ''] 
} 

/**
 * 俩分数相加, 返回一个分数，未化简
 */
const addFraction = ([aN, aD]: Fraction, [bN, bD]: Fraction): Fraction => {
    const numerator = Math.imul(aN, bD) + Math.imul(bN, aD) | 0;
    const denominator = Math.imul(aD, bD);
    return [numerator, denominator];
}

/**
 * 化简一个分数，并返回字符串化的形式
 */
const simplifyFraction = ([oldNumerator, oldDenominator]: Fraction): string => {
    const g = gcd(Math.abs(oldNumerator), oldDenominator);
    const numerator = oldNumerator / g;
    const denominator = oldDenominator / g;
    return numerator === 0 ? '0/1' : `${numerator}/${denominator}`;
}

function fractionAddition(expression: string): string {
    const resolveItRec = (acc: Fraction, str: string): Fraction => {
        if (str === '') {
            return acc;
        } else {
            const [fraction, rest] = popHeadFraction(str);
            return resolveItRec(addFraction(acc, fraction), rest);
        }
    }

    return simplifyFraction(
        resolveItRec(zeroFraction, expression)
    )
}
// @lc code=end

