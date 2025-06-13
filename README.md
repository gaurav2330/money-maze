# MoneyMaze

MoneyMaze is a **personal finance management application** that empowers users to manage their budgets, track transactions, and analyze financial activities efficiently and securely. Built with modern web technologies, MoneyMaze focuses on simplicity, functionality, and security.

## 🚀 Features

- **User Authentication**: Secure signup and login using **JWT** and **bcrypt** for password hashing.
- **Budget Management**: Create and manage multiple budgets effortlessly.
- **Transaction Tracking**: Add, view, and delete transactions linked to specific budgets.
- **User-Budget Associations**: Supports multiple users collaborating on shared budgets with role-based access.
- **RESTful API**: Clean and well-documented API endpoints for seamless integration.
- **Secure by Design**: Emphasis on user data security and privacy.

## 🛠 Tech Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/), [Sequelize ORM](https://sequelize.org/)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Environment Management**: dotenv for secure environment variable handling

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v14 or newer)
- **[PostgreSQL](https://www.postgresql.org/)**

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/moneymaze.git
   cd moneymaze
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory with the following:
   ```env
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   DB_USER=postgres
   DB_PASSWORD=your_db_password
   DB_NAME=money_maze_development
   DB_HOST=localhost
   ```

4. **Set up the database**

   Ensure PostgreSQL is running and create the database:
   ```sh
   createdb money_maze_development
   ```

5. **Run database migrations**
   This project uses Sequelize to create tables. Synchronize the models with:
   ```sh
   npm run migrate
   ```

6. **Start the server**
   ```sh
   npm start
   ```
   The server will run on **[http://localhost:3000](http://localhost:3000)** by default.

### Running in Development Mode

To enable auto-reload during development, use:
```sh
npm run dev
```

## 🔐 Security Notes

- **Passwords**: All passwords are hashed using bcrypt before storage.
- **JWT**: Keep `JWT_SECRET` secure by storing it in environment variables.
- **Cookies**: Set cookies as HTTP-only and secure in production.
- **Environment Separation**: Use different `.env` files for development, staging, and production.

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add feature-name'`).
4. Push your branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🌟 Inspiration

> Manage your money, master your maze. MoneyMaze simplifies personal finance so you can focus on what truly matters.

---
