export default function xnor(input){
    const [a, b] = input.split(' ').map(x => x === '1');
    const xnor = !((a && !b) || (!a && b)); // or (a && b) || (!a && !b)
    return xnor;
}