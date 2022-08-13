/*
 * @lc app=leetcode.cn id=768 lang=typescript
 *
 * [768] 最多能完成排序的块 II
 *
 * https://leetcode.cn/problems/max-chunks-to-make-sorted-ii/description/
 *
 * algorithms
 * Hard (52.37%)
 * Likes:    218
 * Dislikes: 0
 * Total Accepted:    22.7K
 * Total Submissions: 39.2K
 * Testcase Example:  '[5,4,3,2,1]'
 *
 * 这个问题和“最多能完成排序的块”相似，但给定数组中的元素可以重复，输入数组最大长度为2000，其中的元素最大为10**8。
 * 
 * 
 * arr是一个可能包含重复元素的整数数组，我们将这个数组分割成几个“块”，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。
 * 
 * 我们最多能将数组分成多少块？
 * 
 * 示例 1:
 * 
 * 
 * 输入: arr = [5,4,3,2,1]
 * 输出: 1
 * 解释:
 * 将数组分成2块或者更多块，都无法得到所需的结果。
 * 例如，分成 [5, 4], [3, 2, 1] 的结果是 [4, 5, 1, 2, 3]，这不是有序的数组。 
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: arr = [2,1,3,4,4]
 * 输出: 4
 * 解释:
 * 我们可以把它分成两块，例如 [2, 1], [3, 4, 4]。
 * 然而，分成 [2, 1], [3], [4], [4] 可以得到最多的块数。 
 * 
 * 
 * 注意:
 * 
 * 
 * arr的长度在[1, 2000]之间。
 * arr[i]的大小在[0, 10**8]之间。
 * 
 * 
 */
export {}
// @lc code=start
type NonEmptyArray<T> = [T, ...T[]];

type Chunk = {
    min: number;
    max: number;
    data: NonEmptyArray<number>;
}

const ofChunk = (d: number): Chunk => {
    return { min: d, max: d, data: [d] }
}

const concatChunk = (a: Chunk, b: Chunk): Chunk => {
    return {
        min: Math.min(a.min, b.min),
        max: Math.max(a.max, b.max),
        data: [...a.data, ...b.data]
    }
}

///////// start of List //////////////

type Nil = null
type Cons<T> = { hd: T, tail: MyList<T>, length: number } 
type MyList<T> = Nil | Cons<T>

const cons = <T>(data: T) => {
    return <T>(list: MyList<T>) => {
        return { hd: data, length: (list?.length ?? 0) + 1 | 0, tail: list }
    }
}

const head = <T>(list: MyList<T>): T | undefined => list?.hd 

const tail = <T>(list: MyList<T>): MyList<T> | undefined => list?.tail

const length = <T>(list: MyList<T>): number => list?.length ?? 0

const nil = null

////////// end of List //////////////

const identity = <T>(x: T) => x

/**
 * 根据题意 调整分组情况  
 * 步骤是，每次检查最右边的分组最小值，是否大于等于前一个的分组最大值  
 * 如果满足，则停止调整  
 * 如果不满足，将最右边的分组融合入前一个分组，继续递归调整  
 */
const adjustListRec = (list: MyList<Chunk>): MyList<Chunk> => {
    return list ? (() => {
        const { hd, tail: tailList } = list;
        const hdOfTail = head(tailList)
        if (hdOfTail && hdOfTail.max > hd.min) {
            return adjustListRec(cons(concatChunk(hd, hdOfTail))(tail(tailList) ?? nil))
        } else {
            return list
        }
    })() : nil
}

function maxChunksToSorted(arr: number[]): number {

    // 贪心，将数组每个分成一个块，再进行调整
    const allChunks = arr.map(ofChunk);

    // 由题意约束 可以得到具体规则如下
    // 每个分块的最大值，应该「小于等于」下一个分块的最小值  （取等于是为了尽可能的多）
    // 例如 已经形成的一个好的分组 [[x,y,z]...[i,ii,iii]] 现在新加入一个块 [iii]
    // 如果 iii 正好等于 iii 那么，可以选择加入上一个分组，也可以选择独立分组 都能使得排序后在连接符合题意
    // 所以在题目要求尽可能多的情况下，相等，选择独立分组

    const ans = allChunks.reduce<MyList<Chunk>>(
        (/* 已经分好组的集合 */list, cur) => {
            return adjustListRec(cons(cur)(list))
        },
        nil
    )
    return length(ans)
};
// @lc code=end

