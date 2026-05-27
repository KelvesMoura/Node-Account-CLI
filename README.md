# 🏦 Node Account CLI

A simple banking system running directly in the terminal. Create accounts, check balances, deposit, withdraw, and close accounts — all through an interactive CLI interface.

---

## 🔗 Demo

👉 <a href="https://ofktshwuudgoslotznue.supabase.co/storage/v1/object/sign/Github/Node-Account-CLI.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNmQzMDM4OC02NDNjLTRiYjAtOGM0ZS0zOTFjZDMxYWM2OWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJHaXRodWIvTm9kZS1BY2NvdW50LUNMSS5tcDQiLCJpYXQiOjE3Nzk4OTM2MjQsImV4cCI6MTkzNzU3MzYyNH0.FwcuxBz5Y_ZIM-ksXRu_rZiLS1YEiisNTMeuEdII53g">Access the Demo here</a>


---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Option A — Running locally (Node.js installed)](#option-a--running-locally-nodejs-installed)
  - [Option B — Running with Docker](#option-b--running-with-docker)
- [How to use](#-how-to-use)
- [Features](#-features)
- [Project structure](#-project-structure)
- [Dependencies](#-dependencies)

---

## ✅ Prerequisites

Choose **one** of the options below:

| Option | Requirement                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------ |
| Local  | [Node.js](https://nodejs.org/) v18 or higher                                                     |
| Docker | [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) installed |

To check if Node.js is already installed:

```bash
node -v
npm -v
```

---

## 🚀 Installation

### Option A — Running locally (Node.js installed)

**1. Clone the repository**

```bash
git clone https://github.com/your-username/Node-Account-CLI.git
cd Node-Account-CLI
```

**2. Install dependencies**

```bash
npm install
```

**3. Run the project**

```bash
npm start
```

> The interactive menu will appear directly in the terminal.

---

### Option B — Running with Docker

**1. Clone the repository**

```bash
git clone https://github.com/your-username/Node-Account-CLI.git
cd Node-Account-CLI
```

**2. Start the container**

```bash
docker compose up -d
```

**3. Access the container**

```bash
docker exec -it nodejs sh
```

**4. Install dependencies inside the container**

```bash
npm install
```

**5. Run the project**

```bash
npm start
```

**To stop the container when you're done:**

```bash
docker compose down
```

---

## 💡 How to use

When you run `npm start`, the following menu will appear in the terminal:

```
? What would you like to do? (Use arrow keys)
❯ Criar Conta
  Consultar Saldo
  Depositar
  Sacar
  Encerrar Conta
  Sair
```

Navigate with the **arrow keys** and confirm with **Enter**.

### Basic usage flow

```
1. Criar Conta        → Set a unique name for your account (e.g. john)
2. Depositar          → Enter the account name and the amount to deposit
3. Consultar Saldo    → View the current account balance
4. Sacar              → Enter the account name and the amount to withdraw
5. Encerrar Conta     → Zero the balance first; confirm with "S" when prompted
6. Sair               → Exit the program
```

> **Note:** It is not possible to close an account with a positive balance. Withdraw the amount first.

---

## ⚙️ Features

| Action             | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Create Account** | Creates a `.json` file inside the `accounts/` folder with an initial balance of `0` |
| **Check Balance**  | Reads the account file and displays the balance formatted as R$                     |
| **Deposit**        | Adds the entered amount to the existing balance and saves                           |
| **Withdraw**       | Subtracts the amount from the balance; blocked if balance is insufficient           |
| **Close Account**  | Removes the account's `.json` file; requires a zero balance                         |
| **Exit**           | Terminates the process with a farewell message                                      |

Each account's data is stored locally at:

```
accounts/
  account-name.json   ← { "balance": 150.00 }
```

---

## 📁 Project structure

```
Node-Account-CLI/
├── accounts/               ← Created automatically when the first account is made
│   └── account-name.json
├── index.js                ← Entry point and all application logic
├── package.json
├── docker-compose.yml
└── .gitignore
```

---

## 📦 Dependencies

| Package                                            | Version | Usage                                        |
| -------------------------------------------------- | ------- | -------------------------------------------- |
| [inquirer](https://www.npmjs.com/package/inquirer) | ^8.2.7  | Interactive menus and inputs in the terminal |
| [chalk](https://www.npmjs.com/package/chalk)       | ^4.1.2  | Terminal message colorization                |

> Both are installed automatically with `npm install`.

---

## 📝 License

MIT © [Kelves Moura](https://kelvesmoura.com)
