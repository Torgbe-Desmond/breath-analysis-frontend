import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { useHandleGetFeedbacksQuery } from "./features/feedbackApi";

export default function Feedback() {
  const { data, isLoading, isError } = useHandleGetFeedbacksQuery({
    page: 1,
    limit: 10,
  });

  console.log("data", data);

  const feedbacks = data?.data?.feedback || [];

  if (isLoading) {
    return (
      <Box>
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={80}
            sx={{ mb: 2, borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }

  if (isError) {
    return <Typography color="error">Failed to load feedbacks</Typography>;
  }

  if (!feedbacks.length) {
    return <Typography color="text.secondary">No feedbacks yet.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      {feedbacks.map((fb) => (
        <Card key={fb._id} variant="outlined"  sx={{borderRadius:"16px"}}>
          <CardContent>
            <Typography variant="body1">{fb.message}</Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              {new Date(fb.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
