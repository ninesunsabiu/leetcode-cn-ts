/*
 * @lc app=leetcode.cn id=98 lang=typescript
 *
 * [98] 验证二叉搜索树
 *
 * https://leetcode.cn/problems/validate-binary-search-tree/description/
 *
 * algorithms
 * Medium (36.51%)
 * Likes:    1758
 * Dislikes: 0
 * Total Accepted:    602K
 * Total Submissions: 1.6M
 * Testcase Example:  '[2,1,3]'
 *
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * 
 * 有效 二叉搜索树定义如下：
 * 
 * 
 * 节点的左子树只包含 小于 当前节点的数。
 * 节点的右子树只包含 大于 当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [2,1,3]
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [5,1,4,null,null,3,6]
 * 输出：false
 * 解释：根节点的值是 5 ，但是右子节点的值是 4 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目范围在[1, 10^4] 内
 * -2^31 <= Node.val <= 2^31 - 1
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

function isValidBST(root: TreeNode): boolean {
    type Range = [min: number, max: number]
    type CheckP = [leftRange: Range | null, val: number, rightRange: Range | null]
    const check = (p: CheckP) => {
        const [maxL, v, minR] = p
        const a = maxL?.[1] ?? -(2 ** 31 + 1)
        const b = minR?.[0] ?? (2 ** 31)
        return a < v && v < b
    }
    const newRange = (p: CheckP): Range => {
        return [p[0]?.[0] ?? p[1], p[2]?.[1] ?? p[1]]
    }

    const checkRecursion = (k: (p: CheckP) => boolean, node: TreeNode): boolean => {
        const { left, val, right } = node;

        return left ? checkRecursion(
            (leftInfo) => {
                return check(leftInfo) && (right ? checkRecursion(
                    (rightInfo) => {
                        return check(rightInfo) && k([
                            newRange(leftInfo),
                            val,
                            newRange(rightInfo)
                        ])
                    },
                    right
                ) : k([newRange(leftInfo), val, null]))
            },
            left
        ) : right ? checkRecursion(
            (rightInfo) => check(rightInfo) && k([null, val, newRange(rightInfo)]),
            right
        ) : k([null, val, null])
    }

    return checkRecursion(check, root)
};

// @lc code=end

