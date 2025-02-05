"use client";
import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import SkillCard from "./SkillCard";
// import ProgressChart from "./ProgressChart";
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
  ]);

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Skill Tracker Dashboard
        </Typography>
      </Grid>

      {skills.map((skill) => (
        <Grid item xs={12} md={6} key={skill.id}>
          <SkillCard skill={skill} onTimeLog={handleTimeLog} />
        </Grid>
      ))}

      {/* <Grid item xs={12}>
        <ProgressChart skills={skills} />
      </Grid> */}
    </Grid>
  );
}
