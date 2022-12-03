import { gql, useMutation, useQuery } from "@apollo/client";
import { createContext } from "react";
import { Community } from "../types/entities";
import { useParams, Outlet } from "react-router-dom";
import { FetchResult } from "@apollo/client";
import {
  createCommunityIdea as createCommunityIdeaMutation,
  joinCommunity as joinCommunityMutation,
} from "../utils/mutations";
interface CommunitiesContextProps {
  data: Community[];
  loading: boolean;
  selectedCommunity?: Community;
  createCommunityIdea: (
    fullname: string,
    email: string,
    phone: string,
    content: string
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  createCommunityIdeaData: any;
  createCommunityIdeaLoading: any;
  createCommunityIdeaError: any;
  joinCommunity: (
    fullname: string,
    email: string,
    details: string
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  joinCommunityData: any;
  joinCommunityLoading: any;
  joinCommunityError: any;
}

const CommunitiesContext = createContext<CommunitiesContextProps>(
  {} as CommunitiesContextProps
);

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

  const [
    createCommunityIdea,
    { data: CCIData, loading: CCILoading, error: CCIError },
  ] = useMutation(createCommunityIdeaMutation);

  const [
    joinCommunity,
    {
      data: joinCommunityData,
      loading: joinCommunityLoading,
      error: joinCommunityError,
    },
  ] = useMutation(joinCommunityMutation);

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

  const state: CommunitiesContextProps = {
    data: commData,
    loading,
    selectedCommunity,
    createCommunityIdea: (fullname, email, phone, content) => {
      return createCommunityIdea({
        variables: {
          fullname,
          email,
          phone,
          content,
        },
      });
    },
    createCommunityIdeaData: CCIData,
    createCommunityIdeaLoading: CCILoading,
    createCommunityIdeaError: CCIError,
    joinCommunity: (fullname, email, details) => {
      return joinCommunity({
        variables: {
          fullname,
          email,
          details,
        },
      });
    },
    joinCommunityData,
    joinCommunityLoading,
    joinCommunityError,
  };

  return (
    <CommunitiesContext.Provider value={state}>
      <Outlet />
    </CommunitiesContext.Provider>
  );
}

export { CommunitiesContext, CommunitiesProvider };
