import type { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export type TextCardprops = {
  title: string;
  firstData: string;
  secondData: string;
};

const TextCard: FC<TextCardprops> = ({ title, firstData, secondData }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        "@media (min-width: 900px)": {
          height: "100%",
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" fontWeight={600}>
          {title}
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <Typography variant="h6">{firstData}</Typography>
          <Typography variant="h6">{secondData}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TextCard;
