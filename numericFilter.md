# Numeric Filters in Express + Mongoose (Deep Explanation)

## 🎯 INPUT (from the URL)

```
numericFilters=price>30,rating<4.5
```

So in Express:

```
numericFilters === "price>30,rating<4.5"
```

---

## 🧩 THE CODE WE ARE ANALYZING

```js
if (numericFilters) {
  const operatorMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte',
  };

  const regEx = /\b(<|>|<=|>=|=)\b/g;
  let filters = numericFilters.replace(
    regEx,
    (match) => `-${operatorMap[match]}-`
  );

  const options = ['price', 'rating'];

  filters.split(',').forEach((item) => {
    const [field, operator, value] = item.split('-');
    if (options.includes(field)) {
      queryObject[field] = { [operator]: Number(value) };
    }
  });
}
```

---

## 🧠 STEP 1 — `if (numericFilters)`

✔ `numericFilters` exists  
✔ Value = `"price>30,rating<4.5"`  

➡ Code enters the block

---

## 🧠 STEP 2 — Operator Map

```js
const operatorMap = {
  '>': '$gt',
  '>=': '$gte',
  '=': '$eq',
  '<': '$lt',
  '<=': '$lte',
};
```

📦 Memory now contains:

```
operatorMap['>'] → '$gt'
operatorMap['<'] → '$lt'
```

➡ This is your **translator dictionary**

---

## 🧠 STEP 3 — Regex Definition

```js
const regEx = /\b(<|>|<=|>=|=)\b/g;
```

This regex finds comparison operators inside strings.

In:

```
price>30,rating<4.5
```

It finds:

- `>`
- `<`

---

## 🧠 STEP 4 — Replace Operators

```js
let filters = numericFilters.replace(
  regEx,
  (match) => `-${operatorMap[match]}-`
);
```

### 🔍 Internal Execution

Original string:

```
price>30,rating<4.5
```

- `>` → `-$gt-`
- `<` → `-$lt-`

Final result:

```
filters === "price-$gt-30,rating-$lt-4.5"
```

🔥 **THIS IS THE KEY TRANSFORMATION**

---

## 🧠 STEP 5 — Allowed Fields

```js
const options = ['price', 'rating'];
```

✔ Only safe fields allowed  
✔ Prevents invalid or malicious queries

---

## 🧠 STEP 6 — Split by Comma

```js
filters.split(',')
```

Result:

```js
[
  "price-$gt-30",
  "rating-$lt-4.5"
]
```

---

## 🧠 STEP 7 — First Loop Iteration

```js
item = "price-$gt-30"
```

Split:

```js
["price", "$gt", "30"]
```

Destructuring:

```
field    = "price"
operator = "$gt"
value    = "30"
```

MongoDB query built:

```js
queryObject.price = { $gt: 30 };
```

---

## 🧠 STEP 8 — Second Loop Iteration

```js
item = "rating-$lt-4.5"
```

Split:

```js
["rating", "$lt", "4.5"]
```

MongoDB query built:

```js
queryObject.rating = { $lt: 4.5 };
```

---

## 🎯 FINAL RESULT

```js
queryObject = {
  price: { $gt: 30 },
  rating: { $lt: 4.5 }
}
```

---

## 🚀 WHAT MONGODB RECEIVES

```js
Product.find({
  price: { $gt: 30 },
  rating: { $lt: 4.5 }
});
```

### 📌 Meaning

> Give me products where:
> - price is greater than 30  
> - AND rating is less than 4.5