import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/query';

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="flex space-x-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="animate-spin-slow" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="animate-spin-slow" alt="React logo" />
        </a>
      </div>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
