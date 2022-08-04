/*
 * @lc app=leetcode.cn id=36 lang=typescript
 *
 * [36] 有效的数独
 *
 * https://leetcode.cn/problems/valid-sudoku/description/
 *
 * algorithms
 * Medium (63.43%)
 * Likes:    932
 * Dislikes: 0
 * Total Accepted:    306.2K
 * Total Submissions: 482.7K
 * Testcase Example:  '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'
 *
 * 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。
 * 
 * 
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 * 
 * 
 * 
 * 
 * 注意：
 * 
 * 
 * 一个有效的数独（部分已被填充）不一定是可解的。
 * 只需要根据以上规则，验证已经填入的数字是否有效即可。
 * 空白格用 '.' 表示。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：board = 
 * [["5","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：board = 
 * [["8","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * 输出：false
 * 解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在,
 * 因此这个数独是无效的。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * board.length == 9
 * board[i].length == 9
 * board[i][j] 是一位数字（1-9）或者 '.'
 * 
 * 
 */

// @lc code=start
const range = (start: number, length: number) =>
        Array.from({ length }, (_, i) => i + start)

const getGridIdx = (i: number) => Math.floor(i / 3) % 3

const matchLeftArray = <A, Ret>(
    onEmpty: () => Ret,
    onNonEmpty: (a: A, tail: Array<A>) => Ret,
): (as: Array<A>) => Ret => {
    return (as) => {
        const [h, ...t] = as
        return h ? onNonEmpty(h, t) : onEmpty()
    }
}

const constTrue = () => true

type Cell = { data: string; rowIdx: number; colIdx: number, girdIdx: string }

/**
 * 按照三个维度查看是否有重复数字，每个维度以一个 Record Store 存储信息  
 * rowInfo -> 储存每一行的已填写情况  
 * colInfo -> 储存每一列的已填写情况  
 * gridInfo -> 储存每一个 3x3 宫的已填写情况  
 * 
 * 最终返回是否在某个维度有重复数字 true 为合法数独 false 为不合法数独
 */
const checkSudokuRec = (
    rowInfo: Record<number, number>,
    colInfo: Record<number, number>,
    gridInfo: Record<string, number>
) => {
    return matchLeftArray<Cell, boolean>(constTrue, (head, tail) => {
        const { data, rowIdx, colIdx, girdIdx } = head;
        // 以 1 位移作为存储格子的数据， 将 info 抽象成为包含 9 个位的小格子
        // 例如 data 为 4 时 则判断 info 所在的第四个格子是否有 1 了
        // 则重复有 info & (1 << 4) === info
        const curBit = 1 << parseInt(data)
        const demission = [rowInfo[rowIdx], colInfo[colIdx], gridInfo[girdIdx]] as const

        // 若某个维度存在了相同的数字，则 a & bit === a
        // conflict 会返回 true
        const conflict = demission.some((bit) => (bit & curBit) === curBit)

        return conflict
            ? false
            : checkSudokuRec(
                  { ...rowInfo, [rowIdx]: demission[0] | curBit },
                  { ...colInfo, [colIdx]: demission[1] | curBit },
                  { ...gridInfo, [girdIdx]: demission[2] | curBit }
              )(tail)
    });
};

/**
 * 从数独板中获取已填写的数据，并附加上行/列/ 3x3 单元格编号的位置信息
 */
const getAllCellData = (board: Array<Array<string>>): Array<Cell> => {
    return range(0, 9).flatMap(
        rowIdx => range(0, 9).flatMap(
            (colIdx): Array<Cell> => {
                // 转换数独格子中的数据 并抛弃掉未填写的数据
                const data = board[rowIdx]?.[colIdx] ?? '.'
                return data === '.' ? [] : [{ data, rowIdx, colIdx, girdIdx: `${getGridIdx(rowIdx)}${getGridIdx(colIdx)}` }]
            }
        )
    )

}


function isValidSudoku(board: string[][]): boolean {
    const program = checkSudokuRec({}, {}, {})
    return program(getAllCellData(board)) 
};
// @lc code=end

