import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  id: ListItem["id"];
};

export const Card: FC<CardProps> = ({ title, description, id }) => {
  const { cardVisibility, toggleCard, deleteCard } = useStore();
  const showCard = cardVisibility[id] || false;

  return (
    <div className="border border-black px-2 py-1.5 min-w-[400px]">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={() => toggleCard(id)}>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton onClick={() => deleteCard(id)} />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out w-full`}
      >
        {showCard ? (
          <div className="flex flex-col p-2 bg-gray-100 rounded-md shadow-sm">
            <p className="text-sm text-gray-700">{description}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
