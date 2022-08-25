/*
 * @lc app=leetcode.cn id=658 lang=typescript
 *
 * [658] 找到 K 个最接近的元素
 *
 * https://leetcode.cn/problems/find-k-closest-elements/description/
 *
 * algorithms
 * Medium (45.92%)
 * Likes:    418
 * Dislikes: 0
 * Total Accepted:    68.3K
 * Total Submissions: 142.9K
 * Testcase Example:  '[1,2,3,4,5]\n4\n3'
 *
 * 给定一个 排序好 的数组 arr ，两个整数 k 和 x ，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。
 * 
 * 整数 a 比整数 b 更接近 x 需要满足：
 * 
 * 
 * |a - x| < |b - x| 或者
 * |a - x| == |b - x| 且 a < b
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：arr = [1,2,3,4,5], k = 4, x = 3
 * 输出：[1,2,3,4]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：arr = [1,2,3,4,5], k = 4, x = -1
 * 输出：[1,2,3,4]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= k <= arr.length
 * 1 <= arr.length <= 10^4
 * arr 按 升序 排列
 * -10^4 <= arr[i], x <= 10^4
 * 
 * 
 */

// @lc code=start
function findClosestElements(arr: number[], k: number, x: number): number[] {
    const numberOrder = (a: number, b: number) => 
                     a < b ? -1 : a === b ? 0 : 1

    return [...arr]
        .sort(
            (a, b) => {
                const distanceOfA = Math.abs(a - x | 0)
                const distanceOfB = Math.abs(b - x | 0)
                if (distanceOfA < distanceOfB) {
                    return -1
                } else if (distanceOfA === distanceOfB) {
                    return numberOrder(a, b)
                } else {
                    // distanceOfA > distanceOfB
                    return 1
                }
            }
        )
        .slice(0, k)
        .sort(numberOrder)
};
// @lc code=end

