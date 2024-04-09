# Node.js API Documentation For Customers Data

## Introduction

This API provides endpoints to manage customers, including retrieving customer information, adding new customers, and getting insights such as unique cities with total customers.

## Base URL : http://localhost:8080/



## Endpoints

### Get all customers

Retrieve all customers.

- **URL**

  `/api/v1/customers`

- **Method**

  `GET`

- **Query Parameters**

  - `firstName` (optional): Filter customers by first name.
  - `lastName` (optional): Filter customers by last name.
  - `city` (optional): Filter customers by city.
  - `page` (optional): Pagination, specify the page number.

- **Success Response**

  - **Code:** 200 OK<br />
    **Content:**{
    "totalCustomers": 1,
    "totalPages": 1,
    "currentPage": "1",
    "data": [
        {
            "id": 1,
            "first_name": "Aman",
            "last_name": "Gupta",
            "city": "Ahmedabad",
            "company": "SublimeDataSystems"
        }
    ]
} 

- **Error Response**

  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error: "Internal server error" }`

...

### Get customer by ID

Retrieve a customer by their ID.

- **URL**

  `/api/v1/customer/:id`

- **Method**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]` - ID of the customer to retrieve.

- **Success Response**

  - **Code:** 200 OK<br />
    **Content:** `{
    "result": true,
    "message": "Single Customer details",
    "data": [
        {
            "id": 2,
            "first_name": "jems",
            "last_name": "Johnathan",
            "city": "Ahmedabad",
            "company": "SublimeDataSystems"
        }
    ]
}`

- **Error Response**

  - **Code:** 404 Not Found<br />
    **Content:** `{ error: "Customer not found" }`

  OR

  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error: "Internal server error" }`

...


### Get unique cities with total customers

Retrieve unique cities with the total number of customers from each city.

- **URL**

  `/api/v1/customers/uniqueCities`

- **Method**

  `GET`

- **Success Response**

  - **Code:** 200 OK<br />
    **Content:** `{
    "result": true,
    "message": "Unique Cities with total customers ",
    "data": {
        "Ahmedabad": 2
    }
}`

- **Error Response**

  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error: "Internal server error" }`

...


### Add a new customer

Add a new customer.

- **URL**

  `addNewCustomer`

- **Method**

  `POST`

- **Data Params**

  Expects a JSON object with the following properties:

  - `first_name` (string): First name of the customer.
   - `last_name` (string): Last name of the customer.
  - `city` (string): City of the customer.
   - `company` (string): Company name.

- **Success Response**

  - **Code:** 200 OK<br />
    **Content:** `{
    "result": true,
    "message": "Customer added successfully",
    "data": {
        "id": 3,
        "first_name": "jems",
        "last_name": "Johnathan",
        "city": "Ahmedabad",
        "company": "SublimeDataSystems"
    }
}`

- **Error Response**

  - **Code:** 400 Bad Request<br />
    **Content:** `{ error: "Invalid request body" }`

  OR

  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error: "Internal server error" }`

...