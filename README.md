# Trade Parsing and Balance Calculator

This project is a Node.js application that uses MongoDB to handle cryptocurrency trade data from a CSV file and calculates asset-wise balances at any given timestamp.

[Live-URL](https://trade-parsing.onrender.com/)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- CSV-Parse

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/NitinJuyal1610/trade_parsing.git
    cd trade_parsing
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up MongoDB and update the connection string in `.env` file.

4. Start the server:
    ```sh
    npm start
    ```

## Usage

### API Endpoints

#### Upload CSV

- **Endpoint**: `POST /v1/trade/upload`
- **Description**: Accepts a CSV file and stores the parsed data in the database.
- **Example**:
    ```sh
    curl --location 'https://trade-parsing.onrender.com/v1/trade/upload' \
    --form 'file=@"/C:/Users/nitin/OneDrive/Desktop/KoinX Assignment CSV Sample.csv"'
    ```

#### Get Balance

- **Endpoint**: `POST /v1/stats/get-balance`
- **Description**: Returns the asset-wise balance at a given timestamp.
- **Request Body**:
    ```json
    {
      "timestamp": "2024-09-28 12:00:00"
    }
    ```
- **Example**:
    ```sh
    curl --location 'https://trade-parsing.onrender.com/v1/stats/get-balance' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "timestamp": "2024-09-28 12:00:00"
    }'
    ```


