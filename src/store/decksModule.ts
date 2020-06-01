import {
  DecksState,
  Deck,
  NewCardPayload,
  DeleteCardPayload,
  EditCardPayload,
  Card,
} from '../types';
import { v4 as uuid } from 'uuid';

export default {
  namespaced: true as true,
  state: {
    decks: [] as Deck[],
  } as DecksState,
  getters: {
    decks: (state: DecksState) => state.decks,
  },
  mutations: {
    addDeck(state: DecksState, deck: Deck) {
      console.log(state);
      state.decks.push(deck);
      console.log(state);
    },
    addCard(state: DecksState, payload: NewCardPayload) {
      console.log(payload);
      const newCard: Card = {
        _id: uuid(),
        frontText: payload.frontText,
        backText: payload.backText,
      };
      for (const deck of state.decks) {
        if (deck.title === payload.deckTitle) {
          deck.cards.push(newCard);
          break;
        }
      }
    },
    deleteCard(state: DecksState, payload: DeleteCardPayload) {
      for (const deck of state.decks) {
        if (deck.title === payload.deckTitle) {
          for (const card of deck.cards) {
            if (card._id === payload._id) {
              deck.cards.splice(deck.cards.indexOf(card), 1);
              break;
            }
          }
          break;
        }
      }
    },
    editCard(state: DecksState, payload: EditCardPayload) {
      for (const deck of state.decks) {
        if (deck.title === payload.deckTitle) {
          for (const card of deck.cards) {
            if (card._id === payload._id) {
              card.frontText = payload.frontText;
              card.backText = payload.backText;
              break;
            }
          }
          break;
        }
      }
    },
  },
  actions: {
    // async loadName({ commit }, payload: { id: string }) {
    //   const name = `Name-${payload.id}`; // load it from somewhere
    //   commit('SET_NAME', name);
    //   return { name };
    // },
  },
};
