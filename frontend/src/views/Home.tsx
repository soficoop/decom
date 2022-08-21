import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { CommunitiesContext } from "../contexts";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);
  return (
    <Stack>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack>
          {data.map((community) => (
            <Typography variant="h1" key={community.id}>
              {community.name}
            </Typography>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
