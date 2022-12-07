/*
 * @lc app=leetcode.cn id=1775 lang=typescript
 *
 * [1775] 通过最少操作次数使数组的和相等
 *
 * https://leetcode.cn/problems/equal-sum-arrays-with-minimum-number-of-operations/description/
 *
 * algorithms
 * Medium (48.92%)
 * Likes:    150
 * Dislikes: 0
 * Total Accepted:    19.4K
 * Total Submissions: 34.6K
 * Testcase Example:  '[1,2,3,4,5,6]\n[1,1,2,2,2,2]'
 *
 * 给你两个长度可能不等的整数数组 nums1 和 nums2 。两个数组中的所有值都在 1 到 6 之间（包含 1 和 6）。
 * 
 * 每次操作中，你可以选择 任意 数组中的任意一个整数，将它变成 1 到 6 之间 任意 的值（包含 1 和 6）。
 * 
 * 请你返回使 nums1 中所有数的和与 nums2 中所有数的和相等的最少操作次数。如果无法使两个数组的和相等，请返回 -1 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
 * 输出：3
 * 解释：你可以通过 3 次操作使 nums1 中所有数的和与 nums2 中所有数的和相等。以下数组下标都从 0 开始。
 * - 将 nums2[0] 变为 6 。 nums1 = [1,2,3,4,5,6], nums2 = [6,1,2,2,2,2] 。
 * - 将 nums1[5] 变为 1 。 nums1 = [1,2,3,4,5,1], nums2 = [6,1,2,2,2,2] 。
 * - 将 nums1[2] 变为 2 。 nums1 = [1,2,2,4,5,1], nums2 = [6,1,2,2,2,2] 。
 * 
 * 
 * 示例 2：
 * 
 * 输入：nums1 = [1,1,1,1,1,1,1], nums2 = [6]
 * 输出：-1
 * 解释：没有办法减少 nums1 的和或者增加 nums2 的和使二者相等。
 * 
 * 
 * 示例 3：
 * 
 * 输入：nums1 = [6,6], nums2 = [1]
 * 输出：3
 * 解释：你可以通过 3 次操作使 nums1 中所有数的和与 nums2 中所有数的和相等。以下数组下标都从 0 开始。
 * - 将 nums1[0] 变为 2 。 nums1 = [2,6], nums2 = [1] 。
 * - 将 nums1[1] 变为 2 。 nums1 = [2,2], nums2 = [1] 。
 * - 将 nums2[0] 变为 4 。 nums1 = [2,2], nums2 = [4] 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums1.length, nums2.length <= 10^5
 * 1 <= nums1[i], nums2[i] <= 6
 * 
 * 
 */
export {}
// @lc code=start

// 作者：LeetCode-Solution
// 链接：https://leetcode.cn/problems/equal-sum-arrays-with-minimum-number-of-operations/solution/tong-guo-zui-shao-cao-zuo-ci-shu-shi-shu-e3o1/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
var minOperations = function(nums1: any, nums2: any) {
    const n = nums1.length, m = nums2.length;
    if (6 * n < m || 6 * m < n) {
        return -1;
    }
    const cnt1 = new Array(7).fill(0);
    const cnt2 = new Array(7).fill(0);
    let diff = 0;
    for (const i of nums1) {
        ++cnt1[i];
        diff += i;
    }
    for (const i of nums2) {
        ++cnt2[i];
        diff -= i;
    }
    if (diff === 0) {
        return 0;
    }
    if (diff > 0) {
        return help(cnt2, cnt1, diff);
    }
    return help(cnt1, cnt2, -diff);
}

const help = (h1: any, h2: any, diff: any) => {
    const h = new Array(7).fill(0);
    for (let i = 1; i < 7; ++i) {
        h[6 - i] += h1[i];
        h[i - 1] += h2[i];
    }
    let res = 0;
    for (let i = 5; i > 0 && diff > 0; --i) {
        let t = Math.min(Math.floor((diff + i - 1) / i), h[i]);
        res += t;
        diff -= t * i;
    }
    return res;
};

// @lc code=end

