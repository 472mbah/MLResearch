class TwoDMatrix {

    NArray:number[][]
    LongestCharacterValue:number

    constructor (y:number, x:number, initialValue?:number) {
        this.NArray = []
        this.LongestCharacterValue = initialValue!== undefined ? this.getDigitCount(initialValue) : 0;

        for (let size = 0; size < y; size++) {
            let row:number[] = this.createSingleArray(x);
            
            if (initialValue!==undefined) 
                row.fill(initialValue)
            
            this.NArray.push(row)
        }
    }

    createSingleArray = (length:number) => new Array(length)
    
    showMatrix = () => {
        let maxSize = this.getDigitCount(this.LongestCharacterValue)

        this.NArray.forEach(row=>{
            let line = ""
            row.forEach(item=>{
                let itemSize = this.getDigitCount(item);
                let appendTo = this.repeatStringNTimes(' ', (maxSize-itemSize)+2); 
                line+= `${appendTo}${item}`
            })
            console.log(line+'\n')
        })
    }

    getDigitCount = (digit:number) => {
        let stringVersion:string = digit.toString();
        let size:number = stringVersion.length
        return size
    }

    repeatStringNTimes = (text:string, multiplier:number) => {
        if (multiplier <= 0) return "";
        let output = "";
        for (let k = 0; k < multiplier; k++) {
            output += text;
        }
        return output;
    }

    getValues = (cords:number[][]) => {
        let out = []
        cords.forEach((v)=>{
            let [j, i] = v
            out.push(this.getValue(j, i));
        })
        return out;
    }

    getValue = (j:number, i:number) => {
        this.isOkay(j, i) 
        return this.NArray[j][i]
    }

    setValue = (j:number, i:number, value:any) =>{ 
        this.isOkay(j, i) && (this.NArray[j][i] = value)
        this.LongestCharacterValue = value > this.LongestCharacterValue ? value : this.LongestCharacterValue
    }

    inRangeJ = (j:number) => j > -1 && j < this.NArray.length;

    inRangeI = (i:number) => i > -1 && this.NArray.length > 0 && i < this.NArray[0].length;

    isOkay = (j:number, i:number) => {
        if (!this.inRangeI(i) || !this.inRangeJ(j)) throw new Error("Value out of bounds")
        return true;
    }

    getHeight = () => this.NArray.length
    getWidth = () => this.inRangeI(0) ? this.NArray[0].length : 0

    getEdgeIndexes = () => [ this.getHeight()-1, this.getWidth()-1 ] 

}

export default TwoDMatrix