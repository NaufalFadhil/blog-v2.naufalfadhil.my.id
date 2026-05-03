---
title: "Data Types"
tags: [python, backend]
date: 2026-04-10
description: "Data types in Python for competitive programming."
weight: 2
---

## Data Types in Python

In Python, there are several built-in data types that are commonly used in competitive programming. These data types can be categorized into several groups:

### Numeric Types
- `int`: Represents integer values. Example: `x = 10`
- `float`: Represents floating-point numbers. Example: `y = 3.14`
- `complex`: Represents complex numbers. Example: `z = 1 + 2j

### Sequence Types
- `list`: An ordered, mutable collection of items. Example: `my_list = [1, 2, 3]`
- `tuple`: An ordered, immutable collection of items. Example: `my_tuple = (1, 2, 3)`
- `range`: Represents a sequence of numbers. Example: `my_range = range(1, 10)`
- `str`: Represents a sequence of characters. Example: `my_string = "Hello"`

### Set Types
- `set`: An unordered collection of unique items. Example: `my_set = {1, 2, 3}`
- `frozenset`: An immutable version of a set. Example: `my_frozenset = frozenset({1, 2, 3})`

### Mapping Types
- `dict`: Represents a collection of key-value pairs. Example: `my_dict = {'key1': 'value1', 'key2': 'value2'}`

### Boolean Type
- `bool`: Represents a boolean value, which can be either `True` or `False`. Example: `is_valid = True`

### None Type
- `NoneType`: Represents the absence of a value. Example: `result = None`

### Other Types
- `bytes`: Represents a sequence of bytes. Example: `my_bytes = b'Hello'`
- `bytearray`: A mutable sequence of bytes. Example: `my_bytearray = bytearray(b'Hello')`
- `memoryview`: A memory view object that allows you to access the internal data of an object that supports the buffer protocol. Example: `my_memoryview = memoryview(b'Hello')`

Understanding these data types is crucial for effectively solving problems in competitive programming, as they allow you to store and manipulate data in various ways.

## Assigning Data Types
You can assign values to variables of different data types in Python. Here are some examples:

### Assigning Numeric Types

```python
x = 10  # int
y = 3.14  # float
z = 1 + 2j  # complex
```

### Assigning Sequence Types

```python
my_list = [1, 2, 3]  # list
my_tuple = (1, 2, 3)  # tuple
my_range = range(1, 10)  # range
my_string = "Hello"  # str
```

### Assigning Set Types

```python
my_set = {1, 2, 3}  # set
my_frozenset = frozenset({1, 2, 3})  # frozenset
```

### Assigning Mapping Types

```python
my_dict = {'key1': 'value1', 'key2': 'value2'}  # dict
```

### Assigning Boolean Type

```python
is_valid = True  # bool
```

### Assigning None Type

```python
result = None  # NoneType
```

### Assigning Other Types

```python
my_bytes = b'Hello'  # bytes
my_bytearray = bytearray(b'Hello')  # bytearray
my_memoryview = memoryview(b'Hello')  # memoryview
```

Understanding how to use these data types and assign values to them is essential for solving problems efficiently in competitive programming. Each data type has its own set of operations and methods that can be utilized to manipulate data effectively.
