---
title: "PHP Array and Map"
tags: [php, backend, arrays]
date: 2026-05-30
description: "Essential PHP array and map functions and their usage"
weight: 9
---

## Array
In PHP, an array is a data structure that can hold multiple values. It can be indexed (numerical keys) or associative (string keys). Arrays are created using the `array()` function or the shorthand `[]` syntax.

```php
// Indexed array
$fruits = array("Apple", "Banana", "Cherry");

// Associative array
$person = array(
    "name" => "John",
    "age" => 30,
    "city" => "New York"
);

// Shorthand syntax
$numbers = [1, 2, 3, 4, 5];
```

## Array Map
The `array_map()` function applies a callback function to each element of an array and returns a new array with the modified values.

```php
$numbers = [1, 2, 3, 4, 5];
$squared = array_map(fn($n) => $n ** 2, $numbers);
// $squared is now [1, 4, 9, 16, 25]
```

## Array Filter
The `array_filter()` function filters elements of an array using a callback function and returns a new array with the elements that pass the test.

```php
$numbers = [1, 2, 3, 4, 5, 6];
$even = array_filter($numbers, fn($n) => $n % 2 === 0);
// $even is now [2, 4, 6]
```

## Array Reduce
The `array_reduce()` function reduces an array to a single value using a callback function.

```php
$items = [
    ['name' => 'Apple', 'price' => 1.50],
    ['name' => 'Banana', 'price' => 0.75],
    ['name' => 'Cherry', 'price' => 2.00],
];

$total = array_reduce($items, fn($carry, $item) => $carry + $item['price'], 0);
// $total is now 4.25
```

## Spread Operator
The spread operator (`...`) allows you to unpack arrays into function arguments.

```php
function sum(int ...$numbers): int
{
    return array_sum($numbers);
}
$nums = [1, 2, 3];
echo sum(...$nums);  // Outputs: 6
```

## Array Destructuring
Array destructuring allows you to assign array values to variables in a single statement.

```php
// Indexed array destructuring
$coordinates = [40.7128, -74.0060];
[$lat, $lng] = $coordinates;

// Named keys
$person = ['name' => 'John', 'age' => 30];
['name' => $name, 'age' => $age] = $person;
```
