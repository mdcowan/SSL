puts "What is your name?"
name = gets

puts "Your age?"
age = gets

File.write("secondfile.txt", name + " your age is " + age)
fileD = File.read("secondfile.txt")
puts fileD
