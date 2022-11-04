import { gql, useQuery } from "@apollo/client";
import { createContext } from "react";
import { Community } from "../types/entities";
import { useParams, Outlet } from "react-router-dom";

const CommunitiesContext = createContext<{
  data: Community[];
  loading: boolean;
  selectedCommunity: Community | undefined;
}>({
  data: [],
  loading: false,
  selectedCommunity: {
    id: undefined,
    name: undefined,
    description: undefined,
    image: undefined,
    password: undefined,
    suggestionCount: undefined,
    requiresPassword: undefined,
  },
});

function CommunitiesProvider() {
  const { communityId } = useParams();

  const { data, loading } = useQuery(gql`
    query {
      communities {
        data {
          id
          attributes {
            name
            description
            suggestionCount
            requiresPassword
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

  const commData =
    data?.communities?.data?.map(
      (community: { attributes: any; id: string }) => ({
        ...community.attributes,
        image: community.attributes.image?.data?.attributes?.url ?? "",
        id: community.id,
      })
    ) || [];

  const selectedCommunity = commData.find(
    (com: Community) => com.id === communityId
  );

  return (
    <CommunitiesContext.Provider
      value={{
        data: commData,
        loading,
        selectedCommunity,
      }}
    >
      <Outlet />
    </CommunitiesContext.Provider>
  );
}

export { CommunitiesContext, CommunitiesProvider };
