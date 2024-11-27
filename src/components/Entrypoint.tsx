import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import ToggleButton from "./ToggleButton";
import { RefreshButton, RevertButton } from "./Buttons";

export const Entrypoint = () => {
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);

  const listQuery = useGetListData();
  const {
    visibleCards,
    setVisibleCards,
    deletedCardsCount,
    deletedCards,
    showDeletedCards,
    toggleShowDeletedCards,
    revertDeletedCardById,
  } = useStore();

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
    setLastRefreshed(new Date().toLocaleTimeString());
  }, [listQuery.data]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const handleRefresh = () => {
    listQuery.refetch();
    setLastRefreshed(new Date().toLocaleTimeString());
  };

  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-col items-end pb-2">
        <RefreshButton
          onClick={handleRefresh}
          className="mt-2 text-white bg-green-500 rounded px-3 py-1"
        />
        {lastRefreshed && (
          <p className="mt-1 text-sm text-gray-500">
            Last refreshed at: {lastRefreshed}
          </p>
        )}
      </div>
      <div className="flex gap-x-16">
        <div className="w-full max-w-xl">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({visibleCards.length})
          </h1>
          <div className="flex flex-col gap-y-3">
            {visibleCards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 font-medium text-lg">
              Deleted Cards ({deletedCardsCount})
            </h1>
            <ToggleButton
              isToggled={showDeletedCards}
              onToggle={toggleShowDeletedCards}
              labelOn="Hide Deleted"
              labelOff="Reveal"
            />
          </div>
          {showDeletedCards && (
            <div className="flex flex-col gap-y-3">
              {deletedCards.map((card) => (
                <div
                  key={card.id}
                  className="border border-gray-300 px-2 py-1.5 flex justify-between items-center"
                >
                  <h1 className="font-medium">{card.title}</h1>
                  <RevertButton
                    onClick={() => revertDeletedCardById(card.id)}
                    className="cursor-pointer w-5 h-5 text-blue-500 hover:text-blue-700"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
