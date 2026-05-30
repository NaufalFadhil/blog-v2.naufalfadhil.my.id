---
title: "PHP Variables"
tags: [php, backend, variables, constants, magic constants, scope, global, local, static]
date: 2026-05-30
description: "Essential PHP variables, constants, magic constants, and variable scope"
weight: 4
---

## Variables
In PHP, variables are denoted by a dollar sign (`$`) followed by the variable name. Variable names are case-sensitive and can contain letters, numbers, and underscores, but must start with a letter or an underscore.

```php
$name = "John";
$age = 30;
$isStudent = true;
```

## Constants
In PHP, constants are defined using the `define()` function or the `const` keyword. Constants are immutable and do not have a `$` prefix.

```php
define("PI", 3.14);
const GRAVITY = 9.81;
```

## Magic Constants
PHP provides several predefined constants called magic constants that change depending on where they are used. Some common magic constants include:
| Magic Constant | Description |
|----------------|-------------|
| `__LINE__`     | The current line number of the file. |
| `__FILE__`     | The full path and filename of the file. |
| `__DIR__`      | The directory of the file. |
| `__FUNCTION__` | The name of the current function. |
| `__CLASS__`    | The name of the current class. |
| `__METHOD__`   | The name of the current method. |
| `__NAMESPACE__`| The name of the current namespace. |

```php
echo "This is line number: " . __LINE__; // Outputs the current line number

echo "This file is located at: " . __FILE__; // Outputs the full path and filename of the file

echo "This directory is: " . __DIR__; // Outputs the directory of the file
```

## Variable Scope
In PHP, variable scope refers to the context within which a variable is defined and can be accessed. The main types of variable scope in PHP are:
| Scope | Description |
|-------|-------------|
| Local Scope | Variables defined within a function are only accessible within that function. |
| Global Scope | Variables defined outside of any function are accessible throughout the script, but not within functions unless declared as global. |
| Static Scope | Variables declared as static within a function retain their value between function calls. |
| Function Parameters | Variables passed as parameters to a function are only accessible within that function. |

```php
function localScope() {
    $localVar = "I am a local variable";
    echo $localVar; // Outputs: I am a local variable
}
localScope();
// echo $localVar; // This will cause an error because $localVar is not accessible outside the function
```

```php
function staticScope() {
    static $count = 0;
    $count++;
    echo $count; // Outputs the number of times the function has been called
}
staticScope(); // Outputs: 1
staticScope(); // Outputs: 2
staticScope(); // Outputs: 3
```

## Global Variables
Global variables are defined outside of any function and can be accessed throughout the script. However, to access a global variable within a function, you need to declare it as global using the `global` keyword or access it through the `$GLOBALS` array.

### Using `global` keyword
```php
$globalVar = "I am a global variable";
function testGlobal() {
    global $globalVar;
    echo $globalVar; // Outputs: I am a global variable
}
testGlobal();
```

### Using `$GLOBALS` array
```php
$globalVar = "I am a global variable";
function testGlobal() {
    echo $GLOBALS['globalVar']; // Outputs: I am a global variable
}
testGlobal();
```

## Superglobals
PHP also provides several predefined superglobal variables that are available in all scopes throughout a script. Some common superglobals include:
| Superglobal | Description |
|-------------|-------------|
| `$_GET`     | An associative array of variables passed to the current script via the URL parameters. |
| `$_POST`    | An associative array of variables passed to the current script via the HTTP POST method. |
| `$_SERVER`  | An array containing information about headers, paths, and script locations. |
| `$_SESSION` | An associative array containing session variables available to the current script. |
| `$_COOKIE`  | An associative array of variables passed to the current script via HTTP cookies. |
| `$_FILES`   | An associative array of items uploaded to the current script via the HTTP POST method. |
| `$_REQUEST` | An associative array that by default contains the contents of `$_GET`, `$_POST`, and `$_COOKIE`. |

```php
// Example of using superglobals
echo $_SERVER['HTTP_USER_AGENT']; // Outputs the user agent string of the browser

// Example of using $_GET
// If the URL is http://example.com/?name=John
echo $_GET['name']; // Outputs: John

// Example of using $_POST
// If a form is submitted with a field named 'email'
echo $_POST['email']; // Outputs the submitted email address
```
