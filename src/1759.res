/*
 * @lc app=leetcode.cn id=1759 lang=javascript
 *
 * [1759] 统计同构子字符串的数目
 *
 * https://leetcode.cn/problems/count-number-of-homogenous-substrings/description/
 *
 * algorithms
 * Medium (44.68%)
 * Likes:    57
 * Dislikes: 0
 * Total Accepted:    19.6K
 * Total Submissions: 38.6K
 * Testcase Example:  '"abbcccaa"'
 *
 * 给你一个字符串 s ，返回 s 中 同构子字符串 的数目。由于答案可能很大，只需返回对 10^9 + 7 取余 后的结果。
 *
 * 同构字符串 的定义为：如果一个字符串中的所有字符都相同，那么该字符串就是同构字符串。
 *
 * 子字符串 是字符串中的一个连续字符序列。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "abbcccaa"
 * 输出：13
 * 解释：同构子字符串如下所列：
 * "a"   出现 3 次。
 * "aa"  出现 1 次。
 * "b"   出现 2 次。
 * "bb"  出现 1 次。
 * "c"   出现 3 次。
 * "cc"  出现 2 次。
 * "ccc" 出现 1 次。
 * 3 + 1 + 2 + 1 + 3 + 2 + 1 = 13
 *
 * 示例 2：
 *
 * 输入：s = "xy"
 * 输出：2
 * 解释：同构子字符串是 "x" 和 "y" 。
 *
 * 示例 3：
 *
 * 输入：s = "zzzzz"
 * 输出：15
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 由小写字符串组成
 *
 *
 */

// @lc code=start
let strToChList = {
  open Js
  str => str->String2.castToArrayLike->Array2.from->Belt.List.fromArray
}

let modNum = 1000000007

let countHomogenous = s => {
  let ans =
    s
    ->strToChList
    ->Belt.List.reduce(list{}, (acc, cur) => {
      switch acc {
      | list{} => list{list{cur}}
      | list{list{}, ..._} => list{list{cur}}
      | list{list{hd, ..._} as head, ...t} as l =>
        if hd === cur {
          t->Belt.List.add(head->Belt.List.add(cur))
        } else {
          l->Belt.List.add(list{cur})
        }
      }
    })
    ->Belt.List.reduce(0., (a, b) => {
      a +. {
        let len = b->Belt.List.length->Js.Int.toFloat
        (len +. 1.) *. len /. 2.
      }
    })

  // 此处应该使用 float mod float 在 ReScript 中不知道如何使用
  mod(ans->Belt.Float.toInt, modNum)
}
// @lc code=end
