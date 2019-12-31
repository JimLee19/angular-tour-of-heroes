import { round } from './number-precision';

/**金额转大写 */
function moneyToUpper(money: number) {
    const st = `${money}`.split('.');
    const num = st[0] + `${(st[1] || '')}00`.substr(0, 2);

    let unit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    unit = unit.substr(unit.length - num.length);
    let str = '';
    for (let i = 0; i < num.length; i++) {
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(parseInt(num.charAt(i), 10)) + unit.charAt(i);
    }
    // tslint:disable-next-line: max-line-length
    return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整');
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line: no-bitwise
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**返回指定key的对象 */
function certainFunction(obj: object, keys: string[]) {
    return keys.reduce((result, key) => {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
export { guid, moneyToUpper, certainFunction };
