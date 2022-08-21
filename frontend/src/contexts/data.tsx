import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../utils/constants";

const DataContext = createContext<{
  password?: string;
  setPassword: (value: string) => void;
}>({ setPassword: () => {} });

function DataProvider({ children }: { children: JSX.Element }) {
  const [password, setPassword] = useState<string>();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>(
    new ApolloClient({
      uri: apiUrl,
      cache: new InMemoryCache(),
    })
  );

  useEffect(() => {
    if (password) {
      setClient(
        new ApolloClient({
          uri: apiUrl,
          cache: new InMemoryCache(),
          headers: {
            "x-password": password,
          },
        })
      );
    }
  }, [password]);

  return (
    <ApolloProvider client={client}>
      <DataContext.Provider value={{ password, setPassword }}>
        {children}
      </DataContext.Provider>
    </ApolloProvider>
  );
}

export { DataContext, DataProvider };
