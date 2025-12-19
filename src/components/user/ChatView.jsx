// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import { Capacitor } from "@capacitor/core";
// import { Keyboard } from "@capacitor/keyboard";
// import ChatBubble from "@components/user/ChatBubble";
// import ReactionMenu from "@components/user/ReactionMenu";
// import { ChatInput } from "@components/user/ChatInput";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
//   renderMessageContent,
//   isMobile,
//   sidebarWidth,
//   inputRef,
// }) {
//   const theme = useTheme();
//   const chatEndRef = useRef(null);
//   const chatContainerRef = useRef(null);
//   const isNative = Capacitor.isNativePlatform();

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);
//   const [inputHeight, setInputHeight] = useState(0);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   // Keyboard listeners for native
//   useEffect(() => {
//     if (!isNative) return;

//     const showListener = Keyboard.addListener("keyboardWillShow", (info) => {
//       setKeyboardHeight(info.keyboardHeight);
//     });

//     const hideListener = Keyboard.addListener("keyboardWillHide", () => {
//       setKeyboardHeight(0);
//     });

//     return () => {
//       showListener.remove();
//       hideListener.remove();
//     };
//   }, [isNative]);

//   // Scroll to bottom whenever messages or padding change
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [activeUser?.messages.length, inputHeight, keyboardHeight]);

//   const openReactionMenu = (event, msg) => {
//     setSelectedMessage(msg);
//     setReactionAnchor(event.currentTarget);
//   };

//   const closeReactionMenu = () => {
//     setReactionAnchor(null);
//     setSelectedMessage(null);
//   };

//   const applyReaction = (reaction) => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id !== activeUser.id
//           ? u
//           : {
//               ...u,
//               messages: u.messages.map((m) =>
//                 m.id === selectedMessage.id
//                   ? { ...m, reaction: m.reaction === reaction ? null : reaction }
//                   : m
//               ),
//             }
//       )
//     );
//     closeReactionMenu();
//   };

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   // Total bottom space = input height + keyboard height
//   const bottomSpacerHeight = inputHeight + keyboardHeight + 8; // small buffer

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       {/* Chat messages container */}
//       <Box
//         ref={chatContainerRef}
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           p: 2,
//           bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {activeUser.messages.map((msg) => (
//           <ChatBubble
//             key={msg.id}
//             msg={msg}
//             activeUser={activeUser}
//             isMe={msg.sender === "me"}
//             openReactionMenu={openReactionMenu}
//             getStatusColor={getStatusColor}
//             renderMessageContent={renderMessageContent}
//           />
//         ))}

//         {/* Spacer to keep last message above input */}
//         <div style={{ height: `${bottomSpacerHeight}px` }} />

//         <div ref={chatEndRef} />
//       </Box>

//       {/* Reaction menu */}
//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={closeReactionMenu}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

//       {/* Chat input */}
//       <ChatInput
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//         attachedFiles={attachedFiles}
//         setAttachedFiles={setAttachedFiles}
//         handleSend={handleSend}
//         inputRef={inputRef}
//         sidebarWidth={sidebarWidth}
//         keyboardHeight={keyboardHeight}
//         onHeightChange={setInputHeight}
//         handleFileInput={(files) => {
//           const arr = Array.from(files).slice(0, 8);
//           const withURLs = arr.map((f) => ({
//             file: f,
//             name: f.name,
//             type: f.type,
//             objectURL: URL.createObjectURL(f),
//           }));
//           setAttachedFiles((prev) => [...prev, ...withURLs]);
//           if (withURLs.length === 1) setMessageInput(withURLs[0].name);
//         }}
//         removeAttached={(index) => {
//           setAttachedFiles((prev) => {
//             const copy = [...prev];
//             const removed = copy.splice(index, 1)[0];
//             try {
//               URL.revokeObjectURL(removed.objectURL);
//             } catch {}
//             return copy;
//           });
//         }}
//       />
//     </Box>
//   );
// }

// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import ChatBubble from "@components/user/ChatBubble";
// import ReactionMenu from "@components/user/ReactionMenu";
// import { ChatInput } from "@components/user/ChatInput";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
//   renderMessageContent,
//   isMobile,
//   sidebarWidth,
//   inputRef,
//   keyboardHeight,
// }) {
//   const theme = useTheme();
//   const chatEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [inputHeight, setInputHeight] = useState(70);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   // Scroll to bottom whenever messages change or keyboard opens
//   useEffect(() => {
//     if (chatEndRef.current) {
//       setTimeout(() => {
//         chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 10);
//     }
//   }, [activeUser?.messages.length, attachedFiles.length, keyboardHeight]);

