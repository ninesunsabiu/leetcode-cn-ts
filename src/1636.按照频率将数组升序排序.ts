/*
 * @lc app=leetcode.cn id=1636 lang=typescript
 *
 * [1636] 按照频率将数组升序排序
 *
 * https://leetcode.cn/problems/sort-array-by-increasing-frequency/description/
 *
 * algorithms
 * Easy (69.39%)
 * Likes:    110
 * Dislikes: 0
 * Total Accepted:    37.5K
 * Total Submissions: 50.4K
 * Testcase Example:  '[1,1,2,2,2,3]'
 *
 * 给你一个整数数组 nums ，请你将数组按照每个值的频率 升序 排序。如果有多个值的频率相同，请你按照数值本身将它们 降序 排序。 
 * 
 * 请你返回排序后的数组。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：nums = [1,1,2,2,2,3]
 * 输出：[3,1,1,2,2,2]
 * 解释：'3' 频率为 1，'1' 频率为 2，'2' 频率为 3 。
 * 
 * 
 * 示例 2：
 * 
 * 输入：nums = [2,3,1,3,2]
 * 输出：[1,3,3,2,2]
 * 解释：'2' 和 '3' 频率都为 2 ，所以它们之间按照数值本身降序排序。
 * 
 * 
 * 示例 3：
 * 
 * 输入：nums = [-1,1,-6,4,5,-6,1,4,1]
 * 输出：[5,-1,4,4,-6,-6,1,1,1]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 100
 * -100 <= nums[i] <= 100
 * 
 * 
 */
export {}
// @lc code=start
function frequencySort(nums: number[]): number[] {

    type NonEmptyArray<T> = [T, ...Array<T>]

    const collectRec = (frequencyArray: Array<NonEmptyArray<number>>, nums: Array<number>): typeof frequencyArray => {
        if (nums.length > 0) {
            const [head, ...rest] = nums
            // 增加偏移量 保证为正数或0
            const idx = 100 - head! | 0
            frequencyArray[idx] = [head!, ...(frequencyArray[idx] ?? [])]
            return collectRec(frequencyArray, rest)
        } else {
            return frequencyArray
        }
    }

    return collectRec([], nums).sort(
        (a, b) => {
            if (a.length < b.length)    return -1
            else if(a.length === b.length)  return a[0] < b[0] ? 1 : a[0] === b[0] ? 0 : -1
            else    return 1
        }
    ).flatMap(it => it)
};
// @lc code=end

