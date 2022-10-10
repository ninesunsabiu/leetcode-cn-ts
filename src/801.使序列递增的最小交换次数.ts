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
    const n = nums1.length
    const f = new Array<[number, number]>(n)
    f[0] = [0, 1]
    for (let i = 1; i < n; i++) f[i] = [n + 10, n + 10]
    for (let i = 1; i < n; i++) {
        if (nums1[i]! > nums1[i - 1]! && nums2[i]! > nums2[i - 1]!) {
            f[i]![0] = f[i - 1]![0]
            f[i]![1] = f[i - 1]![1] + 1
        }
        if (nums1[i]! > nums2[i - 1]! && nums2[i]! > nums1[i - 1]!) {
            f[i]![0] = Math.min(f[i]![0], f[i - 1]![1])
            f[i]![1] = Math.min(f[i]![1], f[i - 1]![0] + 1)
        }
    }
    return Math.min(f[n - 1]![0], f[n - 1]![1])
}
// @lc code=end

