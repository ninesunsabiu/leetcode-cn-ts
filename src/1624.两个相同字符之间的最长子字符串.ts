/*
 * @lc app=leetcode.cn id=1624 lang=typescript
 *
 * [1624] 两个相同字符之间的最长子字符串
 *
 * https://leetcode.cn/problems/largest-substring-between-two-equal-characters/description/
 *
 * algorithms
 * Easy (61.84%)
 * Likes:    45
 * Dislikes: 0
 * Total Accepted:    28K
 * Total Submissions: 43.7K
 * Testcase Example:  '"aa"'
 *
 * 给你一个字符串 s，请你返回 两个相同字符之间的最长子字符串的长度 ，计算长度时不含这两个字符。如果不存在这样的子字符串，返回 -1 。
 * 
 * 子字符串 是字符串中的一个连续字符序列。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：s = "aa"
 * 输出：0
 * 解释：最优的子字符串是两个 'a' 之间的空子字符串。
 * 
 * 示例 2：
 * 
 * 输入：s = "abca"
 * 输出：2
 * 解释：最优的子字符串是 "bc" 。
 * 
 * 
 * 示例 3：
 * 
 * 输入：s = "cbzxy"
 * 输出：-1
 * 解释：s 中不存在出现出现两次的字符，所以返回 -1 。
 * 
 * 
 * 示例 4：
 * 
 * 输入：s = "cabbac"
 * 输出：4
 * 解释：最优的子字符串是 "abba" ，其他的非最优解包括 "bb" 和 "" 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 300
 * s 只含小写英文字母
 * 
 * 
 */

// @lc code=start
function maxLengthBetweenEqualCharacters(s: string): number {
    const empty: [ans: number, scannedRecord: Record<string, number>] = [-1, {}];
    return Array.from(s).reduce(([ans, scannedRecord], cur, idx): typeof empty => {
        // 查看是否有前一个记录
        const prevSameCharInfo = scannedRecord[cur];
        // 当前字符与前一字符之间的距离
        if (prevSameCharInfo != null) {
            // 已经扫描到第一次出现的字符
            // 则最长记录等于 索引偏移量之差 - 1
            const distance = (idx - prevSameCharInfo - 1) | 0;
            // 更新最大值，并保留扫描记录 进入下一次累积
            return [Math.max(ans, distance), scannedRecord];
        } else {
            // 第一次出现该字符 则在扫描表中记录下该位置，及其索引
            return [ans, { ...scannedRecord, [cur]: idx }];
        }
    }, empty)[0];

};

// @lc code=end

