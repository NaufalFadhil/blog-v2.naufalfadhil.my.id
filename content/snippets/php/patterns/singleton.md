---
title: "Singleton Pattern"
tags: [php, patterns, backend]
date: 2026-03-13
description: "Implementing the singleton pattern in PHP"
---

## Singleton Pattern

The singleton pattern ensures a class has only one instance.

```php
class Database
{
    private static ?self $instance = null;

    private function __construct(
        private readonly PDO $pdo
    ) {}

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self(
                new PDO('mysql:host=localhost;dbname=app', 'root', '')
            );
        }
        return self::$instance;
    }

    public function query(string $sql): array
    {
        return $this->pdo->query($sql)->fetchAll();
    }
}
```
