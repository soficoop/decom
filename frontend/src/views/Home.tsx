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
const exampleText = `
לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.

קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.

`;

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
          <TopDrawer drawerText={exampleText} />

          {data.map((community) => (
            <CommunityCard community={community} key={community.id} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
