# sandbox-flashcard-app-vue

## A sandbox for testing new libraries and techniques

This sandbox app is a great place to test out whatever you'd like to learn.

I used it to learn about unit, snapshot and e2e testing, Vue composition API, typescript, and BEM style CSS techniques.

It was started with Vue CLI.

### Typescript

It uses typescript, although the usage is rather simple and should be easy for TS beginners to understand.

If you don’t want to use Typescript, you can remove `lang=“ts”` from `<script>` ,
remove the line `import { Deck, Card, NewCardPayload, DeleteCardPayload, EditCardPayload } from ‘@/types’;`
remove the typings: `as Deck[]`, `as string` and `NewCardPayload` etc.
and remove `Vue.extends(` from the beginning of components, along with the trailing )

### BEM

It uses BEM style CSS management, along with some global utility classes, based on advice gleaned from these articles about it:

- [CSS Tricks](https://css-tricks.com/building-a-scalable-css-architecture-with-bem-and-utility-classes/)
- [Peter Ajtai](https://medium.com/soliddigital/7-reasons-to-use-bem-css-a7c8475318fe)
- [BEM.info](https://en.bem.info/methodology/quick-start/)
- [Marcus Oberlehner](https://markus.oberlehner.net/blog/how-the-bem-css-naming-scheme-can-improve-vue-component-architecture/), and

### Testing

It uses Jest for unit and Cypress for e2e testing
I've tried to follow the 'container component' idea also from [Marcus Oberlehner](https://markus.oberlehner.net/blog/advanced-vue-component-composition-with-container-components/). Components are all unit tested, but the container (in this case the views) are e2e tested. All API and vuex calls should only go through the container, and the components are only dealing with their props and emits, so are reliable and easy to test.

### Vuex

It uses a vuex typescript helper called direct-vuex [docs](https://github.com/paleo/direct-vuex) and [tutorial](https://itnext.io/use-a-vuex-store-with-typing-in-typescript-without-decorators-or-boilerplate-57732d175ff3)

It uses vuex persist to persist user keys in cookies [github](https://github.com/championswimmer/vuex-persist) and flashcards in the local storage.

## How to use

All of the components are very simple, and route all of the decision making up to the view (ViewName.vue in src/views/) they are in. The view VanillaCRUD.vue has all of the simple Create Read Update and Delete functions in the methods (`Vue.extend({ methods: {}})`). If you want to test a library that deals with CRUD operations, that's the place to start.

As an example of how to do that, I created another view VuexPersisted, to test out the vuex-persisted library and direct-vuex libraries. If you don't want to use vuex, delete that view, and the store folder, and the lines with 'store' in main.ts and src/router/index.ts

### To create a new view and test suite

- Create a new view by copying the VanillaCRUD.vue with a new name in the src/views folder.
- Add it to the src/router/index.ts routes.
- Add it to the 'routeNames' list in tests/e2e/specs/e2etest.js and your new view will be included in e2e tests
- Add it to the router-links in the template in App.vue

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your unit and snapshot tests

```bash
npm run test:unit
```

to update snapshots:

```bash
npm run test:unit -- -u
```

with hot reloading:

```bash
npm run test:unit:watch
```

with debugging:

```bash
npm run test:unit:debug
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Lints and fixes files

```bash
npm run lint
```

## Issues, bugs

If you find a bug or would like to make a suggestion, create an issue or pr, or contact me at my [website](https://www.jacobcohen-rosenthal.me)

I'd love some feedback about whether the tests are well designed/offering good coverage or not.

known issue: typescript is complaining about 'this.decks' in VuexPersisted.vue any tips on this are appreciated