//   const openReactionMenu = (event, msg) => {
//     setSelectedMessage(msg);
//     setReactionAnchor(event.currentTarget);
//   };

//   const closeReactionMenu = () => {
//     setReactionAnchor(null);
//     setSelectedMessage(null);
//   };

//   const applyReaction = (reaction) => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id !== activeUser.id
//           ? u
//           : {
//               ...u,
//               messages: u.messages.map((m) =>
//                 m.id === selectedMessage.id
//                   ? { ...m, reaction: m.reaction === reaction ? null : reaction }
//                   : m
//               ),
//             }
//       )
//     );
//     closeReactionMenu();
//   };

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   // Calculate padding: 
//   // When keyboard is closed: just input height
//   // When keyboard is open: input has moved up, so we need input + keyboard space
//   const bottomPadding = inputHeight + keyboardHeight;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       {/* Chat messages container */}
//       <Box
//         ref={chatContainerRef}
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           overflowX: "hidden",
//           p: 0.5,
//           marginBottom: 10,
//           bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {activeUser.messages.map((msg) => (
//           <ChatBubble
//             key={msg.id}
//             msg={msg}
//             activeUser={activeUser}
//             isMe={msg.sender === "me"}
//             openReactionMenu={openReactionMenu}
//             getStatusColor={getStatusColor}
//             renderMessageContent={renderMessageContent}
//           />
//         ))}
        
//         <div ref={chatEndRef} style={{ height: "1px" }} />
//       </Box>

//       {/* Reaction menu */}
//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={closeReactionMenu}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

//       {/* Chat input - moves with keyboard */}
//       <ChatInput
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//         attachedFiles={attachedFiles}
//         setAttachedFiles={setAttachedFiles}
//         handleSend={handleSend}
//         inputRef={inputRef}
//         sidebarWidth={sidebarWidth}
//         keyboardHeight={keyboardHeight}
//         onHeightChange={setInputHeight}
//         handleFileInput={(files) => {
//           const arr = Array.from(files).slice(0, 8);
//           const withURLs = arr.map((f) => ({
//             file: f,
//             name: f.name,
//             type: f.type,
//             objectURL: URL.createObjectURL(f),
//           }));
//           setAttachedFiles((prev) => [...prev, ...withURLs]);
//           if (withURLs.length === 1) setMessageInput(withURLs[0].name);
//         }}
//         removeAttached={(index) => {
//           setAttachedFiles((prev) => {
//             const copy = [...prev];
//             const removed = copy.splice(index, 1)[0];
//             try {
//               URL.revokeObjectURL(removed.objectURL);
//             } catch {}
//             return copy;
//           });
//         }}
//       />
//     </Box>
//   );
// }



// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import ChatBubble from "@components/user/ChatBubble";
// import ReactionMenu from "@components/user/ReactionMenu";
// import { ChatInput } from "@components/user/ChatInput";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
//   renderMessageContent,
//   isMobile,
//   sidebarWidth,
//   inputRef,
//   keyboardHeight,
// }) {
//   const theme = useTheme();
//   const chatEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [inputHeight, setInputHeight] = useState(70);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   // Scroll to bottom whenever messages change or keyboard opens
//   useEffect(() => {
//     if (chatEndRef.current) {
//       setTimeout(() => {
//         chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 100);
//     }
//   }, [activeUser?.messages.length, attachedFiles.length, keyboardHeight]);

//   const openReactionMenu = (event, msg) => {
//     setSelectedMessage(msg);
//     setReactionAnchor(event.currentTarget);
//   };

//   const closeReactionMenu = () => {
//     setReactionAnchor(null);
//     setSelectedMessage(null);
//   };

