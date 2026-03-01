---
id: db-express-activity
title: DB express activity - Leveling Up
description: In this exercise we combine Express and SQL to make real life queries.
---
# DB express activity - Leveling Up
> This activity was made by [Robinson Andres Cortes](https://github.com/andrescortesdev/)\
All the code of this exercise in this GitHub repo: [db-express-activity](https://github.com/szapatar08/db-express-activity)

In this exercise we are going to put our hands in real life code, making a API with **NodeJS** and **Express**, connecting **NodeJS** with **MySQL**, and making HTTP requests via Postman.

## Level 1: Basic Queries and Direct Relationships (2 Tables)

1. List the name of a user (any one you choose), their email address, and the order code (`order_number`) of all the orders they have placed.
<details>
    <summary>Check if I’m right</summary>
    
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

2. Get all orders (code and date) placed by a user with a specific email address (e.g., isamel@pedrito.es).
<details>
    <summary>Check if I’m right</summary>
    
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

3. Show the name of each product along with the name of the category it belongs to.
<details>
    <summary>Check if I’m right</summary>
    
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

4. Get a list of users who have registered in the system but have never made a purchase.
<details>
    <summary>Check if I’m right</summary>
    
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

5. Calculate the total amount spent by a user (one of your choice) throughout their entire history, showing the user’s name and the total.
<details>
    <summary>Check if I’m right</summary>
    
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

6. Count how many orders currently exist, classified by each status.
<details>
    <summary>Check if I’m right</summary>
    
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

7. List all products in the Electronics category ordered by sale price, from most expensive to cheapest.
<details>
    <summary>Check if I’m right</summary>
    
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

8. Given a specific order number, show the product IDs and the quantity purchased of each product in that order.
<details>
    <summary>Check if I’m right</summary>
    
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

9. List the names of users from a specific city (e.g., Monterrey) who have at least one registered order.
<details>
    <summary>Check if I’m right</summary>
    
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

10. Calculate the average value of the orders placed by each user.
<details>
    <summary>Check if I’m right</summary>
    
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

## Level 2: Intermediate Queries (3 Tables)

1. Generate a detailed receipt showing:
  - Order code  
  - Date  
  - Name of the purchased product  
  - Price at which it was sold  
<details>
    <summary>Check if I’m right</summary>
    
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

2. Calculate the total revenue generated by each product category.
<details>
    <summary>Check if I’m right</summary>
    
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

3. List the unique names of all products purchased by a specific customer (search by customer name).
<details>
    <summary>Check if I’m right</summary>
    
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

4. Identify the 5 best-selling products historically (based on total units sold).
<details>
    <summary>Check if I’m right</summary>
    
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

5. Get the date of the last time each product was sold, showing the product name and the date.
<details>
    <summary>Check if I’m right</summary>
    
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

6. List the names of users who have purchased at least one product that contains the word *Gamer* in its name.
<details>
    <summary>Check if I’m right</summary>
    
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

7. Calculate the total store revenue grouped by day.
<details>
    <summary>Check if I’m right</summary>
    
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

8. Identify categories that have registered products but have never generated a sale.
<details>
    <summary>Check if I’m right</summary>
    
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

9. Show the average ticket value (average spend per order) for each user.
<details>
    <summary>Check if I’m right</summary>
    
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

10. List the names of products that were part of orders that ended up being canceled.
<details>
    <summary>Check if I’m right</summary>
    
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

## Level 3: Complex Queries and Reports (4+ Tables)

1. Global Report Show a table with:
  - User Name  
  - City  
  - Order Number  
  - Product Name  
  - Category  
  - Quantity  
  - Item Subtotal  
<details>
    <summary>Check if I’m right</summary>
    
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

2. Calculate how much money has been generated by sales of the *Clothing* category exclusively in a specific city.
<details>
    <summary>Check if I’m right</summary>
    
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

3. Identify the *Customer of the Year*:\
  The user who has spent the most money in total on the platform.
<details>
    <summary>Check if I’m right</summary>
    
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

4. List products that have not had any recorded sales.
<details>
    <summary>Check if I’m right</summary>
    
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

5. Calculate the company’s real profit:\
  (Historical sale price in the order − Product purchase cost).
<details>
    <summary>Check if I’m right</summary>
    
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

6. Show users who have purchased products from the *Video Games* category but have not purchased products from *Home*.
<details>
    <summary>Check if I’m right</summary>
    
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

7. Generate a ranking of the top 3 cities that have generated the most revenue for the store.
<details>
    <summary>Check if I’m right</summary>
    
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

8. Find the order that contains the greatest variety of different products (highest number of unique items).
<details>
    <summary>Check if I’m right</summary>
    
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

9. List products that were sold in the past at a lower price than their current catalog sale price.
<details>
    <summary>Check if I’m right</summary>
    
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

10. Show the purchase history of a specific product:
  - Who bought it  
  - When  
  - At what price  
<details>
    <summary>Check if I’m right</summary>
    
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

## Level 4: Business Logic and Advanced Analytics

1. List users whose total accumulated spending is above the average spending of all store customers.
<details>
    <summary>Check if I’m right</summary>
    
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

2. Identify *Star Products*:  \
  Those that individually represent more than 2% of the company’s total revenue.
<details>
    <summary>Check if I’m right</summary>
    
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

3. Churn Rate\
  List users who made purchases in the past but have not placed any orders in the last 6 months.
<details>
    <summary>Check if I’m right</summary>
    
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

4. Classify customers into three levels based on their total spending:
  - VIP → spending > 5000  
  - Frequent → between 1000 and 5000  
  - Regular → < 1000  
<details>
    <summary>Check if I’m right</summary>
    
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

5. Determine which month (and year) had the highest revenue in the store’s history.
<details>
    <summary>Check if I’m right</summary>
    
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

6. Inventory Alert\
  List pending orders that include products whose current stock is less than 5 units.
<details>
    <summary>Check if I’m right</summary>
    
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

7. Calculate what percentage of total sales each category represents\
  (e.g., Electronics 40%, Clothing 20%, etc.).
<details>
    <summary>Check if I’m right</summary>
    
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

8. Compare the total sales of each city against the average sales of all cities.
<details>
    <summary>Check if I’m right</summary>
    
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

9. Calculate the cancellation rate:\
  Percentage of orders with status *cancelled* relative to the total number of orders per month.
<details>
    <summary>Check if I’m right</summary>
    
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

10. Basket Analysis  \
  Identify which pairs of products are most frequently sold together in the same order.
<details>
    <summary>Check if I’m right</summary>
    
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
