<template>
<div>
    <v-app>
        <v-container>
          <v-layout>
            <v-flex xs6>
            <v-form v-on:submit.prevent="addQuestion">
              <div class="skipstep-form">
              <h2>RuleStep</h2>
              <v-layout row>
              <v-text-field
                v-model="id"
                name="ruleStepId"
                label="rulestep_Id"
                id="rulestep-id"
              ></v-text-field>
              <v-btn
              small
              color="success"
              @click="genGUID">Generate guid</v-btn>
              </v-layout>
              <v-layout row>
              <v-text-field
                v-model="questionName"
                name="questionName"
                label="Questions"
                id="question-name"
              ></v-text-field>
              <v-btn
              small
              color="success"
              @click="questionToggle = !questionToggle">Add QuestionId +</v-btn>
              </v-layout>
              <v-text-field
                v-if="questionToggle"
                v-model="questionId"
                name="questionId"
                label="Questions_Id"
                id="question-name"
              ></v-text-field>
              <v-text-field
                v-model="step"
                name="step"
                label="Step"
                id="step-number"
              ></v-text-field>
              <v-radio-group v-model="questionOptions" row>
                <v-radio
                  value="String"
                  label="String"
                ></v-radio>
                <v-radio
                  value="Integer"
                  label="Integer"
                ></v-radio>
                <v-radio
                  label="Boolean"
                  value="Boolean"
                ></v-radio>
              </v-radio-group>
              <v-text-field
                v-model="ruleId"
                name="ruleId"
                label="Rule_Id"
                id="rule-id"
              ></v-text-field>
              <v-text-field
                v-model="valueExpression"
                name="valueExpression"
                label="Value Expression"
                id="value-expression"
              ></v-text-field>
              <v-text-field
                v-model="dataelementId"
                name="dataelementId"
                label="DataElement_Id"
                id="dataelement-id"
              ></v-text-field>
              </div>
              <div class="skipstep-form">
                <h2>SkipStep-OptionSet</h2>
                <v-layout row>
                <v-text-field
                v-model="skipStepId"
                name="skipStepId"
                label="SkipStep_Id"
                id="skipstep-id"
              ></v-text-field>
              <v-btn
              small
              color="success"
              @click="skipGUID">Generate guid</v-btn>
                </v-layout>
                <v-text-field
                v-model="optionval"
                name="option"
                label="Options"
                id="option"
              ></v-text-field>
              <v-radio-group v-model="compareExp" row>
                <v-radio
                  value="default"
                  label="Default"
                ></v-radio>
                <v-radio
                  value="equals"
                  label="Equals"
                ></v-radio>
                <v-radio
                  value="lessthan"
                  label="LessThan"
                ></v-radio>
                <v-radio
                  value="lessorequal"
                  label="LessThanOrEqual"
                ></v-radio>
                <v-radio
                  value="greaterthan"
                  label="GreaterThan"
                ></v-radio>
                <v-radio
                  value="greaterorequal"
                  label="GreaterThanOrEqual"
                ></v-radio>
              </v-radio-group>
              <v-checkbox
                v-model="checkbox"
                label="Exit"
              ></v-checkbox>
              <v-text-field
                v-model="id"
                readonly
                name="rulestep_fk"
                label="Current Rulestep"
              ></v-text-field>
              </div>
              <v-btn
              small
              color="success"
              @click="addOption">+ option</v-btn>
              <v-btn
              color="success"
              @click="addQuestion">Add Question</v-btn>
              <v-btn
              color="success"
              @click="clear">Clear</v-btn>
            </v-form>
            </v-flex>
            <v-flex xs6
            class="results">
              <h1>Question</h1>
            <div
              v-for="(question, index) in rulestep"
              :key="question.id"
              >
              <v-layout row>
              <span class="script-text">{{question.script}}</span>
              <v-btn
              color="red"
              @click="rulestep.splice(index, 1)">remove</v-btn>
              </v-layout>
            </div>
            <h1>SkipStep</h1>
              <div
              v-for="(option, index) in optionsets"
              :key="option.id">
              <v-layout row>
              <span class="script-text">{{option.script}}</span>
              <br />
              <v-btn
              small
              color="red"
              @click="optionsets.splice(index, 1)">remove</v-btn>
              <v-btn
              v-if="option.exit"
              small
              color="blue"
              :to="{ name: 'Results', params: { id: option.skip }}"
              target="_blank"
              >add result</v-btn>
              </v-layout>
              </div>
              <div class="draggable-state">
                <draggable v-model="rulestep" :options="{draggable:'.sortable-stack', animation: 150, easing: 'cubic-bezier(1, 0, 0, 1)'}" @start="drag=true" @end="drag=false">
                  <div
                  class="sortable-stack"
                  v-for="element in rulestep"
                  :key="element.id">
                    {{element.questiontext}}
                    {{element.script}}
                  </div>
                </draggable>
              </div>
              </v-flex>
              </v-layout>
        </v-container>
    </v-app>
    <router-view/>
