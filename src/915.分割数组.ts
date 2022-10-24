/*
 * @lc app=leetcode.cn id=915 lang=typescript
 *
 * [915] 分割数组
 *
 * https://leetcode.cn/problems/partition-array-into-disjoint-intervals/description/
 *
 * algorithms
 * Medium (47.27%)
 * Likes:    208
 * Dislikes: 0
 * Total Accepted:    39.5K
 * Total Submissions: 79.1K
 * Testcase Example:  '[5,0,3,8,6]'
 *
 * 给定一个数组 nums ，将其划分为两个连续子数组 left 和 right， 使得：
 * 
 * 
 * left 中的每个元素都小于或等于 right 中的每个元素。
 * left 和 right 都是非空的。
 * left 的长度要尽可能小。
 * 
 * 
 * 在完成这样的分组后返回 left 的 长度 。
 * 
 * 用例可以保证存在这样的划分方法。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [5,0,3,8,6]
 * 输出：3
 * 解释：left = [5,0,3]，right = [8,6]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [1,1,1,0,6,12]
 * 输出：4
 * 解释：left = [1,1,1,0]，right = [6,12]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 2 <= nums.length <= 10^5
 * 0 <= nums[i] <= 10^6
 * 可以保证至少有一种方法能够按题目所描述的那样对 nums 进行划分。
 * 
 * 
 */
export {}
// @lc code=start
const splitDecreasingSubArray = (ret: Array<Array<number>>, prev: number, nums: Array<number>): typeof ret => {
    if (nums.length > 0) {
        const [hd, ...rest] = nums as [number, ...Array<number>]
        const last = ret.slice(-1)[0] ?? []
        const next = hd < prev ? [...ret.slice(0, ret.length - 1), [...last, hd]] : [...ret, [hd]]
        return splitDecreasingSubArray(next, hd, rest)
    } else {
        return ret
    }
}
// function partitionDisjoint(nums: number[]): number {
//     if (nums.length <= 2) {
//         return 1
//     } else {
//         const [hd, ...tail] = nums
//         const decreasingSubArray = splitDecreasingSubArray([[hd!]], hd!, tail)
//         if (decreasingSubArray.length <= 1) {
//             throw new Error("不存在这样的划分")
//         } else {
//             // length >= 2
//             const mappingRangeAndLength = decreasingSubArray.map(
//                 it => ({ range: [it[it.length - 1]!, it[0]!] as const, length: it.length })
//             )
//             const reversed = mappingRangeAndLength.reverse()
//             const [hd, ...tail] = reversed
//             const mergeAsap = (stk: typeof reversed) => {
//                 return (as: typeof reversed): number => {
//                     if (as.length > 0) {
//                         const hd = as[0]!
//                         const top = stk[0]!
//                         if (hd.range[1] < top.range[0]) {
//                             // 可加入
//                             stk.unshift({
//                                 range: [hd.range[0], top.range[1]],
//                                 length: hd.length + top.length
//                             })
//                             return mergeAsap(stk)(as.slice(1))
//                         } else {
//                             while (stk.length > 1) {
//                                 const top = stk.shift()!
//                                 if (hd.range[1] < top.range[0]) {
//                                     return top.length
//                                 }
//                             }
//                             return stk[0]!.length
//                         }
//                     } else {
//                         // 保持非空数组
//                         stk.shift()
//                         return stk[0]!.length
//                     }
//                 }
//             }

//             return nums.length - mergeAsap([hd!])(tail)
//         }
//     }
// };
function partitionDisjoint(nums: number[]): number {
    const n = nums.length;
    let leftMax = nums[0]!, leftPos = 0, curMax = nums[0]!;
    for (let i = 1; i < n - 1; i++) {
        curMax = Math.max(curMax, nums[i]!);
        if (nums[i]! < leftMax) {
            leftMax = curMax;
            leftPos = i;
        }
    }
    return leftPos + 1;
}
// @lc code=end

