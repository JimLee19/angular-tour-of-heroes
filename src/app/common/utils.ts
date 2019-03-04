
/**处理数值精度问题 */
export function strip(num: number, precision = 12) {
    return +parseFloat(num.toPrecision(precision));
}