</div>
</template>

<script>
import draggable from 'vuedraggable'
/* eslint-disable */
var STORAGE_KEY = 'rulestep-vue'
var ruleStorage = {
  fetch: function () {
    var rulestep = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    rulestep.forEach(function (rulestep, index) {
      rulestep.id = index
    })
    ruleStorage.uid = rulestep.length
    return rulestep
  },
  save: function (rulestep) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rulestep))
  }
}

export default {
  name: 'QuestionImport',
  components: {
    draggable,
  },
  data () {
    return {
      rulestep: ruleStorage.fetch(),
      id: '',
      questionName: '',
      questionId: null,
      ruleId: 'null',
      valueExpression: 'null',
      dataelementId: 'null',
      optionsets: [],
      linkedRule: [],
      questionOptions: [],
      compareExp: [],
      optionval: '',
      optionId: 0,
      sequence: 0,
      step: null,
      checkbox: false,
      checkvalue: 0,
      nextStepId: 'import next step here',
      skipStepId: '',
      ruleStepfk: this.id,
      questionToggle: false
    }
  },
  computed: {
    filteredQuestions () {
      return this.rulestep
    }
  },
  watch: {
    rulestep: {
      handler (rulestep) {
        ruleStorage.save(rulestep)
      },
      deep: true
    },
     ruleStepfk: {

    }
  },
  methods: {
    addOption () {
      switch (this.compareExp) {
        case 'default':
        this.compareExp = -1
        break;

        case 'equals':
        this.compareExp = 0
        break;

        case 'lessthan':
        this.compareExp = 3
        break;

        case 'lessorequal':
        this.compareExp = 4
        break;

        case 'greaterthan':
        this.compareExp = 1
        break;

        case 'greaterorequal':
        this.compareExp = 2
        break;
      }

      if (this.checkbox == true) {
        this.nextStepId = null
        this.checkvalue = 1
      } else {
        this.checkvalue = 0
        this.nextStepId = 'IMPORT NEXTSTEPid'
      }
      // this.questionId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      //   (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      // )
      var finalOutput = "('" + this.skipStepId + "'" + " "  + "," + " " + "'" + this.sequence++ + "'" + " "  + "," + " " + "'" + this.compareExp + "'" + " "  + "," + " " + "'" + this.optionval + "'" + " "  + "," + " " + "'" + this.nextStepId + "'" + " "  + "," + " " + "'" + this.checkvalue + "'" + " "  + "," + " " + "'" + this.id + "'),"
      this.optionsets.push({
        script: finalOutput,
        exit: this.checkvalue,
        skip: this.skipStepId
        // id: this.optionId++,
        // value: this.optionval,
        // expression: this.compareExp,
        // nextStepId: this.nextStepId,
        // exit: this.exit,
        // sequence: this.sequence++
      })
      this.checkbox = false
    },
    addQuestion () {
      switch (this.questionOptions) {
        case 'String':
        this.questionOptions = 2
        break;

        case 'Integer':
        this.questionOptions = 1
        break;

        case 'Boolean':
        this.questionOptions = 3
        break;
      }
      var ruleOutput = "('" + this.id  + "'" + " "  + "," + " " + "'" + this.step  + "'" + " "  + "," + " " + "'" + this.questionOptions + "'" + " "  + "," + " " + "'" + this.questionId + "'" + " "  + "," + " " + "'" + this.valueExpression + "'" + " "  + "," + " " + "'" + this.ruleId + "'" + " "  + "," + " " + "'" + this.questionName + "'" + " "  + "," + " " + "'" + this.dataelementId + "'),"
       this.rulestep.push({
        script: ruleOutput,
        questiontext: this.questionName
        // questionName: this.questionName,
        // ruleId: this.ruleId,
        // dataelementId: this.dataelementId,
        // option: this.questionOptions,
        // values: this.optionsets
    })
    this.sequence = 0
    this.questionId = null
    this.questionToggle = false
  },
  genGUID () {
      this.id = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    skipGUID () {
      this.skipStepId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    clear () {
        this.id = ''
        this.questionName = ''
        // this.ruleId = ''
        this.questionOptions = ''
        this.options = ''
        this.optionval = ''
        this.compareExp = ''
        this.exit = ''
        this.skipStepId = ''
        this.step = 1,
        this.sequence = 0
    },
    loadResults(id) {
      this.$router.push('/results/' + id)
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

.spacer {
  height: 30px;
}

.skipstep-form {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 20px;
  padding: 10px;
}

.sortable-stack {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 5px;
}
.results {
  padding: 10px;
}

.draggable-state {
  margin-top: 50px;
  position: relative;
}
</style>
