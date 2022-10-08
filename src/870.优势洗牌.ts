/*
 * @lc app=leetcode.cn id=870 lang=typescript
 *
 * [870] 优势洗牌
 *
 * https://leetcode.cn/problems/advantage-shuffle/description/
 *
 * algorithms
 * Medium (47.66%)
 * Likes:    315
 * Dislikes: 0
 * Total Accepted:    49.5K
 * Total Submissions: 101.3K
 * Testcase Example:  '[2,7,11,15]\n[1,10,4,11]'
 *
 * 给定两个大小相等的数组 nums1 和 nums2，nums1 相对于 nums2 的优势可以用满足 nums1[i] > nums2[i] 的索引 i
 * 的数目来描述。
 * 
 * 返回 nums1 的任意排列，使其相对于 nums2 的优势最大化。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums1 = [2,7,11,15], nums2 = [1,10,4,11]
 * 输出：[2,11,7,15]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums1 = [12,24,8,32], nums2 = [13,25,32,11]
 * 输出：[24,32,8,12]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums1.length <= 10^5
 * nums2.length == nums1.length
 * 0 <= nums1[i], nums2[i] <= 10^9
 * 
 * 
 */
export {}
// @lc code=start
function advantageCount(nums1: number[], nums2: number[]): number[] {
    const sortedNum1 = nums1.slice(0).sort(numberAsc)
    const sortedNum2Entries = Array.from(nums2.entries())
                                    .sort(([, a], [, b]) => numberAsc(a, b))

    const empty: [
        ans: Array<number>,
        topPointer: number,
        bottomPointer: number
    ] = [[], 0, nums1.length - 1]

    const [ans] = sortedNum1.reduce(
        (acc, cur): typeof acc => {
            const [ans, top, bottom] = acc
            const [originIdxForNum2, numInNums2] = sortedNum2Entries[top]!
            if (cur > numInNums2) {
                // 加入优势数组
                ans[originIdxForNum2] = cur
                return [ans, top + 1 | 0, bottom]
            } else {
                // 否则找个最大数匹配消耗掉
                const last = sortedNum2Entries[bottom]!
                ans[last[0]] = cur
                return [ans, top, bottom - 1 | 0]
            }
        },
        empty
    )
    return ans
};

const numberAsc = (a: number, b: number) => a - b
// @lc code=end

