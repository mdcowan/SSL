# To get user input, you must first import system functionality
import sys

class Grader:
    def __init__(self):
        # You can then use 'raw user input' to get data from the user
        self.name = raw_input("Please enter the student name: ")      
        self.assignment = raw_input("Please enter the assignment name: ")  
        # Launch the method to get and assign the grade score and letter
        self.grade = self.getGrade() 
    
    # Method to find the letter grade
    def getGrade(self):
        number = False

        def is_number(n):
            try:
                self.gradeScore = float(n)
                return True
            except ValueError:
                return False

        gradeInput = raw_input("What is grade score?") 
        number = is_number(gradeInput)

        while not number:
            print("Grade score was not a number!")
            gradeInput = raw_input("What is grade score?") 
            number = is_number(gradeInput)

        # Check what grade should be assigned
        if self.gradeScore < 60:
            self.gradeD = "Unfortunately, you've missed all of the functionality."
            return "F"
        else:
            if self.gradeScore < 70:
                self.gradeD = "Unfortunately, you've missed nearly all of the functionality."
                return "D"
            else:
                if self.gradeScore < 80:
                    self.gradeD = "It looks like you are missing most of the functionality."
                    return "C"
                else:
                    if self.gradeScore < 90:
                        self.gradeD = "It looks like you are missing some of the functionality."
                        return "B"
                    else:
                        self.gradeD = "You have met all of the requirements for a full grade."
                        return "A"

    # Method to construct the grade card string
    def getGradeCard(self):
        email = self.name + "@fullsail.edu\n"
        assignmentGrade = "Here is your grade for the " + self.assignment + " assignment: " + self.grade + "\n"
        gradeDetails = "Grade Details:\n" + self.gradeD
        return email + assignmentGrade + gradeDetails
        


myGrade = Grader()
print(myGrade.getGradeCard())




       


