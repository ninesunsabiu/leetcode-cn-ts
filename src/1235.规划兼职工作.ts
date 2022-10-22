/*
 * @lc app=leetcode.cn id=1235 lang=typescript
 *
 * [1235] 规划兼职工作
 *
 * https://leetcode.cn/problems/maximum-profit-in-job-scheduling/description/
 *
 * algorithms
 * Hard (48.70%)
 * Likes:    292
 * Dislikes: 0
 * Total Accepted:    24.2K
 * Total Submissions: 42.9K
 * Testcase Example:  '[1,2,3,3]\n[3,4,5,6]\n[50,10,40,70]'
 *
 * 你打算利用空闲时间来做兼职工作赚些零花钱。
 * 
 * 这里有 n 份兼职工作，每份工作预计从 startTime[i] 开始到 endTime[i] 结束，报酬为 profit[i]。
 * 
 * 给你一份兼职工作表，包含开始时间 startTime，结束时间 endTime 和预计报酬 profit 三个数组，请你计算并返回可以获得的最大报酬。
 * 
 * 注意，时间上出现重叠的 2 份工作不能同时进行。
 * 
 * 如果你选择的工作在时间 X 结束，那么你可以立刻进行在时间 X 开始的下一份工作。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 输入：startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
 * 输出：120
 * 解释：
 * 我们选出第 1 份和第 4 份工作， 
 * 时间范围是 [1-3]+[3-6]，共获得报酬 120 = 50 + 70。
 * 
 * 
 * 示例 2：
 * 
 * ⁠
 * 
 * 输入：startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit =
 * [20,20,100,70,60]
 * 输出：150
 * 解释：
 * 我们选择第 1，4，5 份工作。 
 * 共获得报酬 150 = 20 + 70 + 60。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 
 * 输入：startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
 * 输出：6
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4
 * 1 <= startTime[i] < endTime[i] <= 10^9
 * 1 <= profit[i] <= 10^4
 * 
 * 
 */
export {}
// @lc code=start
function jobScheduling(st: number[], et: number[], ps: number[]): number {
    const n = st.length
    const list = new Array<Array<number>>()
    for (let i = 0; i < n; i++) list.push([st[i]!, et[i]!, ps[i]!])
    list.sort((a,b)=>a[1]!-b[1]!)
    const f = new Array<number>(n + 10).fill(0)
    for (let i = 1; i <= n; i++) {
        const info = list[i - 1]!
        const a = info[0]!, b = info[1]!, c = info[2]!
        f[i] = Math.max(f[i - 1]!, c)
        let l = 0, r = i - 1
        while (l < r) {
            const mid = l + r + 1 >> 1
            if (list[mid]![1]! <= a) l = mid
            else r = mid - 1
        }
        if (list[r]![1]! <= a) f[i] = Math.max(f[i]!, f[r + 1]! + c)
    }
    return f[n]!
}

// @lc code=end

