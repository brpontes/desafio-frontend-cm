import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Counter from '@/components/products/Counter'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Counter', () => {
  let wrapper, state, store
  
  test('Deve conter 3 itens e mostrar mensagem de paginação', () => {
    state = {
      pagination: { start: 0, limit: 10, total: 10 }
    },
    store = new Vuex.Store({
      state
    })

    wrapper = shallowMount(Counter, {
      store,
      localVue,
      propsData: {
        products: [
          { id: '123', descricao: 'Produto 1', secao_id: '123' },
          { id: '124', descricao: 'Produto 2', secao_id: '123' },
          { id: '125', descricao: 'Produto 3', secao_id: '124' }
        ]
      }
    })

    expect(wrapper.vm.products).toHaveLength(3)
    const p = wrapper.find('p')
    expect(p.text()).toEqual('Mostrando 3 de 10 produtos')
  })

  test('Não deve mostrar mensagem caso não haja produtos encontrados', () => {
    state = {
      pagination: { start: 0, limit: 10, total: 0 }
    },
    store = new Vuex.Store({
      state
    })

    wrapper = shallowMount(Counter, {
      store,
      localVue,
      propsData: {
        products: []
      }
    })

    const p = wrapper.find('p')
    expect(p.exists()).toBeFalsy()
  })

})