import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AttachmentPreview({ files, removeFile }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", mr: 1 }}>
      {files.map((f, idx) => {
        const isImg = f.name.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
        const isVid = f.name.match(/\.(mp4|webm|ogg|mov|m4v)$/i);

        return (
          <Box
            key={idx}
            sx={{
              position: "relative",
              width: 60,
              height: 60,
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            }}
          >
            {isImg ? (
              <img
                src={f.objectURL}
                alt={f.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : isVid ? (
              <video
                src={f.objectURL}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(0,0,0,0.04)",
                }}
              >
                <Typography variant="caption" sx={{ px: 0.5, textAlign: "center" }}>
                  {f.name.length > 10 ? `${f.name.slice(0, 8)}…` : f.name}
                </Typography>
              </Box>
            )}
            <IconButton
              size="small"
              onClick={() => removeFile(idx)}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                bgcolor: theme.palette.background.paper,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
}
