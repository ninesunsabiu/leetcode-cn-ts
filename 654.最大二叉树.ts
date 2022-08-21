/*
 * @lc app=leetcode.cn id=654 lang=typescript
 *
 * [654] 最大二叉树
 *
 * https://leetcode.cn/problems/maximum-binary-tree/description/
 *
 * algorithms
 * Medium (81.49%)
 * Likes:    528
 * Dislikes: 0
 * Total Accepted:    138.7K
 * Total Submissions: 167.7K
 * Testcase Example:  '[3,2,1,6,0,5]'
 *
 * 给定一个不重复的整数数组 nums 。 最大二叉树 可以用下面的算法从 nums 递归地构建:
 * 
 * 
 * 创建一个根节点，其值为 nums 中的最大值。
 * 递归地在最大值 左边 的 子数组前缀上 构建左子树。
 * 递归地在最大值 右边 的 子数组后缀上 构建右子树。
 * 
 * 
 * 返回 nums 构建的 最大二叉树 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [3,2,1,6,0,5]
 * 输出：[6,3,5,null,2,0,null,null,1]
 * 解释：递归调用如下所示：
 * - [3,2,1,6,0,5] 中的最大值是 6 ，左边部分是 [3,2,1] ，右边部分是 [0,5] 。
 * ⁠   - [3,2,1] 中的最大值是 3 ，左边部分是 [] ，右边部分是 [2,1] 。
 * ⁠       - 空数组，无子节点。
 * ⁠       - [2,1] 中的最大值是 2 ，左边部分是 [] ，右边部分是 [1] 。
 * ⁠           - 空数组，无子节点。
 * ⁠           - 只有一个元素，所以子节点是一个值为 1 的节点。
 * ⁠   - [0,5] 中的最大值是 5 ，左边部分是 [0] ，右边部分是 [] 。
 * ⁠       - 只有一个元素，所以子节点是一个值为 0 的节点。
 * ⁠       - 空数组，无子节点。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [3,2,1]
 * 输出：[3,null,2,null,1]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 1000
 * 0 <= nums[i] <= 1000
 * nums 中的所有整数 互不相同
 * 
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
function constructMaximumBinaryTree(nums: NonEmptyArray<number>): MyTreeNode | null {
    const foldByRightChild = (right: MyTreeNode<number> | null, parent: MyTreeNode<number>): MyTreeNode<number> => {
        return setChildren({ right })(parent)
    }

    const buildTreeRec = (list: List<MyTreeNode<number>>, nums: NonEmptyArray<number>): MyTreeNode<number> => {
        const [hdVal, ...tl] = nums;
        const curTreeNode = ofTreeNode(hdVal);

        // 取出当前 list 中 比 `hdVal` 小的串，并转化为 TreeNode
        // 这个 TreeNode 作为 `curTreeNode` 的左子树
        const { ret: leftChild, rest } = foldUntil<MyTreeNode<number>>(
            // 取出所有比 `hdVal` 小的元素
            (i) => i.val < hdVal
        )<MyTreeNode<number> | null>(
            null,
            // 所有比 `hdVal` 小的元素 都是当前 `curTreeNode` 的左子树
            // 自身又因为 list 是从左向右构建的，右在 hd 左在 tai 所以以右子树的形式相连
            foldByRightChild
        )(list);

        const curResult = setChildren({ left: leftChild })(curTreeNode)

        return isNonEmptyArray(tl)
            // 当 `tl` 不为空时，继续递归构建树
            ? buildTreeRec(cons(curResult)(rest), tl)
                // 如果没有 `tl` 为空 说明没有剩余元素了
                // 此时 list 是一个严格递减的 List
                // 则返回对 list 整体清空的结果 即是结果
            : fold<MyTreeNode<number>, MyTreeNode<number>>(curResult, foldByRightChild)(rest).ret
    }

    return buildTreeRec(nil, nums)
};

type MyTreeNode<T = number> = {
    val: T;
    left: MyTreeNode<T> | null;
    right: MyTreeNode<T> | null;
};

/////////// NonEmptyArray ///////////////
type NonEmptyArray<T> = [T, ...T[]]
const isNonEmptyArray = <T>(list: Array<T>): list is NonEmptyArray<T> => list.length > 0

/////////// Tree ///////////////
const ofTreeNode = <T = number>(val: T): MyTreeNode<T> => ({ val, left: null, right: null })

const setChildren = <T = number>(children: { left?: MyTreeNode<T> | null; right?: MyTreeNode<T> | null }) => {
    return (node: MyTreeNode<T>): MyTreeNode<T> => {
        const { left, right } = children
        return { ...node, ...(left !== undefined && { left } ), ...(right !== undefined && { right }) }
    }
}

//////////// List ///////////////
type Nil = null
type Cons<T> = { hd: T; tl: List<T> }
type List<T> = Nil | Cons<T>

const nil = null
const cons = <T>(hd: T) =>(tl: List<T>): Cons<T> => ({ hd, tl })
const matchList = <A, B>(
    onNil: () => B,
    onCons: (hd: A, tl: List<A>) => B
) => (list: List<A>) => {
    return list ? onCons(list.hd, list.tl) : onNil()
}

const foldUntil = <A>(pred: (a: A) => boolean) => {
    return <B>(zero: B, fn: (b: B, a: A) => B) => {
        return (list: List<A>): { ret: B, rest: List<A> } => {
            const doRecursion = (param: { ret: B, rest: List<A> }): typeof param => {
                const { ret, rest: list } = param;
                return matchList<A, typeof param>(
                    () => param,
                    (hd, tl) => pred(hd) ? doRecursion({ ret: fn(ret, hd), rest: tl }) : param
                )(list)
            }

            return doRecursion({ ret: zero, rest: list })
        };
    }
}

const fold = <A, B>(zero: B, fn: (b: B, a: A) => B) => foldUntil<A>(constTrue)(zero, fn)

///////////// function ///////////////
const constTrue = () => true

// @lc code=end

