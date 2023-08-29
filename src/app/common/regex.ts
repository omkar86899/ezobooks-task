export class Regex {
    // regex which only takes whole numbers with no fraction it will take zero also (ex. 0.00[pass], 0.01[fail], 1.00[pass], 1.10[fail], 212[pass])
    static onlyWholeNumbersWithDecimalValueZero = /^[0-9]*[.]?0*$/
    // regex which only takes whole numbers with no fraction it will not take only zeroes (ex. 0.00[fail], 0.01[fail], 1.00[pass], 1.10[fail], 212[pass])
    static onlyWholeNumbersWithoutZeroWithDecimalValueZero = /^([0-9]?)+[1-9][0-9]*.?0*$/
}