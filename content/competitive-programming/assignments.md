---
title: "Assignments"
tags: [python, backend]
date: 2026-04-10
description: "Assignments in Python for competitive programming."
weight: 3
---

## Assignments in Python
In Python, you can use assignment statements to assign values to variables. This is a fundamental aspect of programming and is essential for storing and manipulating data. Here are some examples of assignments in Python:

### Simple Assignment

```python
x = 10
y = 20
print(x)  # Output: 10
print(y)  # Output: 20
```

### Multiple Assignment

```python
a, b, c = 1, 2, 3
print(a)  # Output: 1
print(b)  # Output: 2
print(c)  # Output: 3
```

### Swapping Variables

```python
x = 5
y = 10
x, y = y, x
print(x)  # Output: 10
print(y)  # Output: 5
```

### Augmented Assignment

```python
x = 10
x += 5  # Equivalent to x = x + 5
print(x)  # Output: 15
```

### Assigning Values from a Function

```python
def add(a, b):
    return a + b
result = add(3, 4)
print(result)  # Output: 7
```

### Assigning Values from User Input

```python
name = input("Enter your name: ")
print(f"Hello, {name}!")
```

### Assigning Values to Multiple Variables from a List

```python
numbers = [1, 2, 3]
x, y, z = numbers
print(x)  # Output: 1
print(y)  # Output: 2
print(z)  # Output: 3
```

### Assigning Values to Multiple Variables from a Tuple

```python
point = (10, 20)
x, y = point
print(x)  # Output: 10
print(y)  # Output: 20
```

### Assigning Values to Multiple Variables from a Dictionary

```python
person = {'name': 'Alice', 'age': 30}
name, age = person.values()
print(name)  # Output: Alice
print(age)   # Output: 30
```

### Assigning Values to Multiple Variables from a Set

```python
unique_numbers = {1, 2, 3}
x, y, z = unique_numbers
print(x)  # Output: 1 (or 2 or 3, since sets are unordered)
print(y)  # Output: 2 (or 1 or 3)
print(z)  # Output: 3 (or 1 or 2)
```

### Assigning Values to Multiple Variables from a String

```python
greeting = "Hello"
h, e, l, o = greeting
print(h)  # Output: H
print(e)  # Output: e
print(l)  # Output: l
print(o)  # Output: o
```

### Assigning Values to Multiple Variables from a Range

```python
for i in range(3):
    x, y = i, i * 2
    print(f"x: {x}, y: {y}")
```

### Assigning Values to Multiple Variables from a List Comprehension

```python
numbers = [1, 2, 3]
squared = [x**2 for x in numbers]
print(squared)  # Output: [1, 4, 9]
```

### Assigning Values to Multiple Variables from a Generator Expression

```python
numbers = [1, 2, 3]
squared = (x**2 for x in numbers)
print(list(squared))  # Output: [1, 4, 9]
```

### Assigning Values to Multiple Variables from a Function with Multiple Return Values

```python
def get_coordinates():
    return 10, 20
x, y = get_coordinates()
print(x)  # Output: 10
print(y)  # Output: 20
```

### Assigning Values to Multiple Variables from a Lambda Function

```python
add = lambda a, b: (a + b, a * b)
result_sum, result_product = add(3, 4)
print(result_sum)      # Output: 7
print(result_product)  # Output: 12
```

### Assigning Values to Multiple Variables from a List of Tuples

```python
points = [(1, 2), (3, 4), (5, 6)]
for x, y in points:
    print(f"x: {x}, y: {y}")
```

### Assigning Values to Multiple Variables from a List of Dictionaries

```python
people = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}]
for person in people:
    name, age = person.values()
    print(f"Name: {name}, Age: {age}")
```

### Assigning Values to Multiple Variables from a List of Sets

```python
unique_numbers_list = [{1, 2}, {3, 4}, {5, 6}]
for unique_numbers in unique_numbers_list:
    x, y = unique_numbers
    print(f"x: {x}, y: {y}")
```

### Assigning Values to Multiple Variables from a List of Strings

```python
greetings = ["Hello", "Hi", "Hey"]
for greeting in greetings:
    h, e, l, o = greeting
    print(f"h: {h}, e: {e}, l: {l}, o: {o}")
```

### Assigning Values to Multiple Variables from a List of Ranges

```python
ranges = [range(3), range(5, 8)]
for r in ranges:
    x, y, z = r
    print(f"x: {x}, y: {y}, z: {z}")
```

### Assigning Values to Multiple Variables from a List of List Comprehensions

```python
numbers = [1, 2, 3]
squared = [x**2 for x in numbers]
for x, y in zip(numbers, squared):
    print(f"Number: {x}, Squared: {y}")
```

### Assigning Values to Multiple Variables from a List of Generator Expressions

```python
numbers = [1, 2, 3]
squared = (x**2 for x in numbers)
for x, y in zip(numbers, squared):
    print(f"Number: {x}, Squared: {y}")
```
