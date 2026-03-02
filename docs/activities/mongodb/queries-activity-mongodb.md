---
id: queries-activity-mongodb
title: Queries in MongoDB
description: In this exercise we are going to explore a complete new world call MongoDB, diving into its queries.
---
# Queries in MongoDB
> This activity was made by [Robinson Andres Cortes](https://github.com/andrescortesdev/)

To complete this activity you must need to now how to create a MongoDB collection and how to add multiple documents.\
For this exercise you have to download the following file with all the data you haave to insert into your collection, in this case call `users`: [users](../../assets/queries-activity-mongodb/users.json)

## Level 1 – Basic Queries

1. List all documents from the `users` collection.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find()
    ```
</details>

2. Display only the `first_name`, `last_name`, and `email` fields.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({}, {
      first_name:1,
      last_name:1,
      email:1,
      _id:0
    })
    ```
</details>

3. Retrieve all users whose `role` is `"admin"`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({role:"admin"})
    ```
</details>

4. Find users whose `country` is `"Colombia"`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({country:"Colombia"})
    ```
</details>

5. List users who are active (`is_active = true`).
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({is_active:1})
    ```
</details>

6. Find users who are not verified (`is_verified = false`).
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({is_verified:0})
    ```
</details>

7. Retrieve users whose `gender` is `"Masculino"`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({gender:"Masculino"})
    ```
</details>

8. List users who live in the city `"Medellín"`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({city:"Medellín"})
    ```
</details>

9. Find users who have at least one child (`children_count > 0`).
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({children_count:{$gt: 0}})
    ```
</details>

10. List users whose profession (`profession`) is not null.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({profession: {$ne: null}})
    ```
</details>

---

## Level 2 – Filters with Operators

11. Find users with `monthly_income` greater than 3,000,000.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({monthly_income:{$gt:3000000}})
    ```
</details>

12. Find users with income between 2,000,000 and 5,000,000.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({monthly_income: {$gte:2000000, $lte:5000000}})
    ```
</details>

13. Find users whose birth date is later than `2000-01-01`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({birth_date: {$gt: new Date('2000-01-01')}})
    ```
</details>

14. Find users whose `document_type` is in `["CC", "CE"]`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({document_type: {$in:["CC", "CE"]}})
    ```
</details>

15. Find users whose `city` is not `"Bogotá"`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({city:{$ne:"Bogotá"}})
    ```
</details>

16. Find users whose name starts with the letter `"A"`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({first_name:{$regex:/^A/}})
    ```
</details>

17. Find users whose email ends with `"gmail.com"`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({email:{$regex:/example.com$/}})
    ```
</details>

18. Find users who have more than 2 children and are active.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({$and: [{children_count: {$gte:2}}, {is_active:1}]})
    ```
</details>

19. Find users whose `marital_status` is `"Casado"` and have children.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({$and: [{marital_status:"Casado"},{children_count:{$gt:0}}]})
    ```
</details>

20. Find users who are inactive or not verified.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({$or:[{is_active:0},{is_verified:0}]})
    ```
</details>

---

## Level 3 – Sorting and Pagination

21. List users ordered by `monthly_income` from highest to lowest.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find().sort({monthly_income:-1})
    ```
</details>

22. Retrieve the 5 most recent users based on `created_at`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find().sort({created_at:-1}).limit(5)
    ```
</details>

23. Implement pagination: display page 2 with 10 records per page.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find().skip(10).limit(10) 
    ```
</details>

24. Display full name concatenated (`first_name` + `last_name`) and city using aggregation.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find({}, {full_name:{$concat:["$first_name", " ", "$last_name"]}, city:1})
    ```
</details>

25. List users ordered by birth date from youngest to oldest.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.find().sort({birth_date:-1})
    ```
</details>

---

## Level 4 – Aggregation Framework

26. Calculate the average income (`monthly_income`) of all users.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:null,
        monthly_avg_income:{$avg:"$monthly_income"}
      }
    })
    ```
</details>

27. Calculate the average income per city.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:"$city",
        monthly_avg_income:{$avg:"$monthly_income"}
      }
    })
    ```
</details>

28. Count how many users there are per `role`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:"$role",
        count: {$sum:1}
      }
    })
    ```
</details>

29. Count how many users are active vs inactive.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:"$is_active",
        count: {$sum:1}
      }
    })
    ```
</details>

30. Get the total number of children grouped by `state`.
<details>
    <summary>Check if I’m right</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:"$state",
        children:{$sum:"$children_count"}
      }
    })
    ```
</details>
