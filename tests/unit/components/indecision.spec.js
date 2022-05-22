import { shallowMount } from '@vue/test-utils'
import Indecision from '../../../src/components/Indecision.vue'

let wrapper
let cnsSpy

global.fetch = jest.fn( ()=> Promise.resolve({
  json: () => Promise.resolve({
    "answer": "yes",
    "forced": false,
    "image": "https://yesno.wtf/assets/yes/2.gif"
  })
}))

beforeEach(()=>{
  wrapper = shallowMount(Indecision)
  cnsSpy = jest.spyOn(console, 'log')

  jest.clearAllMocks()
})

describe('first', () => { 

  test('Hacer el shallowMount', () => {
    expect(wrapper.html()).toMatchSnapshot()
    
  });

  test('Escribir en el input no debe de disperar el console.log ', async() => {
    
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

    const input = wrapper.find('input')
    // Escribir en el input
    await input.setValue('hola mundoo')

    // expect(cnsSpy).toHaveBeenCalled() 
    expect(cnsSpy).toBeCalledTimes(1)
    expect(getAnswerSpy).not.toHaveBeenCalled()
  });

  test('Escribir el simbolo "?" debe de disparar el fetch ', async() => {
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )
    const input = wrapper.find('input')
    // Escribir en el input
    await input.setValue('hola mundoo?')
    expect(cnsSpy).toBeCalledTimes(1)
    expect(getAnswerSpy).toHaveBeenCalled()
  });

  
  test('Pruebas en el getAnswer', async() => {

    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect(img.exists()).toBeTruthy()
    expect(wrapper.vm.image).toBe('https://yesno.wtf/assets/yes/2.gif')
    expect(wrapper.vm.answer).toBe('Si')
    
    
  });
  test('Pruebas en el getAnswer - fallo en la api', async() => {
    
    fetch.mockImplementationOnce( () => Promise.reject('API is down') )

    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect( img.exists() ).toBeFalsy()
    expect( wrapper.vm.answer ).toBe('No se pudo cargar del API')

  });
 })