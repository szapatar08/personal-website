---
id: progressive-sql-activity
title: Actividad Progresiva SQL — Subiendo de Nivel
description: Desafío de SQL diseñado para fortalecer tus habilidades en bases de datos, guiándote desde consultas básicas hasta conceptos más avanzados mediante ejercicios prácticos y aplicados.
---
# Actividad Progresiva SQL — Subiendo de Nivel
> Esta actividad fue creada por [Robinson Andres Cortes](https://github.com/andrescortesdev/)

En esta actividad explorarás consultas SQL a través de un conjunto de ejercicios de investigación. Intenta completar la actividad usando únicamente [W3Schools](https://www.w3schools.com/) como referencia.

Copia y pega el [código proporcionado](../../assets/progressive-sql-activity/script) en tu DBMS de SQL preferido. Aunque los ejercicios funcionan con cualquier motor SQL, la solución de ejemplo utiliza MySQL.

> No repetimos consultas que hagan exactamente lo mismo.\
Cada paso añade una capa nueva de razonamiento.

> Cuando alguien termina el Nivel 5 sin copiar, ya no está aprendiendo SQL.\
Está aprendiendo a pensar en datos.

---

# Nivel 1 — Fundamentos (Exploración básica)

1. Listar todos los usuarios.
2. Mostrar solo `first_name`, `last_name`, `email`.
3. Filtrar usuarios cuyo `role` sea `'admin'`.
4. Filtrar usuarios con `document_type = 'CC'`.
5. Mostrar usuarios mayores de 18 años (calcular edad desde `birth_date`).
6. Mostrar usuarios cuyo ingreso sea mayor a 5,000,000.
7. Mostrar usuarios cuyo nombre empiece por "A".
8. Mostrar usuarios que no tengan `company`.

> Aquí ya aprendiste SELECT, WHERE, operadores lógicos y NULL.

---

# Nivel 2 — Combinación de condiciones

9. Usuarios mayores de 25 años que sean `'employee'`.
10. Usuarios con `'CC'` que estén activos.
11. Usuarios mayores de edad sin empleo.
12. Usuarios con empleo y con ingresos mayores a 3,000,000.
13. Usuarios casados con al menos 1 hijo.
14. Usuarios entre 30 y 40 años.
15. Usuarios `'admin'` verificados mayores de 25 años.

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
