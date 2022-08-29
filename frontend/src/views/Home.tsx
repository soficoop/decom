import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { CommunitiesContext } from "../contexts";
import { Link } from "react-router-dom";
export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  return (
    <Stack>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack>
          {data.map((community) => (
            <Link
              to={`community/${community.id}`}
              style={{ textDecoration: "none" }}
              key={community.id}
            >
              <Typography variant="h1">{community.name}</Typography>
            </Link>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
