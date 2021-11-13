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

        this.MatrixOfDistance = new TwoDMatrix(this.firstChars.length, this.secondChars.length)
        this.initialiseAscending()

    }

    computeEditDistance = () => {

        if (this.firstChars.length <= 1 && this.secondChars.length <= 1) return;

        // let i:number = 1;
        let j:number = 1;

        while (j < this.firstChars.length) {

            for (let i = 1; i < this.secondChars.length; i++) {

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

            }


            j++;

        }

        this.MatrixOfDistance.showMatrix()


    }

    findTheMinium = (values:number[]) => {
        if (values.length < 0) return Number.MIN_SAFE_INTEGER
        let minimum:number = Number.MAX_SAFE_INTEGER;
        values.forEach(numb=>numb < minimum ? (minimum=numb) : null )
        return minimum
    }

    initialiseAscending = () => {

        let maxIterations:number = this.firstChars.length > this.secondChars.length ? 
                            this.firstChars.length : this.secondChars.length; 

        let i:number = 0;
        let j:number = 0;

        while (i < maxIterations && j < maxIterations) {
            
            if (i < this.secondChars.length) 
                this.MatrixOfDistance.setValue(0, i, i++);
            
            if (j < this.firstChars.length) 
                this.MatrixOfDistance.setValue(j, 0, j++);

        }
        
    }


} 

export default EditDistance;