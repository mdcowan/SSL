# To get user input, you must first import system functionality
import sys
# You can then use 'raw user input' to get data from the user
name =  raw_input("What is your name?")
# From there you can use the variable with the user input data

# Writing to a file
# a = append, w = overwrite
# Template to open a file to write: declaredVariable = ("nameOfFile", "aOrW")
# Step one - open the file
f = open("myfile.txt","w")
# Step two - write data
f.write("Here is my text " + name + ".")
# Step three - close the file
f.close()

# Reading from a file
# r = read
# Template to read from a file: declaredVariable = ("nameOfFile", "r")
f = open("myfile.txt","r")
# ouput what was read
print(f.read())
#close the name
f.close()
