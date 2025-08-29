# Splyt API Automated Test Suite 🚀

# Overview 📝

This is an automated test suite designed to validate the Splyt API endpoints. Written in TypeScript using Supertest and Jest, this suite tests key API functionalities, including journey creation, validation, error handling and more.

## Features ✨

- **Journey Creation**: Tests the creation of journeys with both valid and invalid inputs.
- **Update Passenger**: Verifies that passenger details (like phone numbers) can be updated.
- **Field Validation**: Ensures required fields (pickup, dropoff, passenger) are validated.
- **Error Handling**: Tests for proper error responses when input is invalid or fields are missing.
- **Edge Cases**: Covers scenarios like invalid phone numbers, malformed dates, and missing parameters.

## Getting Started 🚀

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd splyt-API-automated-assessment

   ```

2. Install Dependencies 📦
   No need to worry about setting up Supertest or Jest. Simply run the following command to install everything:

npm install

3. Run Tests ✅
   Once installed, you can immediately run the tests with:
```bash
npm test
```

For continuous testing (automatically reruns tests when files change):
```bash
npm run test:watch
```

### Prerequisites 🛠️

Node.js: Make sure Node.js is installed. You can download it from here [Node.js website](https://nodejs.org/).

Once Node.js is installed, you'll also have npm (Node Package Manager) installed automatically.

### Test Coverage 🔍

This test suite covers:

- **Journey Creation**: Tests the creation of journeys with both valid and invalid inputs.
- **Update Passenger**: Verifies that passenger details (like phone numbers) can be updated.
- **Field Validation**: Ensures required fields (pickup, dropoff, passenger) are validated.
- **Error Handling**: Tests for proper error responses when input is invalid or fields are missing.
- **Edge Cases**: Covers scenarios like invalid phone numbers, malformed dates, and missing parameters.

# Challenges Faced ⚡

- **Error Response Inconsistencies**: Some API responses were inconsistent during testing, which required further clarification on how the API should behave with different types of invalid inputs.
- **Validation Handling**: Encountered situations where the API didn’t return the expected error codes or messages for invalid data.

# License 📜

This project is licensed under the ISC License.

# What You Don’t Need to Worry About 🛠️

- **No Setup for Supertest and Jest**: The dependencies are pre-configured, so you can focus on running the tests without worrying about any setup.
- **Pre-configured Test Environment**: The test environment is already set up with Supertest to handle HTTP requests and Jest for running the tests and making assertions.
