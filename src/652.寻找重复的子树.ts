/*
 * @lc app=leetcode.cn id=652 lang=typescript
 *
 * [652] 寻找重复的子树
 *
 * https://leetcode.cn/problems/find-duplicate-subtrees/description/
 *
 * algorithms
 * Medium (58.74%)
 * Likes:    542
 * Dislikes: 0
 * Total Accepted:    69.4K
 * Total Submissions: 115.7K
 * Testcase Example:  '[1,2,3,4,null,2,4,null,null,4]'
 *
 * 给定一棵二叉树 root，返回所有重复的子树。
 * 
 * 对于同一类的重复子树，你只需要返回其中任意一棵的根结点即可。
 * 
 * 如果两棵树具有相同的结构和相同的结点值，则它们是重复的。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：root = [1,2,3,4,null,2,4,null,null,4]
 * 输出：[[2,4],[4]]
 * 
 * 示例 2：
 * 
 * 
 * 
 * 
 * 输入：root = [2,1,1]
 * 输出：[[1]]
 * 
 * 示例 3：
 * 
 * 
 * 
 * 
 * 输入：root = [2,2,2,3,null,3,null]
 * 输出：[[2,3],[3]]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中的结点数在[1,10^4]范围内。
 * -200 <= Node.val <= 200
 * 
 * 
 */
export {}
type TreeNode = {
    val: number
    left: TreeNode | null
    right: TreeNode | null
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

function findDuplicateSubtrees(root: TreeNode): Array<TreeNode | null> {

    return ofLazyPipe(() => root)
    .pipe(assembleHashForTree)
    .pipe(
        foldLeftTreeByDSF<Map<string, Array<TreeNode>>>(
            new Map(),
            (map, { node, hash }) => {
                map.set(hash, [...(map.get(hash) ?? []), node])
                return map
            }
        )
    )
    .pipe(map => Array.from(map.values()))
    .pipe(it => it.flatMap(it => it.length > 1 ? [it[0]!] : []))
    .calc()

};

type TreeNodeWithHash = { hash: string; node: TreeNode; left: TreeNodeWithHash | null; right: TreeNodeWithHash | null };

const assembleHashForTree = (root: TreeNode) => {

    const doRecursion = (node: TreeNode): TreeNodeWithHash => {
        const { left, right, val } = node

        const fromLeft = left ? doRecursion(left) : null
        const fromRight  = right ? doRecursion(right) : null

        return {
            hash: `${val}:l->${fromLeft?.hash ?? null}r->${fromRight?.hash ?? null}`,
            node,
            left: fromLeft,
            right: fromRight
        }
    }

    return doRecursion(root)
}

const foldLeftTreeByDSF = <A>(zero: A, accFn: (a: A, b: TreeNodeWithHash) => A) => {
    return (node: TreeNodeWithHash) => {
        const doRecursion = (acc: A, node: TreeNodeWithHash): A => {
            const accForThisRound = accFn(acc, node)
            const { left, right } = node;
            const accFromLeft = left ? doRecursion(accForThisRound, left) : accForThisRound
            const accFromRight = right ? doRecursion(accFromLeft, right) : accFromLeft
            return accFromRight
        }

        return doRecursion(zero, node)
    }
}

type Pipeable<A> = {
    pipe: <B>(fn: (a: A) => B) => Pipeable<B>
    calc: () => A
}


const ofLazyPipe = <A>(lazyInput: () => A): Pipeable<A> => {
    return {
        pipe: <B>(fn: (a: A) => B) => ofLazyPipe(() => fn(lazyInput())),
        calc: lazyInput
    }
}

// @lc code=end

