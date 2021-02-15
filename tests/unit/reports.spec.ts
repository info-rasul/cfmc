import { shallowMount } from '@vue/test-utils';
import Reports from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Reports, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
