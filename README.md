

# Vehicle Valuation and Financing API

## Overview

This project provides a backend API to support Vehicle valuation and financing services. The API handles vehicle data ingestion, valuation model integration, and loan application processing. It is built using NestJS, TypeORM, SQLite, and TypeScript.

## Features

- **Vehicle Data Ingestion**: Endpoint to submit vehicle data (VIN, make, model, year, mileage).
- **Vehicle Valuation Requests**: Endpoint to request vehicle valuation.
- **Loan Application Submission**: Endpoint to submit loan applications.
- **Loan Status Updates**: Endpoint to update and check the status of loan applications.
- **Valuation Model Integration**: Simulates vehicle valuation using a third-party service.
- **Loan Eligibility Checks**: Basic checks for loan eligibility based on predefined criteria.
- **Error Handling and Logging**: Robust mechanisms for error handling and logging.

## Technologies Used

- **NestJS**: Framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: ORM for TypeScript and JavaScript that works with SQLite.
- **SQLite**: In-memory database for quick and efficient data storage.
- **TypeScript**: Superset of JavaScript for adding static types.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/abjerry97/autochek-api.git
   cd autochek-api
   ```

2. **Install Dependencies**

   Ensure you have Node.js installed. Then, install the project dependencies:

   ```bash
   npm install
   ```

3. **Database Setup**

   SQLite is used in memory, so no additional setup is required for the database. 

4. **Running the Application**

   To start the application, use:

   ```bash
   npm run start
   ```

   The application will be available at `http://localhost:3000`.


## API Endpoints

- **Vehicle Data Ingestion**

   - `POST /vehicles`
   - Request Body: `{ "vin": "string", "make": "string", "model": "string", "year": "number", "mileage": "number" }`

- **Vehicle Valuation**

   - `GET /vehicles/:vin/valuation`

- **Loan Application Submission**

   - `POST /loans`
   - Request Body: `{ "vehicleVin": "string", "amountRequested": "number", "term": "number" }`

- **Loan Status Update**

   - `PATCH /loans/:loanId`
   - Request Body: `{ "status": "string" }`

## Documentation

API documentation is available at: `http://localhost:3000/api`

## Error Handling

Errors are handled with appropriate HTTP status codes and descriptive error messages.

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. If you encounter any issues, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
 