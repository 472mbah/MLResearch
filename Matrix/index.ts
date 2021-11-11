class TwoDMatrix {

    NArray:number[][]

    constructor (y:number, x:number, initialValue?:number) {
        this.NArray = []
        for (let size = 0; size < y; size++) {
            let row = this.createSingleArray(x);
            
            if (initialValue!==undefined) 
                row.fill(initialValue)
            
            this.NArray.push(row)
        }
    }

    createSingleArray = length => new Array(length)
    
    showMatrix = () => console.log(this.NArray)

    fillRowWithValues = (row:number, value:number) => {
        if (this.NArray.length > -1 && row < this.NArray.length) {
            this.NArray[row].fill(value);
        }
        else 
            throw new Error("Value out of bounds")

    }

    fillColumnWithValues = (column:number, value:number) => {
        if (this.NArray[0].length > -1 && column < this.NArray[0].length) {
            this.NArray.forEach((row:number[]) => {
                row[column] = value;
            });
        }
        else 
            throw new Error("Value out of bounds")
    }

    getValues = (cords:number[][]) => {
        let out = []
        console.log(cords)
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

    setValue = (j:number, i:number, value:number) => 
        this.isOkay(j, i) && (this.NArray[j][i] = value)
    

    inRangeJ = (j:number) => j > -1 && j < this.NArray.length;
    inRangeI = (i:number) => i > -1 && this.NArray.length > 0 && i < this.NArray[0].length;
    


    isOkay = (j:number, i:number) => {
        if (!this.inRangeI(i) || !this.inRangeJ(j)) throw new Error("Value out of bounds")
        return true;
    }


}

export default TwoDMatrix