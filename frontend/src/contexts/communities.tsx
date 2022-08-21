import { gql, useQuery } from "@apollo/client";
import { createContext } from "react";

const CommunitiesContext = createContext<{
  data: { name: string; id: string }[];
  loading: boolean;
}>({ data: [], loading: false });

function CommunitiesProvider({ children }: { children: JSX.Element }) {
  const { data, loading } = useQuery(gql`
    query {
      communities {
        data {
          id
          attributes {
            name
            description
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `);
  return (
    <CommunitiesContext.Provider value={{ data, loading }}>
      {children}
    </CommunitiesContext.Provider>
  );
}

export { CommunitiesContext, CommunitiesProvider };
