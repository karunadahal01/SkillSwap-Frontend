import React from "react";
import { Card, CardContent } from "@mui/material";

const OverviewCards = ({ userData }) => {
  const cards = [
    {
      title: "🧠 Skills Offered",
      items: userData.skillsOffered,
    },
    {
      title: "🎯 Skills Requested",
      items: userData.skillsRequested,
    },
    {
      title: "🔄 Matches Found",
      value: userData.matches.length,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, idx) => (
        <Card key={idx} className="shadow-md dark:bg-gray-800">
          <CardContent className="p-5">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              {card.title}
            </h3>
            {card.items ? (
              <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {card.value}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCards;
