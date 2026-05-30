---
title: "PHP Include and Require"
tags: [php, backend, include, require]
date: 2026-05-30
description: "Understanding PHP include and require statements"
weight: 12
---

## Include
In PHP, the `include` statement is used to include and evaluate a specified file. The content of the included file is inserted into the script at the point where the `include` statement is used. If the file cannot be found, a warning is issued, but the script will continue to execute.

```php
include 'header.php'; // Includes the header.php file
echo "This is the main content of the page.";
```

## Require
The `require` statement is similar to `include`, but it behaves differently when the specified file cannot be found. If the file cannot be found, a fatal error is issued, and the script will stop executing.

```php
require 'config.php'; // Requires the config.php file or stops execution if it cannot be found
echo "This is the main content of the page.";
```

## Conclusion
Both `include` and `require` are used to include files in PHP, but they differ in their error handling. Use `include` when the file is optional and the script can continue without it, and use `require` when the file is essential for the application to run. Always ensure that the paths to the included or required files are correct to avoid errors.
