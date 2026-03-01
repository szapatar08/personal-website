---
id: db-express-activity
title: Actividad DB Express - Subiendo de Nivel
description: En este ejercicio combinamos Express y SQL haciendo consultas.
---
# Actividad DB Express - Subiendo de Nivel
> Esta actividad fue realizada por [Robinson Andres Cortes](https://github.com/andrescortesdev/)\
Todo el código de este ejercicio se encuentra en este repositorio de GitHub: [db-express-activity](https://github.com/szapatar08/db-express-activity)

En este ejercicio vamos a trabajar con código de la vida real, creando una API con **NodeJS** y **Express**, conectando **NodeJS** con **MySQL**, y realizando peticiones HTTP mediante Postman.

## Nivel 1: Consultas Básicas y Relaciones Directas (2 Tablas)

1. Listar el nombre de un usuario (cualquiera que elijas), su correo electrónico y el código de orden (`order_number`) de todos los pedidos que ha realizado.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const name_email_orderNumber = (req, res) => {
      const { id } = req.body;
      queries(
        res,
        `
        SELECT name, email, o.order_number
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        WHERE u.id = ${id};`,
      );
    };
    ```
</details>

2. Obtener todos los pedidos (código y fecha) realizados por un usuario con un correo electrónico específico (ej: isamel@pedrito.es).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const email_code_date = (req, res) => {
      const { email } = req.body;
      queries(
        res,
        `
        SELECT u.name as user, o.id as order_id, o.order_date
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        WHERE u.email = '${email}'`,
      );
    };
    ```
</details>

3. Mostrar el nombre de cada producto junto con el nombre de la categoría a la que pertenece.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const product_category = (req, res) => {
      const { name } = req.body;
      queries(
        res,
        `
        SELECT products.name as product, categories.name as category
        FROM products
        INNER JOIN categories
        ON products.category_id = categories.id
        WHERE products.name = '${name}'
        `,
      );
    };
    ```
</details>

4. Obtener una lista de los usuarios que se han registrado en el sistema pero que nunca han realizado una compra.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const users_without_purchase = (req, res) => {
      queries(
        res,
        `
        SELECT u.id, u.name
        FROM users u
        LEFT JOIN orders o
        ON u.id = o.user_id
        WHERE o.id is null
        `,
      );
    };
    ```
</details>

5. Calcular el monto total gastado por un usuario (uno que tú elijas) durante toda su historia, mostrando el nombre del usuario y el total.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const total_user = (req, res) => {
      const { id } = req.body;
      queries(
        res,
        `
        SELECT u.name, sum(o.total) as total
        FROM users u
        LEFT JOIN orders o
        ON u.id = o.user_id
        WHERE u.id = ${id}
        `,
      );
    };
    ```
</details>

6. Contar cuántos pedidos existen actualmente, clasificados por cada estado.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const orders_status = (req, res) => {
      queries(
        res,
        `SELECT o.status, COUNT(o.id)
        FROM orders o
        GROUP BY status`,
      );
    };
    ```
</details>

7. Listar todos los productos de la categoría Electrónica ordenados por precio de venta, del más caro al más barato.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const electronica_category = (req, res) => {
      const { category } = req.body;
      queries(
        res,
        `
        SELECT p.name AS product_name, p.purchase_price, c.name AS category_name
        FROM products p
        INNER JOIN categories c
        ON p.category_id = c.id
        WHERE c.name = '${category}'
        ORDER BY p.purchase_price DESC
        `,
      );
    };
    ```
</details>

8. Dado un número de orden específico, mostrar los IDs de los productos y la cantidad comprada de cada uno en esa orden.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const order_products_quantity = (req, res) => {
      const { id } = req.body;
      queries(
        res,
        `
        SELECT p.id, op.quantity
        FROM order_product op
        INNER JOIN products p
        ON op.product_id = p.id
        WHERE op.order_id = ${id}
        `,
      );
    };
    ```
</details>

9. Listar los nombres de los usuarios de una ciudad específica (ej: Monterrey) que tengan al menos un pedido registrado.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const users_city_order = (req, res) => {
      const { city } = req.body;
      queries(
        res,
        `
        SELECT u.name, u.city
        FROM users u
        LEFT JOIN orders o
        ON u.id = o.user_id
        WHERE o.id IS NOT NULL AND u.city = '${city}'
        `,
      );
    };
    ```
</details>

10. Calcular el valor promedio de los pedidos realizados por cada usuario.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const users_avg_order = (req, res) => {
      queries(
        res,
        `SELECT u.name, AVG(o.total) as average
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        GROUP BY u.id`,
      );
    };
    ```
</details>

---

## Nivel 2: Consultas Intermedias (3 Tablas)

1. Generar un recibo detallado que muestre:
   - Código de orden  
   - Fecha  
   - Nombre del producto comprado  
   - Precio al que se vendió  
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const receipt_user = (req, res) => {
      const { id } = req.body;
      queries(
        res,
        `
        SELECT o.order_number, o.order_date, p.id, op.price_at_purchase
        FROM orders o
        INNER JOIN order_product op
        ON o.id = op.order_id
        INNER JOIN products p
        ON op.product_id = p.id
        WHERE o.user_id = ${id}
        `,
      );
    };
    ```
</details>

2. Calcular el ingreso total generado por cada categoría de productos.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const categories_total = (req, res) => {
      queries(
        res,
        `
        SELECT c.name, SUM(op.price_at_purchase*op.quantity) as total
        FROM categories c
        INNER JOIN products p
        ON c.id = p.category_id
        INNER JOIN order_product op
        ON p.id = op.product_id
        GROUP BY c.name
        `,
      );
    };
    ```
</details>

3. Listar los nombres únicos de todos los productos que ha comprado un cliente específico (buscar por nombre del cliente).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const products_user_name = (req, res) => {
      const { name } = req.body;
      queries(
        res,
        `
        SELECT o.user_id, u.name AS user_name, p.name AS product_name
        FROM products p
        INNER JOIN order_product op
        ON p.id = op.product_id
        INNER JOIN orders o
        ON op.order_id = o.id
        INNER JOIN users u
        ON o.user_id = u.id
        WHERE u.name = '${name}'
        `,
      );
    };
    ```
</details>

4. Identificar los 5 productos más vendidos históricamente (basado en la cantidad total de unidades).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const product_ranking = (req, res) => {
      queries(
        res,
        `
        SELECT p.name AS product_name, SUM(op.quantity) AS quantity
        FROM products p
        INNER JOIN order_product op
        ON p.id = op.product_id
        GROUP BY product_name
        ORDER BY quantity DESC
        LIMIT 5
        `,
      );
    };
    ```
</details>

5. Obtener la fecha de la última vez que se vendió cada producto, mostrando el nombre del producto y la fecha.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const product_last_purchase = (req, res) => {
      queries(
        res,
        `
        SELECT p.name AS product_name, MAX(o.order_date) AS last_order_date
        FROM products p
        INNER JOIN order_product op
        ON p.id = op.product_id
        INNER JOIN orders o
        ON op.order_id = o.id
        GROUP BY p.id
        `,
      );
    };
    ```
</details>

6. Listar los nombres de los usuarios que han comprado al menos un producto que contenga la palabra *Gamer* en su nombre.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const users_product = (req, res) => {
      const { product } = req.body;
      queries(
        res,
        `
        SELECT u.name, p.name AS product_name
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        INNER JOIN order_product op
        ON o.id = op.order_id
        INNER JOIN products p
        ON op.product_id = p.id
        WHERE p.name like '%${product}%'
        `,
      );
    };
    ```
</details>

7. Calcular los ingresos totales de la tienda agrupados por día.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const day_orders = (req, res) => {
      queries(
        res,
        `
        SELECT DATE(o.order_date) AS date_order, SUM(o.total) AS total
        FROM orders o
        GROUP BY date_order
        `,
      );
    };
    ```
</details>

8. Identificar las categorías que tienen productos registrados pero que nunca han generado una venta.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const categories_without_orders = (req, res) => {
      queries(
        res,
        `
        SELECT c.name AS category_name, COUNT(p.name) AS product_count
        FROM categories c
        INNER JOIN products p
        ON c.id = p.category_id
        LEFT JOIN order_product op
        ON p.id = op.product_id
        WHERE op.id IS NULL
        GROUP BY c.name
        `,
      );
    };
    ```
</details>

9. Mostrar el ticket promedio de compra (gasto promedio por orden) de cada usuario.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const average_waste_per_user = (req, res) => {
      queries(
        res,
        `
        SELECT u.name, AVG(o.total) AS average_waste
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        GROUP BY u.id
        `,
      );
    };
    ```
</details>

10. Listar los nombres de los productos que formaban parte de órdenes que terminaron siendo canceladas.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const products_cancelled_orders = (req, res) => {
      queries(
        res,
        `SELECT p.name AS product_name, o.order_number, o.status
        FROM products p
        INNER JOIN order_product op
        ON p.id = op.product_id
        INNER JOIN orders o
        ON op.order_id = o.id
        WHERE o.status = 'cancelled'`,
      );
    };
    ```
</details>

---

## Nivel 3: Consultas Complejas y Reportes (4+ Tablas)

1. **Reporte Global**  
   Mostrar una tabla con:
   - Nombre del Usuario  
   - Ciudad  
   - Número de Orden  
   - Nombre del Producto  
   - Categoría  
   - Cantidad  
   - Subtotal del ítem  
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const global_report = (req, res) => {
      const { id } = req.body;
      queries(
        res,
        `
        SELECT u.name AS user_name, u.city, o.id AS order_number, p.name AS product_name, c.name AS category, op.quantity, op.quantity * op.price_at_purchase AS product_subtotal
        FROM products p
        INNER JOIN categories c
        ON p.category_id = c.id
        INNER JOIN order_product op
        ON p.id = op.product_id
        INNER JOIN orders o
        ON op.order_id = o.id
        INNER JOIN users u
        ON o.user_id = u.id
        WHERE p.id = ${id}
        `,
      );
    };
    ```
</details>

2. Calcular cuánto dinero han generado las ventas de la categoría *Ropa* exclusivamente en una ciudad específica.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const categories_sales_city = (req, res) => {
      const { city, category } = req.body;
      queries(
        res,
        `
        SELECT u.city, c.name, op.quantity * op.price_at_purchase AS total_sales
        FROM categories c
        INNER JOIN products p
        ON c.id = p.category_id
        INNER JOIN order_product op
        ON p.id = op.product_id
        INNER JOIN orders o
        ON op.order_id = o.id
        INNER JOIN users u
        ON o.user_id = u.id
        WHERE u.city = '${city}' AND c.name = '${category}'
        `,
      );
    };
    ```
</details>

3. Identificar al *Cliente del Año*:  
   El usuario que ha gastado más dinero en total dentro de la plataforma.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const client_year = (req, res) => {
      const { year } = req.body;
      queries(
        res,
        `
        SELECT u.name, YEAR(o.order_date) AS year_, SUM(o.total) AS total_year
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        WHERE YEAR(o.order_date) = ${year}
        GROUP BY u.id, YEAR(o.order_date)
        ORDER BY total_year DESC
        LIMIT 1
        `,
      );
    };
    ```
</details>

4. Listar los productos que no han tenido ninguna venta registrada.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const products_without_order = (req, res) => {
      queries(
        res,
        `
        SELECT p.name AS product_name
        FROM products p
        LEFT JOIN order_product op
        ON p.id = op.product_id
        WHERE op.product_id IS NULL
        GROUP BY p.id
        `,
      );
    };
    ```
</details>

5. Calcular la ganancia real de la empresa:  
   (Precio de venta histórico en la orden − Costo de compra del producto).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const total_profit = (req, res) => {
      queries(
        res,
        `
        SELECT "Total:" AS title, SUM(op.price_at_purchase - p.purchase_price) AS total
        FROM order_product op
        INNER JOIN products p
        ON op.product_id = p.id
        `,
      );
    };
    ```
</details>

6. Mostrar los usuarios que han comprado productos de la categoría *Videojuegos* pero no han comprado productos de *Hogar*.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const user_withcategory_withoutanother = (req, res) => {
      const { category, no_category } = req.body;
      queries(
        res,
        `
        SELECT u.id, u.name
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        INNER JOIN order_product op
        ON o.id = op.order_id
        INNER JOIN products p
        ON op.product_id = p.id
        INNER JOIN categories c
        ON p.category_id = c.id
        WHERE c.name = '${category}' AND c.name != '${no_category}'
        GROUP BY u.id`,
      );
    };
    ```
</details>

7. Generar un ranking de las 3 ciudades que más ingresos han generado a la tienda.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const ranking_cities = (req, res) => {
      queries(
        res,
        `
        SELECT u.city, SUM(o.total) AS total
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        GROUP BY u.city
        ORDER BY total DESC
        LIMIT 5
        `,
      );
    };
    ```
</details>

8. Encontrar la orden que contiene la mayor variedad de productos distintos (mayor cantidad de ítems únicos).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const order_products_ranking = (req, res) => {
      queries(
        res,
        `
        SELECT o.order_number, COUNT(op.product_id) AS total_products
        FROM orders o
        INNER JOIN order_product op
        ON o.id = op.order_id
        GROUP BY o.id
        ORDER BY total_products DESC
        `,
      );
    };
    ```
</details>

9. Listar los productos que se vendieron en el pasado a un precio menor que su precio de venta actual en el catálogo.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const product_less_price_before = (req, res) => {
      queries(
        res,
        `
        SELECT p.id, p.name
        FROM products p
        INNER JOIN order_product op
        ON p.id = op.product_id
        WHERE op.price_at_purchase < p.sale_price
        GROUP BY p.id
        `,
      );
    };
    ```
</details>

10. Mostrar el historial de compras de un producto específico:
    - Quién lo compró  
    - Cuándo  
    - A qué precio  
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const complete_historial_product = (req, res) => {
      const { id } = req.body;
      queries(
        res,
        `
        SELECT p.id AS product_id, p.name AS product_name, u.name AS user_name, o.order_date, op.price_at_purchase
        FROM products p
        INNER JOIN order_product op
        ON p.id = op.product_id
        INNER JOIN orders o
        ON op.order_id = o.id
        INNER JOIN users u
        ON o.user_id = u.id
        WHERE p.id = ${id}
        ORDER BY o.order_date DESC
        `,
      );
    };
    ```
</details>

---

## Nivel 4: Lógica de Negocio y Analítica Avanzada

1. Listar a los usuarios cuyo gasto total acumulado es superior al promedio de gasto de todos los clientes de la tienda.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const users_total_more_avg = (req, res) => {
      queries(
        res,
        `
        SELECT u.id, u.name, SUM(o.total) AS total_waste
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        GROUP BY u.id
        HAVING total_waste > (SELECT AVG(orders.total) FROM orders)
        `,
      );
    };
    ```
</details>

2. Identificar los *Productos Estrella*:  
   Aquellos que representan individualmente más del 2% del total de ingresos de la empresa.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const bestsellers_over_2_total = (req, res) => {
      queries(
        res,
        `
        SELECT p.id, p.name, SUM(op.price_at_purchase) AS total_per_product
        FROM products p
        INNER JOIN order_product op
        ON p.id = op.product_id
        GROUP BY p.id
        HAVING total_per_product > (SELECT SUM(orders.total)* 0.02 FROM orders)
        `,
      );
    };
    ```
</details>


3. **Churn Rate**  
   Listar los usuarios que hicieron compras en el pasado, pero que no han realizado ningún pedido en los últimos 6 meses.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const purchase_6_months = (req, res) => {
      queries(
        res,
        `
        SELECT u.id, u.name, MAX(o.order_date) AS last_order_date
        FROM users u
        LEFT JOIN orders o
        ON u.id = o.user_id
        GROUP BY u.id
        HAVING last_order_date IS NOT NULL AND last_order_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
        `,
      );
    };
    ```
</details>

4. Clasificar a los clientes en tres niveles según su gasto total:
   - VIP → gasto > 5000  
   - Frecuente → entre 1000 y 5000  
   - Regular → < 1000  
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const clasify_by_level = (req, res) => {
      queries(
        res,
        `
        SELECT u.id, u.name,
            CASE
            	WHEN SUM(o.total) >= 5000 THEN 'VIP'
                WHEN SUM(o.total) < 5000 AND SUM(o.total) >= 1000 THEN 'Frecuent'
                WHEN SUM(o.total) < 1000 THEN 'Regular'
            END AS clasify
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        GROUP BY u.id
        `,
      );
    };
    ```
</details>

5. Determinar cuál ha sido el mes (y año) con mayor facturación en la historia de la tienda.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const best_month_year = (req, res) => {
      queries(
        res,
        `
        SELECT DATE_FORMAT(o.order_date, '%M %Y') AS month_year, SUM(o.total) AS total
        FROM orders o
        GROUP BY month_year
        ORDER BY total DESC
        LIMIT 1
        `,
      );
    };
    ```
</details>

6. **Alerta de Inventario**  
   Listar las órdenes pendientes que incluyen productos cuyo stock actual es menor a 5 unidades.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const pending_low_stock = (req, res) => {
      queries(
        res,
        `
        SELECT o.order_number, o.status, p.id AS product_id, p.stock
        FROM orders o
        INNER JOIN order_product op
        ON o.id = op.order_id
        INNER JOIN products p
        ON op.product_id = p.id
        WHERE p.stock < 6 AND o.status = 'pending'
        `,
      );
    };
    ```
</details>

7. Calcular qué porcentaje de las ventas totales representa cada categoría  
   (ej: Electrónica 40%, Ropa 20%, etc.).
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const porcentages_total_sales = (req, res) => {
      queries(
        res,
        `
        SELECT c.name,
        ROUND((COUNT(op.id)/(SELECT COUNT(order_product.id) FROM order_product))*100, 0) AS porcentage
        FROM categories c
        INNER JOIN products p
        ON c.id = p.category_id
        INNER JOIN order_product op
        ON p.id = op.product_id
        GROUP BY c.id
        `,
      );
    };
    ```
</details>

8. Comparar las ventas totales de cada ciudad contra el promedio de ventas de todas las ciudades.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const city_sales_porcentages = (req, res) => {
      queries(
        res,
        `
        SELECT u.city,
        ROUND((COUNT(o.id)/(SELECT COUNT(orders.id) FROM orders))*100, 2) AS porcentage
        FROM users u
        INNER JOIN orders o
        ON u.id = o.user_id
        GROUP BY u.city
        `,
      );
    };
    ```
</details>

9. Calcular la tasa de cancelación:  
   Porcentaje de órdenes con estado *cancelled* respecto al total de órdenes por mes.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const cancelled_percentage = (req, res) => {
      queries(
        res,
        `
        SELECT o.status,
        ROUND((COUNT(o.id)/(SELECT COUNT(orders.id) FROM orders))*100,2) AS porcentage
        FROM orders o
        GROUP BY o.status
        HAVING o.status = 'cancelled'
        `,
      );
    };
    ```
</details>

10. **Análisis de Canasta**  
    Identificar qué pares de productos se venden juntos con mayor frecuencia en la misma orden.
<details>
    <summary>Comprueba si estoy en lo correcto</summary>
    
    ```js
    const two_products_sell_together = (req, res) => {
      queries(
        res,
        `
        SELECT p.name AS product_1, p2.name AS product_2, COUNT(*) AS frequency
        FROM order_product op
        JOIN order_product op2
            ON op.order_id = op2.order_id
            AND op.product_id < op2.product_id
        JOIN products p
            ON p.id = op.product_id
        JOIN products p2
            ON p2.id = op2.product_id
        GROUP BY
            p.name,
            p2.name
        ORDER BY
            frequency DESC;
        `,
      );
    };
    ```
</details>
