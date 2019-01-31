<template>
      <v-container>
        <v-layout>
          <v-form v-on:submit.prevent="addQuestion">
            <v-text-field
              v-model="id"
              name="skipStepId"
              label="SkipStep_Id"
              id="skipstep-id"
            ></v-text-field>
            <v-btn color="success">Success</v-btn>
          </v-form>
        </v-layout>
      </v-container>
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
  name: 'Results',
  data () {
    return {
      rulestep: ruleStorage.fetch(),
      id: ''
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

      this.optionsets.push({
        id: this.optionId++,
        value: this.optionval,
        expression: this.compareExp,
        nextStepId: this.nextStepId,
        exit: this.exit,
        sequence: this.sequence++
      })
      this.optionval = ''
      this.compareExp = ''
      this.exit = ''
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
       this.rulestep.push({
        id: this.id,
        questionName: this.questionName,
        ruleId: this.ruleId,
        dataelementId: this.dataelementId,
        option: this.questionOptions,
        values: this.optionsets
    })
        this.id = ''
        this.questionName = ''
        this.ruleId = ''
        this.dataelementId = ''
        this.questionOptions = ''
        this.options = ''
  }
}
}
</script>
