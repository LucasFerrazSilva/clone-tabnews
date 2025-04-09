import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt isLoading={isLoading} data={data} />
      <Dependencies isLoading={isLoading} data={data} />
    </>
  );
}

function UpdatedAt({ isLoading, data }) {
  let updatedAtText = "Carregando..";

  if (!isLoading && data)
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");

  return <div>Última atualização: {updatedAtText}</div>;
}

function Dependencies({ isLoading, data }) {
  if (isLoading) return <div>Carregando...</div>;

  if (!data) return <div>Nenhum dado encontrado!</div>;

  let database = data.dependencies.database;

  return (
    <div>
      <h2>Banco de Dados</h2>
      <ul>
        <li>Número máximo de conexões: {database.max_connections}</li>
        <li>Conexões em uso: {database.used_connections}</li>
        <li>Versão: {database.version}</li>
      </ul>
    </div>
  );
}
