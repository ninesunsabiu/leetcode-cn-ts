/*
 * @lc app=leetcode.cn id=623 lang=typescript
 *
 * [623] 在二叉树中增加一行
 *
 * https://leetcode.cn/problems/add-one-row-to-tree/description/
 *
 * algorithms
 * Medium (54.94%)
 * Likes:    125
 * Dislikes: 0
 * Total Accepted:    15.2K
 * Total Submissions: 27.5K
 * Testcase Example:  '[4,2,6,3,1,5]\n1\n2'
 *
 * 给定一个二叉树的根 root 和两个整数 val 和 depth ，在给定的深度 depth 处添加一个值为 val 的节点行。
 * 
 * 注意，根节点 root 位于深度 1 。
 * 
 * 加法规则如下:
 * 
 * 
 * 给定整数 depth，对于深度为 depth - 1 的每个非空树节点 cur ，创建两个值为 val 的树节点作为 cur
 * 的左子树根和右子树根。
 * cur 原来的左子树应该是新的左子树根的左子树。
 * cur 原来的右子树应该是新的右子树根的右子树。
 * 如果 depth == 1 意味着 depth - 1 根本没有深度，那么创建一个树节点，值 val
 * 作为整个原始树的新根，而原始树就是新根的左子树。
 * 
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 
 * 
 * 输入: root = [4,2,6,3,1,5], val = 1, depth = 2
 * 输出: [4,1,1,2,null,null,6,3,1,5]
 * 
 * 示例 2:
 * 
 * 
 * 
 * 
 * 输入: root = [4,2,null,3,1], val = 1, depth = 3
 * 输出:  [4,2,null,1,1,3,null,null,1]
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 节点数在 [1, 10^4] 范围内
 * 树的深度在 [1, 10^4]范围内
 * -100 <= Node.val <= 100
 * -10^5 <= val <= 10^5
 * 1 <= depth <= the depth of tree + 1
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
interface TreeNode {
    val: number
    /**
     * 按照题意，子树 key 值必然存在  
     * 否则就喷 LeetCode 不懂 TypeScript
     */
    left: TreeNode | null
    right: TreeNode | null
}

const ofTreeNode = (v: number): TreeNode => ({ val: v, left: null, right: null })

const setChildren = ({ l, r }: { l?: TreeNode | null; r?: TreeNode | null }) => {
    return (p: TreeNode): typeof p => {
        return { ...p, ...(l && { left: l }), ...(r && { right: r }) }
    }
}

const setLeft = (child: TreeNode | null) => setChildren({ l: child })

const setRight = (child: TreeNode | null) => setChildren({ r: child })

/**
 * 递归的，在 depth 层中 插入一层结点
 */
const insertInDepthRec = (depth: number, newNode: TreeNode) => {
    return (node: TreeNode, curDepth: number): TreeNode => {
        if (curDepth === depth) {
            // 当到达指定层数时 进行插入替换
            const { left: oldLeft = null, right: oldRight = null } = node;
            // 考虑 子节点不存在时如何处理
            // 将 `node` 原本的左结点 作为 `newNode` 的左结点
            const newLeft = setLeft(oldLeft)(newNode)
            // 同理 将 `node` 的右结点 作为 `newNode` 的右结点
            const newRight = setRight(oldRight)(newNode)
            // 将新的左右结点 和 node 产生新的返回结点
            return setChildren({ l: newLeft, r: newRight })(node)
        } else {
            // 否则 还未到达指定操作层数时，进行递归
            const { left: oldLeft, right: oldRight } = node;
            const newLeft = oldLeft && insertInDepthRec(depth, newNode)(oldLeft, curDepth + 1)
            const newRight = oldRight && insertInDepthRec(depth, newNode)(oldRight, curDepth + 1)
            return setChildren({ l: newLeft, r: newRight })(node)
        }
    }
}

function addOneRow(root: TreeNode | null, val: number, depth: number): TreeNode | null {
    if (depth === 1) {
        // 如果 depth == 1 创建一个 亿 val 为值的新树根
        // 而原始数据为新根的左子树
        return setLeft(root)(ofTreeNode(val)) 
    } else {
        // 如果 depth > 1 则在深度为 depth - 1 的那一层结点中 插入一行新结点
        const newerNode = ofTreeNode(val)
        return root ? insertInDepthRec(depth - 1, newerNode)(root, 1) : null
    }
};
// @lc code=end

