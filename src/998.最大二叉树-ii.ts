/*
 * @lc app=leetcode.cn id=998 lang=typescript
 *
 * [998] 最大二叉树 II
 *
 * https://leetcode.cn/problems/maximum-binary-tree-ii/description/
 *
 * algorithms
 * Medium (62.64%)
 * Likes:    122
 * Dislikes: 0
 * Total Accepted:    25.1K
 * Total Submissions: 37K
 * Testcase Example:  '[4,1,3,null,null,2]\n5'
 *
 * 最大树 定义：一棵树，并满足：其中每个节点的值都大于其子树中的任何其他值。
 * 
 * 给你最大树的根节点 root 和一个整数 val 。
 * 
 * 就像 之前的问题 那样，给定的树是利用 Construct(a) 例程从列表 a（root = Construct(a)）递归地构建的：
 * 
 * 
 * 如果 a 为空，返回 null 。
 * 否则，令 a[i] 作为 a 的最大元素。创建一个值为 a[i] 的根节点 root 。
 * root 的左子树将被构建为 Construct([a[0], a[1], ..., a[i - 1]]) 。
 * root 的右子树将被构建为 Construct([a[i + 1], a[i + 2], ..., a[a.length - 1]]) 。
 * 返回 root 。
 * 
 * 
 * 请注意，题目没有直接给出 a ，只是给出一个根节点 root = Construct(a) 。
 * 
 * 假设 b 是 a 的副本，并在末尾附加值 val。题目数据保证 b 中的值互不相同。
 * 
 * 返回 Construct(b) 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：root = [4,1,3,null,null,2], val = 5
 * 输出：[5,4,null,1,3,null,null,2]
 * 解释：a = [1,4,2,3], b = [1,4,2,3,5]
 * 
 * 示例 2：
 * 
 * 
 * 
 * 输入：root = [5,2,4,null,1], val = 3
 * 输出：[5,2,4,null,1,null,3]
 * 解释：a = [2,1,5,4], b = [2,1,5,4,3]
 * 
 * 示例 3：
 * 
 * 
 * 
 * 输入：root = [5,2,3,null,1], val = 4
 * 输出：[5,2,4,null,1,3]
 * 解释：a = [2,1,5,3], b = [2,1,5,3,4]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目在范围 [1, 100] 内
 * 1 <= Node.val <= 100
 * 树中的所有值 互不相同
 * 1 <= val <= 100
 * 
 * 
 * 
 * 
 */
export {}
// type TreeNode = {
//     val: number;
//     left: TreeNode | null;
//     right: TreeNode | null;
// }
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

function insertIntoMaxTree(root: TreeNode, val: number): TreeNode {
    // 待加入树的节点
    const node = { left: null, right: null, val } 

    // 沿着右子树的方向，将 root 切分成 右子树节点 的数组
    // 该数组充当一个栈结构，用于"拎起" 所有比 `val` 节点值小的右子树
    const rightNodesStack = splitByRightChild(root)

    // 取出所有比待插入节点小的右子树节点 和 剩下比待插入节点值大的右子树节点
    const [rootNodes, allLtValNodes] = takeRightUntil((node: TreeNode) => node.val < val)(rightNodesStack)

    // 将所有小节点串联起来，作为待插入节点的左子树
    const newRightNode = matchArray<TreeNode, TreeNode>(
        (): TreeNode => node,
        (as) => {
            const left = as.reduceRight(connectByRight)
            return { ...node, left } 
        }
    )(allLtValNodes)

    // 重新将串联整棵树 即为答案
    const ans = [...rootNodes, newRightNode].reduceRight(connectByRight)

    return ans 
};

/**
 * 持续的按照节点的右子树分割成数组节点
 * @example
 * ```typescript
 * splitByRightChild({
 *  val: 1,
 *  left: { val: 11, left: null, right: null }
 *  right: { val: 12, left: null, right: null } 
 * })
 * 
 * // output is  [
 * // { val: 1,
 * //     left: { val: 11, left: null, right: null },
 * //     right: { val: 12; left: null, right: null }
 * // },
 * // { val: 12; left: null, right: null  }
 * // ]
 * ```
 */
const splitByRightChild = (node: TreeNode): Array<TreeNode> => {
    const doRecursion = (ret: Array<TreeNode>, curNode: TreeNode): Array<TreeNode> => {
        // 将当前节点放入结果数组，该结果数组根据右子节点的情况 选择继续递归或是直接返回
        const nextRet = [...ret, curNode]
        const { right } = curNode
        // 在右子树存在的情况下，继续递归，
        // 直到不存在右子树，返回结果
        return right ? doRecursion(nextRet, right) : nextRet 
    }

    return doRecursion([], node)
}

/**
 * 对一个数组从右往左取出项，直到不符合条件为止 
 */
const takeRightUntil = <A>(pred: (a: A) => boolean) => {
    return (array: Array<A>): [left: Array<A>, right: Array<A>] => {
        const right: Array<A> = []
        const left: Array<A> = []
        for (const item of [...array].reverse()) {
            if (pred(item)) {
                right.unshift(item)
            } else {
                left.unshift(item)
            }
        }
        return [left, right]
    }
}

const matchArray = <A, B>(
    empty: () => B,
    nonEmpty: (array: [A, ...Array<A>]) => B
) => {
    return (array: Array<A>) =>
            (
                array.length > 0 
                ? nonEmpty(array as unknown as [A, ...Array<A>])
                : empty()
            );
}

/**
 * 以右子树的形式连接两个节点
 */
const connectByRight = (right: TreeNode, parent: TreeNode): TreeNode => ({ ...parent, right }) 

// @lc code=end

