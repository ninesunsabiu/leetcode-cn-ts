function isFlipedString(s1: string, s2: string): boolean {
    // 以 s1 为模板 判断 是否可由 s2 分割旋转得到
    const checkRec = (idx: number): boolean => {
        if (idx >= 0) {
            const [init, tail] = [s2.slice(0, idx), s2.slice(idx)]
            const equal = (tail + init) === s1
            return equal || checkRec(idx - 1)
        } else {
            return false
        }
    }

    return checkRec(s2.length)
}

export {}