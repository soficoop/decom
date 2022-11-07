import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useContext, useState } from "react";
import { CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";
import { TopDrawer } from "../components/TopDrawer";
import { LoginDialog } from "../components/LoginDialog";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Stack>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap="16px">
          <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            open login dialog
          </Button>
          <TopDrawer />

          {data.map((community) => (
            <CommunityCard community={community} key={community.id} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
