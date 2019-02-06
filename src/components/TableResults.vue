<template>
      <v-container>
        <v-layout>
          <v-flex xs6 order-lg2>
          <v-form v-on:submit.prevent="addQuestion">
            <v-text-field
              v-model="id"
              name="skipStepId"
              label="SkipStep_Id"
              id="skipstep-id"
            ></v-text-field>
              <v-radio-group v-model="wop" row>
                <h2>WOP:</h2>
                <v-radio
                  label="NONE"
                  value="NONE"
                ></v-radio>
                <v-radio
                  value="ACC"
                  label="ACC"
                ></v-radio>
                <v-radio
                  value="DCL"
                  label="DCL"
                ></v-radio>
              </v-radio-group>
              <!-- Flat Extra -->
              <v-text-field
                v-model="flatExtra"
                name="flatextra"
                label="Flat Extra"
                id="question-name"
              ></v-text-field>
              <!-- Flat Duration -->
              <v-text-field
                v-model="flatDuration"
                name="flatduration"
                label="Flat Duration"
                id="question-name"
              ></v-text-field>
              <!-- UW CLASS -->
              <v-radio-group v-model="uwclass" row>
                <h2>UW CLASS:</h2>
                <v-radio
                  label="Null"
                  value="null"
                ></v-radio>
                <v-radio
                  value="1"
                  label="Preferred Plus"
                ></v-radio>
                <v-radio
                  value="2"
                  label="Preferred"
                ></v-radio>
                <v-radio
                  label="Standard Plus"
                  value="3"
                ></v-radio>
                <v-radio
                  label="Standard NT"
                  value="4"
                ></v-radio>
                <v-radio
                  label="Prefeered TOB"
                  value="92"
                ></v-radio>
                <v-radio
                  label="Standard TOB"
                  value="94"
                ></v-radio>
              </v-radio-group>
              <!-- ORDER APS -->
              <v-radio-group row>
                <v-checkbox v-model="orderAPS" label="Order APS" value="John"></v-checkbox>
                <v-checkbox v-model="orderLABS" label="Order Labs" value="John"></v-checkbox>
              </v-radio-group>
              <!-- Requirement -->
              <v-text-field
                v-model="requirement"
                name="requirement"
                label="Requirement"
                id="requirement"
              ></v-text-field>
              <!-- Task -->
              <v-text-field
                v-model="task"
                name="task"
                label="Task"
                id="task"
              ></v-text-field>
              <!-- Verbiage -->
              <v-text-field
                v-model="verbiage"
                name="verbiage"
                label="Verbiage"
                id="verbiage"
              ></v-text-field>
              <!-- Decision -->
              <v-radio-group v-model="decision" row>
                <h2>Decision:</h2>
                <v-radio
                  label="Straight Through"
                  value="10"
                ></v-radio>
                <v-radio
                  value="20"
                  label="RUW"
                ></v-radio>
                <v-radio
                  value="30"
                  label="Postponed"
                ></v-radio>
                <v-radio
                  label="Declined"
                  value="40"
                ></v-radio>
              </v-radio-group>
              <hr>
              <v-btn
              color="success"
              @click="addResult">Add Result</v-btn>
              <v-btn
              color="success"
              @click="clear">Clear</v-btn>
          </v-form>
          </v-flex>
          <!--Results section-->
          <v-flex xs4 order-md2 order-xs1>
              <h1>Results</h1>
            <div
              v-for="(result, index) in ruleresult"
              :key="result.id"
              >
              <span class="script-text">{{result}}</span>
              <v-btn
              color="red"
              @click="rulestep.splice(index, 1)">remove</v-btn>
              <!-- <v-btn
              color="success"
              @click="">Add Options</v-btn> -->
            </div>
              </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
/* eslint-disable */
var STORAGE_KEY = 'rulestep-vue'
var ruleStorage = {
  fetch: function () {
    var ruleresult = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    ruleresult.forEach(function (ruleresult, index) {
      ruleresult.id = index
    })
    ruleStorage.uid = ruleresult.length
    return ruleresult
  },
  save: function (ruleresult) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ruleresult))
  }
}

export default {
  name: 'Results',
  data () {
    return {
      ruleresult: ruleStorage.fetch(),
      id: '',
      wop: 'NONE',
      flatExtra: '',
      flatDuration: '',
      uwclass: 'null',
      orderAPS: '',
      orderLABS: '',
      requirement: '',
      task: '',
      verbiage: '',
      decision: ''
    }
  },
  computed: {
    // ...mapGetters({
    //   loadRuleStep: 'loadSteps'
    // })
    filteredQuestions () {
      return this.ruleresult
    }
  },
  watch: {
    ruleresult: {
      handler (ruleruleresultstep) {
        ruleStorage.save(ruleresult)
      },
      deep: true
    },
     ruleResultfk: {

    }
  },
  methods: {
    addResult () {
      switch (this.questionOptions) {
        case 'String':
        this.questionOptions = 0
        break;

        case 'Integer':
        this.questionOptions = 1
        break;

        case 'Boolean':
        this.questionOptions = 2
        break;
      }
       this.ruleresult.push({
        id: this.id,
        questionName: this.wop,
        ruleId: this.flatExtra,
        dataelementId: this.flatDuration,
        option: this.uwclass,
        values: this.orderAPS,
        values: this.orderLABS,
        values: this.requirement,
        values: this.task,
        values: this.verbiage,
        values: this.decision,
    })
      this.id= '',
      this.wop= 'NONE',
      this.flatExtra= '',
      this.flatDuration= '',
      this.uwclass= 'null',
      this.orderAPS= '',
      this.orderLABS= '',
      this.requirement= '',
      this.task= '',
      this.verbiage= '',
      this.decision= ''
  },
  genGUID () {
      this.id = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    clear () {
      this.id= '',
      this.wop= 'NONE',
      this.flatExtra= '',
      this.flatDuration= '',
      this.uwclass= 'null',
      this.orderAPS= '',
      this.orderLABS= '',
      this.requirement= '',
      this.task= '',
      this.verbiage= '',
      this.decision= ''
    }
}
}
</script>
<style scoped>
.script-text {
  font-weight: bold;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
}
</style>

