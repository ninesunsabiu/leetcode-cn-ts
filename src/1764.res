/*
 * @lc app=leetcode.cn id=1764 lang=javascript
 *
 * [1764] 通过连接另一个数组的子数组得到一个数组
 *
 * https://leetcode.cn/problems/form-array-by-concatenating-subarrays-of-another-array/description/
 *
 * algorithms
 * Medium (47.74%)
 * Likes:    28
 * Dislikes: 0
 * Total Accepted:    9.1K
 * Total Submissions: 17.2K
 * Testcase Example:  '[[1,-1,-1],[3,-2,0]]\n[1,-1,0,1,-1,-1,3,-2,0]'
 *
 * 给你一个长度为 n 的二维整数数组 groups ，同时给你一个整数数组 nums 。
 *
 * 你是否可以从 nums 中选出 n 个 不相交 的子数组，使得第 i 个子数组与 groups[i] （下标从 0 开始）完全相同，且如果 i > 0
 * ，那么第 (i-1) 个子数组在 nums 中出现的位置在第 i 个子数组前面。（也就是说，这些子数组在 nums 中出现的顺序需要与 groups
 * 顺序相同）
 *
 * 如果你可以找出这样的 n 个子数组，请你返回 true ，否则返回 false 。
 *
 * 如果不存在下标为 k 的元素 nums[k] 属于不止一个子数组，就称这些子数组是 不相交 的。子数组指的是原数组中连续元素组成的一个序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：groups = [[1,-1,-1],[3,-2,0]], nums = [1,-1,0,1,-1,-1,3,-2,0]
 * 输出：true
 * 解释：你可以分别在 nums 中选出第 0 个子数组 [1,-1,0,1,-1,-1,3,-2,0] 和第 1 个子数组
 * [1,-1,0,1,-1,-1,3,-2,0] 。
 * 这两个子数组是不相交的，因为它们没有任何共同的元素。
 *
 *
 * 示例 2：
 *
 *
 * 输入：groups = [[10,-2],[1,2,3,4]], nums = [1,2,3,4,10,-2]
 * 输出：false
 * 解释：选择子数组 [1,2,3,4,10,-2] 和 [1,2,3,4,10,-2] 是不正确的，因为它们出现的顺序与 groups 中顺序不同。
 * [10,-2] 必须出现在 [1,2,3,4] 之前。
 *
 *
 * 示例 3：
 *
 *
 * 输入：groups = [[1,2,3],[3,4]], nums = [7,7,1,2,3,4,7,7]
 * 输出：false
 * 解释：选择子数组 [7,7,1,2,3,4,7,7] 和 [7,7,1,2,3,4,7,7] 是不正确的，因为它们不是不相交子数组。
 * 它们有一个共同的元素 nums[4] （下标从 0 开始）。
 *
 *
 *
 *
 * 提示：
 *
 *
 * groups.length == n
 * 1
 * 1 3
 * 1
 * -10^7
 *
 *
 */

// @lc code=start
open Js
let canChoose = (groups, nums) => {
  let rec program = (groups, str) => {
    if groups->Array2.length > 0 {
      // 字符串化，变为字符串匹配查找
      let stringifyGroup = groups->Array2.unsafe_get(0)->Array2.joinWith(",")
      // 正则匹配 使用了 否定前向查找 和 否定后向查找 为了避免数组变成字符串之后的干扰
      let regexp = Re.fromString(`(?<!\\d)${stringifyGroup}(?!\\d)`)
      // 正则查找匹配位置
      switch regexp->Re.exec_(str) {
      | Some(result) => {
          // 查找成功 更新迭代变量
          let nextStr = str->String2.sliceToEnd(
            ~from={
              // 丢弃掉前部份匹配串，因为不能“回头”
              result->Re.index->\"+"(stringifyGroup->String2.length)
            },
          )
          // 尾递归进行
          groups->Array2.sliceFrom(1)->program(nextStr)
        }

      | None => false // 查找失败 直接返回 为题解
      }
    } else {
      // groups 遍历完毕 则视为查找成功
      true
    }
  }

  program(groups, nums->Array2.joinWith(","))
}
// @lc code=end
