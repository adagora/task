import { create } from "zustand";

type State = {
    showCard: boolean;
};

type Actions = {
    toggleCard: () => void;
};

export const useStore = create<State & Actions>((set) => ({
    showCard: false,
    toggleCard: () => set((state) => ({ showCard: !state.showCard })),
}));
