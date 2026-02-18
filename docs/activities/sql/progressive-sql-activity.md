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
    <details>
      <summary>Reality check</summary>
            
      To start this section, we need to introduce some new concepts that will help us solve this challenge.
      
      The first concept is the `COUNT()` function.  
      The `COUNT()` function is used to count the number of rows that match a specified condition.
      
      The second concept is the `GROUP BY` statement.  
      It groups rows that have the same values into summary rows.
      
      The last concept is the `AS` keyword, which is used to rename a column or table using an alias.
      
      Enough theory — let’s put our hands on the keyboard.
      
      First, we need to `SELECT` the data we want to analyze. In this case, we select the `role` column and the number of times each role appears using `COUNT(role)`.  
      Instead of showing the default column name `COUNT(role)`, we use the `AS` keyword to give it a more readable alias.
      
      Next, we specify the table where the data is stored, and finally we use `GROUP BY` to group the results by role.

      ```sql
      SELECT role, COUNT(role) AS Counting FROM users GROUP BY role 
      ```

      More information about the `COUNT() function` in [here](https://www.w3schools.com/sql/sql_count.asp).\
      More information about the `GROUP BY statement` in [here](https://www.w3schools.com/sql/sql_groupby.asp#gsc.tab=0).\
      More information about the `AS keyword` in [here](https://www.w3schools.com/sql/sql_ref_as.asp).
    </details>
17. Count users by `document_type`.
    <details>
      <summary>Don’t laugh</summary>
            
      This exercise is really similar to the last one. Instead we should use the `document_type` as the search field.

      ```sql
      SELECT document_type, COUNT(document_type) AS Counting FROM users GROUP BY document_type 
      ```
    </details>
18. Count how many users are unemployed.
    <details>
      <summary>Be gentle</summary>
            
      In this case we take the `'Unemployed'` as a fixed value and `COUNT(*)` for all the users in the `users` table.\
      Then we only take the users `WHERE` its `company IS NULL`, that means they are unemployed.

      ```sql
      SELECT 'Unemployed', COUNT(*) AS Counting FROM users WHERE company is NULL 
      ```
    </details>
19. Calculate the overall average income.
    <details>
      <summary>Click wisely</summary>
            
      For this exercise, we need to introduce a couple of new SQL concepts.
      
      The first one is the `AVG()` function.  
      The `AVG()` function returns the average value of a numeric column.
      
      The second and final concept in this section is the `ROUND()` function.  
      The `ROUND()` function rounds a number to a specified number of decimal places.
      
      In this case, we want to calculate the average monthly income for all users.  
      We use the `AVG()` function to get the average value and the `ROUND()` function to round the result to **0 decimal places**.
      
      This is the final result:

      ```sql
      SELECT 'Average Income', ROUND(AVG(monthly_income), 0) FROM users
      ```

      More information about the `AVG() function` in [here](https://www.w3schools.com/sql/sql_avg.asp).\
      More information about the `ROUND() function` in [here](https://www.w3schools.com/sql/func_sqlserver_round.asp).
    </details>
20. Calculate the average income by `role`.
    <details>
      <summary>The big reveal</summary>
            
      This exercise is really similar to the last one, but in this case we `GROUP BY role` the results.

      ```sql
      SELECT role, ROUND(AVG(monthly_income ), 0) as average_income FROM users GROUP BY role
      ```
    </details>

> Now you’re no longer querying individuals—you’re reading patterns.

---

## Level 4 — Analytical Thinking

21. Show professions with more than 10 people.
    <details>
      <summary>Was I close?</summary>

      In this exercise, we bring together several concepts. First, we introduce a new SQL topic called `HAVING`.
      
      The `HAVING` clause works in a similar way to `WHERE`, but with an important difference:  
      the `WHERE` clause cannot be used with aggregate functions, while `HAVING` can.
      
      Our goal is to display all user professions, count how many users belong to each profession, assign an alias to that count, group the results by profession, and finally filter the professions that have **more than 10 users**.
      
      With that in mind, here is the solution:

      ```sql
      SELECT profession, COUNT(*) AS profession_count FROM users GROUP BY profession HAVING profession_count > 10
      ```

      More information about the `HAVING` in [here](https://www.w3schools.com/sql/sql_having.asp).
    </details>
22. Show the city with the most users.
      <details>
        <summary>Answer unlocked</summary>
        
        In this section the fun starts, because now we have to user some concepts that are really useful in the field.
  
        The first concept we are going to see is call the `ORDER BY` keyword. This keyword is made to order the elements in a specific way, it could be ascendance (`ASC`) or descendase (`DESC`), in this case we are going to user the `DESC`.
  
        Onother important tool is the `LIMIT`. This clause limits the results by just the amount of result that we specify, in this case we just need the first result.
  
        Taking all this in count, this is the solution:
  
        ```sql
        SELECT city, COUNT(*) AS city_count FROM users GROUP BY city ORDER BY city_count DESC LIMIT 1
        ```
  
        More information about the `ORDER BY keyword` in [here](https://www.w3schools.com/sql/sql_orderby.asp).\
        More information about the `LIMIT` in [here](https://www.w3schools.com/mysql/mysql_limit.asp).
      </details>
23. Compare the number of minors vs adults.
    <details>
      <summary>No cheating</summary>

      It's time to introduce y'all to a new amazing concept: The `SUM()` Function.\
      The `SUM()` function is going to return the sum of a numeric column. If a boolean stament is inside the function, and it return `TRUE`, then it's going to sum `1`.\
      If it returns `FALSE`, then it's going to sum `0`.

      In this case it's going to look like this:
  
      ```sql
      SELECT
          SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) > 17) AS adults,
          SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 18) AS minors
      FROM users
      ```

      More information about the `SUM() function` in [here](https://www.w3schools.com/sql/sql_sum.asp).
    </details>
24. Average income by city, ordered from highest to lowest.
    <details>
      <summary>Let’s find out</summary>

      Another great exercise to practice multiple SQL concepts together.
      
      In this exercise, we first calculate the average `monthly_income` for each city.  
      Then, we round that value and assign it an alias.  
      Next, we group the results by city and finally order them by `monthly_income` in descending order.
      
      With all this in mind, here is the solution:

      ```sql
      SELECT city, ROUND(AVG(monthly_income )) AS income_city FROM users GROUP BY city ORDER BY income_city DESC
      ```
    </details>
25. Show the top 5 people with the highest income.
    <details>
      <summary>Drumroll…</summary>

      If you’ve completed the previous exercises in order, this one should be extremely easy.
      
      First, we select the `first_name` and `monthly_income` columns.  
      Then, we order the results by `monthly_income` in descending order and limit the output to the top 5 entries.
      
      With that in mind, here is the solution:

      ```sql
      SELECT first_name, monthly_income FROM `users` ORDER BY monthly_income DESC LIMIT 5
      ```
    </details>

> Here you’re already using GROUP BY, ORDER BY, LIMIT, and HAVING.


---

## Level 5 — Engineer Level

26. Classify users as "Minor", "Adult" or "Senior".
    <details>
      <summary>Math gods decide</summary>

      Now it's time to explore a new conditional call the `CASE` expression. 7

      The `CASE` expression goes through conditions and returns a value when the first condition is met (like an if-then-else statement). So, once a condition is true, it will stop reading and return the result. If no conditions are true, it returns the value in the `ELSE` clause.
      
      If there is no `ELSE` part and no conditions are true, it returns `NULL`.

      With that in mind, let's continue:

      ```sql
      SELECT first_name, 
             CASE 
                 WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 18 THEN 'Minor'
                 WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) >= 18 AND TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 65 THEN 'Adult'
                 ELSE 'Senior'
             END AS age_group
      FROM users
      ```
      More information about the `CASE expression` in [here](https://www.w3schools.com/sql/sql_case.asp).
    </details>
27. Show how many users fall into each of the classifications above.
    <details>
      <summary>Truth hurts</summary>

      Let's group a few concepts to get this exercise done.

      First, we need to calculate the total number of users that fall into a specific age range: `'Minor'`, `'Adult'`, or `'Senior'`.
      
      If a user matches a given category, we add `1` to that group using the `SUM()` function, and then display the final totals for each category.

      ```sql
      SELECT 
             SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 18) as 'Minor',
             SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) >= 18 AND TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 65) as 'Adult',
             SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) >= 65) as 'Senior'
      FROM users
      ```
    </details>
28. Income ranking by city.
    <details>
      <summary>Verify my genius</summary>

      In this case we have to `SUM` the `monthly_income` of the table `users` and `GROUP BY city` the result.\
      Then we `ORDER BY income` in a descendance order to create the ranking.

      This is the result:

      ```sql
      SELECT city, SUM(monthly_income) AS income FROM users GROUP BY city ORDER BY income DESC
      ```
    </details>
29. Profession with the highest average income.
    <details>
      <summary>Hope mode ON</summary>

      Let's get out hands dirty.

      First we have to create an `AVG` of the `monthly_income` of all users and `GROUP BY profession` the result.\
      Then we `ORDER BY income` to get the information in a descendance order.\
      And finally `LIMIT` the result to `1` to get the highest average income:

      ```sql
      SELECT profession,
          ROUND(AVG(monthly_income),0) AS income
      FROM users
      GROUP BY profession
      ORDER BY income DESC
      LIMIT 1
      ```
    </details>
30. Show users whose income is above the overall average.
    <details>
      <summary>Final answer?</summary>

      And the last exercise, I imagine how tired you could be, but no problem, let's do it.

      First of all we need to gather the information that we need, in this case we need the `first_name` and the `monthly_income` from the users `WHERE` its `income` is higher that the `AVG monthly_income`.

      With that, let's finish with:

      ```sql
      SELECT first_name, monthly_income as income 
      FROM users 
      WHERE income > (SELECT AVG(monthly_income) FROM users)
      ```
    </details>
