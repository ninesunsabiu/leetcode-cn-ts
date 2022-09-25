/*
 * @lc app=leetcode.cn id=108 lang=typescript
 *
 * [108] 将有序数组转换为二叉搜索树
 *
 * https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/
 *
 * algorithms
 * Easy (77.16%)
 * Likes:    1152
 * Dislikes: 0
 * Total Accepted:    301.5K
 * Total Submissions: 390.8K
 * Testcase Example:  '[-10,-3,0,5,9]'
 *
 * 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
 * 
 * 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [-10,-3,0,5,9]
 * 输出：[0,-3,9,-10,null,5]
 * 解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：
 * 
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [1,3]
 * 输出：[3,1]
 * 解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^4
 * -10^4 <= nums[i] <= 10^4
 * nums 按 严格递增 顺序排列
 * 
 * 
 */
export {}
type TreeNode = {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
type NonEmptyArray<T> = [T, ...Array<T>]
const isNonEmptyArray = <T>(it: Array<T>): it is NonEmptyArray<T> => it.length > 0

function sortedArrayToBST(nums: NonEmptyArray<number>): TreeNode {

    const doRecursionCPS = (k: (i: TreeNode) => TreeNode, nums: NonEmptyArray<number>): TreeNode => {
        // 数组取中点 一分为二，进行递归构造
        const size = nums.length
        if (size > 3) {
            // 可递归
            const [a, b, c] = splitArray(nums)
            return isNonEmptyArray(a) ? doRecursionCPS(
                (left) => {
                    return isNonEmptyArray(c) ? doRecursionCPS(
                        (right) => k({ val: b, left, right }),
                        c
                    ) : k({ val: b, left, right: null }) 
                },
                a
            ) : isNonEmptyArray(c) ? doRecursionCPS(
                (right) => k({ val: b, left: null, right }),
                c
            ) : k({ val: b, left: null, right: null })
        } else if (size === 3) {
            const [a, b, c] = nums
            return k({ val: b!, left: { val: a!, left: null, right: null }, right: { val: c!, left: null, right: null } })
        } else if (size === 2) {
            const [a, b] = nums
            return k({ val: b!, left: { val: a!, left: null, right: null }, right: null })
        } else if (size === 1) {
            const [a] = nums
            return k({ val: a!, left: null, right: null })
        } else {
            throw new Error('nums 要求是非空数组 TS 无法体现非空数组的长度')
        }
    }

    return doRecursionCPS(it => it, nums)
};

const splitArray = (array: Array<number>): [left: Array<number>, middle: number, right: Array<number>] => {
    const size = array.length
    const middle = size / 2 >> 0
    const left = array.slice(0, middle)
    const right = array.slice(middle + 1)
    const middleItem = array[middle]!
    return [left, middleItem, right]
}
// @lc code=end

