import { Stack, Typography, Button, Card } from "@mui/material";
import { useContext, useState } from "react";
import { ApiContext, CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";
import { TopDrawer } from "../components/TopDrawer";
import { LoginDialog } from "../components/LoginDialog";

import { CreateCommunityDialog } from "../components/CreateCommunityDialog";
import { SuccessDialog } from "../components/SuccessDialog";
import { Community } from "../types/entities";
import { lightGreyColor } from "../theme";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);
  const { setPassword } = useContext(ApiContext);
  const navigate = useNavigate();

  const [visibleDialog, setVisibleDialog] = useState("");

  const [selectedCommunity, setSelectedCommunity] = useState<Community>();

  const handleClose = () => {
    setVisibleDialog("");
  };

  const handleCreateCommunitySuccess = () => {
    setVisibleDialog("success");
    //mutation
  };
  const handleJoinCommunitySuccess = () => {
    setVisibleDialog("success");
    //mutation
  };

  function handleLoginSuccess(password: string) {
    setVisibleDialog("");
    setPassword(password);
    navigate(`/community/${selectedCommunity?.id}`);
  }

  return (
    <Stack>
      <TopDrawer />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap={2} paddingX={3}>
          {selectedCommunity && (
            <LoginDialog
              isOpen={visibleDialog === "login"}
              selectedCommunity={selectedCommunity}
              onClose={handleClose}
              onJoin={handleJoinCommunitySuccess}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
          <CreateCommunityDialog
            isOpen={visibleDialog === "create-community"}
            onClose={handleClose}
            onSubmit={handleCreateCommunitySuccess}
          />
          <SuccessDialog
            isOpen={visibleDialog === "success"}
            onClose={handleClose}
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
                  setVisibleDialog("create-community");
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
              setWhoIsOpen={setVisibleDialog}
              saveClickedCommuinty={setSelectedCommunity}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
