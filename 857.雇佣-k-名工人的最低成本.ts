/*
 * @lc app=leetcode.cn id=857 lang=typescript
 *
 * [857] 雇佣 K 名工人的最低成本
 *
 * https://leetcode.cn/problems/minimum-cost-to-hire-k-workers/description/
 *
 * algorithms
 * Hard (48.50%)
 * Likes:    246
 * Dislikes: 0
 * Total Accepted:    13.4K
 * Total Submissions: 21.8K
 * Testcase Example:  '[10,20,5]\n[70,50,30]\n2'
 *
 * 有 n 名工人。 给定两个数组 quality 和 wage ，其中，quality[i] 表示第 i 名工人的工作质量，其最低期望工资为
 * wage[i] 。
 * 
 * 现在我们想雇佣 k 名工人组成一个工资组。在雇佣 一组 k 名工人时，我们必须按照下述规则向他们支付工资：
 * 
 * 
 * 对工资组中的每名工人，应当按其工作质量与同组其他工人的工作质量的比例来支付工资。
 * 工资组中的每名工人至少应当得到他们的最低期望工资。
 * 
 * 
 * 给定整数 k ，返回 组成满足上述条件的付费群体所需的最小金额 。在实际答案的 10^-5 以内的答案将被接受。。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入： quality = [10,20,5], wage = [70,50,30], k = 2
 * 输出： 105.00000
 * 解释： 我们向 0 号工人支付 70，向 2 号工人支付 35。
 * 
 * 示例 2：
 * 
 * 
 * 输入： quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
 * 输出： 30.66667
 * 解释： 我们向 0 号工人支付 4，向 2 号和 3 号分别支付 13.33333。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == quality.length == wage.length
 * 1 <= k <= n <= 10^4
 * 1 <= quality[i], wage[i] <= 10^4
 * 
 * 
 */
export {}
// @lc code=start
function mincostToHireWorkers(quality: number[], wage: number[], k: number): number {

    const people = (() => {
        const n = quality.length;
        // zip and map and sort
        return Array.from({ length: n }, (_, i) => {
            const q = quality[i]!;
            const w = wage[i]!;
            return { code: i, quality: q, wage: w, 单位质量所需工资: w / q };
        }).sort((a, b) => a.单位质量所需工资 < b.单位质量所需工资 ? -1 : a.单位质量所需工资 === b.单位质量所需工资 ? 0 : 1);
    })();

    // 优先队列模块
    const { insert, extract, removeTop } = LjxPriorityQueue()(
        (a: typeof people[number], b: typeof a) => a.quality < b.quality ? 'gt' : a === b ? 'eq' : 'lt'
    )

    type PriorityQueue = Parameters<typeof removeTop>[0]

    return people.reduce<{
        queue: PriorityQueue;
        ans: number;
        total: number;
    }>(
        (acc, cur) => {
            let total = (acc.total + cur.quality) | 0;
            let queue: PriorityQueue = insert(cur)(acc.queue);
            let ans = acc.ans;
            if (queue.length > k) {
                const { element, queue: newQueue } = extract(queue);
                queue = newQueue;
                total = total - element.quality;
            }
            if (queue?.length === k) {
                ans = Math.min(ans, total * cur.单位质量所需工资);
            }
            return { ans, queue, total };
        },
        {
            queue: null,
            ans: Number.POSITIVE_INFINITY,
            total: 0
        }
    ).ans;
};

/**
 * 优先队列
 */
const LjxPriorityQueue = () => {
    type Empty = null;
    type Node<A> = { el: A; left: PriorityQueue<A>; right: PriorityQueue<A>, length: number };
    type PriorityQueue<A> = Empty | Node<A>;

    const empty: Empty = null;

    const init = <A>(
        compareFn: (p1: A, p2 :A) => 'lt' | 'eq' | 'gt'
    ) => {
        const lte = (p1: A, p2: A) => ['lt', 'eq'].includes(compareFn(p1, p2))

        const insert = (el: A) => {
            return (queue: PriorityQueue<A>) => {
                const doRecursion = (el: A, queue: PriorityQueue<A>): Node<A> => {
                    if (queue) {
                        const { el: qel, left, right, length } = queue;
                        if (lte(el, qel)) {
                            return { el, left: doRecursion(qel, right), right: left, length: length + 1 | 0 }
                        } else {
                            return { el: qel, left: doRecursion(el, right), right: left, length: length + 1 | 0 }
                        }
                    } else {
                        return { el, left: empty, right: empty, length: 1 };
                    }
                };

                return doRecursion(el, queue);
            };
        };

        const removeTop = (queue: PriorityQueue<A>): PriorityQueue<A> => {
            const doRecursion = (queue: PriorityQueue<A>): PriorityQueue<A> => {
                if (queue) {
                    const { left, right, length } = queue;
                    // Pattern matching the queue condition
                    if (!left) {
                        return right ? { ...right, length: length - 1 | 0 } : empty;
                    }
                    if (!right) {
                        return left ? { ...left, length: length - 1 | 0 } : empty;
                    }
                    const { el: lel } = left;
                    const { el: rel } = right;
                    if (lte(lel, rel)) {
                        return { el: lel, left: doRecursion(left), right, length: length - 1 | 0  };
                    } else {
                        return { el: rel, left: left, right: doRecursion(right), length: length - 1 | 0 };
                    }
                } else {
                    throw new Error('优先队列为空');
                }
            };

            return doRecursion(queue);
        };

        const extract = (queue: PriorityQueue< A>) => {
            if (queue) {
                return { element: queue.el, queue: removeTop(queue) };
            } else {
                throw new Error('优先队列为空');
            }
        };

        return { insert, removeTop, extract };
    };

    return init
};
// @lc code=end

