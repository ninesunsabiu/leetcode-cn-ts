/*
 * @lc app=leetcode.cn id=1089 lang=typescript
 *
 * [1089] 复写零
 */

// @lc code=start
/**
 Do not return anything, modify arr in-place instead.
 */
 function duplicateZeros(arr: number[]): void {

    let indexPoint: number = 0;
    while (true) {
        if (indexPoint > arr.length - 2) {
            break;
        }
        if (arr[indexPoint] === 0) {
            arr.splice(indexPoint, 0, 0);
            arr.splice(arr.length - 1, 1)
            indexPoint += 2;
            continue;
        } else {
            indexPoint += 1;
        }
    }
}
// @lc code=end

