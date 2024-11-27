import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  cardVisibility: Record<string, boolean>;
  deletedCardsCount: number;
  deletedCards: ListItem[];
  showDeletedCards: boolean;
};

type Actions = {
  toggleCard: (id: number) => void;
  deleteCard: (id: number) => void;
  setVisibleCards: (cards: ListItem[]) => void;
  toggleShowDeletedCards: () => void;
  revertDeletedCardById: (id: number) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      visibleCards: [],
      cardVisibility: {},
      deletedCardsCount: 0,
      deletedCards: [],
      showDeletedCards: false,

      toggleCard: (id) =>
        set((state) => {
          const newCardVisibility = {
            ...state.cardVisibility,
            [id]: !state.cardVisibility[id],
          };
          return { cardVisibility: newCardVisibility };
        }),

      deleteCard: (id) =>
        set((state) => {
          const cardToDelete = state.visibleCards.find(
            (card) => card.id === id
          );
          return {
            visibleCards: state.visibleCards.filter((card) => card.id !== id),
            cardVisibility: { ...state.cardVisibility, [id]: false },
            deletedCardsCount: state.deletedCardsCount + 1,
            deletedCards: cardToDelete
              ? [...state.deletedCards, cardToDelete]
              : state.deletedCards,
          };
        }),

      setVisibleCards: (cards) =>
        set(() => ({
          visibleCards: cards,
          cardVisibility: cards.reduce(
            (acc, card) => ({
              ...acc,
              [card.id]: false,
            }),
            {}
          ),
          deletedCardsCount: 0,
          deletedCards: [],
        })),

      toggleShowDeletedCards: () =>
        set((state) => ({
          showDeletedCards: !state.showDeletedCards,
        })),

      revertDeletedCardById: (id) =>
        set((state) => {
          const cardToRevert = state.deletedCards.find(
            (card) => card.id === id
          );
          if (!cardToRevert) return state;
          return {
            visibleCards: [...state.visibleCards, cardToRevert],
            deletedCards: state.deletedCards.filter((card) => card.id !== id),
            deletedCardsCount: state.deletedCardsCount - 1,
          };
        }),
    }),
    {
      name: "card-storage",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
