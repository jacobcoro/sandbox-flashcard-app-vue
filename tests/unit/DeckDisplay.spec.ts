import { mount, createLocalVue } from '@vue/test-utils';
import DeckDisplay from '@/components/DeckDisplay.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashAlt,
  faPlusSquare,
  faCheck,
  faEdit,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  //  FontAwesomeLayers
} from '@fortawesome/vue-fontawesome';
const localVue = createLocalVue();
library.add(faTrashAlt, faPlusSquare, faCheck, faEdit, faTimes);
localVue.component('fontAwesomeIcon', FontAwesomeIcon);

describe('DeckDisplay.vue', () => {
  const wrapper = mount(DeckDisplay, {
    localVue,
    propsData: {
      deck: {
        _id: '12f14f23',
        cards: [
          {
            _id: '1',
            frontText: 'FrontText',
            backText: 'BackText',
          },
          {
            _id: '2',
            frontText: 'FrontText',
            backText: 'BackText',
          },
        ],
        title: 'Title',
      },
    },
  }) as any;

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('has font awesome icon buttons', () => {
    const buttons = wrapper.findAllComponents(FontAwesomeIcon);
    // this works in mount but not shallowMount
    expect(buttons).toHaveLength(4);
  });
  it('displays deck title', () => {
    const title = wrapper.find('.deck-display__title');
    expect(title.text()).toBe('Title');
  });
  it('displays correct number of cards', () => {
    const cards = wrapper.findAll('.deck-display__card-container');
    expect(cards).toHaveLength(2);
  });
  it('emits the correct data when edit card is clicked', async () => {
    const editButton = wrapper.findAll('.buttons-col__button--edit').at(0);
    await editButton.trigger('click');
    const expectedOutput = {
      frontText: 'FrontText',
      backText: 'BackText',
      _id: '1',
      deckTitle: 'Title',
    };
    expect(JSON.stringify(wrapper.emitted().openEditor[0][0])).toBe(JSON.stringify(expectedOutput));
  });
  it('emits the correct data when delete card is clicked', async () => {
    const deleteButton = wrapper.findAll('.buttons-col__button--delete').at(0);
    await deleteButton.trigger('click');
    const expectedOutput = {
      _id: '1',
      deckTitle: 'Title',
    };
    expect(JSON.stringify(wrapper.emitted().deleteCard[0][0])).toBe(JSON.stringify(expectedOutput));
  });
});
