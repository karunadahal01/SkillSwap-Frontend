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

//   // 🔹 RETURNED getStatusColor
//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   useEffect(() => {
//     if (chatEndRef.current) {
//       setTimeout(() => {
//         chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 100);
//     }
//   }, [activeUser?.messages.length]);

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

//   const bottomPadding = inputHeight + keyboardHeight + 10;

//   return (
//     <Box
//       sx={{
//         marginTop: 10,
//         paddingBottom: 16,
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <Box
//         ref={chatContainerRef}
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           overflowX: "hidden",
//           p: 2,
//           pb: `${bottomPadding}px`,
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
//             getStatusColor={getStatusColor} /* ← restored */
//             renderMessageContent={renderMessageContent}
//           />
//         ))}

//         <div ref={chatEndRef} style={{ height: "1px" }} />
//       </Box>

//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={closeReactionMenu}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

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
// import { renderMessageContent } from "@utils/chatUtils";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
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

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   useEffect(() => {
//     if (chatEndRef.current) {
//       setTimeout(() => {
//         chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 100);
//     }
//   }, [activeUser?.messages.length]);

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
//       <Box
//         ref={chatContainerRef}
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           overflowX: "hidden",
//           p: 2,
//           pb: `${bottomPadding}px`,
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

//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={closeReactionMenu}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

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

// // src/components/user/ChatView.jsx
// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import ChatBubble from "@components/user/ChatBubble";
// import ReactionMenu from "@components/user/ReactionMenu";
// import { ChatInput } from "@components/user/ChatInput";
// import { renderMessageContent } from "@utils/chatUtils";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
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

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (chatEndRef.current) {
//       setTimeout(() => {
//         chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 100);
//     }
//   }, [activeUser?.messages.length]);

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
//           pb: `${bottomPadding}px`,
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
//           // DON'T set filename as message input
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



// // src/components/user/ChatView.jsx
// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme, Dialog, DialogContent } from "@mui/material";
// import ChatBubble from "@components/user/ChatBubble";
// import ReactionMenu from "@components/user/ReactionMenu";
// import { ChatInput } from "@components/user/ChatInput";
// import { renderMessageContent } from "@utils/chatUtils";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
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

//   // ✅ New state for image lightbox
//   const [lightboxImage, setLightboxImage] = useState(null);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   useEffect(() => {
//     if (chatEndRef.current) {
//       setTimeout(() => {
//         chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 100);
//     }
//   }, [activeUser?.messages.length]);

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
//           marginTop: 4,
//           flexGrow: 1,
//           overflowY: "auto",
//           overflowX: "hidden",
//           p: 2,
//           pb: `${bottomPadding}px`,
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
//             renderMessageContent={(m) => renderMessageContent(m, setLightboxImage)} // ✅ pass callback
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

//       {/* ✅ Image lightbox */}
//       <Dialog open={Boolean(lightboxImage)} onClose={() => setLightboxImage(null)} maxWidth="lg">
//         <DialogContent sx={{ p: 0, bgcolor: "black" }}>
//           <img src={lightboxImage} alt="" style={{ width: "100%", height: "auto" }} />
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }




// // src/components/user/ChatView.jsx
// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme, Dialog, DialogContent, Typography, Avatar } from "@mui/material";
// import ChatBubble from "@components/user/ChatBubble";
// import ReactionMenu from "@components/user/ReactionMenu";
// import {ChatInput} from "@components/user/ChatInput";
// import { format } from "date-fns";

// export default function ChatView({
//   activeUser,
//   messages,
//   setMessages,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
//   inputRef,
//   keyboardHeight,
// }) {
//   const theme = useTheme();
//   const chatEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [inputHeight, setInputHeight] = useState(70);
//   const [lightboxImage, setLightboxImage] = useState(null);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   const bottomPadding = inputHeight + keyboardHeight + 10;

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (chatEndRef.current) {
//       setTimeout(() => {
//         chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 50);
//     }
//   }, [messages]);

//   const openReactionMenu = (event, msg) => {
//     setSelectedMessage(msg);
//     setReactionAnchor(event.currentTarget);
//   };

//   const closeReactionMenu = () => {
//     setReactionAnchor(null);
//     setSelectedMessage(null);
//   };

//   const applyReaction = (reaction) => {
//     setMessages((prev) =>
//       prev.map((m) =>
//         m === selectedMessage
//           ? { ...m, reaction: m.reaction === reaction ? null : reaction }
//           : m
//       )
//     );
//     closeReactionMenu();
//   };

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   const renderMessageContent = (msg) => {
//     // File message
//     if (msg.type === "file" && msg.files) {
//       return (
//         <Box display="flex" flexDirection="column" gap={1}>
//           {msg.files.map((f, i) => (
//             <Box
//               key={i}
//               sx={{
//                 cursor: "pointer",
//                 p: 1,
//                 bgcolor: theme.palette.mode === "dark" ? "#222" : "#e0e0e0",
//                 borderRadius: 1,
//                 maxWidth: "200px",
//               }}
//               onClick={() => setLightboxImage(f.fileURL)}
//             >
//               <Typography variant="body2">{f.fileName}</Typography>
//             </Box>
//           ))}
//           {msg.content && (
//             <Typography variant="body2" sx={{ mt: 0.5 }}>
//               {msg.content}
//             </Typography>
//           )}
//         </Box>
//       );
//     }

//     // Text message
//     return <Typography variant="body2">{msg.content}</Typography>;
//   };

//   const formatTime = (isoString) => {
//     try {
//       return format(new Date(isoString), "HH:mm"); // 24-hour format
//     } catch {
//       return "";
//     }
//   };

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
//           pb: `${bottomPadding}px`,
//           bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {messages.map((msg, index) => (
//           <ChatBubble
//             key={index}
//             msg={msg}
//             isMe={msg.sender === "me"}
//             openReactionMenu={openReactionMenu}
//             getStatusColor={getStatusColor}
//             renderMessageContent={() => renderMessageContent(msg)}
//             timestamp={formatTime(msg.createdAt)}
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

//       {/* Image lightbox */}
//       <Dialog open={Boolean(lightboxImage)} onClose={() => setLightboxImage(null)} maxWidth="lg">
//         <DialogContent sx={{ p: 0, bgcolor: "black" }}>
//           <img src={lightboxImage} alt="" style={{ width: "100%", height: "auto" }} />
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }





// // src/components/user/ChatView.jsx
// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme, Dialog, DialogContent } from "@mui/material";
// import ChatBubble from "./ChatBubble";
// import ReactionMenu from "./ReactionMenu";
// import { ChatInput } from "./ChatInput";
// import { renderMessageContent } from "@utils/chatUtils";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
//   isMobile,
//   sidebarWidth,
//   inputRef,
//   keyboardHeight,
// }) {
//   const theme = useTheme();
//   const chatEndRef = useRef(null);

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [inputHeight, setInputHeight] = useState(70);
//   const [lightboxImage, setLightboxImage] = useState(null);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (chatEndRef.current && activeUser?.messages?.length) {
//       setTimeout(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
//       }, 100);
//     }
//   }, [activeUser?.messages?.length]);

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

//   const bottomPadding = inputHeight + keyboardHeight + 10;
//   const messages = activeUser?.messages || [];

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", overflow: "hidden", position: "relative" }}>
//       <Box
//         sx={{
//           marginTop: 4,
//           flexGrow: 1,
//           overflowY: "auto",
//           overflowX: "hidden",
//           p: 2,
//           pb: `${bottomPadding}px`,
//           bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {messages.map((msg) => (
//           <ChatBubble
//             key={msg.id}
//             msg={msg}
//             activeUser={activeUser}
//             isMe={msg.sender === "me"}
//             openReactionMenu={openReactionMenu}
//             getStatusColor={getStatusColor}
//             renderMessageContent={(m) => renderMessageContent(m, setLightboxImage)}
//           />
//         ))}

//         <div ref={chatEndRef} style={{ height: "1px" }} />
//       </Box>

//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={closeReactionMenu}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

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
//           const withURLs = arr.map((f) => ({ file: f, name: f.name, type: f.type, objectURL: URL.createObjectURL(f) }));
//           setAttachedFiles((prev) => [...prev, ...withURLs]);
//         }}
//         removeAttached={(index) => {
//           setAttachedFiles((prev) => {
//             const copy = [...prev];
//             const removed = copy.splice(index, 1)[0];
//             try { URL.revokeObjectURL(removed.objectURL); } catch {}
//             return copy;
//           });
//         }}
//       />

//       <Dialog open={Boolean(lightboxImage)} onClose={() => setLightboxImage(null)} maxWidth="lg">
//         <DialogContent sx={{ p: 0, bgcolor: "black" }}>
//           <img src={lightboxImage} alt="" style={{ width: "100%", height: "auto" }} />
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }



// // src/components/user/ChatView.jsx
// import React, { useRef, useEffect, useState } from "react";
// import { Box, useTheme, Dialog, DialogContent } from "@mui/material";
// import ChatBubble from "./ChatBubble";
// import ReactionMenu from "./ReactionMenu";
// import { ChatInput } from "./ChatInput";
// import { renderMessageContent } from "@utils/chatUtils";

// export default function ChatView({
//   activeUser,
//   users,
//   setUsers,
//   messageInput,
//   setMessageInput,
//   attachedFiles,
//   setAttachedFiles,
//   handleSend,
//   inputRef,
//   keyboardHeight,
//   sidebarWidth,
// }) {
//   const theme = useTheme();
//   const chatEndRef = useRef(null);

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [inputHeight, setInputHeight] = useState(70);
//   const [lightboxImage, setLightboxImage] = useState(null);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeUser?.messages?.length]);

//   const openReactionMenu = (e, msg) => {
//     e.stopPropagation();
//     setSelectedMessage(msg);
//     setReactionAnchor(e.currentTarget);
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
//                   ? { ...m, reaction }
//                   : m
//               ),
//             }
//       )
//     );
//     setReactionAnchor(null);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           height: "100%",
//           overflowY: "auto",
//           px: 2,
//           pb: inputHeight + keyboardHeight + 10,
//           bgcolor:
//             theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//         }}
//       >
//         {(activeUser.messages || []).map((msg) => (
//           <ChatBubble
//             key={msg.id}
//             msg={msg}
//             activeUser={activeUser}
//             isMe={msg.sender === "me"}
//             openReactionMenu={openReactionMenu}
//             getStatusColor={getStatusColor}
//             renderMessageContent={(m) =>
//               renderMessageContent(m, setLightboxImage)
//             }
//           />
//         ))}
//         <div ref={chatEndRef} />
//       </Box>

//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={() => setReactionAnchor(null)}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

//       <ChatInput
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//         attachedFiles={attachedFiles}
//         setAttachedFiles={setAttachedFiles}
//         handleSend={handleSend}
//         inputRef={inputRef}
//         keyboardHeight={keyboardHeight}
//         sidebarWidth={sidebarWidth}
//         onHeightChange={setInputHeight}
//         handleFileInput={(files) =>
//           setAttachedFiles((prev) => [
//             ...prev,
//             ...Array.from(files).map((f) => ({
//               file: f,
//               name: f.name,
//               type: f.type,
//               objectURL: URL.createObjectURL(f),
//             })),
//           ])
//         }
//         removeAttached={(index) =>
//           setAttachedFiles((prev) =>
//             prev.filter((_, i) => i !== index)
//           )
//         }
//       />

//       <Dialog open={Boolean(lightboxImage)} onClose={() => setLightboxImage(null)}>
//         <DialogContent sx={{ p: 0, bgcolor: "black" }}>
//           <img src={lightboxImage} alt="" style={{ width: "100%" }} />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


// // src/components/user/ChatView.jsx
// import React, { useRef, useEffect, useState } from "react";
// import { Box, Dialog, DialogContent, useTheme } from "@mui/material";
// import ChatBubble from "./ChatBubble";
// import ReactionMenu from "./ReactionMenu";

// export default function ChatView({ messages = [], currentUserId }) {
//   const theme = useTheme();
//   const chatEndRef = useRef(null);

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [lightboxMedia, setLightboxMedia] = useState(null);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const openReactionMenu = (e, msg) => {
//     e.stopPropagation();
//     setSelectedMessage(msg);
//     setReactionAnchor(e.currentTarget);
//   };

//   const applyReaction = (reaction) => {
//     if (!selectedMessage) return;

//     selectedMessage.reaction = reaction; // directly mutate; or handle via state in parent
//     setReactionAnchor(null);
//   };

//   const renderMessageContent = (msg) => {
//     if (msg.type === "text") return <Box>{msg.content}</Box>;
//     if (msg.type === "file" && msg.files?.length > 0) {
//       return (
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//           {msg.files.map((f, idx) => {
//             const isImg = /\.(jpeg|jpg|png|webp|gif)$/i.test(f.fileName);
//             const isVid = /\.(mp4|webm|mov|m4v)$/i.test(f.fileName);
//             if (isImg || isVid) {
//               return (
//                 <Box
//                   key={idx}
//                   component="img"
//                   src={f.fileURL}
//                   alt={f.fileName}
//                   sx={{ maxWidth: 200, borderRadius: 2, cursor: "pointer" }}
//                   onClick={() => setLightboxMedia(f.fileURL)}
//                 />
//               );
//             }
//             return (
//               <Box
//                 key={idx}
//                 sx={{
//                   p: 1,
//                   bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#eee",
//                   borderRadius: 1,
//                 }}
//               >
//                 📄 {f.fileName}
//               </Box>
//             );
//           })}
//         </Box>
//       );
//     }
//     return null;
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           height: "100%",
//           overflowY: "auto",
//           px: 2,
//           py: 2,
//           bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//         }}
//       >
//         {messages.map((msg) => (
//           <ChatBubble
//             key={msg.messageId || msg.id}
//             msg={msg}
//             isMe={msg.senderId === currentUserId}
//             openReactionMenu={openReactionMenu}
//             renderMessageContent={renderMessageContent}
//           />
//         ))}
//         <div ref={chatEndRef} />
//       </Box>

//       {/* Reaction Menu */}
//       <ReactionMenu
//         anchorEl={reactionAnchor}
//         open={Boolean(reactionAnchor)}
//         onClose={() => setReactionAnchor(null)}
//         onSelectReaction={applyReaction}
//         reactionOptions={reactionOptions}
//       />

//       {/* Lightbox for images/videos */}
//       <Dialog
//         open={Boolean(lightboxMedia)}
//         onClose={() => setLightboxMedia(null)}
//         maxWidth="lg"
//       >
//         <DialogContent sx={{ p: 0, bgcolor: "black" }}>
//           {lightboxMedia && (
//             <Box
//               component="img"
//               src={lightboxMedia}
//               alt=""
//               sx={{ width: "100%", maxHeight: "90vh", objectFit: "contain" }}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }




// src/components/user/ChatView.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Box, useTheme, Dialog, DialogContent } from '@mui/material';
import ChatBubble from '@components/user/ChatBubble';
import ReactionMenu from '@components/user/ReactionMenu';
import { ChatInput } from '@components/user/ChatInput';
import { renderMessageContent } from '@utils/chatUtils';

export default function ChatView({
  activeUser,
  messages = [],
  currentUserId,
  messageInput,
  setMessageInput,
  attachedFiles,
  setAttachedFiles,
  handleSend,
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
  const [lightboxImage, setLightboxImage] = useState(null);

  const reactionOptions = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  const getStatusColor = (isRead) => {
    if (isRead) return '#04ff00';
    return theme.palette.text.secondary;
  };

  // ✅ Fixed: Scroll to bottom with null check
  useEffect(() => {
    if (chatEndRef.current) {
      setTimeout(() => {
        // ✅ Check if ref still exists before scrolling
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 100);
    }
  }, [messages.length]);

  const openReactionMenu = (event, msg) => {
    setSelectedMessage(msg);
    setReactionAnchor(event.currentTarget);
  };

  const closeReactionMenu = () => {
    setReactionAnchor(null);
    setSelectedMessage(null);
  };

  const applyReaction = (reaction) => {
    // TODO: Implement reaction API call
    console.log('Apply reaction:', reaction, 'to message:', selectedMessage);
    closeReactionMenu();
  };

  const bottomPadding = inputHeight + keyboardHeight + 10;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Chat messages container */}
      <Box
        ref={chatContainerRef}
        sx={{
          marginTop: 4,
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          p: 2,
          pb: `${bottomPadding}px`,
          bgcolor: theme.palette.mode === 'dark' ? '#191818' : '#f4f6f8',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          
          return (
            <ChatBubble
              key={msg.messageId}
              msg={{
                id: msg.messageId,
                content: msg.content,
                type: msg.type || 'text',
                sender: msg.sender,
                status: isMe ? (msg.isRead ? 'seen' : 'delivered') : null,
                reaction: msg.reaction || null,
                files: msg.files || [],
              }}
              activeUser={activeUser}
              isMe={isMe}
              openReactionMenu={openReactionMenu}
              getStatusColor={() => getStatusColor(msg.isRead)}
              renderMessageContent={(m) => renderMessageContent(m, setLightboxImage)}
            />
          );
        })}

        <div ref={chatEndRef} style={{ height: '1px' }} />
      </Box>

      {/* Reaction menu */}
      <ReactionMenu
        anchorEl={reactionAnchor}
        open={Boolean(reactionAnchor)}
        onClose={closeReactionMenu}
        onSelectReaction={applyReaction}
        reactionOptions={reactionOptions}
      />

      {/* Chat input */}
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

      {/* Image lightbox */}
      <Dialog open={Boolean(lightboxImage)} onClose={() => setLightboxImage(null)} maxWidth="lg">
        <DialogContent sx={{ p: 0, bgcolor: 'black' }}>
          <img src={lightboxImage} alt="" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}