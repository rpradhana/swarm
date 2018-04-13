<template>
  <b-modal id="datasetModal"
           size="lg"
           v-model="btnShow"
           title="Dataset"
           centered>
    <b-container fluid>

      <b-form-group id="classCountGroup"
                    class="mb-4"
                    label="Number of classes"
                    label-for="classCountGroup"
                    required>
        <b-input-group>
          <b-form-input id="classCount"
                        type="number"
                        required
                        :value="classCount"
                        min="1"
                        step="1"
                        required
                        @change="validateIncentive"
                        v-model="classCount">
          </b-form-input>
        </b-input-group>
      </b-form-group>

    </b-container>
    <div slot="modal-footer" class="w-100">
      <b-btn class="float-right ml-3" variant="primary" @click="save">
       Save changes
      </b-btn>
      <b-btn class="float-right" variant="light" @click="btnShow=false">
       Close
      </b-btn>
    </div>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {

      btnShow: false,
      classCount: 1
    }
  },
  methods: {
    save () {
      this.$emit('datasetModal', this.classCount)
      this.btnShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
