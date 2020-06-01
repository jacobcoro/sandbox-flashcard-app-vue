// simple schema
export const cardSchema: JSONSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://github.com/Jewcub/textile-flashcards',
  title: 'Card',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    frontText: { type: 'string' },
    backText: { type: 'string' },
  },
};

// complex schema with refs
export const schema: JSONSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://github.com/Jewcub/textile-flashcards',
  definitions: {
    card: {
      title: 'Card',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        frontText: { type: 'string' },
        backText: { type: 'string' },
      },
    },
    deck: {
      title: 'Deck',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        cards: {
          type: 'array',
          items: { $ref: '#/definitions/card' },
          default: [],
        },
      },
    },
  },
  card: {
    type: 'object',
    properties: { $ref: '#/definitions/card' },
  },
  deck: {
    type: 'object',
    properties: { $ref: '#/definitions/deck' },
  },
};