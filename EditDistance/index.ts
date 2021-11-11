import TwoDMatrix from '../Matrix' 

class EditDistance {

    MatrixOfDistance:any;
    firstChars:string[];
    secondChars:string[];

    constructor (firstStr:string, secondStr:string) {
        
        // initialising from 0 ... n, not 0 ... 0

        firstStr = firstStr.toUpperCase();
        secondStr = secondStr.toUpperCase();

        this.firstChars = firstStr.split(''); 
        this.secondChars = secondStr.split(''); 

        this.MatrixOfDistance = new TwoDMatrix(this.firstChars.length, this.secondChars.length, 0)
    
    }

    computeEditDistance = () => {

        if (this.firstChars.length <= 1 && this.secondChars.length <= 1) return;

        let i:number = 1;
        let j:number = 1;

        this.MatrixOfDistance.showMatrix()

        while (j < this.firstChars.length && i < this.secondChars.length) {
            
            let above:number[] = [j-1, i]; 
            let nextTo:number[] = [j, i-1]; 
            let diagonalTop:number[] = [j-1, i-1];

            let matrixValues:[number, number, number] = this.MatrixOfDistance.getValues([above, nextTo, diagonalTop]);

            matrixValues[0]++;
            matrixValues[1]++;
            if (this.firstChars[j] !== this.secondChars[i]) 
                matrixValues[2]+=2;
            

            let minimumValue = this.findTheMinium(matrixValues)

            this.MatrixOfDistance.setValue(j, i, minimumValue)

            i++;
            j++;

        }

    }

    findTheMinium = (values:number[]) => {
        if (values.length < 0) return Number.MIN_SAFE_INTEGER
        let minimum:number = Number.MAX_SAFE_INTEGER;
        values.forEach(numb=>numb < minimum ? (minimum=numb) : null )
        return minimum
    }

} 

export default EditDistance;