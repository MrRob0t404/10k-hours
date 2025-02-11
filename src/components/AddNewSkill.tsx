import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { Skill } from "@/types";

interface AddNewSkillProps {
  onAddSkill: (skill: Skill) => void;
}

export default function AddNewSkill({ onAddSkill }: AddNewSkillProps) {
  const [skillName, setSkillName] = useState("");
  // const [goalHours, setGoalHours] = useState("");

  const handleSetSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillName(e.target.value);
  };

  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Skill Name"
          value={skillName}
          variant="outlined"
          onChange={handleSetSkill}
        />

        <Button
          variant="contained"
          onClick={() =>
            onAddSkill({
              id: Date.now(),
              name: skillName,
              totalHours: 0,
              goalHours: Number(10000),
              sessions: [],
            })
          }
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
