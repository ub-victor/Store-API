# Store API

A powerful and flexible RESTful API for managing and querying product data. Built with Node.js, Express, and MongoDB, this API provides advanced filtering, sorting, and pagination capabilities for product catalogs.

## 🎯 Features

- **Advanced Product Filtering**: Filter products by name, featured status, company, and numeric fields (price, rating)
- **Dynamic Sorting**: Sort products by multiple fields in ascending or descending order
- **Field Selection**: Choose specific fields to return in the response
- **Pagination**: Built-in pagination support with customizable page size and limits
- **Numeric Operators**: Support for comparison operators (>, >=, =, <, <=) for numeric filtering
- **Error Handling**: Comprehensive error handling middleware for robust error responses
- **Async/Await Support**: Uses express-async-errors for clean async error handling
- **Environment Configuration**: Environment-based configuration using dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Store\ API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/store-api
   ```
   
   Replace `MONGO_URI` with your MongoDB connection string.

4. **Populate the database (optional)**
   ```bash
   node populate.js
   ```
   This loads sample product data from `products.json` into your MongoDB database.

## 📦 Project Structure

```
.
├── app.js                          # Main Express application setup
├── package.json                    # Project dependencies and scripts
├── products.json                   # Sample product data
├── populate.js                     # Database seeding script
├── numericFilter.md                # Documentation for numeric filtering
│
├── controllers/
│   └── products.js                 # Product controller with business logic
│
├── models/
│   └── product.js                  # Product schema definition
│
├── routes/
│   └── products.js                 # Product routes definitions
│
├── middleware/
│   ├── error-handler.js            # Global error handling middleware
│   └── not-found.js                # 404 Not Found middleware
│
└── db/
    └── connect.js                  # MongoDB connection setup
```

## 🔌 API Endpoints

### Get All Products
Retrieve a list of products with advanced filtering, sorting, and pagination.

```http
GET /api/v1/products
```

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `featured` | Boolean | Filter by featured status | `true` or `false` |
| `company` | String | Filter by company name | `ikea`, `liddy`, `caressa`, `marcos` |
| `name` | String | Search products by name (case-insensitive) | `chair` |
| `numericFilters` | String | Filter by numeric fields using operators | `price>30,rating<4.5` |
| `sort` | String | Sort by fields (comma-separated) | `price,-rating` |
| `fields` | String | Select specific fields (comma-separated) | `name,price` |
| `page` | Number | Page number (default: 1) | `2` |
| `limit` | Number | Items per page (default: 10) | `20` |

**Numeric Operators:**
- `>` - Greater than
- `>=` - Greater than or equal to
- `=` - Equal to
- `<` - Less than
- `<=` - Less than or equal to

**Example Requests:**

```bash
# Get all products
curl http://localhost:3000/api/v1/products

# Filter by company and price
curl "http://localhost:3000/api/v1/products?company=ikea&numericFilters=price>30"

# Search by name with sorting and pagination
curl "http://localhost:3000/api/v1/products?name=chair&sort=price,-rating&page=1&limit=5"

# Multiple numeric filters
curl "http://localhost:3000/api/v1/products?numericFilters=price>30,rating>=4.5"

# Select specific fields
curl "http://localhost:3000/api/v1/products?fields=name,price,company"
```

**Response Example:**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Dining Chair",
      "price": 45.99,
      "featured": false,
      "rating": 4.5,
      "company": "ikea"
    }
  ],
  "nbHits": 1
}
```

### Get Static Products
Get a predefined set of products (price > 30, sorted by price, limit 4).

```http
GET /api/v1/products/static
```

**Response Example:**
```json
{
  "products": [
    {
      "name": "Product Name",
      "price": 50
    }
  ],
  "nbHits": 1
}
```

### Home Route
```http
GET /
```

Returns an HTML page with links to the API endpoints.

## 📊 Product Schema

```javascript
{
  name: String (required),           // Product name
  price: Number (required),          // Product price
  featured: Boolean (default: false), // Featured status
  rating: Number (default: 4.5),     // Product rating
  company: String,                   // One of: ikea, liddy, caressa, marcos
  createdAt: Date                    // Creation timestamp
}
```

## 🛠️ Available Scripts

**Development mode** (with hot reload using nodemon)
```bash
npm run dev
```

**Production mode**
```bash
node app.js
```

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | Required |

## 📚 Technologies Used

- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **MongoDB** - NoSQL database
- **dotenv** - Environment variable management
- **express-async-errors** - Async error handling
- **nodemon** - Development server with auto-reload

## 🐛 Error Handling

The API includes comprehensive error handling:
- **404 Not Found**: Returned when an invalid route is accessed
- **Validation Errors**: Returned when required fields are missing
- **Database Errors**: Returned when database operations fail
- **Server Errors**: Generic 500 errors for unexpected issues

## 📝 Example Usage

### Filter products by price range
```bash
curl "http://localhost:3000/api/v1/products?numericFilters=price>20,price<100"
```

### Get featured products sorted by rating
```bash
curl "http://localhost:3000/api/v1/products?featured=true&sort=-rating"
```

### Pagination with custom limit
```bash
curl "http://localhost:3000/api/v1/products?page=2&limit=15"
```

### Combine multiple filters
```bash
curl "http://localhost:3000/api/v1/products?company=ikea&featured=true&numericFilters=price<500&sort=price&fields=name,price,rating"
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see package.json for details.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding!** 🚀
