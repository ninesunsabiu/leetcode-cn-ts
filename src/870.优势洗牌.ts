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

    type Item = Record<"item" | "idx", number>
    const ans: [
        /**
         * 构成优势的数据
         */
        advantage: Array<Item>,
        /**
         * 无法构成优势的数据
         */
        noAdvantage: Array<Item>,
        /**
         * nums2 的模板数组
         */
        nums2: Array<[idx: number, value: number]>
    ] = [[], [], sortedNum2Entries]

    const [advantage, noAdvantage] = sortedNum1.reduce(
        (ans, cur): typeof ans => {
            const [a, n, nums2] = ans
            if (nums2.length > 0) {
                const [hd, tail, last] = [
                    nums2[0],
                    nums2.slice(1, -1),
                    nums2[nums2.length - 1]
                ]
                const [originIdxForNum2, numInNums2] = hd!
                if (cur > numInNums2) {
                    // 加入优势数组
                    const item = { idx: originIdxForNum2, item: cur }
                    return [[...a, item], n, [...tail, last!]]
                } else {
                    // 否则找个最大数匹配消耗掉
                    const item = { idx: last![0], item: cur }
                    return [a, [item, ...n], [hd!, ...tail]]
                }
            } else {
                // 无需匹配 由于 nums1 和 nums2 的长度相等
                // 所以此处为理论不可达代码
                return ans
            }
        },
        ans
    )

    return [...advantage, ...noAdvantage].sort((a ,b) => numberAsc(a.idx, b.idx)).map(it => it.item)

};

const numberAsc = (a: number, b: number) => a - b
// @lc code=end

