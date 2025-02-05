import Dashboard from "../components/Dashboard";
import { Container, Box } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Dashboard />
      </Box>
    </Container>
  );
}
