---
id: progressive-sql-activity
title: Progressive SQL Activity — Leveling Up
description: SQL challenge designed to strengthen your database skills, guiding you from basic queries to more advanced concepts through practical, hands-on exercises.
---
# Progressive SQL Activity — Leveling Up
> This activity was made by [Robinson Andres Cortes](https://github.com/andrescortesdev/)

In this activity, you’ll explore SQL queries through a set of research-based exercises. Try to complete the activity using only [W3Schools](https://www.w3schools.com/), [w3resource](https://www.w3resource.com/mysql/mysql-tutorials.php) or [SQLhabit](https://www.sqlhabit.com/mdn)
 as a reference.

Copy and paste the provided [code](../../assets/progressive-sql-activity/script) into your preferred SQL DBMS. While the exercises work with any SQL engine, the example solution uses MySQL.

> We don’t repeat queries that do exactly the same thing.\
Each step adds a new layer of reasoning.

> When someone finishes Level 5 entirely on their own, they are no longer just learning SQL\
they are learning to think in data.
---

## Level 1 — Fundamentals (Basic Exploration)

1. List all users.
    <details>
      <summary>Check if I’m right</summary>
      
      In this exercise, we need to select all the data from the table in the database we created. In this case, the table is called `users`.\
      In real-world SQL, this solution does not differ much from what you’ll see in practice. The key concept here is that the `*` operator means all columns.
      
      With that in mind, here is the solution:
      
      ```sql
      SELECT * FROM users
      ```
      </details>
2. Show only `first_name`, `last_name`, and `email`.
    <details>
      <summary>Reveal the truth</summary>
      
      In this exercise, we continue with the same logic as the previous one. The only change is the selected columns.\
      Instead of selecting all columns (`*`), we now only need to retrieve `first_name`, `last_name`, and `email`.
      
      With that in mind, here is the solution:
      
      ```sql
      SELECT first_name, last_name, email FROM users
      ```
    </details>
3. Filter users whose `role` is `'admin'`.
    <details>
      <summary>Show me the magic</summary>
      
      In this exercise, we introduce another SQL concept called `WHERE`.\
      This is a conditional statement that filters data: only rows that match the given condition will be shown:
  
      ```sql
      SELECT * FROM users WHERE role = 'admin'
      ```
    </details>
4. Filter users with `document_type = 'CC'`.
    <details>
      <summary>Moment of truth</summary>
      
      This one follows the last exercise, now we are not asking for the `role`.\
      Instead we are searching for the `document_type`:

      ```sql
      SELECT * FROM users WHERE document_type = 'CC'
      ```
    </details>
5. Show users older than 18 years (calculate age from `birth_date`).
    <details>
      <summary>Did I nail it?</summary>
      
      To solve this challenge, we need to introduce the `TIMESTAMPDIFF()` function.\
      In MySQL, `TIMESTAMPDIFF()` is a powerful function used to calculate the difference between two `DATE` or `DATETIME` values.

      In this case we convert the `birth_date` into years by comparing it with current date, and the check whether the user is older than 18 years.

      The exercise might look like this:

      ```sql
      SELECT * FROM users WHERE TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) > 18
      ```

      More information about `TIMESTAMPDIFF()` in [here](https://www.w3resource.com/mysql/date-and-time-functions/mysql-timestampdiff-function.php).
    </details>
6. Show users whose income is greater than 5,000,000.
    <details>
      <summary>Click for spoilers</summary>
      
      Following the same login in the last exercise, we can use `>` greater than symbol.\
      We have to make sure that `monthly_income` is grater than `5000000`.

      With that in mind, here is the solution:

      ```sql
      SELECT * FROM users WHERE monthly_income > 5000000	    
      ```
    </details>
7. Show users whose name starts with "A".
    <details>
      <summary>Let’s see…</summary>
      
      In order to solve this exercise, I have to introduce you to a new concept call `LIKE operator`.\
      The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column.\
      To return records that starts with a specific letter or phrase, add the `%` at the end of the letter or phrase.

      The exercise might look like this:

      ```sql
      SELECT * FROM users WHERE first_name like 'a%'	    
      ```
      
      More information about `LIKE operator` in [here](https://www.w3schools.com/sql/sql_like.asp#gsc.tab=0).
    </details>
8. Show users who do not have a `company`.
    <details>
      <summary>Risky click</summary>
      
      To solve this challenge, we first need to understand that a user without a company has `company = ǸULL`.

      For this, we introduce a new SQL concept: the `IS` operator.\
      The `IS` operator is used to compare a value with `NULL` or with boolean values (`TRUE`, `FALSE`). It is especially important because `NULL` cannot be compared using the `=` operator..

      With that in mind, here is the solution:

      ```sql
      SELECT * FROM users WHERE company IS NULL    
      ```
      
      More information about `IS operator` in [here](https://www.sqlhabit.com/mdn/is).
    </details>

> Here you already learned SELECT, WHERE, logical operators, and NULL.

---

## Level 2 — Combining Conditions

9. Users older than 25 years who are `'employee'`.
    <details>
      <summary>Answer, please</summary>
      
      In this exercise, we introduce some new SQL operators. The first one is `AND`.
      
      The `AND` operator is a logical operator that returns `TRUE` only if **both** conditions are `TRUE`.  
      In this case, the condition will return `TRUE` if the user is older than 25 **and** is an employee.
      
      Another important concept is the `NOT` operator.  
      The `NOT` operator is also a logical operator that returns `TRUE` when a condition is **not** met.  
      In this case, if `company` is **not** `NULL`, the condition will return `TRUE`.
      
      With that in mind, here is the solution:

      ```sql
      SELECT * FROM users WHERE TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) > 25 AND company IS NOT NULL   
      ```
      
      More information about the `AND operator` in [here](https://www.w3schools.com/sql/sql_and.asp).\
      More information about the `NOT operator` in [here](https://www.w3schools.com/sql/sql_not.asp).
    </details>
10. Users with `'CC'` who are active.
    <details>
      <summary>Am I a genius?</summary>
      
      Following the last exercise we only need to check if the `document_type` = `'CC'` **and** `is_active` = `1`:

      ```sql
      SELECT * FROM users WHERE document_type = 'CC' AND is_active = 1   
      ```
    </details>
11. Users of legal age without employment.
    <details>
      <summary>Or… not?</summary>
      
      This exercise is the same as Exercise 9, but it filters users who are over 18 years old, which is the legal age in my country.

      ```sql
      SELECT * FROM users WHERE TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) > 17 and company IS NULL  
      ```
    </details>  
12. Users with a job and income greater than 3,000,000.
    <details>
      <summary>Time to confess</summary>
      
      First, we check that the user has a job.\
      This means the company column must not be NULL.
      
      Then, we filter users whose income is greater than 3,000,000 using the `>` comparison operator.\
      Both conditions must be true for a user to appear in the result.
      
      Taking that into count, here is the solution:

      ```sql
      SELECT * FROM users WHERE company IS NOT NULL AND monthly_income > 3000000  
      ```
    </details>  
13. Married users with at least 1 child.
    <details>
      <summary>Show the answer</summary>
          
      First, we check the marital status by comparing the `marital_status` column with the value `'Casado'`.\
      Then, we make sure the user has at least one child by checking that `children_count` is greater than or equal to `1`.
      
      Both conditions must be true for the user to be included in the result.

      ```sql
      SELECT * FROM users WHERE marital_status = 'Casado' AND children_count >= 1  
      ```
    </details>
14. Users between 30 and 40 years old.
    <details>
      <summary>Proof or pain</summary>
          
      In this one we first check that the age of the user is equal or more than 30 and equal or less than 40.\
      This makes the result to be between 30 and 40.

      ```sql
      SELECT * FROM users WHERE TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) >= 30 AND TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) <= 40 
      ```
    </details>
15. Verified `'admin'` users older than 25 years.
    <details>
      <summary>Judge me</summary>
            
      We need first make sure that the role of the user is `admin` and he is older that 25.

      ```sql
      SELECT * FROM users WHERE role = 'admin' AND TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) > 25 
      ```
    </details>

> Here we combine multiple conditions and boolean logic.

---

## Level 3 — Introduction to Analysis (Aggregations)

16. Count users by `role`.
17. Count users by `document_type`.
18. Count how many users are unemployed.
19. Calculate the overall average income.
20. Calculate the average income by `role`.

> Now you’re no longer querying individuals—you’re reading patterns.

---

## Level 4 — Analytical Thinking

21. Show professions with more than 10 people.
22. Show the city with the most users.
23. Compare the number of minors vs adults.
24. Average income by city, ordered from highest to lowest.
25. Show the top 5 people with the highest income.

> Here you’re already using GROUP BY, ORDER BY, LIMIT, and HAVING.


---

## Level 5 — Engineer Level

26. Classify users as:
    - "Minor"
    - "Adult"
    - "Senior"
27. Show how many users fall into each of the classifications above.
28. Income ranking by city.
29. Profession with the highest average income.
30. Show users whose income is above the overall average.
