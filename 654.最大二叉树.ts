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
type TreeNode = {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
};
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
type NonEmptyArray<T> = [T, ...T[]]
const isNonEmptyArray = <T>(arr: Array<T>): arr is NonEmptyArray<T> => arr.length > 0

const ofTreeNode = (val: number): TreeNode => ({ val, left: null, right: null })

const setChildren = (children: { left?: TreeNode | null; right?: TreeNode | null }) => {
    return (node: TreeNode): TreeNode => {
        const { left, right } = children
        return { ...node, ...(left !== undefined && { left } ), ...(right !== undefined && { right }) }
    }
}

type SplitRet = {
    left: Array<number>;
    maxNum: number;
    right: Array<number>;
}

const splitNumArrayByMax = (nums: NonEmptyArray<number>): SplitRet => {

    const getMaximumItemIndex = (
        maximum: { idx: number; val: number },
        curIdx: number,
        nums: Array<number>
    ): typeof maximum => {
        return !isNonEmptyArray(nums)
            ? maximum
            : (() => {
                  const [head, ...tail] = nums;
                  const { val } = maximum;
                  return getMaximumItemIndex(head > val ? { idx: curIdx, val: head } : maximum, curIdx + 1, tail);
              })();
    };

    const { idx, val } = getMaximumItemIndex({ idx: 0, val: -1 }, 0, nums)

    return {
        left: nums.slice(0, idx),
        maxNum: val,
        right: nums.slice(idx + 1),
    }

}

function constructMaximumBinaryTree(nums: NonEmptyArray<number>): TreeNode | null {
    // 深度优先搜索的 cps 调用
    const buildTreeRec = (
        k: (children: TreeNode) => TreeNode,
        nums: NonEmptyArray<number>,
    ): TreeNode => {
        const { left, right, maxNum } = splitNumArrayByMax(nums);
        const node = ofTreeNode(maxNum);

        const doNext = (k: (children: TreeNode | null) => TreeNode, nums: Array<number>): TreeNode => {
            return isNonEmptyArray(nums) ? buildTreeRec(k, nums) : k(null);
        };

        return doNext(
            (childOfLeft) => {
                return doNext(
                    (childOfRight) => {
                        return k(setChildren({ left: childOfLeft, right: childOfRight })(node))
                    },
                    right
                )
            },
            left,
        );
    };

    return buildTreeRec(it => it, nums)
};
// @lc code=end

