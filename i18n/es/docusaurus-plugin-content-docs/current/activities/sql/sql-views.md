---
id: sql-views
title: Vistas de Búsqueda en MySQL
description: En este ejercicio vamos a aprender a crear vistas
---
# Vistas de Búsqueda en MySQL
> Esta actividad fue realizada por [Robinson Andres Cortes](https://github.com/andrescortesdev/)

Copia y pega el [código](../../assets/progressive-sql-activity/script) proporcionado en tu gestor de bases de datos SQL preferido. Aunque los ejercicios funcionan con cualquier motor SQL, la solución de ejemplo utiliza MySQL.

## Ejercicio 1 – Vista de usuarios adultos

Crea una vista llamada `view_adult_users` que cumpla con los siguientes requisitos:

- Muestre los campos:
  - `id`
  - `first_name`
  - `last_name`
  - `document_type`
  - `document_number`
  - `city`
  - `country`
- Calcule la edad a partir del campo `birth_date`.
- Incluya únicamente usuarios cuya edad sea mayor o igual a 18 años.


<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
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

## Ejercicio 2 – Vista de contactos consolidados

Crea una vista llamada `view_user_contacts` que:

- Genere un campo `full_name` concatenando `first_name` y `last_name`.
- Muestre el correo electrónico del usuario.
- Genere un campo `contact_number` que:
  - Use `mobile` si existe.
  - En caso contrario use `phone`.
  - Si ninguno existe, muestre el texto **"No phone"**.
- Incluya:
  - `address`
  - `city`
  - `state`
  - `country`

<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
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

## Ejercicio 3 – Vista financiera de usuarios

Crea una vista llamada `view_users_with_income` que:

- Muestre los campos:
  - `id`
  - `first_name`
  - `last_name`
  - `profession`
  - `monthly_income`
- Incluya únicamente usuarios que tengan ingresos registrados mayores a cero.

Luego, realiza una consulta sobre la vista que ordene los usuarios por ingreso mensual de mayor a menor.

<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
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

## Ejercicio 4 – Vista demográfica

Crea una vista llamada `view_demographic_summary` que:

- Genere un campo `full_name`.
- Calcule la edad del usuario.
- Muestre los campos:
  - `gender`
  - `marital_status`
  - `education_level`
  - `city`
  - `country`

Luego, realiza una consulta que:

- Agrupe los usuarios por ciudad.
- Muestre la cantidad de usuarios por cada ciudad.

<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
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

## Ejercicio 5 – Vista de perfil ejecutivo

Crea una vista llamada `view_user_profile` que:

- Genere el campo `full_name`.
- Incluya información de identificación:
  - `document_type`
  - `document_number`
- Calcule la edad del usuario.
- Incluya:
  - `profession`
  - `education_level`
  - `company`
- Incluya información financiera:
  - `monthly_income`
- Incluya ubicación:
  - `city`
  - `country`

Luego, realiza una consulta que:

- Filtre únicamente usuarios con ingresos mayores a **3.000.000**.
- Ordene los resultados por ciudad.

<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
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

### Conceptos evaluados

- `CREATE VIEW`
- Funciones de fecha
- `CONCAT`
- `COALESCE`
- `WHERE`
- `ORDER BY`
- `GROUP BY`

Las vistas permiten encapsular la lógica de negocio directamente en la base de datos, mejorando la legibilidad, reutilización y seguridad de las consultas.