//   const applyReaction = (reaction) => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id !== activeUser.id
//           ? u
//           : {
//               ...u,
//               messages: u.messages.map((m) =>
//                 m.id === selectedMessage.id
//                   ? { ...m, reaction: m.reaction === reaction ? null : reaction }
//                   : m
//               ),
//             }
//       )
//     );
//     closeReactionMenu();
//   };

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   // Messages container padding = where input field is positioned
//   // Input position: bottom = keyboardHeight
//   // Messages need padding = inputHeight + keyboardHeight
//   const bottomPadding = inputHeight + keyboardHeight + 10;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       {/* Chat messages container */}
//       <Box
//         ref={chatContainerRef}
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           overflowX: "hidden",
//           marginBottom: 10,
//           p: 2, // Dynamically adapts to input position
//           bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {activeUser.messages.map((msg) => (
//           <ChatBubble
//             key={msg.id}
//             msg={msg}
//             activeUser={activeUser}
//             isMe={msg.sender === "me"}
//             openReactionMenu={openReactionMenu}
//             getStatusColor={getStatusColor}
//             renderMessageContent={renderMessageContent}
//           />
//         ))}
        
//         <div ref={chatEndRef} style={{ height: "1px" }} />
//       </Box>

//       {/* Reaction menu */}
//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={closeReactionMenu}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

//       {/* Chat input - moves with keyboard */}
//       <ChatInput
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//         attachedFiles={attachedFiles}
//         setAttachedFiles={setAttachedFiles}
//         handleSend={handleSend}
//         inputRef={inputRef}
//         sidebarWidth={sidebarWidth}
//         keyboardHeight={keyboardHeight}
//         onHeightChange={setInputHeight}
//         handleFileInput={(files) => {
//           const arr = Array.from(files).slice(0, 8);
//           const withURLs = arr.map((f) => ({
//             file: f,
//             name: f.name,
//             type: f.type,
//             objectURL: URL.createObjectURL(f),
//           }));
//           setAttachedFiles((prev) => [...prev, ...withURLs]);
//           if (withURLs.length === 1) setMessageInput(withURLs[0].name);
//         }}
//         removeAttached={(index) => {
//           setAttachedFiles((prev) => {
//             const copy = [...prev];
//             const removed = copy.splice(index, 1)[0];
//             try {
//               URL.revokeObjectURL(removed.objectURL);
//             } catch {}
//             return copy;
//           });
//         }}
//       />
//     </Box>
//   );
// }


// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import ChatBubble from "@components/user/ChatBubble";
// import ReactionMenu from "@components/user/ReactionMenu";
// import { ChatInput } from "@components/user/ChatInput";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
//   renderMessageContent,
//   isMobile,
//   sidebarWidth,
//   inputRef,
//   keyboardHeight,
// }) {
//   const theme = useTheme();
//   const chatEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [inputHeight, setInputHeight] = useState(70);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   // Scroll to bottom only when NEW messages arrive
//   useEffect(() => {
//     if (chatEndRef.current) {
//       setTimeout(() => {
//         chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 100);
//     }
//   }, [activeUser?.messages.length]); // Only trigger on new messages

//   const openReactionMenu = (event, msg) => {
//     setSelectedMessage(msg);
//     setReactionAnchor(event.currentTarget);
//   };

//   const closeReactionMenu = () => {
//     setReactionAnchor(null);
//     setSelectedMessage(null);
//   };

//   const applyReaction = (reaction) => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id !== activeUser.id
//           ? u
//           : {
//               ...u,
//               messages: u.messages.map((m) =>
//                 m.id === selectedMessage.id
//                   ? { ...m, reaction: m.reaction === reaction ? null : reaction }
//                   : m
//               ),
//             }
//       )
//     );
//     closeReactionMenu();
//   };

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   // Calculate padding: inputHeight + keyboardHeight
//   const bottomPadding = inputHeight + keyboardHeight + 10;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       {/* Chat messages container */}
//       <Box
//         ref={chatContainerRef}
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           overflowX: "hidden",
//           p: 2,
//           pb: `${bottomPadding}px`, // Dynamic padding for input + keyboard
//           bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {activeUser.messages.map((msg) => (
//           <ChatBubble
//             key={msg.id}
//             msg={msg}
//             activeUser={activeUser}
//             isMe={msg.sender === "me"}
//             openReactionMenu={openReactionMenu}
//             getStatusColor={getStatusColor}
//             renderMessageContent={renderMessageContent}
//           />
//         ))}
        
//         <div ref={chatEndRef} style={{ height: "1px" }} />
//       </Box>

//       {/* Reaction menu */}
//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={closeReactionMenu}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

