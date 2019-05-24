
/**金额转大写 */
function moneyToUpper(money: number) {
    const num = `${money}`.replace('.', '');
    let unit = '千百拾亿千百拾万千百拾元角分';
    unit = unit.substr(unit.length - num.length);
    let str = '';
    for (let i = 0; i < num.length; i++) {
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(parseInt(num.charAt(i), 10)) + unit.charAt(i);
    }
    // tslint:disable-next-line: max-line-length
    return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整');
}

function guid() {
    return 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export { guid, moneyToUpper };
