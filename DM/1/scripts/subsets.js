function generateSubsets(i, input, result, subset) {

    if (i === input.length) {
        result.push([...subset]);
        return;
    }

    subset.push(input[i]);
    generateSubsets(i + 1, input, result, subset);

    subset.pop();
    generateSubsets(i + 1, input, result, subset);
}

//write input in format [el1, el2, el3, ...]
export default function subsets(answer){
    const input = JSON.parse(answer);

    const result = [];
    generateSubsets(0, input, result, []);

    return result;
}