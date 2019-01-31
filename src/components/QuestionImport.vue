<template>
<div>
    <v-app>
        <v-container>
          <v-layout>
            <v-form v-on:submit.prevent="addQuestion">
              <v-text-field
                v-model="id"
                name="ruleStepId"
                label="RuleStep_Id"
                id="rulestep-id"
              ></v-text-field>
              <v-btn
              small
              color="success"
              @click="genGUID">Generate guid</v-btn>
              <v-text-field
                v-model="questionName"
                name="questionName"
                label="Questions"
                id="question-name"
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
                v-model="dataelementId"
                name="dataelementId"
                label="DataElement_Id"
                id="dataelement-id"
              ></v-text-field>
              <div>
                SkipStep-OptionSet
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
              <hr>
              <v-checkbox
              label="Exit"
              v-model="exit"
              value="exit"
              ></v-checkbox>
              <div>
                RuleStep_FK: <br>
                {{id}}
              </div>
              <div
              v-for="(option, index) in optionsets"
              :key="option.id">
              {{option}}
              <br />
              <v-btn
              small
              color="red"
              @click="optionsets.splice(index, 1)">remove</v-btn>
              </div>
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
              <hr>
            </v-form>
          </v-layout>
        </v-container>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <div
              v-for="(question, index) in rulestep"
              :key="question.id"
              >
              {{question}}
              <v-btn
              color="red"
              @click="rulestep.splice(index, 1)">remove</v-btn>
              <!-- <v-btn
              color="success"
              @click="">Add Options</v-btn> -->
            </div>
          </v-layout>
        </v-container>
    </v-app>
    <router-view/>
</div>
</template>

<script>
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
  data () {
    return {
      rulestep: ruleStorage.fetch(),
      id: '',
      questionName: '',
      ruleId: '',
      dataelementId: '',
      optionsets: [],
      linkedRule: [],
      questionOptions: [],
      compareExp: [],
      optionval: '',
      optionId: 0,
      sequence: 0,
      exit: false,
      nextStepId: '',
      skipStepId: '',
      ruleStepfk: this.id
    }
  },
  computed: {
    // ...mapGetters({
    //   loadRuleStep: 'loadSteps'
    // })
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
        this.compareExp = 1
        break;

        case 'lessorequal':
        this.compareExp = 2
        break;

        case 'greaterthan':
        this.compareExp = 3
        break;

        case 'greaterorequal':
        this.compareExp = 4
        break;
      }

      if (this.exit) {
        this.exit = 1
        this.nextStepId = null
      } else {
        this.exit = 0
      }

      var finalOutput = "'" + this.skipStepId + "'" + " "  + "," + " " + "'" + this.id + "'" + " "  + "," + " " + "'" + this.compareExp + "'" + " "  + "," + " " + "'" + this.optionval + "'" + " "  + "," + " " + "'" + this.nextStepId + "'" + " "  + "," + " " + "'" + this.exit + "'" + " "  + "," + " " + "'" + this.sequence + "'"
      this.optionsets.push({
        script: finalOutput
        // id: this.optionId++,
        // value: this.optionval,
        // expression: this.compareExp,
        // nextStepId: this.nextStepId,
        // exit: this.exit,
        // sequence: this.sequence++
      })
    },
    addQuestion () {
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

      var ruleOutput = "'" + this.id + "'" + "," + "'" + this.questionName + "'" + "," + "'" + this.ruleId + "'" + "," + "'" + this.dataelementId + "'" + "," + "'" + this.questionOptions + "'" + "," + "'" + this.optionsets + "'"
       this.rulestep.push({
        script: ruleOutput
        // questionName: this.questionName,
        // ruleId: this.ruleId,
        // dataelementId: this.dataelementId,
        // option: this.questionOptions,
        // values: this.optionsets
    })
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
        this.ruleId = ''
        this.dataelementId = ''
        this.questionOptions = ''
        this.options = ''
        this.optionval = ''
        this.compareExp = ''
        this.exit = ''
        this.skipStepId = ''
    }
  }
}
</script>
