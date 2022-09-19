import { gql, useQuery } from "@apollo/client";
import { createContext, useState } from "react";
import { ISuggestion } from "../types/contexts";
import { useParams, Outlet } from "react-router-dom";

interface Community {
  name: string | undefined;
  id: string | undefined;
  description: string | undefined;
  image: string | undefined;
  suggestions?: ISuggestion[];
  password: string | undefined;
}

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
