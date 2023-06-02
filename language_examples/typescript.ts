function fibonacci(num: number) {
  let n = Number(num)
  let elementOne: number = 0
  let elementTwo: number = 1
  let result: number = 0

  for (let i: number = 1; i <= n; i++) {
    result = elementOne + elementTwo
    elementOne = elementTwo
    elementTwo = result
    console.log(`${i}: ${elementOne}`)
  }
}

let num_str = process.argv.length >= 3 ? process.argv[2] : ""
let num: number = parseInt(num_str)
if (isNaN(num)) {
  console.log("Usage: please input the count of fibonacci numbers to output")
  process.exit(0)
}

fibonacci(num)
