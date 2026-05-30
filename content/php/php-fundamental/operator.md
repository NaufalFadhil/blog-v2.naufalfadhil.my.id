---
title: "PHP Operators"
tags: [php, backend, operators]
date: 2026-05-30
description: "Essential PHP operators and their usage"
weight: 7
---

## Operators
In PHP, operators are symbols that perform operations on variables and values. They can be categorized into several types:
| Type | Description | Keywords |
|------|-------------|----------|
| Arithmetic Operators | Perform basic mathematical operations | `+`, `-`, `*`, `/`, `%` |
| Assignment Operators | Assign values to variables | `=`, `+=`, `-=`, `*=`, `/=`, `%=` |
| Comparison Operators | Compare two values | `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=` |
| Logical Operators | Combine conditional statements | `&&`, `||`, `!` |
| Increment/Decrement Operators | Increase or decrease a variable's value by one | `++`, `--` |
| String Operators | Concatenate strings | `.` |
| Array Operators | Perform operations on arrays | `+`, `==`, `===`, `!=`, `!==` |
| Error Control Operators | Suppress error messages | `@` |
| Execution Operators | Execute external programs | \` (backticks) |
| Type Operators | Check the type of a variable | `instanceof` |
| Bitwise Operators | Perform bitwise operations | `&`, `\|`, `^`, `~`, `<<`, `>>` |
| Ternary Operator | A shorthand for an if-else statement | `? :` |
| Null Coalescing Operator | Return the first operand if it exists and is not null, otherwise return the second operand | `??` |
| Operator Precedence | Determines the order of evaluation in expressions | N/A |
### Example Usage
```php
$a = 10;
$b = 5;

// Arithmetic Operators
echo $a + $b; // 15

// Assignment Operators
$a += $b; // $a is now 15

// Comparison Operators
if ($a > $b) {
    echo "$a is greater than $b";
}

// Logical Operators
if ($a > 10 && $b < 10) {
    echo "Both conditions are true";
}

// Increment/Decrement Operators
$a++; // $a is now 16
$b--; // $b is now 4

// String Operators
$str1 = "Hello, ";
$str2 = "World!";
echo $str1 . $str2; // "Hello, World!"

// Array Operators
$array1 = [1, 2, 3];
$array2 = [4, 5, 6];
$result = $array1 + $array2; // [1, 2, 3, 4, 5, 6]

// Error Control Operators
$result = @file_get_contents('nonexistentfile.txt'); // Suppresses error message

// Execution Operators
$output = `ls -l`; // Executes the command and stores the output

// Type Operators
class MyClass {}
$obj = new MyClass();
if ($obj instanceof MyClass) {
    echo "The object is an instance of MyClass";
}

// Bitwise Operators
$x = 5; // 0101 in binary
$y = 3; // 0011 in binary
echo $x & $y; // 1 (0001 in binary)
echo $x | $y; // 7 (0111 in binary)
echo $x ^ $y; // 6 (0110 in binary)

// Ternary Operator
$age = 20;
$status = ($age >= 18) ? "Adult" : "Minor";
echo $status; // "Adult"

// Null Coalescing Operator
$username = $_GET['username'] ?? 'Guest';
echo $username; // Outputs the username if it exists, otherwise "Guest"
```

### Operator Precedence
Operator precedence determines the order in which operators are evaluated in an expression. In PHP, the operator precedence is as follows (from highest to lowest):
1. `clone`, `new`
2. `[]`, `()`, `->`, `::`
3. `++`, `--`, `!`, `~`
4. `*`, `/`, `%`
5. `+`, `-`
6. `<<`, `>>`
7. `<`, `<=`, `>`, `>=`
8. `==`, `!=`, `===`, `!==`
9. `&`
10. `^`
11. `|`
12. `&&`
13. `||`
14. `? :`
15. `=`, `+=`, `-=`, `*=`, `/=`, `%=`
16. `and`, `xor`, `or`

Understanding operator precedence is crucial for writing correct and efficient code, as it affects how expressions are evaluated. You can use parentheses to explicitly define the order of evaluation when necessary.

```php
$result = 10 + 5 * 2; // Result is 20 due to operator precedence

$result = (10 + 5) * 2; // Result is 30 due to parentheses
```

Operators are fundamental to programming in PHP, and mastering their usage will allow you to write more complex and efficient code. Always consider the context in which you are using operators and be mindful of operator precedence to ensure your code behaves as expected.