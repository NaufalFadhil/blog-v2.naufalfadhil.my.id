---
title: "PHP Data Types"
tags: [php, backend, data types]
date: 2026-05-30
description: "Essential PHP data types and their usage"
weight: 5
---

## Data Types
In PHP, a data type is a classification that specifies which type of value a variable can hold. PHP supports several data types, including:
| Type | Description |
|------|-------------|
| `int` | Integer, a whole number without a decimal point. |
| `float` | Floating-point number, a number with a decimal point. |
| `string` | A sequence of characters. |
| `bool` | Boolean, a value that can be either `true` or `false`. |
| `array` | An ordered map of key-value pairs. |
| `object` | An instance of a class. |
| `NULL` | A special type that represents a variable with no value. |
| `resource` | A special variable that holds a reference to an external resource. |

### Example Usage
```php
$integer = 42;
$float = 3.14;
$string = "Hello, World!";
$boolean = true;
$array = [1, 2, 3];
class MyClass {
    public $property = "I am an object.";
}
$object = new MyClass();
$nullValue = NULL;
```

## String Data Type
Strings in PHP are sequences of characters enclosed in either single quotes (`'`) or double quotes (`"`). The choice between single and double quotes affects how the string is processed, particularly with regard to variable interpolation and escape sequences.

```php
$name = "John";
$message1 = "Hello, $name!"; // Parses variable
$message2 = 'Hello, $name!'; // Literal string
```

### String Concatenation
You can concatenate strings using the dot operator (`.`):

```php
$greeting = "Hello, " . $name . "!"; // "Hello, John!"
```

### String Manipulation Functions
PHP provides a wide range of built-in functions for string manipulation. Here are some common ones:
- `strlen()`: Get the length of a string.
- `strtolower()`: Convert a string to lowercase.
- `strtoupper()`: Convert a string to uppercase.
- `substr()`: Get a substring from a string.
- `str_replace()`: Replace all occurrences of a search string with a replacement string.

```php
$string = "Hello, World!";
echo strlen($string); // 13
echo strtolower($string); // "hello, world!"
echo strtoupper($string); // "HELLO, WORLD!"
echo substr($string, 0, 5); // "Hello"
echo str_replace("World", "PHP", $string); // "Hello, PHP!"
```

### Heredoc and Nowdoc
Heredoc and Nowdoc are special string syntaxes in PHP that allow for multi-line strings without the need for concatenation.

The `Heredoc` syntax **allows** for variable parsing and special characters, while the `Nowdoc` syntax treats the string as literal text without parsing.

Heredoc
```php
$name = "John";
$heredoc = <<<EOD
This is a heredoc string. It can span multiple lines and parse variables like $name.
EOD;
// Output: This is a heredoc string. It can span multiple lines and parse variables like John.
```

Nowdoc
```php
$name = "John";
$nowdoc = <<<'EOD'
This is a nowdoc string. It can span multiple lines but does not parse variables like $name.
EOD;
// Output: This is a nowdoc string. It can span multiple lines but does not parse variables like $name.
```

## Integer Data Type
Integers in PHP are whole numbers without a decimal point. They can be positive, negative, or zero. The size of an integer depends on the platform, but it is typically 32 or 64 bits.

```php
$positiveInt = 42;
$negativeInt = -42;
$zeroInt = 0;
```

## Float Data Type
Floats, also known as floating-point numbers, are numbers that contain a decimal point. They can represent a wider range of values than integers but may have precision issues due to the way they are stored in memory.

```php
$floatValue = 3.14;
$negativeFloat = -3.14;
```

## Boolean Data Type
Booleans in PHP represent two possible values: `true` and `false`. They are often used in conditional statements and logical operations.

```php
$isTrue = true;
$isFalse = false;
```

## Array Data Type
Arrays in PHP are ordered maps that can hold multiple values. They can be indexed by integers or associative keys (strings).

```php
// Indexed array
$fruits = ["Apple", "Banana", "Cherry"];

// Associative array
$person = [
    "name" => "John",
    "age" => 30,
    "city" => "New York"
];
```

## Object Data Type
Objects in PHP are instances of classes. They can have properties and methods that define their behavior.

```php
class MyClass {
    public $property = "I am an object.";
    
    public function myMethod() {
        return "This is a method.";
    }
}
$object = new MyClass();
echo $object->property; // Output: I am an object.
echo $object->myMethod(); // Output: This is a method.
```

## NULL Data Type
The `NULL` data type represents a variable with no value. A variable is considered `NULL` if it has been assigned the value `NULL`, has not been set, or has been unset.

```php
$nullValue = NULL; // $nullValue is explicitly set to NULL
$unsetValue; // $unsetValue is also considered NULL because it has not been set
unset($nullValue); // $nullValue is now NULL
```