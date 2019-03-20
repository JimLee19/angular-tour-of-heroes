
/**处理数值精度问题 */
export function strip(num: number, precision = 12) {
    return +parseFloat(num.toPrecision(precision));
}
/**解决toFixed的问题 */
export function toFixed(num: number, precision = 2) {
    const times = Math.pow(10, precision)
    const des = (num * times + 0.5) / times
    return des;
}
/**金额转大写 */
export function moneyToUpper(money: number) {
    money=toFixed(money,2);
    const num = `${money}`.replace('.','');
    let unit = "千百拾亿千百拾万千百拾元角分";
    unit = unit.substr(unit.length - num.length);
    let str='';
    for (var i=0; i < num.length; i++){
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(parseInt(num.charAt(i),10)) + unit.charAt(i);
    }
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}