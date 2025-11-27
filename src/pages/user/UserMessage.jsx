// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Avatar,
//   IconButton,
//   TextField,
//   Link as MuiLink,
//   useMediaQuery,
// } from "@mui/material";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import SendIcon from "@mui/icons-material/Send";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CloseIcon from "@mui/icons-material/Close";

// const dummyUsers = [
//   {
//     id: 1,
//     name: "Alice",
//     avatar: "A",
//     messages: [
//       { id: 1, sender: "them", type: "text", content: "Can we swap?" },
//       { id: 2, sender: "me", type: "text", content: "Yes, tomorrow works." },
//       { id: 3, sender: "them", type: "text", content: "Perfect!" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Bob",
//     avatar: "B",
//     messages: [
//       { id: 4, sender: "them", type: "text", content: "Ready for our class?" },
//       { id: 5, sender: "me", type: "text", content: "Yes!" },
//     ],
//   },
// ];

// const renderMessage = (msg) => {
//   if (msg.type === "file") {
//     return (
//       <MuiLink
//         href={msg.fileURL}
//         target="_blank"
//         underline="hover"
//         sx={{ color: "#fff" }}   // 🔥 Make attachment link white
//       >
//         📎 {msg.fileName}
//       </MuiLink>
//     );
//   }

//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const parts = msg.content.split(urlRegex);

//   return parts.map((p, i) =>
//     urlRegex.test(p) ? (
//       <MuiLink
//         key={i}
//         href={p}
//         target="_blank"
//         underline="hover"
//         sx={{ color: "#fff" }}  // 🔥 Make URL link white
//       >
//         {p}
//       </MuiLink>
//     ) : (
//       <span key={i} style={{ color: "#fff" }}>{p}</span> // 🔥 optional
//     )
//   );
// };


// export default function UserMessages() {
//   const [users, setUsers] = useState(dummyUsers);
//   const [activeUserId, setActiveUserId] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [attachedFile, setAttachedFile] = useState(null);

//   const chatRef = useRef(null);
//   const mode = localStorage.getItem("themeMode") || "light";
//   const isMobile = useMediaQuery("(max-width:768px)");

//   const activeUser = users.find((u) => u.id === activeUserId);

//   // Auto-scroll whenever chat opens or messages update
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [activeUser]);

//   const handleSend = () => {
//     if (!messageInput && !attachedFile) return;

//     const newMsg = {
//       id: Date.now(),
//       sender: "me",
//       type: attachedFile ? "file" : "text",
//       content: messageInput,
//       fileName: attachedFile?.name,
//       fileURL: attachedFile ? URL.createObjectURL(attachedFile) : null,
//     };

//     setUsers((previous) =>
//       previous.map((user) =>
//         user.id === activeUserId
//           ? { ...user, messages: [...user.messages, newMsg] }
//           : user
//       )
//     );

//     setMessageInput("");
//     setAttachedFile(null);

//     // Smooth auto-scroll
//     setTimeout(() => {
//       if (chatRef.current)
//         chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }, 50);
//   };

//   return (
//     <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//       {/* Fixed Top Header */}
//       <Box
//         sx={{
//           p: 1.5,
//           borderBottom: "1px solid",
//           borderColor: "divider",
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//           bgcolor: mode === "dark" ? "#111" : "#fff",
//           position: "fixed",
//           top: 55,
//           left:0,
//           right:0,
//           zIndex: 200,
//         }}
//       >
//         {activeUser && (
//           <IconButton onClick={() => setActiveUserId(null)}>
//             <ArrowBackIcon />
//           </IconButton>
//         )}

//         <Typography variant="h6" fontWeight="600">
//           {activeUser ? activeUser.name : "Messages"}
//         </Typography>
//       </Box>
//       {/* User List */}
// {!activeUser && (
//   <Box
//     sx={{
//       flexGrow: 1,
//       overflowY: "auto",
//       p: 1,
//       mt: "40px",   // 🔥 Prevent overlap with fixed header
//       bgcolor: mode === "dark" ? "#111" : "#f3f3f3",
//     }}
//   >
//     {users.map((u) => {
//       const last = u.messages[u.messages.length - 1];
//       const isBold = last?.sender === "them";

