/*
 * @lc app=leetcode.cn id=1700 lang=typescript
 *
 * [1700] 无法吃午餐的学生数量
 *
 * https://leetcode.cn/problems/number-of-students-unable-to-eat-lunch/description/
 *
 * algorithms
 * Easy (73.79%)
 * Likes:    114
 * Dislikes: 0
 * Total Accepted:    39.1K
 * Total Submissions: 53K
 * Testcase Example:  '[1,1,0,0]\n[0,1,0,1]'
 *
 * 学校的自助午餐提供圆形和方形的三明治，分别用数字 0 和 1 表示。所有学生站在一个队列里，每个学生要么喜欢圆形的要么喜欢方形的。
 * 餐厅里三明治的数量与学生的数量相同。所有三明治都放在一个 栈 里，每一轮：
 * 
 * 
 * 如果队列最前面的学生 喜欢 栈顶的三明治，那么会 拿走它 并离开队列。
 * 否则，这名学生会 放弃这个三明治 并回到队列的尾部。
 * 
 * 
 * 这个过程会一直持续到队列里所有学生都不喜欢栈顶的三明治为止。
 * 
 * 给你两个整数数组 students 和 sandwiches ，其中 sandwiches[i] 是栈里面第 i^​​​​​​ 个三明治的类型（i =
 * 0 是栈的顶部）， students[j] 是初始队列里第 j^​​​​​​ 名学生对三明治的喜好（j = 0
 * 是队列的最开始位置）。请你返回无法吃午餐的学生数量。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：students = [1,1,0,0], sandwiches = [0,1,0,1]
 * 输出：0 
 * 解释：
 * - 最前面的学生放弃最顶上的三明治，并回到队列的末尾，学生队列变为 students = [1,0,0,1]。
 * - 最前面的学生放弃最顶上的三明治，并回到队列的末尾，学生队列变为 students = [0,0,1,1]。
 * - 最前面的学生拿走最顶上的三明治，剩余学生队列为 students = [0,1,1]，三明治栈为 sandwiches = [1,0,1]。
 * - 最前面的学生放弃最顶上的三明治，并回到队列的末尾，学生队列变为 students = [1,1,0]。
 * - 最前面的学生拿走最顶上的三明治，剩余学生队列为 students = [1,0]，三明治栈为 sandwiches = [0,1]。
 * - 最前面的学生放弃最顶上的三明治，并回到队列的末尾，学生队列变为 students = [0,1]。
 * - 最前面的学生拿走最顶上的三明治，剩余学生队列为 students = [1]，三明治栈为 sandwiches = [1]。
 * - 最前面的学生拿走最顶上的三明治，剩余学生队列为 students = []，三明治栈为 sandwiches = []。
 * 所以所有学生都有三明治吃。
 * 
 * 
 * 示例 2：
 * 
 * 输入：students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
 * 输出：3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= students.length, sandwiches.length <= 100
 * students.length == sandwiches.length
 * sandwiches[i] 要么是 0 ，要么是 1 。
 * students[i] 要么是 0 ，要么是 1 。
 * 
 * 
 */
export {}
// @lc code=start

const takeWhile = (pred: (i: number) => boolean) => {
    type Ret = [satisfied: Array<number>, left: Array<number>]
    return (a: Array<number>): Ret => {
        const recursion = (s: Array<number>, a: Array<number>): Ret => {
            if (a.length > 0) {
                const hd = (a as [number, ...Array<number>])[0]
                if (pred(hd)) {
                    return recursion([...s, hd], a.slice(1))
                } else {
                    return [s, a]
                }
            } else {
                return [s, a]
            }
        }
        return recursion([], a)
    }
}

function countStudents(students: number[], sandwiches: number[]): number {
    
    const program = (students: Array<number>, sandwiches: Array<number>): number => {
        if (students.length > 0 && sandwiches.length > 0) {
            const sandwich = sandwiches[0]! 
            const [studentsDoesNotLike, studentLike] = takeWhile(it => it !== sandwich)(students)
            if (studentLike.length === 0) {
                // 所有人都不喜欢吃这个三明治
                return studentsDoesNotLike.length
            } else {
                // 把不喜欢吃的人 排到队尾
                const newStudents = studentLike.slice(1).concat(studentsDoesNotLike)
                // 拿走它
                const newSandwiches = sandwiches.slice(1)
                return program(newStudents, newSandwiches)
            }
        } else {
            // 没有学生了 或者 三明治被吃光了
            return 0
        }
    }

    return program(students, sandwiches)
};
// @lc code=end
