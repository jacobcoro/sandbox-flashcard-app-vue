import { mount, createLocalVue } from '@vue/test-utils';
import CardInput from '@/components/CardInput.vue';
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

describe('CardImport.Vue', () => {
  const wrapper = mount(CardInput, {
    localVue,
    propsData: {
      selectedDeck: 'selected',
      decks: [{ title: 'selected' }, { title: 'unselected1' }, { title: 'unselected2' }],
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
  it('updates changed text', () => {
    wrapper
      .findAll('.card-input .form__text-input')
      .at(0)
      .setValue('value1');
    expect(wrapper.vm.frontText).toBe('value1');
    wrapper
      .findAll('.card-input .form__text-input')
      .at(1)
      .setValue('value2');
    expect(wrapper.vm.backText).toBe('value2');
  });
  it('displays selected deck', async () => {
    const selected = wrapper.find('.card-input .form__top-label--strong');
    expect(selected.text()).toBe('selected');
  });
  it('does not display unselected span if there is only one selected deck', async () => {
    await wrapper.setProps({ decks: [{ title: 'selected' }] });
    expect(wrapper.find('.card-input .tag-selection').isVisible()).toBe(false);
  });
  it('displays unselected span if there is more than one selected deck', async () => {
    await wrapper.setProps({
      decks: [{ title: 'selected' }, { title: 'unselected1' }, { title: 'unselected2' }],
    });
    expect(wrapper.find('.card-input .tag-selection').isVisible()).toBe(true);
  });
  it('displays unselected decks as buttons if there is more than one selected deck', () => {
    const unelected = wrapper.findAll('.card-input .tag-selection__tag');
    // console.log('unelected.at(1).text()', unelected.at(1).text());
    expect(unelected.at(1).text()).toBe('unselected1');
    expect(unelected.at(2).text()).toBe('unselected2');
  });
  it('emits changeSelectedDeck with deck title from button', async () => {
    const unselectedAt2 = wrapper.findAll('.card-input .tag-selection__tag').at(2);
    await unselectedAt2.trigger('click');
    expect(wrapper.emitted().changeSelectedDeck[0][0]).toBe(unselectedAt2.text());
  });
  it('when add button clicked, emits addCard with correct data', async () => {
    await wrapper.find('.card-input__add-icon').trigger('click');
    wrapper
      .findAll('.card-input .form__text-input')
      .at(0)
      .setValue('value1');
    wrapper
      .findAll('.card-input .form__text-input')
      .at(1)
      .setValue('value2');
    const expectedOutput = { frontText: 'value1', backText: 'value2' };
    expect(JSON.stringify(wrapper.emitted().addCard[0][0])).toBe(JSON.stringify(expectedOutput));
  });
});
