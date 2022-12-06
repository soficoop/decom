import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../utils/constants";
import { isPasswordValid as isPasswordValidQuery } from "../utils/queries";

const ApiContext = createContext<{
  password?: string;
  setPassword: (value: string) => void;
  isPasswordValid: (password: string, communityId: string) => Promise<boolean>;
}>({ setPassword: () => {}, isPasswordValid: async () => false });

function ApiProvider({ children }: { children: JSX.Element }) {
  const [password, setPassword] = useState<string>(
    sessionStorage.getItem("password") || ""
  );
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>(
    new ApolloClient({
      uri: apiUrl,
      cache: new InMemoryCache(),
      headers: password ? {
        authorization: `Basic ${password}`
      } : undefined
    })
  );

  async function isPasswordValid(password: string, communityId: string) {
    const { data } = await client.query({
      query: isPasswordValidQuery,
      variables: { password, communityId },
    });
    if (data.isPasswordValid) {
      setPassword(password);
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (password) {
      setClient(
        new ApolloClient({
          uri: apiUrl,
          cache: new InMemoryCache(),
          headers: {
            authorization: `Basic ${password}`,
          },
        })
      );
    }
  }, [password]);

  return (
    <ApolloProvider client={client}>
      <ApiContext.Provider
        value={{
          password,
          setPassword: (value: string) => {
            setPassword(value);
            sessionStorage.setItem("password", value);
          },
          isPasswordValid,
        }}
      >
        {children}
      </ApiContext.Provider>
    </ApolloProvider>
  );
}

export { ApiContext, ApiProvider };