//       return (
//         <Box
//           key={u.id}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             p: 1,
//             mb: 1,
//             borderRadius: 2,
//             bgcolor: mode === "dark" ? "#1a1a1a" : "#fff",
//             cursor: "pointer",
//           }}
//           onClick={() => setActiveUserId(u.id)}
//         >
//           <Avatar sx={{ mr: 2 }}>{u.avatar}</Avatar>

//           <Box sx={{ width: "100%" }}>
//             <Typography fontWeight="bold">{u.name}</Typography>

//             <Typography
//               variant="caption"
//               sx={{
//                 fontWeight: isBold ? "bold" : "normal",
//                 opacity: 0.8,
//               }}
//               noWrap
//             >
//               {last?.content}
//             </Typography>
//           </Box>
//         </Box>
//       );
//     })}
//   </Box>
// )}
//       {/* Chat Page */}
//       {activeUser && (
//         <Box
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             flexDirection: "column",
//             position: "relative",
//           }}
//         >
//           {/* Messages */}
//           <Box
//             ref={chatRef}
//             sx={{
//               flexGrow: 1,
//               overflowY: "auto",
//               p: 2,
//               mt: "40px",     // 🔥 Prevent chat from hiding behind fixed header
//               bgcolor: mode === "dark" ? "#111" : "#eee",
//               pb: 10,
//             }}
//           >
//             {activeUser.messages.map((msg) => (
//               <Box
//                 key={msg.id}
//                 sx={{
//                   display: "flex",
//                   justifyContent:
//                     msg.sender === "me" ? "flex-end" : "flex-start",
//                   mb: 1.5,
//                 }}
//               >
//                 <Paper
//                   sx={{
//                     p: 1.5,
//                     maxWidth: "75%",
//                     bgcolor:
//                       msg.sender === "me"
//                         ? "primary.main"
//                         : mode === "dark"
//                         ? "#2a2a2a"
//                         : "secondary.main",
//                     color: msg.sender === "me" ? "#fff" : "#000",
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {renderMessage(msg)}
//                 </Paper>
//               </Box>
//             ))}
//           </Box>

//           {/* Fixed Input Bar */}
//           <Box
//             sx={{
//               p: 1,
//               borderTop: "1px solid",
//               borderColor: "divider",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               bgcolor: mode === "dark" ? "#111" : "#fff",
//               position: "fixed",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               zIndex: 30,
//             }}
//           >
//             {/* File upload for BOTH users */}
//             <input
//               type="file"
//               id="file-upload"
//               style={{ display: "none" }}
//               onChange={(e) => setAttachedFile(e.target.files[0])}
//             />

//             <label htmlFor="file-upload">
//               <IconButton component="span">
//                 <AttachFileIcon />
//               </IconButton>
//             </label>

//             <TextField
//               fullWidth
//               placeholder="Type message…"
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               size="small"
//             />

//             <IconButton color="primary" onClick={handleSend}>
//               <SendIcon />
//             </IconButton>

//             {attachedFile && (
//               <IconButton onClick={() => setAttachedFile(null)}>
//                 <CloseIcon />
//               </IconButton>
//             )}
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Link as MuiLink,
  useMediaQuery,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    avatar: "A",
    messages: [
      { id: 1, sender: "them", type: "text", content: "Can we swap?" },
      { id: 2, sender: "me", type: "text", content: "Yes, tomorrow works." },
      { id: 3, sender: "them", type: "text", content: "Perfect!" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    avatar: "B",
    messages: [
      { id: 4, sender: "them", type: "text", content: "Ready for our class?" },
      { id: 5, sender: "me", type: "text", content: "Yes!" },
    ],
  },
];

