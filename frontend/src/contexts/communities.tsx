import { gql, useQuery } from "@apollo/client";
import { createContext } from "react";

interface Community {
  name: string;
  id: string;
}

const CommunitiesContext = createContext<{
  data: Community[];
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
    <CommunitiesContext.Provider
      value={{
        data:
          data?.communities?.data?.map(
            (community: { attributes: Community; id: string }) => ({
              ...community.attributes,
              id: community.id,
            })
          ) || [],
        loading,
      }}
    >
      {children}
    </CommunitiesContext.Provider>
  );
}

export { CommunitiesContext, CommunitiesProvider };
