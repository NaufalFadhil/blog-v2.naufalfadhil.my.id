---
title: "Hash Map"
tags: [python, backend]
date: 2026-04-10
description: "Hash map implementation in Python for competitive programming."
weight: 10
---

## Hash Map in Python
In Python, a hash map is implemented using the built-in `dict` data structure. A hash map (or dictionary) allows you to store key-value pairs and provides efficient lookup, insertion, and deletion operations. Here are some examples of how to use a hash map in Python:

### Creating a Hash Map

```python
# Creating an empty hash map
my_hash_map = {}

# Creating a hash map with some key-value pairs
my_hash_map = {
    'key1': 'value1',
    'key2': 'value2',
    'key3': 'value3'
}
print(my_hash_map)  # Output: {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'}
```

### Accessing Values

```python
# Accessing values using keys
print(my_hash_map['key1'])  # Output: value1
print(my_hash_map.get('key2'))  # Output: value2

# Accessing a non-existent key returns None
print(my_hash_map.get('key4'))  # Output: None

# Accessing a non-existent key with a default value
print(my_hash_map.get('key4', 'default'))  # Output: default
```

### Inserting and Updating Values

```python
# Existing hash map
print(my_hash_map)
# Output: {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'}

# Inserting a new key-value pair
my_hash_map['key4'] = 'value4'
print(my_hash_map)
# Output: {'key1': 'value1', 'key2': 'value2', 'key3': 'value3', 'key4': 'value4'}

# Updating an existing key-value pair
my_hash_map['key2'] = 'new_value2'
print(my_hash_map)
# Output: {'key1': 'value1', 'key2': 'new_value2', 'key3': 'value3', 'key4': 'value4'}
```

### Deleting Key-Value Pairs

```python
# Deleting a key-value pair using delete
del my_hash_map['key3']
print(my_hash_map)  # Output: {'key1': 'value1', 'key2': 'new_value2', 'key4': 'value4'}

# Deleting a key-value pair using pop // pop returns the value of the removed key
removed_value = my_hash_map.pop('key2')
print(removed_value)  # Output: new_value2
print(my_hash_map)  # Output: {'key1': 'value1', 'key4': 'value4'}

# Pop the last inserted key-value pair
last_removed_value = my_hash_map.popitem()
print(last_removed_value)  # Output: ('key4', 'value4')
print(my_hash_map)  # Output: {'key1': 'value1'}
```

### Checking for Keys

```python
# Checking if a key exists in the hash map
print('key1' in my_hash_map)  # Output: True
print('key3' in my_hash_map)  # Output: False

res = 'key1' in my_hash_map
print(res)  # Output: True

key_to_check = 'key3'
if key_to_check in my_hash_map:
    print(f"{key_to_check} exists in the hash map.")
else:
    print(f"{key_to_check} does not exist in the hash map.")

if key_to_check not in my_hash_map:
    print(f"{key_to_check} does not exist in the hash map.")
else:
    print(f"{key_to_check} exists in the hash map.")
```
### Checking for Values

```python
# Checking if a value exists in the hash map
print('value1' in my_hash_map.values())  # Output: True
print('value3' in my_hash_map.values())  # Output: False
```

### Checking the Size of the Hash Map

```python
# Checking the number of key-value pairs in the hash map
print(len(my_hash_map))  # Output: 1
```

### Clearing the Hash Map

```python
# Clearing all key-value pairs from the hash map
my_hash_map.clear()
print(my_hash_map)  # Output: {}
```

### Iterating Over a Hash Map

```python
# Iterating over keys
for key in my_hash_map:
    print(key)  # Output: key1, key2

# Iterating over values
for value in my_hash_map.values():
    print(value)  # Output: value1, new_value2

# Iterating over key-value pairs
for key, value in my_hash_map.items():
    print(f"{key}: {value}")  # Output: key1: value1, key2: new_value2
```

Hash maps are a powerful data structure that can be used in various competitive programming problems, such as counting frequencies, grouping items, and implementing caches. Understanding how to use hash maps effectively can help you solve problems more efficiently.