const renderMessage = (msg) => {
  if (msg.type === "file") {
    return (
      <MuiLink
        href={msg.fileURL}
        target="_blank"
        underline="hover"
        sx={{ color: "#fff" }}
      >
        📎 {msg.fileName}
      </MuiLink>
    );
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = msg.content.split(urlRegex);

  return parts.map((p, i) =>
    urlRegex.test(p) ? (
      <MuiLink
        key={i}
        href={p}
        target="_blank"
        underline="hover"
        sx={{ color: "#fff" }}
      >
        {p}
      </MuiLink>
    ) : (
      <span key={i} style={{ color: "#fff" }}>{p}</span>
    )
  );
};

export default function UserMessages() {
  const [users, setUsers] = useState(dummyUsers);
  const [activeUserId, setActiveUserId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const chatRef = useRef(null);
  const mode = localStorage.getItem("themeMode") || "light";
  const isMobile = useMediaQuery("(max-width:768px)");

  const activeUser = users.find((u) => u.id === activeUserId);

  // Auto-scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [activeUser]);

  const handleSend = () => {
    if (!messageInput && !attachedFile) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      type: attachedFile ? "file" : "text",
      content: messageInput,
      fileName: attachedFile?.name,
      fileURL: attachedFile ? URL.createObjectURL(attachedFile) : null,
    };

    setUsers((prev) =>
      prev.map((u) =>
        u.id === activeUserId ? { ...u, messages: [...u.messages, newMsg] } : u
      )
    );

    setMessageInput("");
    setAttachedFile(null);

    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 50);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* FIXED HEADER ALWAYS VISIBLE */}
      <Box
        sx={{
          p: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: mode === "dark" ? "#111" : "#fff",
          position: "fixed",
          top: 55,
          left: 0,
          right: 0,
          zIndex: 200,
        }}
      >
        {activeUser && (
          <IconButton onClick={() => setActiveUserId(null)}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <Typography variant="h6" fontWeight="600">
          {activeUser ? activeUser.name : "Messages"}
        </Typography>
      </Box>

      {/* USER LIST */}
      {!activeUser && (
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 1,
            mt: "40px",
            bgcolor: mode === "dark" ? "#111" : "#f3f3f3",
          }}
        >
          {users.map((u) => {
            const last = u.messages[u.messages.length - 1];
            const isBold = last?.sender === "them";

            return (
              <Box
                key={u.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: mode === "dark" ? "#1a1a1a" : "#fff",
                  cursor: "pointer",
                }}
                onClick={() => setActiveUserId(u.id)}
              >
                <Avatar sx={{ mr: 2 }}>{u.avatar}</Avatar>

                <Box sx={{ width: "100%" }}>
                  <Typography fontWeight="bold">{u.name}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: isBold ? "bold" : "normal",
                      opacity: 0.8,
                    }}
                    noWrap
                  >
                    {last?.content}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {/* CHAT PAGE */}
      {activeUser && (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* CHAT MESSAGES */}
          <Box
            ref={chatRef}
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              mt: "40px",
              bgcolor: mode === "dark" ? "#111" : "#eee",
              pb: 10,
            }}
          >
            {activeUser.messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "me" ? "flex-end" : "flex-start",
                  mb: 1.5,
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: "75%",
                    bgcolor:
                      msg.sender === "me"
                        ? "primary.main"
                        : mode === "dark"
                        ? "#2a2a2a"
                        : "secondary.main",
                    color: msg.sender === "me" ? "#fff" : "#000",
                    wordBreak: "break-word",
                  }}
                >
                  {renderMessage(msg)}
                </Paper>
              </Box>
            ))}
          </Box>

          {/* FIXED INPUT BAR */}
          <Box
            sx={{
              p: 1,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: mode === "dark" ? "#111" : "#fff",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 30,
            }}
          >
            {/* UPDATED FILE INPUT (SHOW FILENAME) */}
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                setAttachedFile(file);
                if (file) setMessageInput(file.name);
              }}
            />

            <label htmlFor="file-upload">
              <IconButton component="span">
                <AttachFileIcon />
              </IconButton>
            </label>

            <TextField
              fullWidth
              placeholder="Type message…"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              size="small"
            />

            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>

            {attachedFile && (
              <IconButton
                onClick={() => {
                  setAttachedFile(null);
                  setMessageInput("");
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
