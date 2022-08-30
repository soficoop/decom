import { gql, useQuery } from "@apollo/client";
import { createContext, useContext, useState } from "react";
import { Suggestion } from "./suggestions";

interface Community {
  name: string | undefined;
  id: string | undefined;
  description: string | undefined;
  image: string | undefined;
  suggestions?: Suggestion[];
  password: string | undefined;
}

const CommunitiesContext = createContext<{
  data: Community[];
  loading: boolean;
  selectedCommunity: Community | undefined;
  setSelectedCommunity: (com: Community) => void;
}>({
  data: [],
  loading: false,
  selectedCommunity: {
    id: undefined,
    name: undefined,
    description: undefined,
    image: undefined,
    password: undefined,
  },
  setSelectedCommunity: (com: Community) => {},
});

function CommunitiesProvider({ children }: { children: JSX.Element }) {
  const [selectedCommunity, setSelectedCommunity] = useState<
    Community | undefined
  >();

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
        selectedCommunity: selectedCommunity,
        setSelectedCommunity: setSelectedCommunity,
      }}
    >
      {children}
    </CommunitiesContext.Provider>
  );
}

export { CommunitiesContext, CommunitiesProvider };
