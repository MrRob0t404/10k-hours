"use client";
import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import SkillCard from "./SkillCard";
import ProgressChart from "./ProgressChart";
import AddNewSkill from "./AddNewSkill";
import { Skill } from "@/types";

export default function Dashboard() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: "programming",
      totalHours: 150,
      goalHours: 10000,
      sessions: [],
    },
    {
      id: 2,
      name: "back flip",
      totalHours: 150,
      goalHours: 10000,
      sessions: [],
    },
  ]);
  const [toggleButton, setToggleButton] = useState(false);

  const handleTimeLog = (skillId: number, minutes: number) => {
    setSkills(
      skills.map((skill) => {
        if (skill.id === skillId) {
          return {
            ...skill,
            totalHours: skill.totalHours + minutes / 60,
            sessions: [
              ...skill.sessions,
              {
                date: new Date(),
                duration: minutes,
              },
            ],
          };
        }
        return skill;
      })
    );
  };

  const handleToggleButton = () => {
    setToggleButton(!toggleButton);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Skill Tracker Dashboard
        </Typography>

        {toggleButton ? (
          <AddNewSkill />
        ) : (
          <Button variant="contained" onClick={handleToggleButton}>Track New Skill</Button>
        )}
      </Grid>

      {skills.map((skill) => (
        <Grid item xs={12} md={6} key={skill.id}>
          <SkillCard skill={skill} onTimeLog={handleTimeLog} />
        </Grid>
      ))}

      <Grid item xs={12}>
        <ProgressChart skills={skills} />
      </Grid>
    </Grid>
  );
}
