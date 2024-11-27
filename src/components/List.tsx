import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
};

export const Card: FC<CardProps> = ({ title, description }) => {
  const { showCard, toggleCard } = useStore();

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={toggleCard}>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton />
        </div>
      </div>
      {showCard ? <p className="text-sm">{description}</p> : null}
    </div>
  );
};
