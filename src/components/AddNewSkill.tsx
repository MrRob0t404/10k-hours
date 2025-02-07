import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { Skill } from "@/types";

interface AddNewSkillProps {
  onAddSkill: (skill: Skill) => void;
}

export default function AddNewSkill({ onAddSkill }: AddNewSkillProps) {
  const [skillName, setSkillName] = useState("");
  const [goalHours, setGoalHours] = useState("");

  const handleAddSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillName(e.target.value);
    if (skillName && !isNaN(Number(goalHours))) {
      console.log("skillName", e.target.value);
      //   onAddSkill({
      //     id: Date.now(),
      //     name: skillName,
      //     totalHours: 0,
      //     goalHours: Number(goalHours),
      //     sessions: [],
      //   });
      //   setSkillName("");
      //   setGoalHours("");
    }
  };

  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Skill Name"
          value={skillName}
          onChange={handleAddSkill}
        >
          Hello
        </TextField>
      </Box>
    </Box>
  );
}
