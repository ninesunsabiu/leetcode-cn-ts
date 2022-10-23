/*
 * @lc app=leetcode.cn id=725 lang=typescript
 *
 * [725] 分隔链表
 *
 * https://leetcode.cn/problems/split-linked-list-in-parts/description/
 *
 * algorithms
 * Medium (60.47%)
 * Likes:    280
 * Dislikes: 0
 * Total Accepted:    57.5K
 * Total Submissions: 95.2K
 * Testcase Example:  '[1,2,3]\n5'
 *
 * 给你一个头结点为 head 的单链表和一个整数 k ，请你设计一个算法将链表分隔为 k 个连续的部分。
 * 
 * 每部分的长度应该尽可能的相等：任意两部分的长度差距不能超过 1 。这可能会导致有些部分为 null 。
 * 
 * 这 k 个部分应该按照在链表中出现的顺序排列，并且排在前面的部分的长度应该大于或等于排在后面的长度。
 * 
 * 返回一个由上述 k 部分组成的数组。
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：head = [1,2,3], k = 5
 * 输出：[[1],[2],[3],[],[]]
 * 解释：
 * 第一个元素 output[0] 为 output[0].val = 1 ，output[0].next = null 。
 * 最后一个元素 output[4] 为 null ，但它作为 ListNode 的字符串表示是 [] 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：head = [1,2,3,4,5,6,7,8,9,10], k = 3
 * 输出：[[1,2,3,4],[5,6,7],[8,9,10]]
 * 解释：
 * 输入被分成了几个连续的部分，并且每部分的长度相差不超过 1 。前面部分的长度大于等于后面部分的长度。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中节点的数目在范围 [0, 1000]
 * 0 <= Node.val <= 1000
 * 1 <= k <= 50
 * 
 * 
 */
export {}
// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
type Nil = { readonly tag: "nil", length: 0 }
const empty: Nil = { tag: "nil", length: 0 }
type Cons<T> = { readonly tag: "cons", hd: T, tail: List<T>, length: number }
type List<T> = Nil | Cons<T>
const cons = <T>(i: T) => (l: List<T>): Cons<T> => ({ tag: "cons", hd: i, tail: l, length: l.length + 1})
const append = <T>(i: T) => {
    return (list: List<T>): Cons<T> => {
        if (list.tag === "cons") {
            return { ...list, length: list.length + 1, tail: append(i)(list.tail) }
        } else {
            return cons(i)(empty)
        }
    }
}
const reverse = <T>(list: Cons<T>): Cons<T> => {
    const { hd, tail } = list
    if (tail.tag === "cons") {
        return append(hd)(reverse(tail))
    } else {
        return list
    }
}

type MyListNode = { val: number; next: MyListNode | null }

function splitListToParts(head: null | MyListNode, k: number): Array<MyListNode | null> {
    if (!head) {
        return Array.from({ length: k }, () => null)
    } else {
        const listSize = (() => {
            const scan = (ans: number, listNode: MyListNode): number => {
                const { next } = listNode
                const a = ans + 1 | 0
                return next ? scan(a, next) : a
            }
            return scan(0, head)
        })()

        const chunkSize = listSize / k >> 0
        // 前 n 个 块的长度为 chunkSize + 1 其余的为 chunkSize
        const n = listSize % k
        const chunks = Array.from({ length: k }, (_, idx) => chunkSize + (idx < n ? 1 : 0))

        let chain: MyListNode | null = head
        let ans: Array<MyListNode | null> = []
        for (let size of chunks) {
            if (size === 0) {
                ans.push(null)
            } else {
                let point: MyListNode | null = chain
                while (size > 0) {
                    const next: MyListNode | null = point ? point.next : null
                    size--
                    if (size === 0) {
                        ans.push(chain)
                        if (point) point.next = null
                    }
                    point = next
                }
                chain = point
            }
        }
        return ans
    }
};
// @lc code=end

