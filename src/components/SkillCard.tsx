"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
// import TimeLogger from "./TimeLogger";
import { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
  onTimeLog: (skillId: number, minutes: number) => void;
}

export default function SkillCard({ skill, onTimeLog }: SkillCardProps) {
  const progress = (skill.totalHours / skill.goalHours) * 100;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {skill.name}
        </Typography>

        <Box sx={{ my: 2 }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(progress, 100)}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>

        <Typography color="textSecondary">
          {skill.totalHours.toFixed(1)} / {skill.goalHours} hours (
          {progress.toFixed(1)}%)
        </Typography>

        {/* <TimeLogger skillId={skill.id} onTimeLog={onTimeLog} /> */}
      </CardContent>
    </Card>
  );
}
