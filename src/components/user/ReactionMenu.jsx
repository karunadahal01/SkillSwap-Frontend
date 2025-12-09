import React from "react";
import { Menu, MenuItem, useTheme } from "@mui/material";

export default function ReactionMenu({ anchorEl, open, onClose, onSelectReaction, reactionOptions }) {
  const theme = useTheme();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            padding: "auto",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "row",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          },
        },
        list: {
          sx: { display: "flex", flexDirection: "row", px: 0, py: 0.5 },
        },
      }}
    >
      {reactionOptions.map((r) => (
        <MenuItem
          key={r}
          onClick={() => onSelectReaction(r)}
          sx={{
            fontSize: "22px",
            padding: "6px 10px",
            minWidth: "auto",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {r}
        </MenuItem>
      ))}
    </Menu>
  );
}
