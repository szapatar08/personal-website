---
id: queries-activity-mongodb
title: Consultas en MongoDB
description: En este ejercicio vamos a hacer consultas en un nuevo sistema de bases de datos NoSQL MongoDB.
---
# Consultas en MongoDB
> Esta actividad fue realizada por [Robinson Andres Cortes](https://github.com/andrescortesdev/)

Para completar esta actividad debes saber cómo crear una colección en MongoDB y cómo insertar múltiples documentos.\
Para este ejercicio debes descargar el siguiente archivo con todos los datos que tienes que insertar en tu colección, en este caso llamada `users`: [users](../../assets/queries-activity-mongodb/users.json)

## Nivel 1 – Consultas Básicas

1. Listar todos los documentos de la colección `users`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find()
    ```
</details>

2. Mostrar únicamente los campos `first_name`, `last_name` y `email`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({}, {
      first_name:1,
      last_name:1,
      email:1,
      _id:0
    })
    ```
</details>

3. Obtener todos los usuarios cuyo `role` sea `"admin"`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({role:"admin"})
    ```
</details>

4. Buscar los usuarios cuyo `country` sea `"Colombia"`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({country:"Colombia"})
    ```
</details>

5. Listar los usuarios que estén activos (`is_active = true`).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({is_active:1})
    ```
</details>

6. Buscar los usuarios que no estén verificados (`is_verified = false`).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({is_verified:0})
    ```
</details>

7. Obtener los usuarios cuyo `gender` sea `"Masculino"`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({gender:"Masculino"})
    ```
</details>

8. Listar los usuarios que vivan en la ciudad `"Medellín"`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({city:"Medellín"})
    ```
</details>

9. Buscar los usuarios que tengan al menos un hijo (`children_count > 0`).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({children_count:{$gt: 0}})
    ```
</details>

10. Listar los usuarios cuya profesión (`profession`) no sea null.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({profession: {$ne: null}})
    ```
</details>

---

## Nivel 2 – Filtros con Operadores

11. Buscar usuarios con `monthly_income` mayor a 3.000.000.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({monthly_income:{$gt:3000000}})
    ```
</details>

12. Buscar usuarios con ingresos entre 2.000.000 y 5.000.000.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({monthly_income: {$gte:2000000, $lte:5000000}})
    ```
</details>

13. Buscar usuarios cuya fecha de nacimiento sea posterior al `2000-01-01`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({birth_date: {$gt: new Date('2000-01-01')}})
    ```
</details>

14. Buscar usuarios cuyo `document_type` esté en `["CC", "CE"]`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({document_type: {$in:["CC", "CE"]}})
    ```
</details>

15. Buscar usuarios cuyo `city` no sea `"Bogotá"`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({city:{$ne:"Bogotá"}})
    ```
</details>

16. Buscar usuarios cuyo nombre empiece por la letra `"A"`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({first_name:{$regex:/^A/}})
    ```
</details>

17. Buscar usuarios cuyo correo electrónico termine en `"gmail.com"`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({email:{$regex:/example.com$/}})
    ```
</details>

18. Buscar usuarios que tengan más de 2 hijos y estén activos.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({$and: [{children_count: {$gte:2}}, {is_active:1}]})
    ```
</details>

19. Buscar usuarios cuyo `marital_status` sea `"Casado"` y tengan hijos.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({$and: [{marital_status:"Casado"},{children_count:{$gt:0}}]})
    ```
</details>

20. Buscar usuarios que estén inactivos o no verificados.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({$or:[{is_active:0},{is_verified:0}]})
    ```
</details>

---

## Nivel 3 – Ordenamiento y Paginación

21. Listar usuarios ordenados por `monthly_income` de mayor a menor.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find().sort({monthly_income:-1})
    ```
</details>

22. Obtener los 5 usuarios más recientes según `created_at`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find().sort({created_at:-1}).limit(5)
    ```
</details>

23. Implementar paginación: mostrar la página 2 con 10 registros por página.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find().skip(10).limit(10) 
    ```
</details>

24. Mostrar el nombre completo concatenado (`first_name` + `last_name`) y la ciudad usando agregación.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find({}, {full_name:{$concat:["$first_name", " ", "$last_name"]}, city:1})
    ```
</details>

25. Listar usuarios ordenados por fecha de nacimiento del más joven al mayor.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.find().sort({birth_date:-1})
    ```
</details>

---

## Nivel 4 – Aggregation Framework

26. Calcular el ingreso promedio (`monthly_income`) de todos los usuarios.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:null,
        monthly_avg_income:{$avg:"$monthly_income"}
      }
    })
    ```
</details>

27. Calcular el ingreso promedio por ciudad.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:"$city",
        monthly_avg_income:{$avg:"$monthly_income"}
      }
    })
    ```
</details>

28. Contar cuántos usuarios hay por cada `role`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:"$role",
        count: {$sum:1}
      }
    })
    ```
</details>

29. Contar cuántos usuarios están activos vs inactivos.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:"$is_active",
        count: {$sum:1}
      }
    })
    ```
</details>

30. Obtener la cantidad total de hijos agrupados por `state`.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```
    db.users.aggregate({
      $group:{
        _id:"$state",
        children:{$sum:"$children_count"}
      }
    })
    ```
</details>
