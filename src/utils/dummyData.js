// src/utils/dummyData.js

export const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    avatar: "A",
    messages: [
      { id: 1, sender: "them", type: "text", content: "Can we swap?" },
      { id: 2, sender: "me", type: "text", content: "Yes, tomorrow works.", status: "seen", reaction: null },
      { id: 3, sender: "them", type: "text", content: "Perfect!" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    avatar: "B",
    messages: [
      { id: 4, sender: "them", type: "text", content: "Ready for our class?" },
      { id: 5, sender: "me", type: "text", content: "Yes!", status: "delivered", reaction: null },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "C",
    messages: [
      { id: 6, sender: "them", type: "text", content: "Hey, can you teach me guitar?" },
      { id: 7, sender: "me", type: "text", content: "Sure! Let's schedule.", status: "sent", reaction: null },
    ],
  },
];
