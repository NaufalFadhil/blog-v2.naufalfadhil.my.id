---
title: "Input and Output"
tags: [python, backend]
date: 2026-04-10
description: "Handling input and output in Python for competitive programming."
weight: 1
---

## Input and Output in Python
In competitive programming, handling input and output efficiently is crucial. Python provides built-in functions to read from standard input and write to standard output.

### Reading Input
You can read input using the `input()` function, which reads a line of input as a string. For example:

```python
name = input("Enter your name: ")
print(f"Hello, {name}!")
```

For multiple inputs, you can use the `split()` method to separate the input into parts. For example:

```python
# Array of Strings input
data = input("Enter data separated by space: ").split()
print(data) # Output: ['data1', 'data2', 'data3']

# Array of integers input
numbers = input("Enter numbers separated by space: ").split()
print(numbers) # Output: ['1', '2', '3']
numbers = [int(num) for num in numbers]  # Convert strings to integers
print(numbers) # Output: [1, 2, 3]

# Split with a custom delimiter
data = input("Enter data separated by comma: ").split(',') # Input: data1,data2,data3
print(data) # Output: ['data1', 'data2', 'data3']
```

### Writing Output
You can write output using the `print()` function. For example:

```python
result = 42
print(f"The result is: {result}")
```

### Fast Input and Output
In competitive programming, you may need to handle large inputs and outputs efficiently. You can use `sys.stdin` and `sys.stdout` for faster input and output. Here's how:

```python
import sys
# Fast input
input = sys.stdin.readline
# Fast output
print = sys.stdout.write

# Example of fast input and output
n = int(input())
for _ in range(n):
    data = input().strip()
    print(f"Processed: {data}\n")
```
Using `sys.stdin.readline` is faster than `input()`, and using `sys.stdout.write` can be more efficient than `print()` for large outputs. Remember to include a newline character (`\n`) when using `sys.stdout.write` to ensure proper formatting.

### Summary
- Use `input()` for simple input and `print()` for simple output.
- For multiple inputs, use `split()` to separate them and convert to the desired type.
- For large inputs and outputs, consider using `sys.stdin.readline` and `sys.stdout.write` for better performance.
