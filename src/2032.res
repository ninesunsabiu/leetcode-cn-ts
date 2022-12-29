/*
 * @lc app=leetcode.cn id=2032 lang=javascript
 *
 * [2032] 至少在两个数组中出现的值
 *
 * https://leetcode.cn/problems/two-out-of-three/description/
 *
 * algorithms
 * Easy (66.52%)
 * Likes:    57
 * Dislikes: 0
 * Total Accepted:    24.9K
 * Total Submissions: 34.4K
 * Testcase Example:  '[1,1,3,2]\n[2,3]\n[3]'
 *
 * 给你三个整数数组 nums1、nums2 和 nums3 ，请你构造并返回一个 元素各不相同的 数组，且由 至少 在 两个
 * 数组中出现的所有值组成。数组中的元素可以按 任意 顺序排列。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
 * 输出：[3,2]
 * 解释：至少在两个数组中出现的所有值为：
 * - 3 ，在全部三个数组中都出现过。
 * - 2 ，在数组 nums1 和 nums2 中出现过。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [3,1], nums2 = [2,3], nums3 = [1,2]
 * 输出：[2,3,1]
 * 解释：至少在两个数组中出现的所有值为：
 * - 2 ，在数组 nums2 和 nums3 中出现过。
 * - 3 ，在数组 nums1 和 nums2 中出现过。
 * - 1 ，在数组 nums1 和 nums3 中出现过。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
 * 输出：[]
 * 解释：不存在至少在两个数组中出现的值。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length, nums3.length <= 100
 * 1 <= nums1[i], nums2[j], nums3[k] <= 100
 *
 *
 */

// @lc code=start
let twoOutOfThree = (nums1, nums2, nums3) => {
  open Js

  let dict = {
    let dict = Dict.empty()
    let setMark = (\"as", ~mark) => {
      \"as"->Array2.forEach(it => {
        switch dict->Dict.get(it) {
        | Some(bit) => dict->Dict.set(it, lor(bit, mark))

        | None => dict->Dict.set(it, mark)
        }
      })
    }
    // 对在各个数组中出现的情况 进行标记
    setMark(nums1, ~mark=lsl(1, 0))
    setMark(nums2, ~mark=lsl(1, 1))
    setMark(nums3, ~mark=lsl(1, 2))

    dict
  }

  // 根据题意 筛选符合条件的元素
  dict
  ->Dict.entries
  ->Array2.filter(((_, v)) => {
    switch v {
    | 1 | 2 | 4 => false // 只在数组中出现一次的标记 排除掉
    | _ => true // 只留下其他的
    }
  })
  ->Array2.map(((k, _)) => k)
}
// @lc code=end
