/*
 * @lc app=leetcode.cn id=895 lang=typescript
 *
 * [895] 最大频率栈
 *
 * https://leetcode.cn/problems/maximum-frequency-stack/description/
 *
 * algorithms
 * Hard (59.37%)
 * Likes:    338
 * Dislikes: 0
 * Total Accepted:    25.6K
 * Total Submissions: 39.9K
 * Testcase Example:  '["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"]\n' +
  '[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]'
 *
 * 设计一个类似堆栈的数据结构，将元素推入堆栈，并从堆栈中弹出出现频率最高的元素。
 * 
 * 实现 FreqStack 类:
 * 
 * 
 * FreqStack() 构造一个空的堆栈。
 * void push(int val) 将一个整数 val 压入栈顶。
 * int pop() 删除并返回堆栈中出现频率最高的元素。
 * 
 * 如果出现频率最高的元素不只一个，则移除并返回最接近栈顶的元素。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：
 * 
 * ["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
 * [[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
 * 输出：[null,null,null,null,null,null,null,5,7,5,4]
 * 解释：
 * FreqStack = new FreqStack();
 * freqStack.push (5);//堆栈为 [5]
 * freqStack.push (7);//堆栈是 [5,7]
 * freqStack.push (5);//堆栈是 [5,7,5]
 * freqStack.push (7);//堆栈是 [5,7,5,7]
 * freqStack.push (4);//堆栈是 [5,7,5,7,4]
 * freqStack.push (5);//堆栈是 [5,7,5,7,4,5]
 * freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,5,7,4]。
 * freqStack.pop ();//返回 7 ，因为 5 和 7 出现频率最高，但7最接近顶部。堆栈变成 [5,7,5,4]。
 * freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,4]。
 * freqStack.pop ();//返回 4 ，因为 4, 5 和 7 出现频率最高，但 4 是最接近顶部的。堆栈变成 [5,7]。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 <= val <= 10^9
 * push 和 pop 的操作数不大于 2 * 10^4。
 * 输入保证在调用 pop 之前堆栈中至少有一个元素。
 * 
 * 
 */
export {}
// @lc code=start

type PNode<T> = { left: PQueue<T>; right: PQueue<T> } & { el: T };
type PQueue<T> = null | PNode<T>

type Order<T> = {
    compare: (a: T, b: T) => /* gt */ 1 | /* eq */ 0 | /* lt */ -1 
}

/**
 * 优先队列 有 Order 决定优先级  
 * 排序值越小,优先级越高
 */
const PriorityQueueImmutable = <T>(O: Order<T>) => {
    type Queue = PQueue<T>

    const lte = (a: T, b: T) => {
        const ret = O.compare(a, b)
        return -1 === ret || 0 === ret
    }

    const insert = (el: T) => {
        return (queue: Queue) => {
            const doRec = (e: T, q: Queue): Queue => {
                if (q) {
                    const { el, left, right } = q
                    if (lte(e, el)) {
                        return { el: e, left: doRec(el, right), right: left }
                    } else {
                        return { el, left: doRec(e, right), right: left }
                    }
                } else {
                    return { el: e, left: null, right: null }
                }
            }
            return doRec(el, queue)
        }
    }

    const pop = (q: Queue): Queue => {
        if (q) {
            const { left, right } = q;
            if (!left || !right) {
                return left ?? right
            } else {
                const { el: lE } = left
                const { el: rE } = right 
                // 选举新的节点作为根
                if (lte(lE, rE)) {
                    return { el: lE, right, left: pop(left) }
                } else {
                    return { el: rE, left, right: pop(right) }
                }
            }
        } else {
            // maybe can throw error
            return null;
        }
    }

    const extract = (q: Queue) => q ? { top: q.el, rest: pop(q) } : null

    return { insert, pop, extract }
}

type Cons<T> = { hd: T; tail: List<T> }
type List<T> = null | Cons<T>

const List = <T>() => {
    type MyList = List<T>
    const cons = (hd: T) => (tail: MyList): MyList => ({ hd, tail })
    const remove = (pred: (it: T) => boolean) => {
        return (list: MyList) => {
            const doRec = (list: MyList): [item: T | null, rest: MyList] => {
                if (list) {
                    const { hd, tail } = list
                    if (pred(hd)) {
                        return [hd, tail]
                    } else {
                        const t = doRec(tail)
                        return t ? [t[0], { hd, tail: t[1] }] : [null, list]
                    }
                } else {
                    // 查无此元素
                    return [null, /* null */ list] 
                }
            }
            return doRec(list)
        }
    }

    return { cons, remove }
}

type Item = [el: number, frequency: number]

const QueueModule = PriorityQueueImmutable<Item>({
    compare: ([,a], [,b]) => a - b > 0 ? -1 : a === b ? 0 : 1
})

const ListModule = List<Item>()

class FreqStack {
    private stack: List<Item> = null
    private pQueue: PQueue<Item> = null
    private freqRecord = new Map<number, number>()

    constructor() {}

    push(val: number): void {
        // 出现频率数量 + 1
        const freq = (this.freqRecord.get(val) ?? 0) + 1 | 0
        // 存储元素
        const item: Item = [val, freq]

        // 更新状态
        this.stack = ListModule.cons(item)(this.stack)
        this.pQueue = QueueModule.insert(item)(this.pQueue)
        this.freqRecord.set(val, freq)
    }

    pop(): number {
        // 取出出现频率最大的
        const { top, rest } = QueueModule.extract(this.pQueue)!
        // 移除出现频率最大的并且距离栈底最远的元素
        const [ans, restList] = ListModule.remove(it => it[1] === top[1])(this.stack)
        // 返回结果
        const ret = ans![0]
        
        // 更新状态
        this.stack = restList
        this.pQueue = rest
        this.freqRecord.set(ret, (this.freqRecord.get(ret) ?? 1) - 1 | 0)
    
        return ret
    }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
// @lc code=end

