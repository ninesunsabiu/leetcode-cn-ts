/*
 * @lc app=leetcode.cn id=102 lang=typescript
 *
 * [102] 二叉树的层序遍历
 *
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (65.11%)
 * Likes:    1469
 * Dislikes: 0
 * Total Accepted:    678.2K
 * Total Submissions: 1M
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[9,20],[15,7]]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [1]
 * 输出：[[1]]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：root = []
 * 输出：[]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目在范围 [0, 2000] 内
 * -1000 <= Node.val <= 1000
 * 
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

function levelOrder(root: TreeNode | null): number[][] {
    if (root == null) {
        return []
    } else {
        const noNil = <T>(it: T): it is T & {} => !!it
        const doRecursion = (ans: Array<Array<number>>, level: Array<TreeNode>): typeof ans => {
            // 冲出当前层级的下一次遍历节点
            const next = level.flatMap(
                (node) => [node.left, node.right].filter(noNil)
            )
            const ret = [...ans, level.map(it => it.val)]
            if (next.length === 0) {
                // 没有下一层级需要遍历
                return ret
            } else {
                return doRecursion(ret, next)
            }
        }

        return doRecursion([], [root])
    }
};

// @lc code=end

