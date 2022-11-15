import { gql, useQuery } from "@apollo/client";
import { createContext, useState } from "react";
import { Community } from "../types/entities";
import { useParams, Outlet } from "react-router-dom";

const CommunitiesContext = createContext<{
  data: Community[];
  loading: boolean;
  selectedCommunity: Community | undefined;
  passwordInput: string | undefined;
  setPasswordInput: any;
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
  passwordInput: undefined,
  setPasswordInput: undefined,
});

function CommunitiesProvider() {
  const { communityId } = useParams();
  const [passwordInput, setPasswordInput] = useState("");
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
        passwordInput,
        setPasswordInput,
      }}
    >
      <Outlet />
    </CommunitiesContext.Provider>
  );
}

export { CommunitiesContext, CommunitiesProvider };
