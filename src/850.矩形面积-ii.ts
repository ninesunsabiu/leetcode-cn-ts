/*
 * @lc app=leetcode.cn id=850 lang=typescript
 *
 * [850] 矩形面积 II
 *
 * https://leetcode.cn/problems/rectangle-area-ii/description/
 *
 * algorithms
 * Hard (48.23%)
 * Likes:    206
 * Dislikes: 0
 * Total Accepted:    12.6K
 * Total Submissions: 20.7K
 * Testcase Example:  '[[0,0,2,2],[1,0,2,3],[1,0,3,1]]'
 *
 * 我们给出了一个（轴对齐的）二维矩形列表 rectangles 。 对于 rectangle[i] = [x1, y1, x2,
 * y2]，其中（x1，y1）是矩形 i 左下角的坐标， (xi1, yi1) 是该矩形 左下角 的坐标， (xi2, yi2) 是该矩形 右上角
 * 的坐标。
 * 
 * 计算平面中所有 rectangles 所覆盖的 总面积 。任何被两个或多个矩形覆盖的区域应只计算 一次 。
 * 
 * 返回 总面积 。因为答案可能太大，返回 10^9 + 7 的 模 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
 * 输出：6
 * 解释：如图所示，三个矩形覆盖了总面积为6的区域。
 * 从(1,1)到(2,2)，绿色矩形和红色矩形重叠。
 * 从(1,0)到(2,3)，三个矩形都重叠。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：rectangles = [[0,0,1000000000,1000000000]]
 * 输出：49
 * 解释：答案是 10^18 对 (10^9 + 7) 取模的结果， 即 49 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= rectangles.length <= 200
 * rectanges[i].length = 4
 * 0 <= xi1, yi1, xi2, yi2 <= 10^9
 * 矩形叠加覆盖后的总面积不会超越 2^63 - 1 ，这意味着可以用一个 64 位有符号整数来保存面积结果。
 * 
 * 
 */
export {}
// @lc code=start
const mod = 1e9 + 7;

type RectPoint = [x1: number, y1: number, x2: number, y2: number]
type SweepPoint = [x: number, recIdx: number, diff: number]

function rectangleArea(rectangles: Array<RectPoint>): number {

    const hbound = Array
        .from(new Set(rectangles.flatMap(it => [it[1], it[3]])))
        .sort((a, b) => a - b < 0 ? -1 : a === b ? 0 : 1)

    const m = hbound.length

    const sweep = rectangles
                    .flatMap((it, idx): Array<SweepPoint> => [
                        [it[0], idx, 1],
                        [it[2], idx, -1]
                    ])
                    .sort(
                        ([a0, a1, a2], [b0, b1, b2]) => {
                            if (a0 !== b0)          return a0 - b0
                            else if (a1 !== b1)     return a1 - b1
                            else                    return a2 - b2
                        }
                    )

    const seg: Array<number> = Array.from({ length: m - 1 }, () => 0)
    let ans = 0n;
    const sweepSize = sweep.length
    for (let i = 0; i < sweepSize; ++i) {
        let j = i;
        while (j + 1 < sweepSize && sweep[i]![0] == sweep[j + 1]![0]) {
            ++j;
        }
        if (j + 1 == sweepSize) {
            break;
        }
        // 一次性地处理掉一批横坐标相同的左右边界
        for (let k = i; k <= j; ++k) {
            const [,idx, diff] = sweep[k]!
            const [,left,,right] = rectangles[idx]!
            for (let x = 0; x < m - 1; ++x) {
                if (left <= hbound[x]! && hbound[x + 1]! <= right) {
                    seg[x] = diff + seg[x]!;
                }
            }
        }

        let cover = 0;
        for (let k = 0; k < m - 1; ++k) {
            if (seg[k]! > 0) {
                cover += (hbound[k + 1]! - hbound[k]!);
            }
        }

        ans = ans + BigInt(cover) * BigInt(sweep[j + 1]![0] - sweep[j]![0]);
        i = j;
    }
    return Number(ans % BigInt(mod));
};
// @lc code=end

