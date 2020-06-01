import { shallowMount } from '@vue/test-utils';
import TheFlashcard from '@/components/TheFlashcard.vue';

describe('TheFlashcard.vue', () => {
  const wrapper = shallowMount(TheFlashcard, {
    propsData: {
      front: 'Front',
      back: 'Back',
    },
  });
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('displays front text', () => {
    expect(wrapper.find('.flashcard__front .flashcard__text').text()).toBe('Front');
  });
  it('hides back text', () => {
    expect(wrapper.find('.flashcard__back .flashcard__text').isVisible()).toBe(false);
  });
  it('shows back text after clicked', async () => {
    await wrapper.find('.flashcard__front').trigger('click');
    await setTimeout(() => {}, 1200);
    expect(wrapper.find('.flashcard__back .flashcard__text').isVisible()).toBe(true);
  });
});
