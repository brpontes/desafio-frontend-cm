import { mapState, mapActions } from "vuex";
import { required, numeric, maxLength, minLength } from "vuelidate/lib/validators";

const ProductFormMixin = {
  data () {
    return {
      submitted: false
    };
  },
  computed: {
    ...mapState({
      sections: state => state.sections,
      form: state => state.form
    })
  },
  validations: {
    form: {
      id: { required, numeric, maxLength: maxLength(5) },
      descricao: { required, minLength: minLength(3), maxLength: maxLength(20) },
      secao_id: { required }
    }
  },
  methods: {
    ...mapActions([
      "set_form_clear",
      "get_product_by_id",
      "add_product",
      "delete_product",
      "edit_product",
      "delete_product"
    ]),
    addProduct() {
      if (this.$v.$invalid) {
        this.submitted = true;
        return;
      }
      this.add_product(this.form);
      this.submitted = false;
      this.$swal("Produto cadastrado com sucesso", "", "success")
        .then((isConfirmed) => {
          if (isConfirmed) {
            this.$router.push("/");
          }
        });
    },
    editProduct() {
      if (this.$v.$invalid) {
        this.submitted = true;
        return;
      }
      this.edit_product();
      this.submitted = false;
      this.$swal("Produto salvo com sucesso", "", "success");
      this.$router.push("/");
    },
    promptRemoveProduct(id) {
      this.$swal({
        title: "Deseja remover este produto?",
        icon: "warning",
        buttons: {
          remove: "Ok",
          cancel: "Cancelar"
        }
      })
        .then(async isConfirmed => {
          if (isConfirmed) {
            await this.delete_product(id);
            this.$swal("Produto removido com sucesso", { icon: "success" });
            this.$router.push("/");
          }
        });
    }
  },
  mounted () {
    this.set_form_clear();
    if (this.edit && this.$route.params.id) {
      this.get_product_by_id(parseInt(this.$route.params.id));
    }
  }
};

export default ProductFormMixin;