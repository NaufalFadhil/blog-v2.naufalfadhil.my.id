---
title: "PHP Expressions, Statements, and Blocks"
tags: [php, backend, expressions, statements, blocks]
date: 2026-05-30
description: "Essential PHP expressions, statements, and blocks"
weight: 8
---

## Expressions
In PHP, an expression is a combination of values, variables, operators, and function calls that can be evaluated to produce a value. Expressions can be as simple as a single value or variable, or they can be more complex involving multiple components.

```php
// Simple expression
$result = 5 + 3; // Evaluates to 8

// Complex expression
$total = (10 * 2) + (5 / 2); // Evaluates to 25
```

## Statements
A statement is a complete instruction that performs an action. In PHP, statements are typically terminated with a semicolon (`;`). Statements can include expressions, control structures, function calls, and more.

```php
// Variable assignment statement
$name = "John";

// If statement
if ($name === "John") {
    echo "Hello, John!";
}

// For loop statement
for ($i = 0; $i < 5; $i++) {
    echo $i;
}
```

## Blocks
A block is a group of statements that are enclosed within curly braces (`{}`). Blocks are used to define the scope of control structures such as loops and conditionals.

```php
// If statement with a block
if ($name === "John") {
    echo "Hello, John!";
    echo "Welcome to PHP programming.";
}

// For loop with a block
for ($i = 0; $i < 5; $i++) {
    echo "The value of i is: " . $i;
}
```
