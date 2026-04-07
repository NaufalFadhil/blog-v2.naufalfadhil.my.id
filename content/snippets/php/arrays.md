---
title: "PHP Array Functions"
tags: [php, backend, arrays]
date: 2026-03-18
description: "Essential PHP array functions and patterns"
weight: 1
---

## Array Map

Transform every element in an array:

```php
$numbers = [1, 2, 3, 4, 5];

$squared = array_map(fn($n) => $n ** 2, $numbers);
// [1, 4, 9, 16, 25]
```

## Array Filter

Filter elements by a callback:

```php
$numbers = [1, 2, 3, 4, 5, 6];

$even = array_filter($numbers, fn($n) => $n % 2 === 0);
// [2, 4, 6]
```

## Array Reduce

Reduce an array to a single value:

```php
$items = [
    ['name' => 'Apple', 'price' => 1.50],
    ['name' => 'Banana', 'price' => 0.75],
    ['name' => 'Cherry', 'price' => 2.00],
];

$total = array_reduce($items, fn($carry, $item) => $carry + $item['price'], 0);
// 4.25
```

## Spread Operator

```php
function sum(int ...$numbers): int
{
    return array_sum($numbers);
}

$nums = [1, 2, 3];
echo sum(...$nums);  // 6
```

## Array Destructuring

```php
$coordinates = [40.7128, -74.0060];
[$lat, $lng] = $coordinates;

// Named keys
$person = ['name' => 'John', 'age' => 30];
['name' => $name, 'age' => $age] = $person;
```
