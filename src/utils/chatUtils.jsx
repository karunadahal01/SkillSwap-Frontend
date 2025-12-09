// /* ----------------- File Type Helpers ----------------- */
// export const isImageName = (name = "") => !!name.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
// export const isVideoName = (name = "") => !!name.match(/\.(mp4|webm|ogg|mov|m4v)$/i);

// /* ----------------- Render Message Content ----------------- */
// export const renderMessageContent = (msg) => {
//   // Use functions directly, no require needed

//   // multiple file message
//   if (msg.type === "file" && Array.isArray(msg.files)) {
//     return msg.files.map((f, idx) => {
//       const isImg = isImageName(f.fileName);
//       const isVid = isVideoName(f.fileName);

//       if (isImg) return <img key={idx} src={f.fileURL} alt={f.fileName} style={{ maxWidth: "320px", width: "100%" }} />;
//       if (isVid) return <video key={idx} src={f.fileURL} controls style={{ maxWidth: "320px", width: "100%" }} />;

//       return (
//         <a key={idx} href={f.fileURL} target="_blank" rel="noopener noreferrer">
//           📎 {f.fileName}
//         </a>
//       );
//     });
//   }

//   // single file
//   if (msg.type === "file" && msg.fileName) {
//     const isImg = isImageName(msg.fileName);
//     const isVid = isVideoName(msg.fileName);
//     if (isImg) return <img src={msg.fileURL} alt={msg.fileName} style={{ maxWidth: "320px", width: "100%" }} />;
//     if (isVid) return <video src={msg.fileURL} controls style={{ maxWidth: "320px", width: "100%" }} />;
//     return <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">📎 {msg.fileName}</a>;
//   }

//   // text with link highlighting
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const parts = (msg.content || "").split(urlRegex);
//   return parts.map((p, i) =>
//     urlRegex.test(p) ? (
//       <a key={i} href={p} target="_blank" rel="noopener noreferrer">{p}</a>
//     ) : (
//       <span key={i}>{p}</span>
//     )
//   );
// };


/* ----------------- File Type Helpers ----------------- */
export const isImageName = (name = "") => !!name.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
export const isVideoName = (name = "") => !!name.match(/\.(mp4|webm|ogg|mov|m4v)$/i);

/* ----------------- Render Message Content ----------------- */
export const renderMessageContent = (msg) => {
  // multiple file message
  if (msg.type === "file" && Array.isArray(msg.files)) {
    return msg.files.map((f, idx) => {
      const isImg = isImageName(f.fileName);
      const isVid = isVideoName(f.fileName);

      if (isImg) return (
        <a key={idx} href={f.fileURL} target="_blank" rel="noopener noreferrer">
          <img src={f.fileURL} alt={f.fileName} style={{ maxWidth: "320px", width: "100%", cursor: "pointer" }} />
        </a>
      );
      if (isVid) return <video key={idx} src={f.fileURL} controls style={{ maxWidth: "320px", width: "100%" }} />;

      return (
        <a key={idx} href={f.fileURL} target="_blank" rel="noopener noreferrer">
          📎 {f.fileName}
        </a>
      );
    });
  }

  // single file
  if (msg.type === "file" && msg.fileName) {
    const isImg = isImageName(msg.fileName);
    const isVid = isVideoName(msg.fileName);
    if (isImg) return (
      <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">
        <img src={msg.fileURL} alt={msg.fileName} style={{ maxWidth: "320px", width: "100%", cursor: "pointer" }} />
      </a>
    );
    if (isVid) return <video src={msg.fileURL} controls style={{ maxWidth: "320px", width: "100%" }} />;
    return <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">📎 {msg.fileName}</a>;
  }

  // text with link highlighting
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = (msg.content || "").split(urlRegex);
  return parts.map((p, i) =>
    urlRegex.test(p) ? (
      <a key={i} href={p} target="_blank" rel="noopener noreferrer">{p}</a>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};
