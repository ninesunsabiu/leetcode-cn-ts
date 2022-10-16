/*
 * @lc app=leetcode.cn id=886 lang=typescript
 *
 * [886] 可能的二分法
 *
 * https://leetcode.cn/problems/possible-bipartition/description/
 *
 * algorithms
 * Medium (49.78%)
 * Likes:    268
 * Dislikes: 0
 * Total Accepted:    29.3K
 * Total Submissions: 58.5K
 * Testcase Example:  '4\n[[1,2],[1,3],[2,4]]'
 *
 * 给定一组 n 人（编号为 1, 2, ..., n）， 我们想把每个人分进任意大小的两组。每个人都可能不喜欢其他人，那么他们不应该属于同一组。
 * 
 * 给定整数 n 和数组 dislikes ，其中 dislikes[i] = [ai, bi] ，表示不允许将编号为 ai 和
 * bi的人归入同一组。当可以用这种方法将所有人分进两组时，返回 true；否则返回 false。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：n = 4, dislikes = [[1,2],[1,3],[2,4]]
 * 输出：true
 * 解释：group1 [1,4], group2 [2,3]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：n = 3, dislikes = [[1,2],[1,3],[2,3]]
 * 输出：false
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：n = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= n <= 2000
 * 0 <= dislikes.length <= 10^4
 * dislikes[i].length == 2
 * 1 <= dislikes[i][j] <= n
 * ai < bi
 * dislikes 中每一组都 不同
 * 
 * 
 * 
 * 
 */
export {}
// @lc code=start
function possibleBipartition(n: number, dislikes: Array<[number, number]>): boolean {
    const dislikesRecord: Map<number, Set<number>> = new Map()
    for (const tuple of dislikes) {
        const [a, b] = tuple
        dislikesRecord.set(
            a,
            (dislikesRecord.get(a) ?? new Set()).add(b)
        )
        dislikesRecord.set(
            b,
            (dislikesRecord.get(b) ?? new Set()).add(a)
        )
    }

    const allPeople: Array<1 | 2> = []

    const dsfRec = (
        peopleLabel: number,
        group: 1 | 2
    ): boolean => {
        const groupForPeople = allPeople[peopleLabel]
        if (!groupForPeople) {
            allPeople[peopleLabel] = group
            const backlist = dislikesRecord.get(peopleLabel) ?? new Set()
            const opponentGroup: 1 | 2 = group === 1 ? 2 : 1
            return Array.from(backlist).every((p) => dsfRec(p, opponentGroup))
        } else {
            return group === groupForPeople
        }

    };

    return Array.from({ length: n }, (_, idx) => idx + 1).every(peopleLabel => {
        return allPeople[peopleLabel] || dsfRec(peopleLabel, 1)
    })
};
// @lc code=end

