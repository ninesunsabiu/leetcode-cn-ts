/*
 * @lc app=leetcode.cn id=481 lang=typescript
 *
 * [481] 神奇字符串
 *
 * https://leetcode.cn/problems/magical-string/description/
 *
 * algorithms
 * Medium (57.58%)
 * Likes:    160
 * Dislikes: 0
 * Total Accepted:    29.5K
 * Total Submissions: 46.2K
 * Testcase Example:  '6'
 *
 * 神奇字符串 s 仅由 '1' 和 '2' 组成，并需要遵守下面的规则：
 * 
 * 
 * 神奇字符串 s 的神奇之处在于，串联字符串中 '1' 和 '2' 的连续出现次数可以生成该字符串。
 * 
 * 
 * s 的前几个元素是 s = "1221121221221121122……" 。如果将 s 中连续的若干 1 和 2 进行分组，可以得到 "1 22 11
 * 2 1 22 1 22 11 2 11 22 ......" 。每组中 1 或者 2 的出现次数分别是 "1 2 2 1 1 2 1 2 2 1 2 2
 * ......" 。上面的出现次数正是 s 自身。
 * 
 * 给你一个整数 n ，返回在神奇字符串 s 的前 n 个数字中 1 的数目。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：n = 6
 * 输出：3
 * 解释：神奇字符串 s 的前 6 个元素是 “122112”，它包含三个 1，因此返回 3 。 
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：n = 1
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= n <= 10^5
 * 
 * 
 */
export {}
// @lc code=start
const makeMagicalString = () => {
    const magicalStringCharacter: Array<2 | 1> = [1, 2, 2, 1]
    let patternMakerIdx = 1
    let idx = 0

    return function* iter() {
        while (true) {
            // 生成神奇字符串
            patternMakerIdx += 1
            // p 表示当前字符应该连续出现的数量
            const p = magicalStringCharacter[patternMakerIdx]!
            // 神奇字符串最后一个字符的情况
            const last = magicalStringCharacter[magicalStringCharacter.length - 1]!
            // 模式匹配 p last 的情况
            if (p === 2 && last === 1) {
                magicalStringCharacter.push(1, 2)
            } else if (p === 2 && last === 2) {
                magicalStringCharacter.push(2, 1)
            } else if (p === 1 && last === 1) {
                magicalStringCharacter.push(2)
            } else if (p === 1 && last === 2) {
                magicalStringCharacter.push(1)
            }

            yield magicalStringCharacter[idx]!
            idx++
        }
    }()
}

function magicalString(n: number): number {
    const iter = makeMagicalString()
    let ans = 0
    let count = 0
    for (const character of iter) {
        if (count === n) {
            break;
        }
        if (character === 1) {
            ans++
        }
        count++
    }

    return ans
}

// @lc code=end

