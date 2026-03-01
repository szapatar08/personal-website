---
id: sql-views
title: MySQL Search Views
description: In this exercise we are going to learn how to create a view
---
# MySQL Search Views
> This activity was made by [Robinson Andres Cortes](https://github.com/andrescortesdev/)

Copy and paste the provided [code](../../assets/progressive-sql-activity/script) into your preferred SQL DBMS. While the exercises work with any SQL engine, the example solution uses MySQL.

## Exercise 1 – Adult users view

Create a view called `view_adult_users` that meets the following requirements:

- Displays the fields:
  - `id`
  - `first_name`
  - `last_name`
  - `document_type`
  - `document_number`
  - `city`
  - `country`
- Calculates the age from the `birth_date` field.
- Includes only users whose age is greater than or equal to 18 years.


<details>
    <summary>Check if I’m right</summary>
    
    ```sql
    CREATE OR REPLACE
    VIEW view_adult_users AS
        SELECT 
            u.id, u.first_name, u.last_name,
            u.document_type, u.document_number,
            u.city, u.country,
            TIMESTAMPDIFF(YEAR, u.birth_date, CURRENT_DATE()) AS age
        FROM users u
        WHERE TIMESTAMPDIFF(YEAR, u.birth_date, CURRENT_DATE()) > 17
    };
    ```
</details>
---

## Exercise 2 – Consolidated contacts view

Create a view called `view_user_contacts` that:

- Generates a `full_name` field by concatenating `first_name` and `last_name`.
- Displays the user's email.
- Generates a `contact_number` field that:
  - Uses `mobile` if it exists.
  - Otherwise uses `phone`.
  - If neither exists, displays the text **"No phone"**.
- Includes:
  - `address`
  - `city`
  - `state`
  - `country`

<details>
    <summary>Check if I’m right</summary>
    
    ```sql
    CREATE OR REPLACE
    VIEW view_user_contacts AS
        SELECT 
            CONCAT(u.first_name, " ", u.last_name) AS full_name, u.email,
            COALESCE(u.mobile, u.phone, "Without phone") AS contact_number,
            u.address, u.city, u.state, u.country
        FROM users u
    ```
</details>
---

## Exercise 3 – User financial view

Create a view called `view_users_with_income` that:

- Displays the fields:
  - `id`
  - `first_name`
  - `last_name`
  - `profession`
  - `monthly_income`
- Includes only users who have registered income greater than zero.

Then, perform a query on the view that orders users by monthly income from highest to lowest.

<details>
    <summary>Check if I’m right</summary>
    
    ```sql
    CREATE OR REPLACE
    VIEW view_users_with_income AS
        SELECT 
            u.id, u.first_name, u.last_name, u.profession, u.monthly_income
        FROM users u
        WHERE u.monthly_income > 0 AND u.monthly_income IS NOT NULL
    ```
    
    ```sql
    SELECT * 
    FROM view_users_with_income
    ORDER BY monthly_income DESC
    ```
</details>
---

## Exercise 4 – Demographic view

Create a view called `view_demographic_summary` that:

- Generates a `full_name` field.
- Calculates the user's age.
- Displays the fields:
  - `gender`
  - `marital_status`
  - `education_level`
  - `city`
  - `country`

Then, perform a query that:

- Groups users by city.
- Displays the number of users per city.

<details>
    <summary>Check if I’m right</summary>
    
    ```sql
    CREATE OR REPLACE
    VIEW view_demographic_summary AS
        SELECT 
            CONCAT(u.first_name, " ", u.last_name) AS full_name,
            TIMESTAMPDIFF(YEAR, u.birth_date, CURRENT_DATE()) AS age,
            u.gender, u.marital_status, u.education_level, u.city, u.country
        FROM users u
    ```
    
    ```sql
    SELECT vds.city, COUNT(vds.full_name)
    FROM view_demographic_summary vds
    GROUP BY vds.city
    ```
</details>
---

## Exercise 5 – Executive profile view

Create a view called `view_user_profile` that:

- Generates the `full_name` field.
- Includes identification information:
  - `document_type`
  - `document_number`
- Calculates the user's age.
- Includes:
  - `profession`
  - `education_level`
  - `company`
- Includes financial information:
  - `monthly_income`
- Includes location:
  - `city`
  - `country`

Then, perform a query that:

- Filters only users with income greater than **3,000,000**.
- Orders the results by city.

<details>
    <summary>Check if I’m right</summary>
    
    ```sql
    CREATE OR REPLACE
    VIEW view_user_profile AS
        SELECT 
            CONCAT(u.first_name, " ", u.last_name) as full_name,
            u.document_type, u.document_number,
            TIMESTAMPDIFF(YEAR, u.birth_date, CURRENT_DATE()) AS age,
            u.profession, u.education_level, u.company, u.monthly_income,
            u.city, u.country
        FROM users u
    ```
    
    ```sql
    SELECT vup.city, SUM(vup.monthly_income) as income_per_city
    FROM view_user_profile vup
    WHERE vup.monthly_income > 3000000
    GROUP BY vup.city
    ORDER BY income_per_city DESC
    ```
</details>
---

### Concepts evaluated

- `CREATE VIEW`
- Date functions
- `CONCAT`
- `COALESCE`
- `WHERE`
- `ORDER BY`
- `GROUP BY`

Views allow business logic to be encapsulated directly in the database, improving readability, reusability, and query security.
