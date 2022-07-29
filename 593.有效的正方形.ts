/*
 * @lc app=leetcode.cn id=593 lang=typescript
 *
 * [593] 有效的正方形
 *
 * https://leetcode.cn/problems/valid-square/description/
 *
 * algorithms
 * Medium (44.11%)
 * Likes:    147
 * Dislikes: 0
 * Total Accepted:    26.9K
 * Total Submissions: 58.1K
 * Testcase Example:  '[0,0]\n[1,1]\n[1,0]\n[0,1]'
 *
 * 给定2D空间中四个点的坐标 p1, p2, p3 和 p4，如果这四个点构成一个正方形，则返回 true 。
 * 
 * 点的坐标 pi 表示为 [xi, yi] 。输入 不是 按任何顺序给出的。
 * 
 * 一个 有效的正方形 有四条等边和四个等角(90度角)。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
 * 输出: True
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入：p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]
 * 输出：false
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入：p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]
 * 输出：true
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * p1.length == p2.length == p3.length == p4.length == 2
 * -10^4 <= xi, yi <= 10^4
 * 
 * 
 */

// @lc code=start
type Point = [x: number, y: number]

/**
 * 判断两条直线，是否垂直
 */
const isVertical = (l1: [Point, Point], l2: [Point, Point]) => {
    const [[x1, y1], [x2, y2]] = l1
    const [[x3, y3], [x4, y4]] = l2
    return (y1 - y2 | 0) * (y3 - y4 | 0) === (x4 - x3 | 0) * (x1 - x2 | 0)
}

/**
 * 获取两点中的中点
 */
const getMiddlePoint = (p: Point, p2: Point): Point => [
    (p[0] + p2[0] | 0) / 2,
    (p[1] + p2[1] | 0) / 2
]

const pointEq = (p: Point, p2: Point) => p[0] === p2[0] && p[1] === p2[1]

function validSquare(p1: Point, p2: Point, p3: Point, p4: Point): boolean {

    if (new Set([p1, p2, p3, p4].map((t) => t.join())).size !== 4) {
        return false
    }

    if (isVertical([p1, p2], [p2, p4])) {
        // AB 垂直于 BD
        // B 为垂足, C 和 B 应该关于 AD 对称
        // CB 垂直平分 AD
        return pointEq(getMiddlePoint(p2, p3), getMiddlePoint(p1, p4))
                && isVertical([p2, p3], [p1, p4])
    } else if (isVertical([p1, p2], [p1, p4])){
        // 同理
        return pointEq(getMiddlePoint(p1, p3), getMiddlePoint(p2, p4))
                && isVertical([p1, p3], [p2, p4])
    } else if (isVertical([p2, p4], [p1, p4])) {
        return pointEq(getMiddlePoint(p4, p3), getMiddlePoint(p1, p2))
                && isVertical([p4, p3], [p1, p2])
    } else {
        return false
    }
};
// @lc code=end

