/*
 * @lc app=leetcode.cn id=1656 lang=typescript
 *
 * [1656] 设计有序流
 *
 * https://leetcode.cn/problems/design-an-ordered-stream/description/
 *
 * algorithms
 * Easy (77.95%)
 * Likes:    53
 * Dislikes: 0
 * Total Accepted:    24K
 * Total Submissions: 28.7K
 * Testcase Example:  '["OrderedStream","insert","insert","insert","insert","insert"]\n' +
  '[[5],[3,"ccccc"],[1,"aaaaa"],[2,"bbbbb"],[5,"eeeee"],[4,"ddddd"]]'
 *
 * 有 n 个 (id, value) 对，其中 id 是 1 到 n 之间的一个整数，value 是一个字符串。不存在 id 相同的两个 (id,
 * value) 对。
 * 
 * 设计一个流，以 任意 顺序获取 n 个 (id, value) 对，并在多次调用时 按 id 递增的顺序 返回一些值。
 * 
 * 实现 OrderedStream 类：
 * 
 * 
 * OrderedStream(int n) 构造一个能接收 n 个值的流，并将当前指针 ptr 设为 1 。
 * String[] insert(int id, String value) 向流中存储新的 (id, value)
 * 对。存储后：
 * 
 * 如果流存储有 id = ptr 的 (id, value) 对，则找出从 id = ptr 开始的 最长 id 连续递增序列 ，并 按顺序 返回与这些
 * id 关联的值的列表。然后，将 ptr 更新为最后那个  id + 1 。
 * 
 * 否则，返回一个空列表。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 
 * 
 * 输入
 * ["OrderedStream", "insert", "insert", "insert", "insert", "insert"]
 * [[5], [3, "ccccc"], [1, "aaaaa"], [2, "bbbbb"], [5, "eeeee"], [4, "ddddd"]]
 * 输出
 * [null, [], ["aaaaa"], ["bbbbb", "ccccc"], [], ["ddddd", "eeeee"]]
 * 
 * 解释
 * OrderedStream os= new OrderedStream(5);
 * os.insert(3, "ccccc"); // 插入 (3, "ccccc")，返回 []
 * os.insert(1, "aaaaa"); // 插入 (1, "aaaaa")，返回 ["aaaaa"]
 * os.insert(2, "bbbbb"); // 插入 (2, "bbbbb")，返回 ["bbbbb", "ccccc"]
 * os.insert(5, "eeeee"); // 插入 (5, "eeeee")，返回 []
 * os.insert(4, "ddddd"); // 插入 (4, "ddddd")，返回 ["ddddd", "eeeee"]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 1 
 * value.length == 5
 * value 仅由小写字母组成
 * 每次调用 insert 都会使用一个唯一的 id
 * 恰好调用 n 次 insert
 * 
 * 
 */
export {}
// @lc code=start
const hole = Symbol("hole");
const constHole = () => hole
const isString = (it: unknown): it is string => typeof it === "string"

const takeWhile = <T, U extends T = T>(pred: (it: T) => it is U) => {
    return (as: Array<T>): Array<U> => {
        const ans: Array<U> = []
        for (const item of as) {
            if (pred(item)) {
                ans.push(item)
            } else {
                break
            }
        }
        return ans
    }
}

class OrderedStream {
    private ptr = 1
    private data: Array<string | symbol> = []

    constructor(n: number) {
        this.data = Array.from({ length: n }, constHole)
    }

    insert(idKey: number, value: string): string[] {
        const insertIdx = idKey - 1 | 0
        this.data[insertIdx] = value

        const curPtrIndx = this.ptr - 1 | 0
        if (curPtrIndx === insertIdx) {
            const ret = takeWhile(isString)(this.data.slice(curPtrIndx))
            // 移动到下一个空洞位
            this.ptr += ret.length
            return ret
        } else {
            return []
        }
    }
}

/**
 * Your OrderedStream object will be instantiated and called as such:
 * var obj = new OrderedStream(n)
 * var param_1 = obj.insert(idKey,value)
 */
// @lc code=end