//       {/* Chat input */}
//       <ChatInput
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//         attachedFiles={attachedFiles}
//         setAttachedFiles={setAttachedFiles}
//         handleSend={handleSend}
//         inputRef={inputRef}
//         sidebarWidth={sidebarWidth}
//         keyboardHeight={keyboardHeight}
//         onHeightChange={setInputHeight}
//         handleFileInput={(files) => {
//           const arr = Array.from(files).slice(0, 8);
//           const withURLs = arr.map((f) => ({
//             file: f,
//             name: f.name,
//             type: f.type,
//             objectURL: URL.createObjectURL(f),
//           }));
//           setAttachedFiles((prev) => [...prev, ...withURLs]);
//           if (withURLs.length === 1) setMessageInput(withURLs[0].name);
//         }}
//         removeAttached={(index) => {
//           setAttachedFiles((prev) => {
//             const copy = [...prev];
//             const removed = copy.splice(index, 1)[0];
//             try {
//               URL.revokeObjectURL(removed.objectURL);
//             } catch {}
//             return copy;
//           });
//         }}
//       />
//     </Box>
//   );
// }


import React, { useRef, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import ChatBubble from "@components/user/ChatBubble";
import ReactionMenu from "@components/user/ReactionMenu";
import { ChatInput } from "@components/user/ChatInput";

export default function ChatView({
  activeUser,
  users,
  setUsers,
  messageInput,
  setMessageInput,
  attachedFiles,
  setAttachedFiles,
  handleSend,
  renderMessageContent,
  isMobile,
  sidebarWidth,
  inputRef,
  keyboardHeight,
}) {
  const theme = useTheme();
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [reactionAnchor, setReactionAnchor] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [inputHeight, setInputHeight] = useState(70);

  const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

  // 🔹 RETURNED getStatusColor
  const getStatusColor = (status) => {
    if (status === "seen") return "#04ff00";
    if (status === "delivered") return theme.palette.text.secondary;
    return theme.palette.text.disabled;
  };

  useEffect(() => {
    if (chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [activeUser?.messages.length]);

  const openReactionMenu = (event, msg) => {
    setSelectedMessage(msg);
    setReactionAnchor(event.currentTarget);
  };

  const closeReactionMenu = () => {
    setReactionAnchor(null);
    setSelectedMessage(null);
  };

  const applyReaction = (reaction) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id !== activeUser.id
          ? u
          : {
              ...u,
              messages: u.messages.map((m) =>
                m.id === selectedMessage.id
                  ? { ...m, reaction: m.reaction === reaction ? null : reaction }
                  : m
              ),
            }
      )
    );
    closeReactionMenu();
  };

  const bottomPadding = inputHeight + keyboardHeight + 10;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        ref={chatContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
          p: 2,
          pb: `${bottomPadding}px`,
          bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {activeUser.messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            msg={msg}
            activeUser={activeUser}
            isMe={msg.sender === "me"}
            openReactionMenu={openReactionMenu}
            getStatusColor={getStatusColor} /* ← restored */
            renderMessageContent={renderMessageContent}
          />
        ))}

        <div ref={chatEndRef} style={{ height: "1px" }} />
      </Box>

      <ReactionMenu
        anchorEl={reactionAnchor}
        open={Boolean(reactionAnchor)}
        onClose={closeReactionMenu}
        onSelectReaction={applyReaction}
        reactionOptions={reactionOptions}
      />

      <ChatInput
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        attachedFiles={attachedFiles}
        setAttachedFiles={setAttachedFiles}
        handleSend={handleSend}
        inputRef={inputRef}
        sidebarWidth={sidebarWidth}
        keyboardHeight={keyboardHeight}
        onHeightChange={setInputHeight}
        handleFileInput={(files) => {
          const arr = Array.from(files).slice(0, 8);
          const withURLs = arr.map((f) => ({
            file: f,
            name: f.name,
            type: f.type,
            objectURL: URL.createObjectURL(f),
          }));
          setAttachedFiles((prev) => [...prev, ...withURLs]);
          if (withURLs.length === 1) setMessageInput(withURLs[0].name);
        }}
        removeAttached={(index) => {
          setAttachedFiles((prev) => {
            const copy = [...prev];
            const removed = copy.splice(index, 1)[0];
            try {
              URL.revokeObjectURL(removed.objectURL);
            } catch {}
            return copy;
          });
        }}
      />
    </Box>
  );
}
