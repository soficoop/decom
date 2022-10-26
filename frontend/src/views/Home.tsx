import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { CommunitiesContext } from "../contexts";
import { Link } from "react-router-dom";
import { TopDrawer } from "../components/TopDrawer";

const exampleText = `
לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.

קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.

`;

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  return (
    <Stack>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap="16px">
          <TopDrawer drawerText={exampleText} />
          {data.map((community) => (
            <Link
              to={`community/${community.id}`}
              style={{ textDecoration: "none" }}
              key={community.id}
            >
              <Card key={community.id}>
                <CardMedia
                  image={community.image}
                  component="img"
                  height={160}
                />
                <CardContent>
                  <Stack gap={1.5}>
                    <Typography variant="h2">{community.name}</Typography>
                    <Typography>{community.description}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
