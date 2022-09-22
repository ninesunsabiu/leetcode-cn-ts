/*
 * @lc app=leetcode.cn id=952 lang=typescript
 *
 * [952] 按公因数计算最大组件大小
 *
 * https://leetcode.cn/problems/largest-component-size-by-common-factor/description/
 *
 * algorithms
 * Hard (37.70%)
 * Likes:    130
 * Dislikes: 0
 * Total Accepted:    11.4K
 * Total Submissions: 24.1K
 * Testcase Example:  '[4,6,15,35]'
 *
 * 给定一个由不同正整数的组成的非空数组 nums ，考虑下面的图：
 * 
 * 
 * 有 nums.length 个节点，按从 nums[0] 到 nums[nums.length - 1] 标记；
 * 只有当 nums[i] 和 nums[j] 共用一个大于 1 的公因数时，nums[i] 和 nums[j]之间才有一条边。
 * 
 * 
 * 返回 图中最大连通组件的大小 。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：nums = [4,6,15,35]
 * 输出：4
 * 
 * 
 * 示例 2：
 * 
 * 
 * 
 * 
 * 输入：nums = [20,50,9,63]
 * 输出：2
 * 
 * 
 * 示例 3：
 * 
 * 
 * 
 * 
 * 输入：nums = [2,3,6,7,4,12,21,39]
 * 输出：8
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 2 * 10^4
 * 1 <= nums[i] <= 10^5
 * nums 中所有值都 不同
 * 
 * 
 */

// @lc code=start

// 需要有个并查集来维护联通性
/**
 * 1e5 内的所有素数
 *
 * 用 [欧拉筛](https://zhuanlan.zhihu.com/p/100051075) 可以先跑一下
 */
 const primeTable = [
    2, 3, 5, 7, 11, 13, 17, 19,
    23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
    67, 71, 73, 79, 83, 89, 97, 101, 103,
    107, 109, 113, 127, 131, 137, 139, 149,
    151, 157, 163, 167, 173, 179, 181, 191,
    193, 197, 199, 211, 223, 227, 229, 233,
    239, 241, 251, 257, 263, 269, 271, 277,
    281, 283, 293, 307, 311, 313, 317
]

const N = 2 * 1e5 + 10 
const p = new Array<number>(N), sz = new Array<number>(N)

let ans = 1

function find(x: number): number {
    if (p[x] != x) p[x] = find(p[x]) // p[x] 重新赋值 路径压缩
    return p[x]
}

function union(a: number, b: number): void {
    const [pa, pb] = [find(a), find(b)]
    if (pa == pb) return 
    p[pb] = p[pa]
    // 更新解题集
    sz[pa] += sz[pb]
    ans = Math.max(ans, sz[pa])
}

function putInMap(map: Map<number, Array<number>>, key: number, val: number): void {
    const list = map.get(key) ?? []
    list.push(val)
    map.set(key, list)
}

function largestComponentSize(nums: number[]): number {
    const n = nums.length
    const map: Map<number, Array<number>> = new Map<number, Array<number>>()
    // 建立映射， 素数 -> nums中的索引 i
    // eg 7 -> [0,7,8,34]  即代表 nums[0], nums[7], nums[8], nums[34] 均有素因数 7
    // 也就是 0， 7， 8， 34 也是连通的
    for (let i = 0; i < n; i++) {
        let cur = nums[i]
        for (let j = 0, prime = primeTable[j]; prime * prime <= cur; j++, prime = primeTable[j]) {
            if (cur % prime == 0) putInMap(map, prime, i)
            while (cur % prime == 0) cur /= prime
        }
        if (cur > 1) putInMap(map, cur, i)
    }

    // 初始化查并集和 nums 索引 i 下，所属连通集的个数大小
    for (let i = 0; i < n; i++) {
        p[i] = i; sz[i] = 1
    }

    ans = 1
    for (const list of map.values()) {
        // 对每个以素数为因素的连通集进行合并
        for (let i = 1; i < list.length; i++) union(list[0], list[i])
    }
    return ans
}

// @lc code=end

