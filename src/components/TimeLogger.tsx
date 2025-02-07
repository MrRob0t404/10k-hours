"use client";
import React, { useState, useRef } from "react";
import { Button, TextField, Box, ButtonGroup } from "@mui/material";

interface TimeLoggerProps {
  skillId: number;
  onTimeLog: (skillId: number, minutes: number) => void;
}

export default function TimeLogger({ skillId, onTimeLog }: TimeLoggerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [manualMinutes, setManualMinutes] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef<Date | null>(null);
  const intervalRef = useRef<number>(0);

  const handleStartTracking = () => {
    startTimeRef.current = new Date();
    setIsTracking(true);
    setElapsedTime(0);
    
    intervalRef.current = window.setInterval(() => {
      if (startTimeRef.current) {
        const currentTime = new Date();
        const elapsed = Math.floor(
          (currentTime.getTime() - startTimeRef.current.getTime()) / 1000
        );
        setElapsedTime(elapsed);
      }
    }, 1000);
  };

  const handleStopTracking = () => {
    if (startTimeRef.current) {
      const endTime = new Date();
      const minutes = Math.round(
        (endTime.getTime() - startTimeRef.current.getTime()) / 1000 / 60
      );
      onTimeLog(skillId, minutes);
      setIsTracking(false);
      setElapsedTime(0);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleManualLog = () => {
    console.log("manualMinutes handler triggered");
    if (manualMinutes && !isNaN(Number(manualMinutes))) {
      onTimeLog(skillId, parseInt(manualMinutes));
      setManualMinutes("");
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <ButtonGroup variant="contained" sx={{ mb: 2 }}>
        {!isTracking ? (
          <Button onClick={handleStartTracking} color="primary">
            Start Session
          </Button>
        ) : (
          <>
            <Button onClick={handleStopTracking} color="secondary">
              Stop Session
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
              {formatTime(elapsedTime)}
            </Box>
          </>
        )}
      </ButtonGroup>

      <Box sx={{ display: "flex", gap: 1 }}>
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
