import { mount, createLocalVue } from '@vue/test-utils';
import CardEditor from '@/components/CardEditor.vue';
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

describe('CardEditor.vue', () => {
  let frontInput: any;
  let backInput: any;
  let cancelButton: any;
  let confirmButton: any;

  const wrapper = mount(CardEditor, {
    localVue,
    propsData: {
      editPayload: {
        deckTitle: 'MockTitle',
        frontText: 'MockFrontText',
        backText: 'MockBackText',
        _id: '12f14f23',
      },
    },
    data() {
      return {
        newFrontText: '',
        newBackText: '',
      };
    },
  }) as any;

  frontInput = wrapper.findAll('.card-editor .form__text-input').at(0);
  backInput = wrapper.findAll('.card-editor .form__text-input').at(1);
  cancelButton = wrapper.find('.card-editor .form__button--cancel');
  confirmButton = wrapper.find('.card-editor .form__button--confirm');
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('updates changed text', () => {
    frontInput.setValue('value1');
    expect(wrapper.vm.newFrontText).toBe('value1');
    backInput.setValue('value2');
    expect(wrapper.vm.newBackText).toBe('value2');
  });

  it('outputs the correct data when confirm is clicked', async () => {
    frontInput.setValue('frontOutputValue');
    backInput.setValue('backOutputValue');
    await confirmButton.trigger('click');
    const expectedOutput = {
      frontText: 'frontOutputValue',
      backText: 'backOutputValue',
      deckTitle: 'MockTitle',
      _id: '12f14f23',
    };
    expect(JSON.stringify(wrapper.emitted().editCard[0][0])).toBe(JSON.stringify(expectedOutput));
  });
  it('emits cancelEdit when cancel button clicked', async () => {
    await cancelButton.trigger('click');
    expect(wrapper.emitted().cancelEdit).toBeTruthy();
  });
  it('has font awesome icon buttons', () => {
    const buttons = wrapper.findAllComponents(FontAwesomeIcon);
    // this works in mount but not shallowMount
    expect(buttons).toHaveLength(2);
  });
  it('has 2 icon buttons', () => {
    const buttons = wrapper.findAll('.card-editor .button');
    expect(buttons).toHaveLength(2);
  });
});
