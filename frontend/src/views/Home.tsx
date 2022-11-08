import { Stack, Typography, Button, Card, CardContent } from "@mui/material";
import { useContext, useState } from "react";
import { CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";
import { TopDrawer } from "../components/TopDrawer";
import { LoginDialog } from "../components/LoginDialog";
import { JoinCommunityDialog } from "../components/JoinCommunityDialog";
import { CreateCommunityDialog } from "../components/CreateCommunityDialog";
import { CreateCommunitySuccessDialog } from "../components/CreateCommunitySuccessDialog";
import { Community } from "../types/entities";
import { lightGreyColor } from "../theme";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  const [isOpen, setWhoIsOpen] = useState("none");
  const [selectedCommunity, saveClickedCommunity] = useState<Community>();
  return (
    <Stack>
      <TopDrawer />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap={2} paddingX={3}>
          <LoginDialog
            isOpen={isOpen === "login"}
            setWhoIsOpen={setWhoIsOpen}
            selectedCommunity={selectedCommunity}
          />
          <JoinCommunityDialog
            isOpen={isOpen === "join"}
            setWhoIsOpen={setWhoIsOpen}
            selectedCommunity={selectedCommunity}
          />
          <CreateCommunityDialog
            isOpen={isOpen === "create-community"}
            setWhoIsOpen={setWhoIsOpen}
          />
          <CreateCommunitySuccessDialog
            isOpen={isOpen === "create-community-success"}
            setWhoIsOpen={setWhoIsOpen}
          />

          <Card
            variant="outlined"
            sx={{
              borderColor: lightGreyColor,
              borderWidth: 1,
            }}
          >
            <Stack alignItems="center" gap={1.5} paddingY={3} paddingX={6}>
              <Typography variant="body2" textAlign="center">
                מעוניינים להקים קהילה חדשה?
              </Typography>
              <Button
                size="large"
                fullWidth
                onClick={() => {
                  setWhoIsOpen("create-community");
                }}
              >
                <Typography fontWeight={600}>צור קשר</Typography>
              </Button>
            </Stack>
          </Card>
          <Typography variant="h2">קהילות</Typography>

          {data.map((community) => (
            <CommunityCard
              community={community}
              key={community.id}
              setWhoIsOpen={setWhoIsOpen}
              saveClickedCommuinty={saveClickedCommunity}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
