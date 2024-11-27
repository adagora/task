import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  id: ListItem["id"];
};

export const Card: FC<CardProps> = ({ title, description, id }) => {
  const { cardVisibility, toggleCard, deleteCard } = useStore();
  const showCard = cardVisibility[id] || false;
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={() => toggleCard(id)}>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton onClick={() => deleteCard(id)} />
        </div>
      </div>
      <div ref={parent}>
        {showCard ? <p className="text-sm">{description}</p> : null}
      </div>
    </div>
  );
};
