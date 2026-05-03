---
title: "For Looping in Python"
tags: [python, backend, arrays]
date: 2026-03-18
description: "Using for loops to manipulate arrays in Python."
weight: 10
---

## For Looping

In Python, you can use for loops to iterate over arrays (lists) and perform various operations. Here are some common patterns:

### Iterating Over a List

```bash
numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number)
```

### Using `range` to Iterate Over Indices

```python
numbers = [10, 20, 30]
for i in range(len(numbers)):
    print(f"Index: {i}, Value: {numbers[i]}")
```

### Modifying Elements in a List

```python
numbers = [1, 2, 3, 4, 5]
squared = []
for number in numbers:
    squared.append(number ** 2)
print(squared)  # [1, 4, 9, 16, 25]
```

### Using `enumerate` to Get Index and Value

```python
numbers = [10, 20, 30]
for index, number in enumerate(numbers):
    print(f"Index: {index}, Value: {number}")
```

### Nested For Loops

```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
for row in matrix:
    for value in row:
        print(value)
```


### List Comprehensions

```python
numbers = [1, 2, 3, 4, 5]
squared = [number ** 2 for number in numbers]
print(squared)  # [1, 4, 9, 16, 25]
```

### Filtering with For Loops

```python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = []
for number in numbers:
    if number % 2 == 0:
        even_numbers.append(number)
print(even_numbers)  # [2, 4, 6]
```

### Using `zip` to Iterate Over Multiple Lists

```python
list1 = ['a', 'b', 'c']
list2 = [1, 2, 3]
for letter, number in zip(list1, list2):
    print(f"{letter}: {number}")
``` 
This will output:
```
a: 1
b: 2
c: 3
```
For loops are a fundamental part of Python and can be used in various ways to manipulate and process data in lists and other iterable structures.

