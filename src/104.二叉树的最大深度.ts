/*
 * @lc app=leetcode.cn id=104 lang=typescript
 *
 * [104] 二叉树的最大深度
 *
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (77.11%)
 * Likes:    1382
 * Dislikes: 0
 * Total Accepted:    849.7K
 * Total Submissions: 1.1M
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最大深度。
 * 
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * 
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * 返回它的最大深度 3 。
 * 
 */
export {}
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

function maxDepth(root: TreeNode | null): number {
    if (root == null) {
        return 0
    } else {
        const doRecursion = (maxDepth: number, node: TreeNode): number => {
            const { left, right } = node;
            const l = left ? doRecursion(maxDepth + 1, left) : null
            const r = right ? doRecursion(maxDepth + 1, right) : null
            return r == null && l == null ? maxDepth : Math.max(l ?? 0, r ?? 0)
        }

        return doRecursion(1, root)
    }
};
// @lc code=end

