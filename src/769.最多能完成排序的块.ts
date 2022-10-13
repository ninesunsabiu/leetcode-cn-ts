/*
 * @lc app=leetcode.cn id=769 lang=typescript
 *
 * [769] 最多能完成排序的块
 *
 * https://leetcode.cn/problems/max-chunks-to-make-sorted/description/
 *
 * algorithms
 * Medium (59.18%)
 * Likes:    349
 * Dislikes: 0
 * Total Accepted:    45.2K
 * Total Submissions: 76.8K
 * Testcase Example:  '[4,3,2,1,0]'
 *
 * 给定一个长度为 n 的整数数组 arr ，它表示在 [0, n - 1] 范围内的整数的排列。
 * 
 * 我们将 arr 分割成若干 块 (即分区)，并对每个块单独排序。将它们连接起来后，使得连接的结果和按升序排序后的原数组相同。
 * 
 * 返回数组能分成的最多块数量。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: arr = [4,3,2,1,0]
 * 输出: 1
 * 解释:
 * 将数组分成2块或者更多块，都无法得到所需的结果。
 * 例如，分成 [4, 3], [2, 1, 0] 的结果是 [3, 4, 0, 1, 2]，这不是有序的数组。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: arr = [1,0,2,3,4]
 * 输出: 4
 * 解释:
 * 我们可以把它分成两块，例如 [1, 0], [2, 3, 4]。
 * 然而，分成 [1, 0], [2], [3], [4] 可以得到最多的块数。
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * n == arr.length
 * 1 <= n <= 10
 * 0 <= arr[i] < n
 * arr 中每个元素都 不同
 * 
 * 
 */
export {}
// @lc code=start
function maxChunksToSorted(arr: [number, ...Array<number>]): number {

    type Range = [min: number, max: number]

    const ofRange = (a: number, b: number): Range => [a, b]

    // 调整当前分块 使得满足题意
    const adjustChunks = foldUntil(
        (a: Range, b: Range): { _tag: "yes", t: Range } | { _tag: "no" } => {
            const [minA, maxA] = a
            const [minB, maxB] = b
            if (minA < maxB) {
                return { _tag: "yes", t: [Math.min(minA, minB), Math.max(maxA, maxB)] }
            } else {
                return { _tag: "no" } 
            }
        }
    )

    const program = (chunks: List<Range>, arr: Array<number>): number => {
        if (arr.length > 0) {
            const [hd, ...tail] = arr as [number, ...Array<number>]
            const newChunks = adjustChunks(cons(ofRange(hd, hd))(chunks))
            return program(newChunks, tail)
        } else {
            return chunks?.length ?? 0
        }
    }

    return program(null, arr)
};

type Nil = null
type Cons<T> = { hd: T; tail: List<T>; length: number }
type List<T> = Cons<T> | Nil

const cons = <T>(a: T) => (list: List<T>) => ({ hd: a, tail: list, length: (list?.length ?? 0) + 1 |0 }) 

const foldUntil = <T>(
    merge: (a: T, b: T) => { _tag: "yes", t: T } | { _tag: "no" }
) => (list: List<T>): List<T> => {

    const mergeRec = (hd: T, list: List<T>): List<T> => { 
        if (list) {
            const merged = merge(hd, list.hd)
            if (merged._tag === "yes") {
                return mergeRec(merged.t, list.tail)
            } else {
                return cons(hd)(list)
            }
        } else {
            return cons(hd)(list)
        }
    }

    if (list) {
        return mergeRec(list.hd, list.tail)
    } else {
        return null
    }
}
// @lc code=end

