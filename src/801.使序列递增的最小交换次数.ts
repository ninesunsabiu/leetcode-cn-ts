/*
 * @lc app=leetcode.cn id=801 lang=typescript
 *
 * [801] 使序列递增的最小交换次数
 *
 * https://leetcode.cn/problems/minimum-swaps-to-make-sequences-increasing/description/
 *
 * algorithms
 * Hard (43.76%)
 * Likes:    396
 * Dislikes: 0
 * Total Accepted:    26.7K
 * Total Submissions: 53.6K
 * Testcase Example:  '[1,3,5,4]\n[1,2,3,7]'
 *
 * 我们有两个长度相等且不为空的整型数组 nums1 和 nums2 。在一次操作中，我们可以交换 nums1[i] 和
 * nums2[i]的元素。
 * 
 * 
 * 例如，如果 nums1 = [1,2,3,8] ， nums2 =[5,6,7,4] ，你可以交换 i = 3 处的元素，得到 nums1
 * =[1,2,3,4] 和 nums2 =[5,6,7,8] 。
 * 
 * 
 * 返回 使 nums1 和 nums2 严格递增 所需操作的最小次数 。
 * 
 * 数组 arr 严格递增 且  arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1] 。
 * 
 * 注意：
 * 
 * 
 * 用例保证可以实现操作。
 * 
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
 * 输出: 1
 * 解释: 
 * 交换 A[3] 和 B[3] 后，两个数组如下:
 * A = [1, 3, 5, 7] ， B = [1, 2, 3, 4]
 * 两个数组均为严格递增的。
 * 
 * 示例 2:
 * 
 * 
 * 输入: nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
 * 输出: 1
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 2 <= nums1.length <= 10^5
 * nums2.length == nums1.length
 * 0 <= nums1[i], nums2[i] <= 2 * 10^5
 * 
 * 
 */
export {}
// @lc code=start
function minSwap(nums1: number[], nums2: number[]): number {
    type State = {
        ans: [forNotSwap: number, forSwap: number];
        prev: [num1: number, num2: number]
    } 

    const program = (prevState: State, { nums1, nums2 }: { nums1: Array<number>; nums2: Array<number> }): State => {
        if (nums1.length > 0) {
            // nums1.length === nums2.length
            type NonEmptyArray = [number, ...Array<number>]
            const [hd1, ...tail1] = nums1 as NonEmptyArray
            const [hd2, ...tail2] = nums2 as NonEmptyArray
            const { ans: [prevForNotSwap, prevForSwap], prev: [prev1, prev2] } = prevState

            const ans = ((): State['ans'] => {
                if ((prev1 < hd1 && prev2 < hd2) && (prev1 < hd2 && prev2 < hd1)) {
                    // 当前 hd 不进行交换，则最小交换次数为 prev 交换 和 不交换的最小值
                    // 如果 hd 进行交换，则最小交换次数为不交换次数 + 1
                    const forNotSwap = Math.min(prevForNotSwap, prevForSwap)
                    return [forNotSwap, forNotSwap + 1]
                } else if (prev1 < hd1 && prev2 < hd2) {
                    // 不交换时 不影响
                    // 交换时，必须是交换 prev 的情况，再加 1
                    return [prevForNotSwap, prevForSwap + 1]
                } else {
                    // 如果 hd 不互换，则 prev 必须换
                    // 如果 hd 互换了，prev 必须不能换
                    return [prevForSwap, prevForNotSwap + 1]
                }
            })()

            return program({ ans, prev: [hd1, hd2] }, { nums1: tail1, nums2: tail2 })

        } else {
            return prevState
        }

    }

    const runRet = program({
        ans: [0, 1],
        prev: [nums1[0]!, nums2[0]!]
    }, { nums1: nums1.slice(1), nums2: nums2.slice(1) }) 

    return Math.min(...runRet.ans)
}
// @lc code=end

