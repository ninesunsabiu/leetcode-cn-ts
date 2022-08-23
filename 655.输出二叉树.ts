/*
 * @lc app=leetcode.cn id=655 lang=typescript
 *
 * [655] 输出二叉树
 *
 * https://leetcode.cn/problems/print-binary-tree/description/
 *
 * algorithms
 * Medium (60.76%)
 * Likes:    200
 * Dislikes: 0
 * Total Accepted:    32.8K
 * Total Submissions: 47.1K
 * Testcase Example:  '[1,2]'
 *
 * 给你一棵二叉树的根节点 root ，请你构造一个下标从 0 开始、大小为 m x n 的字符串矩阵 res ，用以表示树的 格式化布局
 * 。构造此格式化布局矩阵需要遵循以下规则：
 * 
 * 
 * 树的 高度 为 height ，矩阵的行数 m 应该等于 height + 1 。
 * 矩阵的列数 n 应该等于 2^height+1 - 1 。
 * 根节点 需要放置在 顶行 的 正中间 ，对应位置为 res[0][(n-1)/2] 。
 * 对于放置在矩阵中的每个节点，设对应位置为 res[r][c] ，将其左子节点放置在 res[r+1][c-2^height-r-1] ，右子节点放置在
 * res[r+1][c+2^height-r-1] 。
 * 继续这一过程，直到树中的所有节点都妥善放置。
 * 任意空单元格都应该包含空字符串 "" 。
 * 
 * 
 * 返回构造得到的矩阵 res 。
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [1,2]
 * 输出：
 * [["","1",""],
 * ["2","",""]]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [1,2,3,null,4]
 * 输出：
 * [["","","","1","","",""],
 * ["","2","","","","3",""],
 * ["","","4","","","",""]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数在范围 [1, 2^10] 内
 * -99 <= Node.val <= 99
 * 树的深度在范围 [1, 10] 内
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
type MyTreeNode = {
    val: number;
    left: MyTreeNode | null;
    right: MyTreeNode | null;
};

function printTree(root: MyTreeNode): string[][] {

    // 广度优先遍历树结构 形成 层级 -> 结点 的表
    const map = foldTreeNodeWithLevel(
        new Map<number, Array<WithHole<number>>>(),
        (map, level, cur) => {
            map.set(level, [...(map.get(level) ?? []), cur])
            return map
        }
    )(root)

    // 将表转化为数组 便于遍历
    const levelWithNodes = Array.from(map.entries())
                        .sort(([a], [b]) => a === b ? 0 : a < b ? 1 : -1)

    // 开始处理转化成矩阵的逻辑

    const [maxHeightLevel, ...rest] = levelWithNodes

    // 否则 从最后一层往上递推最终的矩阵
    const maxHeightLevelNodes = maxHeightLevel[1]
    type Result = {
        ans: Array<Array<string>>;
        prevInsertIndex: Array<number>
    }
    const lengthForMaxHeightLevelNodes = maxHeightLevelNodes.length
    const column = range((lengthForMaxHeightLevelNodes << 1) - 1 | 0)

    // 最底层的结点插入索引位置为 0, 2, 4, 6, ....
    const prevInsertIndex = range(lengthForMaxHeightLevelNodes).map(it => it << 1)
    const ans = [
        column.map(
            it => (it & 1) === 0 ? toStringNode(maxHeightLevelNodes[it >> 1] ?? hole) : '' 
        )
    ]

    return rest.reduce<Result>(
        ({ ans, prevInsertIndex }, [, nodes]): Result => {
            const curInsertIndex = isNonEmpty(prevInsertIndex) ? chunksOf(2)(prevInsertIndex).flatMap(
                // 根据下一层的插入关系 反推本层的插入关系
                (it) => it.reduce((a,b) => (a + b | 0) >> 1)
            ) : []

            const entriesNodes = nodes.values()
            const curColumn = column.map(
                (idx) => {
                    if (curInsertIndex.includes(idx)) {
                        // 如果符合本层插入关系 便从 nodes 中取出一个进行插入
                        const item = entriesNodes.next()
                        return toStringNode(item.done === false ? item.value : hole)
                    } else {
                        return ''
                    }
                }
            )

            return { ans: [curColumn, ...ans], prevInsertIndex: curInsertIndex }
        },
        { ans, prevInsertIndex }
    ).ans
};

type Hole = symbol
const hole: Hole = Symbol.for("hole")
const isHole = (it: unknown): it is typeof hole => it === hole

type WithHole<T> = Hole | T

type NodeValHoleVal = WithHole<number> 

const toStringNode = (it: WithHole<number>) => isHole(it) ? '' : String(it)

const foldTreeNodeWithLevel = <A>(zero: A, fn: (a: A, idx: number, b: NodeValHoleVal) => A) => {
    return (treeNode: MyTreeNode): A => {

        const dsfRecursion = (ret: A, nodes: Array<WithHole<MyTreeNode>>, curLevel: number): A => {
            type Next = { retForThisRound: A, nextNodes: Array<MyTreeNode | Hole>, isAllNextNodesHole: boolean }
            const zero: Next = {
                retForThisRound: ret,
                nextNodes: [],
                isAllNextNodesHole: true
            }

            const next = nodes.reduce<Next>(
                ({ retForThisRound, nextNodes, isAllNextNodesHole }, cur): Next => {
                    const isCurrentHole = isHole(cur)
                    if (isCurrentHole) {
                        const curRet = fn(retForThisRound, curLevel, hole)
                        return { retForThisRound: curRet, nextNodes: [...nextNodes, hole, hole], isAllNextNodesHole }
                    } else {
                        const { left = hole, right = hole, val } = { left: cur.left ?? hole, right: cur.right ?? hole, val: cur.val } 
                        const curRet = fn(retForThisRound, curLevel, val)
                        return {
                            retForThisRound: curRet,
                            nextNodes: [...nextNodes, left, right],
                            isAllNextNodesHole: isAllNextNodesHole && isHole(left) && isHole(right)
                        };
                    }
                },
                zero
            )
            return next.isAllNextNodesHole
                // 终结递归 因为下一层没有结点了
                ? next.retForThisRound
                // 继续递归
                : dsfRecursion(next.retForThisRound, next.nextNodes, curLevel + 1)
        }

        return dsfRecursion(zero, [treeNode], 0)
    }
}

const range = (i: number) => Array.from({ length: i }, (_, idx) => idx)

type NonEmptyArray<T> = [T, ...Array<T>]

const isNonEmpty = <T>(it: Array<T>): it is NonEmptyArray<T> => {
    return it.length > 0
}

const splitAt = (num: number) => {
    const offset = Math.max(1, num);
    return <T>(as: NonEmptyArray<T>): [Array<T>, Array<T>] => {
        const isOutOfBound = offset > as.length;
        return isOutOfBound ? [[...as], []] : [as.slice(0, offset), as.slice(offset)];
    };
};

const chop = <A, B>(f: (as: NonEmptyArray<A>) => [B, Array<A>]) =>  {
    return (as: NonEmptyArray<A>): NonEmptyArray<B> => {
        const recursionDo = (ret: NonEmptyArray<B>, as: NonEmptyArray<A>): typeof ret => {
            const [b, nextAs] = f(as)
            const nextRet: NonEmptyArray<B> = [...ret, b]
            return isNonEmpty(nextAs) ? recursionDo(nextRet, nextAs) : nextRet
        }
        const [b, nextAs] = f(as)
        const ret: NonEmptyArray<B> = [b]
        return isNonEmpty(nextAs) ? recursionDo(ret, nextAs) : ret
    }
}

const chunksOf = (num: number) =>  chop(splitAt(num))

// @lc code=end

