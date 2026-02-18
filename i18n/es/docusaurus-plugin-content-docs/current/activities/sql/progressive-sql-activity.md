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
    <details>
      <summary>Chequeo de realidad</summary>
            
      Para comenzar esta sección, necesitamos introducir algunos conceptos nuevos que nos ayudarán a resolver este reto.
      
      El primer concepto es la función `COUNT()`.  
      La función `COUNT()` se utiliza para contar el número de filas que coinciden con una condición específica.
      
      El segundo concepto es la sentencia `GROUP BY`.  
      Esta agrupa filas que tienen los mismos valores en filas de resumen.
      
      El último concepto es la palabra clave `AS`, que se utiliza para renombrar una columna o tabla usando un alias.
      
      Suficiente teoría — pongamos las manos en el teclado.
      
      Primero, necesitamos hacer un `SELECT` de los datos que queremos analizar. En este caso, seleccionamos la columna `role` y el número de veces que aparece cada rol usando `COUNT(role)`.  
      En lugar de mostrar el nombre de columna por defecto `COUNT(role)`, usamos la palabra clave `AS` para darle un alias más legible.
      
      Luego, especificamos la tabla donde están almacenados los datos y finalmente usamos `GROUP BY` para agrupar los resultados por rol.

      ```sql
      SELECT role, COUNT(role) AS Counting FROM users GROUP BY role 
      ```

      Más información sobre la función `COUNT()` [aquí](https://www.w3schools.com/sql/sql_count.asp).\
      Más información sobre la sentencia `GROUP BY` [aquí](https://www.w3schools.com/sql/sql_groupby.asp#gsc.tab=0).\
      Más información sobre la palabra clave `AS` [aquí](https://www.w3schools.com/sql/sql_ref_as.asp).
    </details>
17. Contar usuarios por `document_type`.
    <details>
      <summary>No te rías</summary>
            
      Este ejercicio es muy similar al anterior. En este caso, usamos `document_type` como el campo de agrupación.

      ```sql
      SELECT document_type, COUNT(document_type) AS Counting FROM users GROUP BY document_type 
      ```
    </details>
18. Contar cuántos usuarios están desempleados.
    <details>
      <summary>Sé amable</summary>
            
      En este caso tomamos `'Unemployed'` como un valor fijo y usamos `COUNT(*)` para contar todos los usuarios en la tabla `users`.\
      Luego filtramos solo los usuarios `WHERE company IS NULL`, lo que significa que están desempleados.

      ```sql
      SELECT 'Unemployed', COUNT(*) AS Counting FROM users WHERE company IS NULL 
      ```
    </details>
19. Calcular el promedio general de ingresos.
    <details>
      <summary>Haz clic con cuidado</summary>
            
      Para este ejercicio, necesitamos introducir un par de conceptos nuevos de SQL.
      
      El primero es la función `AVG()`.  
      La función `AVG()` devuelve el valor promedio de una columna numérica.
      
      El segundo y último concepto de esta sección es la función `ROUND()`.  
      La función `ROUND()` redondea un número a una cantidad específica de decimales.
      
      En este caso, queremos calcular el ingreso mensual promedio de todos los usuarios.  
      Usamos la función `AVG()` para obtener el promedio y la función `ROUND()` para redondear el resultado a **0 decimales**.
      
      Este es el resultado final:

      ```sql
      SELECT 'Average Income', ROUND(AVG(monthly_income ), 0) FROM users
      ```

      Más información sobre la función `AVG()` [aquí](https://www.w3schools.com/sql/sql_avg.asp).\
      Más información sobre la función `ROUND()` [aquí](https://www.w3schools.com/sql/func_sqlserver_round.asp).
    </details>
20. Calcular el promedio de ingresos por `role`.
    <details>
      <summary>La gran revelación</summary>
            
      Este ejercicio es muy similar al anterior, pero en este caso agrupamos los resultados usando `GROUP BY role`.

      ```sql
      SELECT role, ROUND(AVG(monthly_income ), 0) AS average_income FROM users GROUP BY role
      ```
    </details>


> Ahora ya no estás consultando individuos, estás leyendo patrones.

---

# Nivel 4 — Pensamiento analítico

21. Mostrar profesiones con más de 10 personas.
    <details>
      <summary>¿Estuve cerca?</summary>

      En este ejercicio reunimos varios conceptos. Primero, introducimos un nuevo tema de SQL llamado `HAVING`.
      
      La cláusula `HAVING` funciona de manera similar a `WHERE`, pero con una diferencia importante:  
      la cláusula `WHERE` no puede usarse con funciones de agregación, mientras que `HAVING` sí.
      
      Nuestro objetivo es mostrar todas las profesiones de los usuarios, contar cuántos usuarios pertenecen a cada profesión, asignar un alias a ese conteo, agrupar los resultados por profesión y finalmente filtrar aquellas profesiones que tengan **más de 10 usuarios**.
      
      Con esto en mente, aquí está la solución:

      ```sql
      SELECT profession, COUNT(*) AS profession_count FROM users GROUP BY profession HAVING profession_count > 10
      ```

      Más información sobre `HAVING` [aquí](https://www.w3schools.com/sql/sql_having.asp).
    </details>
22. Mostrar la ciudad con más usuarios.
      <details>
        <summary>Respuesta desbloqueada</summary>
        
        En esta sección empieza lo divertido, porque ahora debemos usar algunos conceptos que son realmente útiles en el campo.
  
        El primer concepto que veremos se llama la palabra clave `ORDER BY`. Esta palabra clave se utiliza para ordenar los elementos de una forma específica, ya sea ascendente (`ASC`) o descendente (`DESC`); en este caso vamos a usar `DESC`.
  
        Otra herramienta importante es `LIMIT`. Esta cláusula limita los resultados a la cantidad que especifiquemos; en este caso solo necesitamos el primer resultado.
  
        Teniendo todo esto en cuenta, esta es la solución:
  
        ```sql
        SELECT city, COUNT(*) AS city_count FROM users GROUP BY city ORDER BY city_count DESC LIMIT 1
        ```
  
        Más información sobre la palabra clave `ORDER BY` [aquí](https://www.w3schools.com/sql/sql_orderby.asp).\
        Más información sobre `LIMIT` [aquí](https://www.w3schools.com/mysql/mysql_limit.asp).
      </details>
23. Comparar la cantidad de menores vs mayores de edad.
    <details>
      <summary>Sin trampas</summary>

      Es momento de presentarles un nuevo concepto increíble: la función `SUM()`.\
      La función `SUM()` devuelve la suma de una columna numérica. Si dentro de la función hay una expresión booleana y esta devuelve `TRUE`, entonces suma `1`.\
      Si devuelve `FALSE`, entonces suma `0`.

      En este caso se vería así:
  
      ```sql
      SELECT
          SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) > 17) AS adults,
          SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 18) AS minors
      FROM users
      ```

      Más información sobre la función `SUM()` [aquí](https://www.w3schools.com/sql/sql_sum.asp).
    </details>
24. Promedio de ingresos por ciudad, ordenado de mayor a menor.
    <details>
      <summary>Vamos a descubrirlo</summary>

      Otro excelente ejercicio para practicar múltiples conceptos de SQL al mismo tiempo.
      
      En este ejercicio, primero calculamos el promedio de `monthly_income` para cada ciudad.  
      Luego, redondeamos ese valor y le asignamos un alias.  
      Después, agrupamos los resultados por ciudad y finalmente los ordenamos por `monthly_income` de forma descendente.
      
      Con todo esto en mente, aquí está la solución:

      ```sql
      SELECT city, ROUND(AVG(monthly_income )) AS income_city FROM users GROUP BY city ORDER BY income_city DESC
      ```
    </details>
25. Mostrar las 5 personas con mayor ingreso.
    <details>
      <summary>Redoble de tambores…</summary>

      Si has completado los ejercicios anteriores en orden, este debería ser extremadamente fácil.
      
      Primero, seleccionamos las columnas `first_name` y `monthly_income`.  
      Luego, ordenamos los resultados por `monthly_income` de forma descendente y limitamos la salida a los primeros 5 registros.
      
      Con eso en mente, aquí está la solución:

      ```sql
      SELECT first_name, monthly_income FROM `users` ORDER BY monthly_income DESC LIMIT 5
      ```
    </details>


> Aquí ya estás usando GROUP BY, ORDER BY, LIMIT y HAVING.

---

# Nivel 5 — Nivel Ingeniero

26. Clasificar usuarios como "Menor", "Adulto" o "Adulto mayor".
    <details>
      <summary>Los dioses de las matemáticas deciden</summary>

      Ahora es momento de explorar una nueva condición llamada la expresión `CASE`.

      La expresión `CASE` evalúa condiciones y devuelve un valor cuando se cumple la primera condición (similar a una estructura if-then-else). Una vez que una condición es verdadera, deja de evaluarse y retorna el resultado. Si ninguna condición se cumple, devuelve el valor definido en la cláusula `ELSE`.
      
      Si no existe una parte `ELSE` y ninguna condición se cumple, el resultado será `NULL`.

      Con esto en mente, continuemos:

      ```sql
      SELECT first_name, 
             CASE 
                 WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 18 THEN 'Minor'
                 WHEN TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) >= 18 AND TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 65 THEN 'Adult'
                 ELSE 'Senior'
             END AS age_group
      FROM users
      ```
      Más información sobre la expresión `CASE` [aquí](https://www.w3schools.com/sql/sql_case.asp).
    </details>
27. Mostrar cuántos usuarios hay en cada una de las clasificaciones anteriores.
    <details>
      <summary>La verdad duele</summary>

      Vamos a agrupar varios conceptos para resolver este ejercicio.

      Primero, necesitamos calcular el número total de usuarios que caen dentro de un rango de edad específico: `'Minor'`, `'Adult'` o `'Senior'`.
      
      Si un usuario coincide con una categoría determinada, sumamos `1` a ese grupo usando la función `SUM()`, y luego mostramos los totales finales para cada categoría.

      ```sql
      SELECT 
             SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 18) AS 'Minor',
             SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) >= 18 AND TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) < 65) AS 'Adult',
             SUM(TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) >= 65) AS 'Senior'
      FROM users
      ```
    </details>
28. Ranking de ingresos por ciudad.
    <details>
      <summary>Verifica mi genialidad</summary>

      En este caso debemos hacer un `SUM` del `monthly_income` de la tabla `users` y agrupar el resultado usando `GROUP BY city`.\
      Luego ordenamos con `ORDER BY income` en orden descendente para crear el ranking.

      Este es el resultado:

      ```sql
      SELECT city, SUM(monthly_income) AS income FROM users GROUP BY city ORDER BY income DESC
      ```
    </details>
29. Profesión con mayor ingreso promedio.
    <details>
      <summary>Modo esperanza ACTIVADO</summary>

      Manos a la obra.

      Primero debemos calcular el `AVG` del `monthly_income` de todos los usuarios y agrupar el resultado por `profession`.\
      Luego ordenamos con `ORDER BY income` en orden descendente.\
      Finalmente, limitamos el resultado a `1` para obtener el ingreso promedio más alto:

      ```sql
      SELECT profession,
          ROUND(AVG(monthly_income),0) AS income
      FROM users
      GROUP BY profession
      ORDER BY income DESC
      LIMIT 1
      ```
    </details>
30. Mostrar usuarios cuyo ingreso esté por encima del promedio general.
    <details>
      <summary>¿Respuesta final?</summary>

      Y llegamos al último ejercicio. Me imagino que ya puedes estar cansado, pero no hay problema, vamos a terminarlo.

      Primero necesitamos obtener la información necesaria. En este caso, requerimos `first_name` y `monthly_income` de los usuarios `WHERE` su ingreso sea mayor que el `AVG` del `monthly_income`.

      Con eso, terminamos con:

      ```sql
      SELECT first_name, monthly_income AS income 
      FROM users 
      WHERE income > (SELECT AVG(monthly_income) FROM users)
      ```
    </details>
