/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 *
 * https://leetcode.cn/problems/design-linked-list/description/
 *
 * algorithms
 * Medium (33.98%)
 * Likes:    621
 * Dislikes: 0
 * Total Accepted:    167.2K
 * Total Submissions: 484.1K
 * Testcase Example:  '["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"]\n' +
  '[[],[1],[3],[1,2],[1],[1],[1]]'
 *
 * 设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next
 * 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。
 * 
 * 在链表类中实现这些功能：
 * 
 * 
 * get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
 * addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
 * addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
 * addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index
 * 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
 * deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * MyLinkedList linkedList = new MyLinkedList();
 * linkedList.addAtHead(1);
 * linkedList.addAtTail(3);
 * linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
 * linkedList.get(1);            //返回2
 * linkedList.deleteAtIndex(1);  //现在链表是1-> 3
 * linkedList.get(1);            //返回3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 所有val值都在 [1, 1000] 之内。
 * 操作次数将在  [1, 1000] 之内。
 * 请不要使用内置的 LinkedList 库。
 * 
 * 
 */
export {}
// @lc code=start
class MyLinkedList {
    private listImpl: List<number> = null

    constructor() {}

    get(index: number): number {
        const list = this.listImpl
        const curLength = list?.length ?? 0
        if (0 <= curLength && index < curLength) {
            return getAtIndexRec(index, list)
        } else {
            return -1
        }
    }

    addAtHead(val: number): void {
        this.addAtIndex(0, val)
    }

    addAtTail(val: number): void {
        this.addAtIndex(this.listImpl?.length ?? 0, val)
    }

    addAtIndex(index: number, val: number): void {
        const list = this.listImpl
        const curLength = list?.length ?? 0
        if (index > curLength) {
            // do nothing
        } else {
            this.listImpl = addAtIndexRec(it => it, list, Math.max(0, index), val)
        }

    }

    deleteAtIndex(index: number): void {
        const list = this.listImpl
        const curLength = list?.length ?? 0
        if (0 <= index && index < curLength) {
            this.listImpl = deleteAtIndexRec(it => it, list, index)
        }
    }

    private show(list: List<number>): string {
        const toArray = (a: Array<number>, list: List<number>): typeof a => {
            if (list) {
                return toArray([...a, list.hd], list.tail)
            } else {
                return a
            }
        }

        return toArray([], list).join('-')
    }
}

type Nil = null
type Cons<T> = { hd: T; tail: List<T>; length: number }
type List<T> = Cons<T> | Nil

const getAtIndexRec = (idx: number, list: List<number>): number => {
    if (idx === 0) {
        return list?.hd ?? -1
    } else {
        return getAtIndexRec(idx - 1, list?.tail ?? null)
    }
}

const addAtIndexRec = (
    k: (i: Cons<number>) => List<number>, list: List<number>, count: number, val: number
): List<number> => {
    if (count === 0) {
        // 遇到需要插入的点了
        const cons = { hd: val, tail: list, length: (list?.length ?? 0) + 1 | 0 }
        return k(cons)
    } else {
        // count 被约束为 0 < list.length 之前 所以在 count 为到达 0 之前 list 不为 Nil
        const l = list!
        return addAtIndexRec(
            (tail) => k({ hd: l.hd, tail, length: tail.length + 1 }),
            l.tail,
            count - 1 | 0,
            val
        )
    }
}

const deleteAtIndexRec = (
    k: (i: List<number>) => List<number>, list: List<number>, count: number
): List<number> => {
    if (count === 0) {
        // 遇到要删除的点了
        return k(list?.tail ?? null)
    } else {
        const l = list!
        return deleteAtIndexRec(
            (tail) => k({ hd: l.hd, tail, length: (tail?.length ?? 0) + 1 }),
            l.tail,
            count - 1 | 0
        )
    }
}


/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end

