"use strict";
import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const count = new Array(10).fill(0); //frequency of digits (0-9) in final number
const visited = Array.from({ length: 20 }, () => new Array(105).fill(false)); //Memoization

let N, M; //N - input number, M - divisor
let result = "";

rl.question("N M:", (input) => {
    
    [N, M] = input.split(' ');

    N.split('').forEach(digit => {
        count[+digit]++;
    });

    if(largestMultiple(0,0, false)){
        result = result.split('').reverse().join('');
        console.log(result);
    } else{
        console.log(-1);
    }

    rl.close();
});

function largestMultiple(index, reminder, isLess) {
    if (index === N.length) {
        return reminder === 0 && isLess;
    }

    const lessIndex = isLess ? 1 : 0;

    if (visited[index][reminder]) {
        return false;
    }

    const currentN_digit = parseInt(N[index]);
    const limit = isLess ? 9 : currentN_digit;

    for (let i = limit; i >= 0; i--) {
        if (count[i] > 0) {
            count[i]--;

            const new_reminder = (reminder * 10 + i) % M;
            const new_isLess = isLess || (i < limit);

            if (largestMultiple(index + 1, new_reminder, new_isLess)) {
                result += i;
                return true;
            }

            count[i]++;
        }
    }

    visited[index][reminder] = true;
    return false;
}