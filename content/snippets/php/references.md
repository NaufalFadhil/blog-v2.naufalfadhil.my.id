---
title: "PHP References (&)"
tags: [php, backend]
date: 2026-03-19
description: "Useful PHP reference snippets and patterns"
weight: 2
---

## What Are References?

References in PHP are a way to access the same variable content by different names. They are not pointers like in C; they are symbol table aliases.

## Assign by Reference

```php
$a = 'hello';
$b = &$a;  // $b now points to the same value as $a

$b = 'world';
echo $a;  // Outputs: world
```

## Pass by Reference

Functions can modify the original variable by accepting a reference parameter:

```php
function addSuffix(string &$text, string $suffix): void
{
    $text .= $suffix;
}

$name = 'Stash';
addSuffix($name, 'Idea');
echo $name;  // Outputs: Naufal Fadhil
```

## References in Loops

::alert{type="warning"}
Be careful with references in `foreach` loops — always `unset` after the loop.
::

```php
$items = [1, 2, 3];

foreach ($items as &$item) {
    $item *= 2;
}
unset($item);  // Important! Prevents bugs

print_r($items);  // [2, 4, 6]
```

## Returning References

```php
class Config
{
    private array $data = ['debug' => false];

    public function &get(string $key): mixed
    {
        return $this->data[$key];
    }
}

$config = new Config();
$debug = &$config->get('debug');
$debug = true;  // Modifies the internal array
```

## Common Pitfalls

### Dangling References

```php
$a = 'foo';
$b = &$a;
unset($a);
echo $b;  // Still outputs: foo — only the alias is removed
```

### Array References

```php
$arr1 = [1, 2, 3];
$arr2 = &$arr1;
$arr2[] = 4;
// Both $arr1 and $arr2 are now [1, 2, 3, 4]
```
