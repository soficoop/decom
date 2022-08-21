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
          <Typography variant="h1">קהילה זו מוגנת בסיסמא</Typography>
          <Button>this is a test</Button>
        </Stack>
      )}
    </Stack>
  );
}
