// extern modules
const inquirer = require("inquirer");
const chalk = require("chalk");

// intern modules
const fs = require("fs");

operation();

async function operation() {
  try {
    const response = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Encerrar Conta",
          "Sair",
        ],
      },
    ]);
    const action = response["action"];

    const listAction = {
      "Criar Conta": createAccount,
      "Consultar Saldo": showBalance,
      Depositar: deposit,
      Sacar: withdrawn,
      "Encerrar Conta": close,
      Sair: exit,
    };

    const actionSelected = listAction[action];

    if (actionSelected) await actionSelected();
  } catch (err) {
    console.log(
      chalk.bgRed.black("Erro ao escolher as opções! Tente Novamente."),
    );
  }
}

async function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
  await buildAccount();
}

async function buildAccount() {
  try {
    const response = await inquirer.prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ]);
    const accountName = response.accountName;

    if (!fs.existsSync("accounts")) {
      fs.mkdirSync("accounts");
    }

    if (!accountName) {
      console.log(chalk.bgRed.black("Digite um nome para criar a conta!"));
      await buildAccount();
      return;
    }

    if (fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.bgRed.black("Esta conta já existe"));
      await buildAccount();
      return;
    }

    fs.writeFileSync(
      `accounts/${accountName}.json`,
      JSON.stringify({ balance: 0 }),
    );

    console.log(chalk.green("Parabéns, a sua conta foi criada!"));
  } catch (err) {
    console.log(
      chalk.bgRed.black(
        "Erro ao realizar o cadastro da conta! Tente Novamente",
      ),
    );
  }
  await operation();
}

function exit() {
  console.log(chalk.bgBlue.black("Obrigado por usar o Account!"));
  process.exit();
}

async function deposit() {
  try {
    const response = await inquirer.prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ]);

    const accountName = response.accountName;

    if (!checkAccount(accountName)) {
      return await deposit();
    }

    const response2 = await inquirer.prompt([
      {
        name: "value",
        message: "Quanto você deseja depositar?",
      },
    ]);
    const value = parseFloat(response2.value);

    addAmount(accountName, value);
    await operation();
  } catch (err) {
    console.log(
      chalk.bgRed.black("Erro ao realizar o Depósito! Tente Novamente"),
    );
  }
}

function checkAccount(accountName) {
  if (fs.existsSync(`accounts/${accountName}.json`)) return true;

  console.log(chalk.bgRed.black("Esta conta não existe, escolha outro nome!"));

  return false;
}

async function addAmount(name, addAmount) {
  try {
    const account = getAccount(name);

    account.balance = parseFloat(account.balance) + addAmount;

    if (!addAmount) {
      console.log(
        chalk.bgRed.black("Ocorreu um erro. tente novamente mais tarde!"),
      );
      return await deposit();
    }

    fs.writeFileSync(`accounts/${name}.json`, JSON.stringify(account));

    console.log(
      chalk.bgGreen.black(
        `Depósito Realizado com Sucesso!\nValor: R$ ${currency(addAmount)}`,
      ),
    );
  } catch (err) {
    console.log(
      chalk.bgRed.black("Erro ao realizar o depósito! Tente Novamente."),
    );
  }
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, "utf8");

  // Convertendo String em JSON
  return JSON.parse(accountJSON);
}

async function showBalance() {
  try {
    const response = await inquirer.prompt([
      {
        name: "accountName",
        message: "Qual é o nome da sua conta?",
      },
    ]);

    const accountName = response.accountName;

    if (!checkAccount(accountName)) {
      return await showBalance();
    }

    const value = getAccount(accountName);

    console.log(
      chalk.bgBlue.black(`Seu saldo da conta é R$ ${currency(value.balance)}`),
    );
    await operation();
  } catch (err) {
    console.log(chalk.bgRed.black("Erro ao mostrar o saldo! Tente Novamente"));
  }
}

async function withdrawn() {
  try {
    const response = await inquirer.prompt([
      {
        name: "accountName",
        message: "Qual é o nome da sua conta?",
      },
    ]);
    const accountName = response.accountName;

    if (!checkAccount(accountName)) {
      return await withdrawn();
    }

    const response2 = await inquirer.prompt([
      {
        name: "value",
        message: "Quanto você deseja sacar?",
      },
    ]);

    const value = parseFloat(response2.value);
    await subAmount(accountName, value);
  } catch (err) {
    console.log(chalk.bgRed.black("Erro ao realizar o saque! Tente Novamente"));
    return await withdrawn();
  }
}

async function subAmount(name, subAmount) {
  const account = getAccount(name);

  const vAccount = parseFloat(account.balance);

  if (!subAmount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro. tente novamente mais tarde!"),
    );
    return await withdrawn();
  }

  if (vAccount >= subAmount) {
    account.balance = vAccount - subAmount;
  } else {
    console.log(
      chalk.bgRed.black(
        `Saldo insuficiente!\nValor em conta R$ ${currency(account.balance)}`,
      ),
    );
    return await withdrawn();
  }
  try {
    fs.writeFileSync(`accounts/${name}.json`, JSON.stringify(account));

    console.log(
      chalk.bgGreen.black(
        `Saque Realizado com Sucesso!\nValor: R$ ${currency(subAmount)}`,
      ),
    );
    await operation();
  } catch (err) {
    console.log(
      chalk.bgRed.black("Erro ao realizar o saque! Tente novamente."),
    );
    return await withdrawn();
  }
}

async function close() {
  try {
    const response = await inquirer.prompt([
      {
        name: "accountName",
        message: "Qual é o nome da sua conta?",
      },
    ]);

    const accountName = response.accountName;

    if (!checkAccount(accountName)) {
      return await close();
    }

    const response2 = await inquirer.prompt([
      {
        name: "order",
        message: `Deseja encerrar a conta ${accountName}? [S/N]`,
      },
    ]);

    if (response2.order.toUpperCase() == "S") {
      const value = getAccount(accountName);

      if (parseFloat(value.balance) > 0) {
        console.log(
          chalk.bgRed.black(
            `Retire o seu saldo antes de encerrar!\nValor: R$ ${currency(value.balance)}`,
          ),
        );
        console.log();
        return await operation();
      }

      fs.rmSync(`accounts/${accountName}.json`);
      console.log(chalk.green("Conta Encerrada com Sucesso!"));
      await operation();
    }
    console.log(
      chalk.bgGreen.black("Ficamos felizes em continuar com esta escolha!"),
    );
    await operation();
  } catch (err) {
    console.log(
      chalk.bgRed.black("Erro ao encerrar a conta! Tente Novamente.", err),
    );
    return await operation();
  }
}

async function deleteAccount(params) {}

function currency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}
