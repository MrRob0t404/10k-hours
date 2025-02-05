"use client";
import React, { useState, useRef } from "react";
import { Button, TextField, Box, ButtonGroup } from "@mui/material";

interface TimeLoggerProps {
  skillId: number;
  onTimeLog: (skillId: number, minutes: number) => void;
}

export default function TimeLogger({ skillId, onTimeLog }: TimeLoggerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [manualMinutes, setManualMinutes] = useState('');
  const startTimeRef = useRef<Date | null>(null);

  const handleStartTracking = () => {
    startTimeRef.current = new Date();
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    if (startTimeRef.current) {
      const endTime = new Date();
      const minutes = Math.round((endTime.getTime() - startTimeRef.current.getTime()) / 1000 / 60);
      onTimeLog(skillId, minutes);
      setIsTracking(false);
    }
  };

  const handleManualLog = () => {
    if (manualMinutes && !isNaN(Number(manualMinutes))) {
      onTimeLog(skillId, parseInt(manualMinutes));
      setManualMinutes('');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <ButtonGroup variant="contained" sx={{ mb: 2 }}>
        {!isTracking ? (
          <Button onClick={handleStartTracking} color="primary">
            Start Session
          </Button>
        ) : (
          <Button onClick={handleStopTracking} color="secondary">
            Stop Session
          </Button>
        )}
      </ButtonGroup>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          size="small"
          type="number"
          label="Minutes"
          value={manualMinutes}
          onChange={(e) => setManualMinutes(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={handleManualLog}
          disabled={!manualMinutes}
        >
          Log Time
        </Button>
      </Box>
    </Box>
  );
}
