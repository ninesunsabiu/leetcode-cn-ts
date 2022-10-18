/*
 * @lc app=leetcode.cn id=902 lang=typescript
 *
 * [902] 最大为 N 的数字组合
 *
 * https://leetcode.cn/problems/numbers-at-most-n-given-digit-set/description/
 *
 * algorithms
 * Hard (39.73%)
 * Likes:    207
 * Dislikes: 0
 * Total Accepted:    19.2K
 * Total Submissions: 43.3K
 * Testcase Example:  '["1","3","5","7"]\n100'
 *
 * 给定一个按 非递减顺序 排列的数字数组 digits 。你可以用任意次数 digits[i] 来写的数字。例如，如果 digits =
 * ['1','3','5']，我们可以写数字，如 '13', '551', 和 '1351315'。
 * 
 * 返回 可以生成的小于或等于给定整数 n 的正整数的个数 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：digits = ["1","3","5","7"], n = 100
 * 输出：20
 * 解释：
 * 可写出的 20 个数字是：
 * 1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75,
 * 77.
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：digits = ["1","4","9"], n = 1000000000
 * 输出：29523
 * 解释：
 * 我们可以写 3 个一位数字，9 个两位数字，27 个三位数字，
 * 81 个四位数字，243 个五位数字，729 个六位数字，
 * 2187 个七位数字，6561 个八位数字和 19683 个九位数字。
 * 总共，可以使用D中的数字写出 29523 个整数。
 * 
 * 示例 3:
 * 
 * 
 * 输入：digits = ["7"], n = 8
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 
 * 1 <= digits.length <= 9
 * digits[i].length == 1
 * digits[i] 是从 '1' 到 '9' 的数
 * digits 中的所有值都 不同 
 * digits 按 非递减顺序 排列
 * 1 <= n <= 10^9
 * 
 * 
 */
export {}
/*
class Solution {
    public int atMostNGivenDigitSet(String[] digits, int n) {
        char[] nc = String.valueOf(n).toCharArray();
        int result = 0, ncl = nc.length, dl = digits.length;
        for (int i = 1; i < ncl; i++) result += Math.pow(dl, i); // 先对【非最高位】的其他位，可组装的数字进行统计
        for (int i = 0; i < ncl; i++) {
            boolean compareNext = false; // 是否需要对比下一个数字
            for (String digit : digits) {
                char dc = digit.charAt(0); // 将String转换为char
                if (dc < nc[i]) result += Math.pow(dl, ncl - i - 1);
                else {
                    if (dc == nc[i]) compareNext = true; break;
                }
            }
            if (!compareNext) return result;
        }
        return ++result; // 如果到最后1位依然满足compareNext，因为最后1位无法再向后对比了，所以最终结果+1
    }
}
*/

// @lc code=start
function atMostNGivenDigitSet(digits: string[], n: number): number {
    const numeric = String(n) 
    // n 的位数 记为 k
    const k = numeric.length
    const digitSize = digits.length
    // 先计算 前 k - 1 位的情况
    // 1 位的情况 2 位的情况 （两个槽子 每个槽子都有 len(digits) 种选择) 一直到 k - 1 位 就是 len(digits)^(k - 1)
    let ans = Array.from({ length: k - 1 }, (_, idx) => idx + 1).reduce((a, b) => a + digitSize ** b, 0)
    // 接着统计 k 位的所有可能情况
    // 如果从 digits 数组中所选的 digit 小于 第 k 位，那么由 这个数字开头的 k 位数的所有情况数，就等于 k - 1 的情况数，即 len(digits)^(k - 1)
    // 如果 大于 第 k 位，那么没得说 没有可能
    // 如果 等于 第 k 位，那么就要继续看 k - 1 位的选择情况
    for (const [idx, num] of Array.from(numeric).entries()) {
        let compareNext = false
        for (const digit of digits) {
            if (digit < num) {
                ans += digitSize ** (k - idx - 1)
            } else if (digit === num) {
                // 且看下一位的表现
                compareNext = true
                break
            } else {
                break
            }
        }
        if (!compareNext) {
            return ans
        }
    }
    return ans + 1
};
// @lc code=end

