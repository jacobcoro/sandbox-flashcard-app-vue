import { mount, createLocalVue } from '@vue/test-utils';
import DeckInput from '@/components/DeckInput.vue';
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

describe('DeckInput.vue', () => {
  const wrapper = mount(DeckInput, {
    localVue,
    data() {
      return {
        newTitle: 'New Title' as string,
      };
    },
  }) as any;
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('has 1 font awesome icon button', () => {
    const buttons = wrapper.findAllComponents(FontAwesomeIcon);
    // this works in mount but not shallowMount
    expect(buttons).toHaveLength(1);
  });
  it('updates changed text', async () => {
    await wrapper.find('.deck-input .form__text-input').setValue('value1');
    expect(wrapper.vm.newTitle).toBe('value1');
  });
  it('does not emit if title is blank', async () => {
    await wrapper.find('.deck-input .form__text-input').setValue('');
    await wrapper.setData({ newTitle: '' });
    const addButton = wrapper.find('.deck-input__add-icon');
    await addButton.trigger('click');
    expect(wrapper.emitted().createDeck).toBeFalsy();
  });
  it('emits the correct data when create deck is clicked', async () => {
    await wrapper.find('.deck-input .form__text-input').setValue('value1');
    const addButton = wrapper.find('.deck-input__add-icon');
    await addButton.trigger('click');
    const expectedOutput = {
      cards: [],
      title: 'value1',
    };
    expect(JSON.stringify(wrapper.emitted().createDeck[0][0])).toBe(JSON.stringify(expectedOutput));
  });
});
