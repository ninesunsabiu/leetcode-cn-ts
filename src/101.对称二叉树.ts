/*
 * @lc app=leetcode.cn id=101 lang=typescript
 *
 * [101] 对称二叉树
 *
 * https://leetcode.cn/problems/symmetric-tree/description/
 *
 * algorithms
 * Easy (58.29%)
 * Likes:    2119
 * Dislikes: 0
 * Total Accepted:    694.1K
 * Total Submissions: 1.2M
 * Testcase Example:  '[1,2,2,3,4,4,3]'
 *
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [1,2,2,3,4,4,3]
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [1,2,2,null,3,null,3]
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目在范围 [1, 1000] 内
 * -100 <= Node.val <= 100
 * 
 * 
 * 
 * 
 * 进阶：你可以运用递归和迭代两种方法解决这个问题吗？
 * 
 */

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

function isSymmetric(root: TreeNode): boolean {
    // 遍历访问 node ，判断是否和镜像对称的相等
    const check = (node: TreeNode | null, mirrorNode: TreeNode | null): boolean => {
        if (node && mirrorNode) {
            const { left, right, val } = node
            const { left: ml, right: mr, val: mv } = mirrorNode
            const a = val === mv
            return a && check(left, mr) && check(right, ml)
        } else if (node) {
            return false
        } else if (mirrorNode) {
            return false
        } else if (!node || !mirrorNode)  {
            return true
        } else {
            throw new Error("never here")
        }
    }
    return check(root.left, root.right)
};
// @lc code=end

