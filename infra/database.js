import { Client } from "pg";

async function query(queryObject) {
  const dadosConexao = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  };

  const client = new Client(dadosConexao);
  console.log("Credenciais do Postgres", dadosConexao);

  try {
    await client.connect();
    return await client.query(queryObject);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
