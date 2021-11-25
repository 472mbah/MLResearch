import EditDistance from "./EditDistance";

// const compareEditDistance = new EditDistance('intention', 'execution');
const compareEditDistance = new EditDistance('hello', 'hbllk');
compareEditDistance.computeEditDistance()
let alignments:number[][] = compareEditDistance.backtrace()

console.log(alignments)