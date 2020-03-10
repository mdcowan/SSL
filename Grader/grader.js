//create an interface to capture whatever the user is typing in the command line
const readline = require('readline');
const rl = readline.createInterface({
    //input and output to/from "proccess", which is the node.js application
    input: process.stdin,
    output: process.stdout
});

class Grader{
    constructor (name, assignment,gradeScore){
        this._name = name;
        this._assignment = assignment
        this._gradeScore = gradeScore
    }
    
    // Method to find the letter grade
    getGrade(){
        let number = false
            
        // Check what grade should be assigned
        if (this._gradeScore < 60){
            this._gradeD = "Unfortunately, you've missed all of the functionality."
            this._grade = "F"
        }
        else{
            if (this._gradeScore < 70){
                this._gradeD = "Unfortunately, you've missed nearly all of the functionality."
                this._grade =  "D"
            }
            else{
                if (this._gradeScore < 80){
                    this._gradeD = "It looks like you are missing most of the functionality."
                    this._grade = "C"
                }
                else{
                    if (this._gradeScore < 90){
                        this._gradeD = "It looks like you are missing some of the functionality."
                        this._grade = "B"
                    }
                    else{
                        this._gradeD = "You have met all of the requirements for a full grade."
                        this._grade = "A"
                    }
                }
            }
        }
    }
    

    // Method to construct the grade card string
    getGradeCard(){
        let email = this._name + "@fullsail.edu\n"
        let assignmentGrade = "Here is your grade for the " + this._assignment + " assignment: " + this._grade + "\n"
        let gradeDetails = "Grade Details:\n" + this._gradeD
        return email + assignmentGrade + gradeDetails
    }
}

//this variable can now be used to ask a question
// format rl.question("Text of the question to ask the user", (variableHoldingInput)=>{do suff with the variable})
rl.question("Please enter the student name: ",(name)=>{
    rl.question("Please enter the assignment name:?",(assignment)=>{
        rl.question("What is grade score? ",(score)=>{
            //if the score string is a number, convert it to a number type float, other wise the score is zero
            if (!isNaN(score)){
                gradeScore = parseFloat(score)
            }
            else{
                gradeScore = 0
            }       
            //create the grader object             
            let myGrade = new Grader(name,assignment,gradeScore)
            //get the leter grade
            myGrade.getGrade()
            //print the grade card
            console.log(myGrade.getGradeCard())
            rl.close()  
        })        
    })
})

