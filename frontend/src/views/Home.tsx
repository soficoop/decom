import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  return (
    <Stack>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap="16px">
          {data.map((community) => (
            <CommunityCard community={community} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
