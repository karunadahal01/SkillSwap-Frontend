import React from "react";
import { UserCheck } from "lucide-react";

const MatchesList = ({ matches }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <UserCheck size={22} /> Skill Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No matches yet.</p>
      ) : (
        <ul className="space-y-3">
          {matches.map((match, index) => (
            <li
              key={index}
              className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              You can teach{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {match.teach}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {match.partner}
              </span>{" "}
              and learn{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                {match.learn}
              </span>{" "}
              in return.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchesList;
