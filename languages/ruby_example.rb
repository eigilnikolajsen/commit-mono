def find_missing(sequence)
  consecutive     = sequence.each_cons(2)
  differences     = consecutive.map { |a,b| b - a }
  sequence        = differences.max_by { |n| differences.count(n) }

  missing_between = consecutive.find { |a,b| (b - a) != sequence }

  missing_between.first + sequence
end

find_missing([2,4,6,10])
# 8



def alternating_characters?(s)
  type = [/[aeiou]/, /[^aeiou]/].cycle

  if s.start_with?(/[^aeiou]/)
    type.next
  end

  s.chars.all? { |ch| ch.match?(type.next) }
end

alternating_characters?("ateciyu")
# true



def get_numbers_stack(list)
  stack  = [[0, []]]
  output = []

  until stack.empty?
    index, taken = stack.pop

    next output << taken if index == list.size

    stack.unshift [index + 1, taken]
    stack.unshift [index + 1, taken + [list[index]]]
  end

  output
end



def longest_repetition(string)
  max = string
          .chars
          .chunk(&:itself)
          .map(&:last)
          .max_by(&:size)

  max ? [max[0], max.size] : ["", 0]
end

longest_repetition("aaabb")
# ["a", 3]



# Class names must be capitalized.  Technically, it's a constant.
class Fred
  
  # The initialize method is the constructor.  The @val is
  # an object value.
  def initialize(v)
    @val = v
  end

  # Set it and get it.
  def set(v)
    @val = v
  end

  def get
    return @val
  end
end

# Objects are created by the new method of the class object.
a = Fred.new(10)
b = Fred.new(22)

print "A: ", a.get, " ", b.get,"\n";
b.set(34)
print "B: ", a.get, " ", b.get,"\n";

# Ruby classes are always unfinished works.  This does not
# re-define Fred, it adds more stuff to it.
class Fred 
  def inc
    @val += 1
  end
end

a.inc
b.inc
print "C: ", a.get, " ", b.get,"\n";

# Objects may have methods all to themselves.
def b.dec
  @val -= 1
end

begin
  b.dec
  a.dec
rescue StandardError => msg
  print "Error: ", msg, "\n"
end

print "D: ", a.get, " ", b.get,"\n";