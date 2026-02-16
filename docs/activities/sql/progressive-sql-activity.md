---
id: progressive-sql-activity
title: Progressive SQL Activity — Leveling Up
description: SQL challenge designed to strengthen your database skills, guiding you from basic queries to more advanced concepts through practical, hands-on exercises.
---
# Progressive SQL Activity — Leveling Up
> This activity was made by [Robinson Andres Cortes](https://github.com/andrescortesdev/)

In this activity, you’ll explore SQL queries through a set of research-based exercises. Try to complete the activity using only [W3Schools](https://www.w3schools.com/)
 as a reference.

Copy and paste the provided [code](../../assets/progressive-sql-activity/script) into your preferred SQL DBMS. While the exercises work with any SQL engine, the example solution uses MySQL.

> We don’t repeat queries that do exactly the same thing.\
Each step adds a new layer of reasoning.

> When someone finishes Level 5 entirely on their own, they are no longer just learning SQL\
they are learning to think in data.
---

## Level 1 — Fundamentals (Basic Exploration)

1. List all users.
2. Show only `first_name`, `last_name`, and `email`.
3. Filter users whose `role` is `'admin'`.
4. Filter users with `document_type = 'CC'`.
5. Show users older than 18 years (calculate age from `birth_date`).
6. Show users whose income is greater than 5,000,000.
7. Show users whose name starts with "A".
8. Show users who do not have a `company`.

> Here you already learned SELECT, WHERE, logical operators, and NULL.

---

## Level 2 — Combining Conditions

9. Users older than 25 years who are `'employee'`.
10. Users with `'CC'` who are active.
11. Users of legal age without employment.
12. Users with a job and income greater than 3,000,000.
13. Married users with at least 1 child.
14. Users between 30 and 40 years old.
15. Verified `'admin'` users older than 25 years.

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
