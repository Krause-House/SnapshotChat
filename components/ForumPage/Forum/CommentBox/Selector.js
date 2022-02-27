import { useState } from "react";

export default function Selector({
  proposal,
  selectedChoice,
  setSelectedChoice,
}) {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      {proposal.choices.map((choice, i) => {
        const selected =
          i === selectedChoice
            ? "bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900"
            : "bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900";
        return (
          <span
            key={i}
            onClick={() => setSelectedChoice(i)}
            className={selected}
          >
            {choice}
          </span>
        );
      })}
    </div>
  );
}