import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { CommunitiesContext } from "../contexts";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);
  return (
    <Stack>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap="16px">
          {data.map((community) => (
            <Card key={community.id}>
              <CardMedia image={community.image} component="img" height={160} />
              <CardContent>
                <Stack gap={1.5}>
                  <Typography variant="h2">{community.name}</Typography>
                  <Typography>{community.description}</Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
