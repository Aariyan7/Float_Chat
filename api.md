# MySQL Graphing API

This is a simple Node.js backend API that executes MySQL queries and returns the results formatted specifically for graphing libraries (like Recharts, Chart.js, etc.).

## Setup

1. Make sure you have Node.js and npm installed.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Update the database credentials in `index.js` if necessary. Current defaults:
   - **Database**: `float_chat`
   - **User**: `root`
   - **Password**: `Root@123`
   - **Host**: `localhost`

4. Start the server:
   ```bash
   node index.js
   ```

The server will start on `http://localhost:3000`.

## API Endpoints

### 1. Execute Query
- **Endpoint:** `POST /api/query`
- **Description:** Executes a `SELECT` SQL query and returns the results. 

If the query returns exactly two columns, the API automatically heuristically maps the first column to `x` and the second column to `y`, making it effortless to plug into graphing libraries out of the box. You can also explicitly specify `x` and `y` aliases in your SQL query (e.g., `SELECT time as x, temperature as y`).

#### Request

**Headers:**
```http
Content-Type: application/json
```

**Body:**
```json
{
  "query": "SELECT time, temperature FROM profiles WHERE YEAR(time) = 2013 ORDER BY time ASC"
}
```

#### Successful Response

```json
{
  "success": true,
  "rowCount": 2,
  "columns": ["time", "temperature"],
  "data": [
    {
      "time": "2013-05-12T04:20:00.000Z",
      "temperature": 15.4,
      "x": "2013-05-12T04:20:00.000Z",
      "y": 15.4
    },
    {
      "time": "2013-05-13T08:15:00.000Z",
      "temperature": 16.1,
      "x": "2013-05-13T08:15:00.000Z",
      "y": 16.1
    }
  ]
}
```

#### Error Response

```json
{
  "success": false,
  "error": "One or more columns in your query do not exist.",
  "details": "Unknown column 'typo_column' in 'field list'"
}
```

### 2. Health Check
- **Endpoint:** `GET /health`
- **Description:** Checks if the API is running.

#### Response
```json
{
  "status": "ok",
  "message": "API is running"
}
```



### 3. Testing Data
- **Endpoint:** `GET /api/test-data`
- **Description:** Returns dummy temperature data (x-axis: date, y-axis: temperature) for testing frontend graphing visualizations. This endpoint does not require a database connection.

#### Request

**Headers:**
```http
Content-Type: application/json
```

**Body:**
*(None required)*

#### Successful Response

```json
{
  "success": true,
  "rowCount": 10,
  "columns": [
    "date",
    "temperature"
  ],
  "data": [
    {
      "date": "2026-03-08T12:00:00.000Z",
      "temperature": 22.4,
      "x": "2026-03-08T12:00:00.000Z",
      "y": 22.4
    },
    {
      "date": "2026-03-09T12:00:00.000Z",
      "temperature": 18.1,
      "x": "2026-03-09T12:00:00.000Z",
      "y": 18.1
    }
  ]
}
```

