function CheckPermutation(s1: string, s2: string): boolean {
    const sortedAndThenJoin = (s: string) => Array.from(s).sort().join('-')
    return eqBy(sortedAndThenJoin)(s1, s2)
};

const eqBy = <A, B>(cMap: (a: A) => B) => {
    return (one: A, theOther: A) => cMap(one) === cMap(theOther)
}