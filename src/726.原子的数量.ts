/*
 * @lc app=leetcode.cn id=726 lang=typescript
 *
 * [726] 原子的数量
 *
 * https://leetcode.cn/problems/number-of-atoms/description/
 *
 * algorithms
 * Hard (55.20%)
 * Likes:    278
 * Dislikes: 0
 * Total Accepted:    25.9K
 * Total Submissions: 47K
 * Testcase Example:  '"H2O"'
 *
 * 给你一个字符串化学式 formula ，返回 每种原子的数量 。
 * 
 * 原子总是以一个大写字母开始，接着跟随 0 个或任意个小写字母，表示原子的名字。
 * 
 * 如果数量大于 1，原子后会跟着数字表示原子的数量。如果数量等于 1 则不会跟数字。
 * 
 * 
 * 例如，"H2O" 和 "H2O2" 是可行的，但 "H1O2" 这个表达是不可行的。
 * 
 * 
 * 两个化学式连在一起可以构成新的化学式。
 * 
 * 
 * 例如 "H2O2He3Mg4" 也是化学式。
 * 
 * 
 * 由括号括起的化学式并佐以数字（可选择性添加）也是化学式。
 * 
 * 
 * 例如 "(H2O2)" 和 "(H2O2)3" 是化学式。
 * 
 * 
 * 返回所有原子的数量，格式为：第一个（按字典序）原子的名字，跟着它的数量（如果数量大于
 * 1），然后是第二个原子的名字（按字典序），跟着它的数量（如果数量大于 1），以此类推。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：formula = "H2O"
 * 输出："H2O"
 * 解释：原子的数量是 {'H': 2, 'O': 1}。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：formula = "Mg(OH)2"
 * 输出："H2MgO2"
 * 解释：原子的数量是 {'H': 2, 'Mg': 1, 'O': 2}。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：formula = "K4(ON(SO3)2)2"
 * 输出："K4N2O14S4"
 * 解释：原子的数量是 {'K': 4, 'N': 2, 'O': 14, 'S': 4}。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= formula.length <= 1000
 * formula 由英文字母、数字、'(' 和 ')' 组成
 * formula 总是有效的化学式
 * 
 * 
 */
export {}
// @lc code=start
type Atom = string;
type Count = number;
/**
 * 将一个 括号 括起的化学式 分离出 系数 和 内部化学式 以及剩余 化学式
 */
const getSubFormulaInnerParentheses = (s: string): [subFormula: [string, Count], rest: string] => {
    let mark = 0
    let subFormula = ''
    const charIterator = Array.from(s).values()
    do {
        const iter = charIterator.next() 
        if (iter.done) {
            return [['', 0], s]
        } else {
            const char = iter.value
            if (char === '(') {
                subFormula += mark === 0 ? '' : char
                mark += 1
            } else if (char === ")") {
                subFormula += mark === 1 ? '' : char
                mark -= 1
            } else {
                subFormula += char 
            }
        }
    } while (mark !== 0)
    // 括号匹配结束
    const rest = Array.from(charIterator).join('')
    const i = /^(?<count>[0-9]+)(?<rest>.*)$/.exec(rest)
    const [count, restStr] = i ? [Number(i.groups!['count']), i.groups!['rest']!] : [1, rest]

    return [[subFormula, count], restStr]
}

function countOfAtoms(formula: string): string {
    type Ans = Record<Atom, Count>
    const program = (ans: Ans, formula: string): Ans => {
        if (formula.length === 0) {
            return ans
        } else {
            const hd = formula[0]!
            if (/\(/.test(hd)) {
                // 开始括号计算
                const [[subFormula, subFormulaCount], rest] = getSubFormulaInnerParentheses(formula)
                if (subFormula) {
                    const i = program({}, subFormula)
                    const subAns = Object.fromEntries(Object.entries(i).map(([a, b]) => [a, b * subFormulaCount + (ans[a] ?? 0)]))
                    const newAns = { ...ans, ...subAns }
                    return program(newAns, rest)
                } else {
                    return program(ans, rest)
                }
            } else if (/[A-Z]/.test(hd)) {
                // 进入一个原子开头 
                const execRet = /(?<part>[^A-Z(]*)(?<rest>.*)/.exec(formula.slice(1))!
                const atom = hd + execRet.groups!["part"]!
                const atomAndCount = /(?<atom>\D+)(?<count>\d*)/.exec(atom)!
                const atomEntry = [atomAndCount.groups!["atom"]!, Math.max(Number(atomAndCount.groups!["count"]), 1)] as const
                const newAns = { ...ans, [atomEntry[0]]: (ans[atomEntry[0]] ?? 0) + atomEntry[1] }
                const rest = execRet.groups!["rest"]!;
                return program(newAns, rest)
            } else {
                throw new Error("fails")
            }
        }
    }

    const ans = program({}, formula);

    return Object.entries(ans).sort(([a], [b]) => a.localeCompare(b)).map(
        ([atom, count]) => {
            return `${atom}${count === 1 ? "" : count}`
        }
    ).join("")
};
// @lc code=end

