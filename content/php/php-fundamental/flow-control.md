---
title: "PHP Flow Control"
tags: [php, backend, flow control]
date: 2026-05-30
description: "Essential PHP flow control structures and patterns"
weight: 10
---

## Flow Control
In PHP, flow control structures allow you to control the execution of your code based on certain conditions or to repeat a block of code multiple times. The main flow control structures in PHP include:
- Conditional statements: `if`, `else`, `elseif`, `switch`
- Loops: `for`, `foreach`, `while`, `do-while`
- Jump statements: `break`, `continue`, `return`, `goto`

### Conditional Statements
Conditional statements allow you to execute different blocks of code based on certain conditions.

```php
$age = 20;
if ($age < 18) {
    echo "You are a minor.";
} elseif ($age >= 18 && $age < 65) {
    echo "You are an adult.";
} else {
    echo "You are a senior.";
}
```

### Switch Statement
The `switch` statement is used to perform different actions based on different conditions.

```php
$day = "Monday";
switch ($day) {
    case "Monday":
        echo "Today is Monday.";
        break;
    case "Tuesday":
        echo "Today is Tuesday.";
        break;
    default:
        echo "Today is not Monday or Tuesday.";
}
```

### Loops
Loops allow you to execute a block of code repeatedly as long as a certain condition is met.

```php
// For loop
for ($i = 0; $i < 5; $i++) {
    echo $i;
}

// Foreach loop
$fruits = ["Apple", "Banana", "Cherry"];
foreach ($fruits as $fruit) {
    echo $fruit;
}

// While loop
$count = 0;
while ($count < 5) {
    echo $count;
    $count++;
}

// Do-while loop
$count = 0;
do {
    echo $count;
    $count++;
} while ($count < 5);
```

### Jump Statements
Jump statements allow you to alter the flow of execution in your code.

```php
// Break statement
for ($i = 0; $i < 10; $i++) {
    if ($i == 5) {
        break; // Exit the loop when $i is 5
    }
    echo $i;
}

// Continue statement
for ($i = 0; $i < 10; $i++) {
    if ($i % 2 == 0) {
        continue; // Skip even numbers
    }
    echo $i;
}

// Return statement
function add($a, $b) {
    return $a + $b; // Return the sum of $a and $b
}
echo add(5, 3); // Outputs: 8

// Goto statement
goto label;
echo "This will be skipped.";
label:
echo "This will be executed.";
// Outputs: "This will be executed."
// Note: The use of `goto` is generally discouraged as it can make code harder to read and maintain.
```
