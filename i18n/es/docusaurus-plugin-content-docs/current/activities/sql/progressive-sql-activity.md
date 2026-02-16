---
id: progressive-sql-activity
title: Actividad Progresiva SQL — Subiendo de Nivel
description: Desafío de SQL diseñado para fortalecer tus habilidades en bases de datos, guiándote desde consultas básicas hasta conceptos más avanzados mediante ejercicios prácticos y aplicados.
---
# Actividad Progresiva SQL — Subiendo de Nivel
> Esta actividad fue creada por [Robinson Andres Cortes](https://github.com/andrescortesdev/)

En esta actividad explorarás consultas SQL a través de un conjunto de ejercicios de investigación. Intenta completar la actividad usando únicamente [W3Schools](https://www.w3schools.com/), [w3resource](https://www.w3resource.com/mysql/mysql-tutorials.php) o [SQLhabit](https://www.sqlhabit.com/mdn) como referencia.

Copia y pega el [código proporcionado](../../assets/progressive-sql-activity/script) en tu DBMS de SQL preferido. Aunque los ejercicios funcionan con cualquier motor SQL, la solución de ejemplo utiliza MySQL.

> No repetimos consultas que hagan exactamente lo mismo.\
Cada paso añade una capa nueva de razonamiento.

> Cuando alguien termina el Nivel 5 sin copiar, ya no está aprendiendo SQL.\
Está aprendiendo a pensar en datos.

---

# Nivel 1 — Fundamentos (Exploración básica)

1. Listar todos los usuarios.
    <details>
      <summary>Verificar si estoy en lo correcto</summary>
      
      En este ejercicio, necesitamos seleccionar todos los datos de la tabla en la base de datos que creamos. En este caso, la tabla se llama `users`.\
      En SQL del mundo real, esta solución no difiere mucho de lo que verás en la práctica. El concepto clave aquí es que el operador `*` significa todas las columnas.
      
      Con esto en mente, aquí está la solución:
      
      ```sql
      SELECT * FROM users
      ```
      </details>
2. Mostrar solo `first_name`, `last_name` y `email`.
    <details>
      <summary>Revelar la verdad</summary>
      
      En este ejercicio, continuamos con la misma lógica del anterior. El único cambio son las columnas seleccionadas.\
      En lugar de seleccionar todas las columnas (`*`), ahora solo necesitamos obtener `first_name`, `last_name` y `email`.
      
      Con esto en mente, aquí está la solución:
      
      ```sql
      SELECT first_name, last_name, email FROM users
      ```
    </details>
3. Filtrar usuarios cuyo `role` sea `'admin'`.
    <details>
      <summary>Muéstrame la magia</summary>
      
      En este ejercicio, introducimos otro concepto de SQL llamado `WHERE`.\
      Esta es una sentencia condicional que filtra los datos: solo se mostrarán las filas que cumplan con la condición dada:
  
      ```sql
      SELECT * FROM users WHERE role = 'admin'
      ```
    </details>
4. Filtrar usuarios con `document_type = 'CC'`.
    <details>
      <summary>Momento de la verdad</summary>
      
      Este sigue el ejercicio anterior, pero ahora no estamos preguntando por el `role`.\
      En su lugar, estamos buscando el `document_type`:

      ```sql
      SELECT * FROM users WHERE document_type = 'CC'
      ```
    </details>
5. Mostrar usuarios mayores de 18 años (calcular la edad desde `birth_date`).
    <details>
      <summary>¿Lo hice bien?</summary>
      
      Para resolver este reto, necesitamos introducir la función `TIMESTAMPDIFF()`.\
      En MySQL, `TIMESTAMPDIFF()` es una función poderosa que se utiliza para calcular la diferencia entre dos valores `DATE` o `DATETIME`.

      En este caso, convertimos `birth_date` a años comparándolo con la fecha actual, y luego verificamos si el usuario es mayor de 18 años.

      El ejercicio podría verse así:

      ```sql
      SELECT * FROM users WHERE TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) > 18
      ```

      Más información sobre `TIMESTAMPDIFF()` [aquí](https://www.w3resource.com/mysql/date-and-time-functions/mysql-timestampdiff-function.php)
    </details>
6. Mostrar usuarios cuyo ingreso sea mayor a 5,000,000.
    <details>
      <summary>Haz clic para spoilers</summary>
      
      Siguiendo la misma lógica del ejercicio anterior, podemos usar el símbolo `>` (mayor que).\
      Debemos asegurarnos de que `monthly_income` sea mayor que `5000000`.

      Con esto en mente, aquí está la solución:

      ```sql
      SELECT * FROM users WHERE monthly_income > 5000000	    
      ```
    </details>
7. Mostrar usuarios cuyo nombre comience con "A".
    <details>
      <summary>Veamos…</summary>
      
      Para resolver este ejercicio, debo presentarte un nuevo concepto llamado el operador `LIKE`.\
      El operador `LIKE` se utiliza en una cláusula `WHERE` para buscar un patrón específico en una columna.\
      Para devolver registros que comiencen con una letra o frase específica, se agrega el `%` al final de la letra o frase.

      El ejercicio podría verse así:

      ```sql
      SELECT * FROM users WHERE first_name like 'a%'	    
      ```
      
      Más información sobre el operador `LIKE` [aquí](https://www.w3schools.com/sql/sql_like.asp#gsc.tab=0)
    </details>
8. Mostrar usuarios que no tengan `company`.
    <details>
      <summary>Clic arriesgado</summary>
      
      Para resolver este reto, primero debemos entender que un usuario sin empresa tiene `company = NULL`.

      Para esto, introducimos un nuevo concepto de SQL: el operador `IS`.\
      El operador `IS` se utiliza para comparar un valor con `NULL` o con valores booleanos (`TRUE`, `FALSE`). Es especialmente importante porque `NULL` no se puede comparar usando el operador `=`.

      Con esto en mente, aquí está la solución:

      ```sql
      SELECT * FROM users WHERE company IS NULL    
      ```
      
      Más información sobre el operador `IS` [aquí](https://www.sqlhabit.com/mdn/is)
    </details>


> Aquí ya aprendiste SELECT, WHERE, operadores lógicos y NULL.

---

# Nivel 2 — Combinación de condiciones

9. Usuarios mayores de 25 años que sean `'employee'`.
    <details>
      <summary>Respuesta, por favor</summary>
      
      En este ejercicio introducimos algunos nuevos operadores de SQL. El primero es `AND`.
      
      El operador `AND` es un operador lógico que devuelve `TRUE` solo si **ambas** condiciones son `TRUE`.  
      En este caso, la condición será `TRUE` si el usuario es mayor de 25 años **y** tiene empleo.
      
      Otro concepto importante es el operador `NOT`.  
      El operador `NOT` también es un operador lógico que devuelve `TRUE` cuando una condición **no** se cumple.  
      En este caso, si `company` **no** es `NULL`, la condición devolverá `TRUE`.
      
      Con esto en mente, aquí está la solución:

      ```sql
      SELECT * FROM users WHERE TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) > 25 AND company IS NOT NULL   
      ```
      
      Más información sobre el operador `AND` [aquí](https://www.w3schools.com/sql/sql_and.asp).\
      Más información sobre el operador `NOT` [aquí](https://www.w3schools.com/sql/sql_not.asp).
    </details>
10. Usuarios con `'CC'` que estén activos.
    <details>
      <summary>¿Soy un genio?</summary>
      
      Siguiendo el ejercicio anterior, solo necesitamos verificar que `document_type` = `'CC'` **y** `is_active` = `1`:

      ```sql
      SELECT * FROM users WHERE document_type = 'CC' AND is_active = 1   
      ```
    </details>
11. Usuarios mayores de edad sin empleo.
    <details>
      <summary>¿O no…?</summary>
      
      Este ejercicio es similar al ejercicio 9, pero filtra usuarios mayores de 18 años, que es la mayoría de edad en mi país.

      ```sql
      SELECT * FROM users WHERE TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) > 17 AND company IS NULL  
      ```
    </details>  
12. Usuarios con empleo y con ingresos mayores a 3,000,000.
    <details>
      <summary>Hora de confesar</summary>
      
      Primero, verificamos que el usuario tenga empleo.\
      Esto significa que la columna `company` no debe ser `NULL`.
      
      Luego, filtramos los usuarios cuyo ingreso sea mayor a 3,000,000 usando el operador de comparación `>`.\
      Ambas condiciones deben cumplirse para que el usuario aparezca en el resultado.
      
      Teniendo esto en cuenta, aquí está la solución:

      ```sql
      SELECT * FROM users WHERE company IS NOT NULL AND monthly_income > 3000000  
      ```
    </details>  
13. Usuarios casados con al menos 1 hijo.
    <details>
      <summary>Mostrar la respuesta</summary>
          
      Primero, verificamos el estado civil comparando la columna `marital_status` con el valor `'Casado'`.\
      Luego, nos aseguramos de que el usuario tenga al menos un hijo comprobando que `children_count` sea mayor o igual a `1`.
      
      Ambas condiciones deben cumplirse para que el usuario sea incluido en el resultado.

      ```sql
      SELECT * FROM users WHERE marital_status = 'Casado' AND children_count >= 1  
      ```
    </details>
14. Usuarios entre 30 y 40 años.
    <details>
      <summary>Prueba o dolor</summary>
          
      En este caso, primero verificamos que la edad del usuario sea mayor o igual a 30 y menor o igual a 40.\
      Esto hace que el resultado esté entre los 30 y 40 años.

      ```sql
      SELECT * FROM users WHERE TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) >= 30 AND TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) <= 40 
      ```
    </details>
15. Usuarios `'admin'` verificados mayores de 25 años.
    <details>
      <summary>Júzgame</summary>
            
      Primero debemos asegurarnos de que el rol del usuario sea `admin` y que sea mayor de 25 años.

      ```sql
      SELECT * FROM users WHERE role = 'admin' AND TIMESTAMPDIFF(YEAR, birth_date , CURDATE()) > 25 
      ```
    </details>


> Aquí combinamos múltiples condiciones y lógica booleana.

---

# Nivel 3 — Introducción a análisis (Agregaciones)

16. Contar usuarios por `role`.
17. Contar usuarios por `document_type`.
18. Contar cuántos usuarios están desempleados.
19. Calcular el promedio general de ingresos.
20. Calcular el promedio de ingresos por `role`.

> Ahora ya no estás consultando individuos, estás leyendo patrones.

---

# Nivel 4 — Pensamiento analítico

21. Mostrar profesiones con más de 10 personas.
22. Mostrar la ciudad con más usuarios.
23. Comparar cantidad de menores vs mayores de edad.
24. Promedio de ingresos por ciudad ordenado de mayor a menor.
25. Mostrar las 5 personas con mayor ingreso.

> Aquí ya estás usando GROUP BY, ORDER BY, LIMIT y HAVING.

---

# Nivel 5 — Nivel Ingeniero

26. Clasificar usuarios como:
    - "Menor"
    - "Adulto"
    - "Adulto mayor"

27. Mostrar cuántos usuarios hay en cada clasificación anterior.
28. Ranking de ingresos por ciudad.
29. Profesión con mayor ingreso promedio.
30. Mostrar usuarios cuyo ingreso esté por encima del promedio general.
