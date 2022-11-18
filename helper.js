// get the median number from an array
let getMedian = (data) => {
    let result = [];
    let total = data.length;
    let median = Math.round((total - 1) / 2);
    //check if the number is divisible by 2
    if (total % 2 == 0) {
        result.push(data[median - 1]);
        result.push(data[median]);
    } else {
        result.push(data[median]);
    }
    return result;
}

module.exports.getMedian = getMedian;