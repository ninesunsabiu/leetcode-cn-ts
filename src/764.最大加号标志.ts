/*
 * @lc app=leetcode.cn id=764 lang=typescript
 *
 * [764] 最大加号标志
 *
 * https://leetcode.cn/problems/largest-plus-sign/description/
 *
 * algorithms
 * Medium (49.78%)
 * Likes:    180
 * Dislikes: 0
 * Total Accepted:    21.6K
 * Total Submissions: 40.4K
 * Testcase Example:  '5\n[[4,2]]'
 *
 * 在一个 n x n 的矩阵 grid 中，除了在数组 mines 中给出的元素为 0，其他每个元素都为 1。mines[i] = [xi, yi]表示
 * grid[xi][yi] == 0
 *
 * 返回  grid 中包含 1 的最大的 轴对齐 加号标志的阶数 。如果未找到加号标志，则返回 0 。
 *
 * 一个 k 阶由 1 组成的 “轴对称”加号标志 具有中心网格 grid[r][c] == 1 ，以及4个从中心向上、向下、向左、向右延伸，长度为
 * k-1，由 1 组成的臂。注意，只有加号标志的所有网格要求为 1 ，别的网格可能为 0 也可能为 1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入: n = 5, mines = [[4, 2]]
 * 输出: 2
 * 解释: 在上面的网格中，最大加号标志的阶只能是2。一个标志已在图中标出。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入: n = 1, mines = [[0, 0]]
 * 输出: 0
 * 解释: 没有加号标志，返回 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 500
 * 1 <= mines.length <= 5000
 * 0 <= xi, yi < n
 * 每一对 (xi, yi) 都 不重复​​​​​​​
 *
 *
 */
export {};
// @lc code=start
/**
 * 获得每个索引处，左右连续的1的个数
 */
type GetContinuousOneRet = Array<[l: number, r: number]>;
const getContinuousOne = (n: number, minesIndex: Array<number>): GetContinuousOneRet => {
    const goRec = (
        acc: GetContinuousOneRet,
        index: number,
        prevMinesIndex: number,
        minesIndex: Array<number>
    ): typeof acc => {
        if (index < n) {
            const minMinesIndex = minesIndex[0] ?? n;
            const isMine = minMinesIndex === index;
            const cur: [number, number] = isMine ? [0, 0] : [index - prevMinesIndex, minMinesIndex - index];
            const next: typeof acc = [...acc, cur];
            const nextIdx = index + 1;
            if (isMine) {
                const nextPrevMinesIndex = minMinesIndex;
                const nextMinesIndex = minesIndex.slice(1);
                return goRec(next, nextIdx, nextPrevMinesIndex, nextMinesIndex);
            } else {
                return goRec(next, nextIdx, prevMinesIndex, minesIndex);
            }
        } else {
            return acc;
        }
    };

    let ans: GetContinuousOneRet = [];
    let index = 0;
    let prevMinesIndex = -1;
    let minesIndexPointer = 0;
    while (true) {
        if (index < n) {
            const minMinesIndex = minesIndex[minesIndexPointer] ?? n;
            const isMine = minMinesIndex === index;
            const cur: [number, number] = isMine ? [0, 0] : [index - prevMinesIndex, minMinesIndex - index];
            ans.push(cur);
            // const nextIdx = index + 1
            index = index + 1;
            if (isMine) {
                // const nextPrevMinesIndex = minMinesIndex
                // const nextMinesIndex = minesIndex.slice(1)
                // return goRec(next, nextIdx, nextPrevMinesIndex, nextMinesIndex)
                prevMinesIndex = minMinesIndex;
                minesIndexPointer = minesIndexPointer + 1;
            } else {
                // return goRec(next, nextIdx, prevMinesIndex, minesIndex)
            }
        } else {
            return ans;
        }
    }
    return ans;
    // 尾递归耗时太长了 所以改成循环实现
    return goRec([], 0, -1, minesIndex);
};

function findInsertIndex(arr: Array<number>, low: number, high: number, key: number): number {
    if (low > high) {
        return low;
    }
    var mid = Math.floor((low + high) / 2);
    const i = arr[mid]!;
    if (i == key || mid === high) {
        return mid;
    } else if (i < key) {
        low = mid + 1;
        return findInsertIndex(arr, low, high, key);
    } else if (i > key) {
        high = mid - 1;
        return findInsertIndex(arr, low, high, key);
    } else {
        throw new Error();
    }
}

type Coordinate = [x: number, y: number];
const getMapForCoordinate = (array: Array<Coordinate>): Record<number, Array<number>> => {
    const ans: Record<number, Array<number>> = {};
    for (const [x, y] of array) {
        const prev = ans[x] ?? [];
        // 这里也是为了性能考虑 做了可变操作
        const insertIdx = findInsertIndex(prev, 0, prev.length, y);
        prev.splice(insertIdx, 0, y);
        ans[x] = prev;
    }
    return ans;
};

function orderOfLargestPlusSign(n: number, mines: Array<Coordinate>): number {
    const getContinuousOneBound = (mines: Array<number>) => getContinuousOne(n, mines);

    const getCellInfo = (mines: Array<Coordinate>) => {
        const record = getMapForCoordinate(mines);
        return Array.from({ length: n }, (_, i) => i).map((it) => getContinuousOneBound(record[it] ?? []));
    };

    const rowInfo = getCellInfo(mines);
    const colInfo = getCellInfo(mines.map((it) => [it[1], it[0]]));

    const getCoordinate = (code: number) => [(code / n) | 0, code % n] as const;

    let ans = 0;
    for (const i of Array.from({ length: n * n }, (_, it) => it)) {
        const [x, y] = getCoordinate(i);
        const [left, right] = rowInfo[x]![y]!;
        const [top, bottom] = colInfo[y]![x]!;
        const k = Math.min(left, right, top, bottom);
        if (k > ans) {
            ans = k;
        }
    }

    return ans;
}
// @lc code=end
