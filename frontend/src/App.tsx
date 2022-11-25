import './App.css';
import { useQuery, gql } from '@apollo/client';
// import * as api from '../../api/src/prisma/generated/type-graphql/index'

type DataType = {
  breeds: [{name: String}]
}

function DisplayBreeds() {
  const GET_BREEDS = gql`
    query Query {
      breeds {
        name
      }
    }`;
  const queryResult = useQuery(GET_BREEDS);
  console.log(queryResult);
  const data: DataType = queryResult.data;
  if (queryResult.loading) return <p>Loading...</p>;
  if (queryResult.error) return <p>Error :(</p>;
  return (
    <div key={0}>
      <h3>{data.breeds[0].name}</h3>
      <br />
      <br />
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>
        Ag Nerd
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h1>
      <br />
      <DisplayBreeds/>
    </div>
  );
}