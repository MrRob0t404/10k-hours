import { Box } from "@mui/material";
import { Skill } from "@/types";

interface ProgressChartProps {
  skills: Skill[];
}

export default function ProgressChart({ skills }: ProgressChartProps) {
  console.log("from progress chart component", skills);
  return (
    <Box>
      <h1>THIS IS PROGRESS CHART COMPONENT</h1>{" "}
    </Box>
  );
}
