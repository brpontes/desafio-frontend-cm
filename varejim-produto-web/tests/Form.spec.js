import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import VueRouter from "vue-router";
import VueSwal from "vue-swal";
import Form from '@/components/products/Form'
import 'regenerator-runtime/runtime'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueSwal);
localVue.use(Vuelidate)
localVue.use(VueRouter)
const router = new VueRouter()

describe('Form', () => {
  let wrapper, actions, store, state, setFormClearMock, getProductByIdMock, addProductMock

  describe('Formulário de adição', () => {

    beforeEach(() => {
      setFormClearMock = jest.fn(() => {})
      getProductByIdMock = jest.fn(() => {})
      addProductMock = jest.fn(() => {
        wrapper.vm.$store.state.products = [
          ...wrapper.vm.$store.state.products,
          wrapper.vm.$store.state.form
        ]
      })

      actions = {
        set_form_clear: setFormClearMock,
        add_product: addProductMock
      },
      state = {
        products: [],
        sections: [],
        form: { id: '', descricao: '', secao_id: '' }
      },
      store = new Vuex.Store({
        actions,
        state
      })
  
      wrapper = shallowMount(Form, {
        store,
        localVue
      })
      wrapper.vm.submitted = false
    })
  
    describe('Validação do formulário', () => {
      test('Código do produto deve ser obrigatório, numérico e possuir no máximo 5 números', () => {
        wrapper.setData({
          form: { id: null, descricao: 'Produto 1', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '1234x', descricao: 'Produto 1', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '123456', descricao: 'Produto 1', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Produto 1', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
      })
  
      test('Nome do produto deve ser obrigatório e conter entre 3 e 20 caracteres', () => {
        wrapper.setData({
          form: { id: '12345', descricao: '', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Es', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço no pacote', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
      })
  
      test('Seção é obrigatório', () => {
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
      })
    })
  
    describe('Adicionar um produto', () => {
  
      test('Ao carregar, deve chamar função que limpa o formulário', () => {
        expect(setFormClearMock).toHaveBeenCalled()
        expect(getProductByIdMock).not.toHaveBeenCalled()
      })
  
      test('O formulário só pode ser submetido caso seja válido', async () => {
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '' }
        })
        const button = wrapper.find('button[name=add-product]')
        expect(button.exists()).toBeTruthy()
        expect(button.text()).toBe('Cadastrar')
        await button.trigger('click')
        expect(wrapper.vm.submitted).toBeTruthy()
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        expect(addProductMock).not.toHaveBeenCalled()
      })
  
      test('Cadastra o produto quando o formulário é válido', async () => {
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '123' }
        })
        const button = wrapper.find('button[name=add-product]')
        expect(button.exists()).toBeTruthy()
        expect(button.text()).toBe('Cadastrar')
        await button.trigger('click')
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
        expect(addProductMock).toHaveBeenCalled()
        expect(wrapper.vm.$store.state.products).toHaveLength(1)
      })
    })

  })

  describe('Formulário de edição', () => {

    beforeEach(() => {
      setFormClearMock = jest.fn(() => {})
      getProductByIdMock = jest.fn(() => {
        wrapper.setData({ form: { id: '123', descricao: 'Teste', secao_id: '123' } })
      })
      addProductMock = jest.fn(() => {
        wrapper.vm.$store.state.products = [
          ...wrapper.vm.$store.state.products,
          wrapper.vm.$store.state.form
        ]
      })

      actions = {
        set_form_clear: setFormClearMock,
        get_product_by_id: getProductByIdMock,
        add_product: addProductMock
      },
      state = {
        products: [{ id: '123', descricao: 'Esponja de aço', secao_id: '123' }],
        sections: [],
        form: { id: '', descricao: '', secao_id: '' }
      },
      store = new Vuex.Store({
        router,
        actions,
        state
      })
  
      wrapper = shallowMount(Form, {
        router,
        store,
        localVue,
        propsData: {
          edit: true
        }
      })
      wrapper.vm.$route.params.id = '123'
      wrapper.vm.submitted = false
    })
  
    describe('Validação do formulário', () => {
      test('Código do produto deve ser obrigatório, numérico e possuir no máximo 5 números', () => {
        wrapper.setData({
          form: { id: null, descricao: 'Produto 1', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '1234x', descricao: 'Produto 1', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '123456', descricao: 'Produto 1', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Produto 1', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
      })
  
      test('Nome do produto deve ser obrigatório e conter entre 3 e 20 caracteres', () => {
        wrapper.setData({
          form: { id: '12345', descricao: '', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Es', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço no pacote', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
      })
  
      test('Seção é obrigatório', () => {
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '' }
        })
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '123' }
        })
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
      })
    })
  
    describe('Editar um produto', () => {
  
      test('Ao carregar, deve chamar função que limpa o formulário e buscar um produto com id 123', async () => {
        expect(setFormClearMock).toHaveBeenCalled()
        expect(getProductByIdMock).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.form.id).toEqual('123')
      })
  
      /* test('O formulário só pode ser submetido caso seja válido', async () => {
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '' }
        })
        const button = wrapper.find('button[name=add-product]')
        expect(button.exists()).toBeTruthy()
        expect(button.text()).toBe('Cadastrar')
        await button.trigger('click')
        expect(wrapper.vm.submitted).toBeTruthy()
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        expect(addProductMock).toHaveBeenCalledTimes(0)
      })
  
      test('Cadastra o produto quando o formulário é válido', async () => {
        wrapper.setData({
          form: { id: '12345', descricao: 'Esponja de aço', secao_id: '123' }
        })
        const button = wrapper.find('button[name=add-product]')
        expect(button.exists()).toBeTruthy()
        expect(button.text()).toBe('Cadastrar')
        await button.trigger('click')
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
        expect(addProductMock).toHaveBeenCalled()
        expect(wrapper.vm.$store.state.products).toHaveLength(1)
      }) */
    })

  })

})