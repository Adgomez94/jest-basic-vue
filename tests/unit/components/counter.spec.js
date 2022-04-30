// Para tomar una snapshot 
import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Component counter', () => {

  let wrapper;

  beforeEach(()=>{
        // Realiza una foto al componente
    wrapper = shallowMount(Counter)
  })
  
  // test('should match snapshot', () => {
    
  //   // Realiza una foto al componente
  //   const wrapper = shallowMount(Counter)
  //   // lo compara
  //   expect(wrapper.html()).toMatchSnapshot()
  // });

  test('should value h2 for default', () => {
    

    const h2 = wrapper.find('h2')

    expect(h2.exists()).toBeTruthy()

    expect(h2.text()).toBe('Counter!')
  });

  test('should must increase by 1 the value of number', async () => {
    
    const [incrementBtn, decrementBtn] = wrapper.findAll('button')

    await incrementBtn.trigger('click')

    let counterText = wrapper.find('[data-testid="counter"]').text()
    expect(counterText).toBe('101')

    await decrementBtn.trigger('click')
    await decrementBtn.trigger('click')
    
    counterText = wrapper.find('[data-testid="counter"]').text()
    expect(counterText).toBe('99')
  });

  test('debe de establecer el valor por defecto', () => {
    
    // const { start } = wrapper.props()
    const start = wrapper.props('start')

    const value = wrapper.find('[data-testid="counter"]').text()

    expect(Number(value)).toBe(start)
  });

  test('debe mostrar props title', () => {

    const title = 'hola mundo'
    
    const wrapper = shallowMount(Counter, {
      props: {
        title
      }
    })

    expect(wrapper.find('h2').text()).toBe(title)
  });
});