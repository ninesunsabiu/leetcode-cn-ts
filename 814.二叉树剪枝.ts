/*
 * @lc app=leetcode.cn id=814 lang=typescript
 *
 * [814] 二叉树剪枝
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

 interface TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
}

function pruneTree(root: TreeNode | null): TreeNode | null {

    const isLeaf = (node: TreeNode) => {
        return node.left === null && node.left === node.right
    }

    const prune = (node: TreeNode | null): [TreeNode | null, number] => {
        if (!node) {
            return  [null, 0]
        } else {
            const val = node.val
            const [left, leftSum] = prune(node.left)
            const [right, rightSum] = prune(node.right)
            const newNode = {
                val,
                left: leftSum ? left : null,
                right: rightSum ? right :null 
            }
            return [
                isLeaf(newNode) && val === 0 ? null : newNode,
                (val + leftSum | 0) + rightSum | 0
            ];
        }
    }

    return prune(root)[0]

}
// @lc code=end

