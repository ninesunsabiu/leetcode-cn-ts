/*
 * @lc app=leetcode.cn id=779 lang=typescript
 *
 * [779] 第K个语法符号
 *
 * https://leetcode.cn/problems/k-th-symbol-in-grammar/description/
 *
 * algorithms
 * Medium (44.08%)
 * Likes:    256
 * Dislikes: 0
 * Total Accepted:    43.3K
 * Total Submissions: 88.6K
 * Testcase Example:  '1\n1'
 *
 * 我们构建了一个包含 n 行( 索引从 1  开始 )的表。首先在第一行我们写上一个
 * 0。接下来的每一行，将前一行中的0替换为01，1替换为10。
 * 
 * 
 * 例如，对于 n = 3 ，第 1 行是 0 ，第 2 行是 01 ，第3行是 0110 。
 * 
 * 
 * 给定行数 n 和序数 k，返回第 n 行中第 k 个字符。（ k 从索引 1 开始）
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: n = 1, k = 1
 * 输出: 0
 * 解释: 第一行：0
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: n = 2, k = 1
 * 输出: 0
 * 解释: 
 * 第一行: 0 
 * 第二行: 01
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入: n = 2, k = 2
 * 输出: 1
 * 解释:
 * 第一行: 0
 * 第二行: 01
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= n <= 30
 * 1 <= k <= 2^n - 1
 * 
 * 
 */
export {}
// @lc code=start
function kthGrammar(n: number, k: number): 0 | 1 {
    // 给一个层级 以及 在该层中的第几个 返回它的父亲节点所在的层中的序号
    // n >= 2
    const getParentNodeKth = (n: number, k: number) => {
        // 满二叉树编号
        const num = (2 ** (n - 1)) + k - 1 | 0
        // 父节点编号
        const parentNum = num >> 1
        // 父节点层序
        return parentNum - (2 ** (n - 2)) + 1
    }

    // 尾递归程序 求解一个 n,k 的值，值会从 cb 中“通知”出来
    const program = (cb: (i: 0 | 1) => typeof i, n: number, k: number): 0 | 1 => {
        if (n === 1) {
            return cb(0)
        }
        if (n === 2) {
            return cb(k === 1 ? 0 : 1)
        }
        // 在 n > 2 时 得到父节点的层序
        const parentKth = getParentNodeKth(n, k)
        // 递归程序求解
        return program(
            (/* 父节点的值 */ parentValue) => {
                const isLeft = (k & 1) === 1
                return cb(parentValue === 0 ? isLeft ? 0 : 1 : isLeft ? 1 : 0)
            },
            n - 1,
            parentKth
        )
    }
    // 运行程序求解
    return program(it => it, n, k)
};
// @lc code=end

