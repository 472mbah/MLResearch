import TwoDMatrix from '../Matrix' 

class EditDistance {

    MatrixOfDistance:any;
    MatrixOfOrigin:any;
    firstChars:string[];
    secondChars:string[];
    successInital:boolean;

    constructor (firstStr:string, secondStr:string) {
        
        // initialising from 0 ... n, not 0 ... 0

        firstStr = ' '+firstStr.toUpperCase();
        secondStr = ' '+secondStr.toUpperCase();

        this.firstChars = firstStr.split(''); 
        this.secondChars = secondStr.split(''); 

        this.firstChars.length > 0 && this.secondChars.length > 0 
                                            ? (this.successInital = true) :
                                              (this.successInital = false) 

        this.MatrixOfDistance = new TwoDMatrix(this.firstChars.length, this.secondChars.length)
        this.MatrixOfOrigin = new TwoDMatrix(this.firstChars.length, this.secondChars.length, -1)
        this.initialiseAscending()

    }

    computeEditDistance = () => {

        if (this.firstChars.length <= 1 && this.secondChars.length <= 1) return;

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
    
                let minimumIndex = this.findTheMinium(matrixValues, true)

                let dependencies = this.identifyDependencies(matrixValues[minimumIndex], matrixValues)
                
                let dependencyState = this.selectTrackingState(dependencies);

                this.MatrixOfOrigin.setValue(j, i, dependencyState);

                this.MatrixOfDistance.setValue(j, i, matrixValues[minimumIndex])

            }


            j++;

        }

    }

    findTheMinium = (values:number[], findIndex?:boolean) => {
        
        if (values.length < 0) return -1;

        let index:number = -1;
        let minimum:number = Number.MAX_VALUE;
        values.forEach((numb, position)=>{
            
            if(numb < minimum) {
                minimum=numb
                findIndex ? index = position : null
            }
        
        })

        return findIndex ? index : minimum

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

    identifyDependencies = (minimumValue:number, targets:number[]) => {

        let applicable:number[] = [];
        
        targets.forEach((item, i)=> item===minimumValue ? applicable.push(i) : null )

        return applicable;

    }

    selectTrackingState = (set:number[]) => {
        
        if (set.length===1) return set[0]
        if (set.length===3) return 4 
        
        if (set.includes(0) && set.includes(1) ) return 3;
        if (set.includes(0) && set.includes(2) ) return 4;
        if (set.includes(1) && set.includes(2) ) return 5;

        return -1;

    }

    getTracingStates = (state:number, j:number, i:number) => {
        
        // returns { hasUpperDiagonal, dependencies }

        if (state > 0 && state < 3) {
            if(state===0) return [j-1, i]
            if(state===1) return [j, i-1]
            if(state===2) return [j-1, i-1]
        }
        else if (state >= 3 && state <= 5) {
            if(state===3) return [j-1, i]
            if(state===4) return [j-1, i]
            if(state===5) return [j-1, i-1]
        }
        else if (state===6)
            return [j-1, i-1]

        return [-1, -1]

    }


    backtraceLoop = (j:number, i:number, storage:number[][]) => {
        
        if (!this.MatrixOfOrigin.isOkay(j, i)) return;
        
        let state = this.MatrixOfOrigin.getValue(j, i);
        let value = this.MatrixOfDistance.getValue(j, i);
        
        if(value === -1) return;
        
        let nextDepency: number[] = this.getTracingStates(state, j, i)
        let [j_, i_] = nextDepency;
    
        (j_ > 0 && i > 0) && storage.push(nextDepency) && this.backtraceLoop(j_, i_, storage);
    
    }

    backtrace = () => {

        if (!this.successInital) return;

        let [j, i] = this.MatrixOfDistance.getEdgeIndexes();

        let storage:number[][] = []
        this.backtraceLoop(j, i, storage)
        
        return this.retrieveAlignments(storage)

    }

    retrieveAlignments = (alignments:number[][]) => alignments.filter(([x, y])=>x==y)

}   

export default EditDistance;