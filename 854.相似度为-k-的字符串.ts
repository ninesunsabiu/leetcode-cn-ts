/*
 * @lc app=leetcode.cn id=854 lang=typescript
 *
 * [854] 相似度为 K 的字符串
 *
 * https://leetcode.cn/problems/k-similar-strings/description/
 *
 * algorithms
 * Hard (36.96%)
 * Likes:    233
 * Dislikes: 0
 * Total Accepted:    18.5K
 * Total Submissions: 41.1K
 * Testcase Example:  '"ab"\n"ba"'
 *
 * 对于某些非负整数 k ，如果交换 s1 中两个字母的位置恰好 k 次，能够使结果字符串等于 s2 ，则认为字符串 s1 和 s2 的 相似度为 k 。
 * 
 * 给你两个字母异位词 s1 和 s2 ，返回 s1 和 s2 的相似度 k 的最小值。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s1 = "ab", s2 = "ba"
 * 输出：1
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s1 = "abc", s2 = "bca"
 * 输出：2
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s1.length <= 20
 * s2.length == s1.length
 * s1 和 s2  只包含集合 {'a', 'b', 'c', 'd', 'e', 'f'} 中的小写字母
 * s2 是 s1 的一个字母异位词
 * 
 * 
 */

// @lc code=start
// 作者：LeetCode-Solution
// 链接：https://leetcode.cn/problems/k-similar-strings/solution/xiang-si-du-wei-k-de-zi-fu-chuan-by-leet-8z10/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
function kSimilarity(s1: string, s2: string): number {
    const n = s1.length;
    const queue: Array<[string, number]> = [];
    const visit = new Set();
    queue.push([s1, 0]);
    visit.add(s1);
    let step = 0;
    while (queue.length) {
        const sz = queue.length;
        for (let i = 0; i < sz; i++) {
            let [cur, pos] = queue.shift()!;
            if (cur === s2) {
                return step;
            }
            while (pos < n && cur[pos] === s2[pos]) {
                pos++;
            }
            for (let j = pos + 1; j < n; j++) {
                if (s2[j] === cur[j]) {
                    continue;
                }
                if (s2[pos] === cur[j]) {
                    const next = swap(cur, pos, j);
                    if (!visit.has(next)) {
                        visit.add(next);
                        queue.push([next, pos + 1]);
                    }
                }
            }
        }
        step++;
    } 
    return step;


};

const swap = (cur: string, i: number, j: number) => {
    const arr = [...cur];
    const c = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = c;
    return arr.join('');
};

// @lc code=end

