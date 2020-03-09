class Grader
    def initialize()
        puts "Please enter the student name: "
        @name = gets
        puts "Please enter the assignment name: " 
        @assignment = gets
        # Launch the method to get and assign the grade score and letter
        @grade = getGrade
    end

    def is_number(n)
        true if Float(n) rescue false
    end

    # Method to find the letter grade
    def getGrade
        number = false        
        
        puts "What is grade score?"
        gradeInput = gets         
        number = is_number(gradeInput)

        while !number
            puts "Grade score is not a number!"
            puts "What is grade score?"
            gradeInput = gets 
            number = is_number(gradeInput)
        end
        
        @gradeScore = Float(gradeInput)

        # Check what grade should be assigned
        if @gradeScore < 60
            @gradeD = "Unfortunately, you've missed all of the functionality."
            return "F"
        else
            if @gradeScore < 70
                @gradeD = "Unfortunately, you've missed nearly all of the functionality."
                return "D"
            else
                if @gradeScore < 80
                    @gradeD = "It looks like you are missing most of the functionality."
                    return "C"
                else
                    if @gradeScore < 90
                        @gradeD = "It looks like you are missing some of the functionality."
                        return "B"
                    else
                        @gradeD = "You have met all of the requirements for a full grade."
                        return "A"

                    end    
                end
            end                
        end
    end
    
    # Method to construct the grade card string
    def getGradeCard
        email = "#{@name} @fullsail.edu\n"
        assignmentGrade = "Here is your grade for the #{@assignment} assignment: #{@grade}\n"
        gradeDetails = "Grade Details:\n#{@gradeD}"
        return email + assignmentGrade + gradeDetails
    end
end    

myGrade = Grader.new
puts myGrade.getGradeCard
