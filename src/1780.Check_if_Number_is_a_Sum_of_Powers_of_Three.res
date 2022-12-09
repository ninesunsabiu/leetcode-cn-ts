/*
 * @lc app=leetcode.cn id=1780 lang=typescript
 *
 * [1780] 判断一个数字是否可以表示成三的幂的和
 *
 * https://leetcode.cn/problems/check-if-number-is-a-sum-of-powers-of-three/description/
 *
 * algorithms
 * Medium (67.37%)
 * Likes:    95
 * Dislikes: 0
 * Total Accepted:    25.6K
 * Total Submissions: 34.5K
 * Testcase Example:  '12'
 *
 * 给你一个整数 n ，如果你可以将 n 表示成若干个不同的三的幂之和，请你返回 true ，否则请返回 false 。
 *
 * 对于一个整数 y ，如果存在整数 x 满足 y == 3^x ，我们称这个整数 y 是三的幂。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 12
 * 输出：true
 * 解释：12 = 3^1 + 3^2
 *
 *
 * 示例 2：
 *
 * 输入：n = 91
 * 输出：true
 * 解释：91 = 3^0 + 3^2 + 3^4
 *
 *
 * 示例 3：
 *
 * 输入：n = 21
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^7
 *
 *
 */

// @lc code=start
open Js.Array2

let toTreeBaseNum = n => {
  let divisor = 3
  let rec mathMod = (arr, n) =>
    if n > 3 {
      [n->mod(divisor)]->concat(arr, _)->mathMod(n->\"/"(divisor))
    } else {
      [n]->concat(arr, _)
    }

  mathMod([], n)
}

let checkPowersOfThree = it => it->toTreeBaseNum->some(\"=="(2))->not
// @lc code=end
