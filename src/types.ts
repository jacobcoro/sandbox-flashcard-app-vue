export interface Card {
  _id: string;
  frontText: string;
  backText: string;
}
export interface Deck {
  _id: string;
  cards: Card[];
  title: string;
}
export interface NewCardPayload {
  frontText: string;
  backText: string;
  deckTitle: string;
}
export interface EditCardPayload {
  frontText: string;
  backText: string;
  deckTitle: string;
  _id: string;
}
export interface DeleteCardPayload {
  _id: string;
  deckTitle: string;
}
export interface AuthState {
  jwt: null | string;
}
export interface DecksState {
  decks: Deck[];
}
export interface State {
  authMod: AuthState;
  decksMod: DecksState;
}
