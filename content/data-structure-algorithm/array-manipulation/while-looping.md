---
title: "While Looping in Python"
tags: [python, backend, arrays]
date: 2026-03-18
description: "Using while loops to manipulate arrays in Python."
weight: 10
---

## While Looping

In Python, you can also use while loops to manipulate arrays (lists). While loops are useful when you want to repeat a block of code until a certain condition is met. Here are some examples of using while loops with arrays:

### Iterating Over a List with a While Loop

```python
numbers = [1, 2, 3, 4, 5]
index = 0
while index < len(numbers):
    print(numbers[index])
    index += 1
```

### Modifying Elements in a List with a While Loop

```python
numbers = [1, 2, 3, 4, 5]
squared = []
index = 0
while index < len(numbers):
    squared.append(numbers[index] ** 2)
    index += 1
print(squared)  # [1, 4, 9, 16, 25]
```

### Using a While Loop to Filter Elements

```python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = []
index = 0
while index < len(numbers):
    if numbers[index] % 2 == 0:
        even_numbers.append(numbers[index])
    index += 1
print(even_numbers)  # [2, 4, 6]
```

### Nested While Loops

```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
row_index = 0
while row_index < len(matrix):
    value_index = 0
    while value_index < len(matrix[row_index]):
        print(matrix[row_index][value_index])
        value_index += 1
    row_index += 1
```

### Using a While Loop to Create a List

```python
numbers = [1, 2, 3, 4, 5]
squared = []
index = 0
while index < len(numbers):
    squared.append(numbers[index] ** 2)
    index += 1
print(squared)  # [1, 4, 9, 16, 25]
```

### Using a While Loop to Iterate Over Multiple Lists

```python
list1 = ['a', 'b', 'c']
list2 = [1, 2, 3]
index = 0
while index < len(list1) and index < len(list2):
    print(f"List1: {list1[index]}, List2: {list2[index]}")
    index += 1
```
In this example, we use a while loop to iterate over two lists simultaneously. The loop continues until we reach the end of either list.

While loops can be more flexible than for loops in certain situations, especially when the number of iterations is not known beforehand. However, it's important to ensure that the loop condition will eventually become false to avoid infinite loops.
