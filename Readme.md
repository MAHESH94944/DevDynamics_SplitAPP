# 💸 Split App - DevDynamics Internship Backend Assignment

> ⚠️ **Note:** This project is deployed on a free hosting tier (Render). As a result, the server may take 30–60 seconds to wake up if it's been idle. Please be patient when accessing the API for the first time.

---

## 🚀 Live Demo

**Backend API:**  
https://split-app-backend-zj9k.onrender.com/api/expenses

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- Render (deployment)
- Postman (API testing)

---

## 📁 Features

### ✅ Core Features

- Add, update, and delete expenses
- Equal, exact, and percentage splits
- Automatic person detection from expenses
- Balances for each person
- Optimized settlement suggestions (minimized transactions)
- Input validation and clear error handling

### 🧪 Edge Cases Handled

- Negative/zero amounts
- Missing required fields
- Invalid updates/deletes
- Invalid splits or percentages

---

## 🛠️ How to Run Locally

```bash
git clone https://github.com/MAHESH94944/DevDynamics_SplitAPP.git
cd DevDynamics_SplitAPP
npm install
```

Create a `.env` file:

```ini
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri
```

Then run the server:

```bash
npm start
```

---

## 📦 API Documentation

### Expense Management

- **POST /api/expenses**  
  Create a new expense  
  Example:

  ```json
  {
    "amount": 600,
    "description": "Dinner",
    "paid_by": "Shantanu",
    "split_type": "equal",
    "splits": ["Shantanu", "Sanket", "Om"]
  }
  ```

  - For `"exact"` or `"percentage"` splits, use:
    ```json
    {
      "amount": 1000,
      "description": "Project Dinner",
      "paid_by": "Shantanu",
      "split_type": "percentage",
      "splits": [
        { "person": "Shantanu", "share": 20 },
        { "person": "Sanket", "share": 30 },
        { "person": "Om", "share": 50 }
      ]
    }
    ```

- **GET /api/expenses**  
  Get all expenses

- **PUT /api/expenses/:id**  
  Update expense by ID

- **DELETE /api/expenses/:id**  
  Delete expense by ID

### Settlement Calculations

- **GET /api/people**  
  Returns all unique people from expenses

- **GET /api/balances**  
  Returns net balance for each person

- **GET /api/settlements**  
  Returns optimized transactions to settle all balances

---

## 🔁 Sample Test Data

Tested with these users:

- Shantanu
- Sanket
- Om

Test Expenses:

- Dinner - ₹600 (Shantanu)
- Groceries - ₹450 (Sanket)
- Petrol - ₹300 (Om)
- Movie Tickets - ₹500 (Shantanu)
- Pizza - ₹280 (Sanket)

---

## 📬 Postman Collection

- [View on GitHub Gist](https://gist.github.com/MAHESH94944/9e994d7bfe482643b8b7b43de1496168)

This collection includes:

- All endpoint examples
- Test data setup
- Edge case handling
- Uses live deployed API URLs

---

## 📌 Known Limitations

- No authentication implemented
- No recurring transactions

---

## 👏 Acknowledgements

This project was submitted as part of the DevDynamics Backend Internship Assignment.

---

**For any questions or follow-up, contact: [maheshjadhao172@gmail.com](mailto:maheshjadhao172@gmail.com)**
