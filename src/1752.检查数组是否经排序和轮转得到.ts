/*
 * @lc app=leetcode.cn id=1752 lang=typescript
 *
 * [1752] 检查数组是否经排序和轮转得到
 *
 * https://leetcode.cn/problems/check-if-array-is-sorted-and-rotated/description/
 *
 * algorithms
 * Easy (61.54%)
 * Likes:    75
 * Dislikes: 0
 * Total Accepted:    26.7K
 * Total Submissions: 45.7K
 * Testcase Example:  '[3,4,5,1,2]'
 *
 * 给你一个数组 nums 。nums 的源数组中，所有元素与 nums 相同，但按非递减顺序排列。
 * 
 * 如果 nums 能够由源数组轮转若干位置（包括 0 个位置）得到，则返回 true ；否则，返回 false 。
 * 
 * 源数组中可能存在 重复项 。
 * 
 * 注意：我们称数组 A 在轮转 x 个位置后得到长度相同的数组 B ，当它们满足 A[i] == B[(i+x) % A.length] ，其中 %
 * 为取余运算。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [3,4,5,1,2]
 * 输出：true
 * 解释：[1,2,3,4,5] 为有序的源数组。
 * 可以轮转 x = 3 个位置，使新数组从值为 3 的元素开始：[3,4,5,1,2] 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [2,1,3,4]
 * 输出：false
 * 解释：源数组无法经轮转得到 nums 。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [1,2,3]
 * 输出：true
 * 解释：[1,2,3] 为有序的源数组。
 * 可以轮转 x = 0 个位置（即不轮转）得到 nums 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 100
 * 1 <= nums[i] <= 100
 * 
 * 
 */
export {}
// @lc code=start
type NonEmptyArray<T> = [T, ...Array<T>]
const isNotEmpty = <T>(it: Array<T>): it is NonEmptyArray<T> => it.length > 0
const last = <T>(it: NonEmptyArray<T>): T => it[it.length - 1]!

function check(nums: number[]): boolean {
    // 判断 nums 能否分割成两个非递减子数组
    // 并且第二个非递减数组的最大值比第一个非递减数组的最小值要小
    const goRec = (subArray: Array<NonEmptyArray<number>>, array: Array<number>): boolean => {
        if (!isNotEmpty(array)) {
            // 递归结束 判断 subArray 的情况
            return (() => {
                if (subArray.length === 1) {
                    return true
                } else if (subArray.length === 2) {
                    const [fst, snd] = subArray as [NonEmptyArray<number>, NonEmptyArray<number>] 
                    const a = last(snd)
                    const b = fst[0]
                    return a <= b
                } else {
                    return false
                }
            })()
        } else {
            const [head, ...tail] = array
            if (!isNotEmpty(subArray)) {
                return goRec([[head]],tail)
            } else {
                const lastSubArray = last(subArray)
                const lastItem = last(lastSubArray) 
                if (lastItem <= head) {
                    // 非递减满足条件继续递归
                    return goRec(
                        [...subArray.slice(0, -1), [...lastSubArray, head]],
                        tail
                    )
                } else {
                    // 发生下降 则新开数组递归
                    return goRec(
                        [...subArray, [head]],
                        tail
                    )
                }
            }
        }
    }
    return goRec([], nums)
};
// @lc code=end

