/*
 * @lc app=leetcode.cn id=899 lang=typescript
 *
 * [899] 有序队列
 *
 * https://leetcode.cn/problems/orderly-queue/description/
 *
 * algorithms
 * Hard (54.28%)
 * Likes:    137
 * Dislikes: 0
 * Total Accepted:    19.3K
 * Total Submissions: 30.4K
 * Testcase Example:  '"cba"\n1'
 *
 * 给定一个字符串 s 和一个整数 k 。你可以从 s 的前 k 个字母中选择一个，并把它加到字符串的末尾。
 * 
 * 返回 在应用上述步骤的任意数量的移动后，字典上最小的字符串 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "cba", k = 1
 * 输出："acb"
 * 解释：
 * 在第一步中，我们将第一个字符（“c”）移动到最后，获得字符串 “bac”。
 * 在第二步中，我们将第一个字符（“b”）移动到最后，获得最终结果 “acb”。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "baaca", k = 3
 * 输出："aaabc"
 * 解释：
 * 在第一步中，我们将第一个字符（“b”）移动到最后，获得字符串 “aacab”。
 * 在第二步中，我们将第三个字符（“c”）移动到最后，获得最终结果 “aaabc”。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= k <= S.length <= 1000
 * s 只由小写字母组成。
 * 
 * 
 */

// @lc code=start
/**
 * 从 start 开始 生成 长度为 length 的连续数字数组 
 * 
 * [start, start + 1, ..., start + length - 1]
 */
const range = (start: number, length: number) => {
    return Array.from({ length }, (_, offset) => offset + start)
}

const beModulo = (mod: number) => (num: number) => num % mod;

const getAt = <T>(s: Iterable<T> | ArrayLike<T>) => (offset: number) => s[offset] 

function orderlyQueue(s: string, k: number): string {
    // 根据 k 的情况，可以分类讨论
    if (k === 1) {
        // 当 k === 1
        // 操作便退化成：选择第一个字母，将其放到末尾

        // 任意数量的操作，所形成的字符串，其实是一个有限集合 S
        // 等价于 将字符串首尾相连形成一个环，这个环有 n.length 节
        // 再每一节处剪切开来，便可得到一个字符串
        // 所有所得的字符串就是这个集合 S

        // n = s.length
        // 0 ... n - 1   ( (n - 1) - 0 === n - 1)
        // 1 ... n       ( n - 1 === n - 1)
        // 2 ... n + 1   ( (n + 1) - 2 === n - 1)
        // n - 1 ... n + n - 2  ( (n + n - 2) - (n - 1) === n - 1)

        const n = s.length

        return getAt(
            range(0, n)
                .map(i => range(i, n)
                        .map(beModulo(n))
                        .map(getAt(s))
                        .join('')
                )
                .sort()
        )(0)

    } else {
        // 当 k >= 2 时，总可以将字符串 s 排序成一个升序串
        // 证明如下
        // 假设 k === 2，则每次操作时，可以假装第一个字符固定，第二个字符总是放到末尾
        // 则有 k === 1 时的讨论，其实剩余的子串可以形成一个环
        // 那么操作就可以对应成：
        // 把 s[0] 当作是一个 tmp, 每次都可以与子串形成的环的任意结点进行互换
        // 由此，这个操作有能力形成该串重复集合的任意排列字符串
        // 其中，字典序最小的，就是其升序串
        return Array.from(s).sort().join('');
    }
};
// @lc code=end

