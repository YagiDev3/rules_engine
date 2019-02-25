<template>
<v-app>
        <v-container>
          <v-layout class="skipstep-form">
            <v-flex xs6>
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
                    label="NULL"
                    value="null"
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
                <!-- Tentative offer -->
                <v-radio-group v-model="tentaive" row>
                  <h2>Tentative:</h2>
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
                <!-- Table Rating -->
                <v-text-field
                  v-model="tableRating"
                  name="tableRating"
                  label="Table Rating"
                  id="table-rating"
                ></v-text-field>
                <!-- MIB Code -->
                <v-text-field
                  v-model="mibCode"
                  name="mibcode"
                  label="MIB Code"
                  id="mib-code"
                ></v-text-field>
                <v-radio-group v-model="appSection" row class="labs-style">
                  <h2>App Section:</h2>
                  <v-radio
                    label="Part 1"
                    value="1"
                  ></v-radio>
                  <v-radio
                    value="2"
                    label="Part 2"
                  ></v-radio>
                </v-radio-group>
                <!-- ORDER APS -->
                <v-radio-group row class="labs-style">
                  <v-checkbox v-model="orderAPS" label="OrderAPS" value="1"></v-checkbox>&nbsp;
                  <v-checkbox v-model="orderLABS" label="OrderLabs" value="1"></v-checkbox>&nbsp;
                  <v-checkbox v-model="orderCDT" label="OrderLabsCDT" value="2"></v-checkbox>
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
                    value="99"
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
            <!--SnackBar-->
            <v-snackbar
              v-model="snackbar"
              timeout="2000"
              top
              vertical
              auto-height
            >
              {{ text }}
              <v-btn
                color="pink"
                flat
                @click="snackbar = false"
            >
                Close
              </v-btn>
            </v-snackbar>
            <!--Results section-->
            <v-flex xs6>
                <h1>Results</h1>
              <div
                v-for="(result, index) in ruleresult"
                :key="result.id"
                >
                <span class="script-text">{{result.script}}</span>
                <v-btn
                color="red"
                @click="ruleresult.splice(index, 1)">remove</v-btn>
              </div>
                </v-flex>
          </v-layout>
        </v-container>
</v-app>
</template>

<script>
/* eslint-disable */
var STORAGE_KEY = 'ruleresult-vue'
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
  props: ['id'],
  data () {
    return {
      ruleresult: ruleStorage.fetch(),
      id: this.id,
      wop: 'null',
      flatExtra: null,
      flatDuration: null,
      uwclass: 'null',
      tentaive: 'null',
      orderAPS: '0',
      orderLABS: '0',
      tableRating: '0',
      requirement: null,
      task: null,
      verbiage: null,
      decision: '10',
      resultId: '',
      mibCode: null,
      appSection: '1',
      snackbar: false,
      text: 'Added Result'
    }
  },
  computed: {
    filteredQuestions () {
      return this.ruleresult
    }
  },
  watch: {
    ruleresult: {
      handler (ruleresult) {
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

      if (this.mibCode == null) {
        this.mibCode = 'NONE'
      }

      this.resultId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId1 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId2 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId3 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId4 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId5 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId6 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId7= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId8= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
            this.resultId9= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
      this.resultId10= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
      this.resultId11= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
      this.resultId12= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
      this.resultId13= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
      this.resultId14= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
        var resultOutput = ("('" + this.resultId + "'" + "," + "'" + "WOP" + "'," + "'" + this.wop + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId9 + "'" + "," + "'" + "FLATEXTRA" + "'," + "'" + this.flatExtra + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId1 + "'" + "," + "'" + "FLATDURATION" + "'," + "'" + this.flatDuration + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId11 + "'" + "," + "'" + "TABLERATING" + "'," + "'" + this.tableRating + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId2 + "'" + "," + "'" + "UWCLASS" + "'," + "'" + this.uwclass + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId10 + "'" + "," + "'" + "MIBCODE" + "'," + "'" + this.mibCode + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId12 + "'" + "," + "'" + "APPPART" + "'," + "'" + this.appSection + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId3 + "'" + "," + "'" + "ORDERAPS" + "'," + "'" + this.orderAPS + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId4 + "'" + "," + "'" + "ORDERLABS" + "'," + "'" + this.orderLABS + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId14 + "'" + "," + "'" + "ORDERLABSCDT" + "'," + "'" + this.orderCDT + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId5 + "'" + "," + "'" + "REQUIREMENT" + "'," + "'" + this.requirement + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId6 + "'" + "," + "'" + "TASK" + "'," + "'" + this.task + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId7 + "'" + "," + "'" + "VERBIAGE" + "'," + "'" + this.verbiage + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId13 + "'" + "," + "'" + "TENTATIVEOFFER" + "'," + "'" + this.tentaive + "'" + "," + "'" + this.id + "')," +
        "('" + this.resultId8 + "'" + "," + "'" + "DECISION" + "'," + "'" + this.decision + "'" + "," + "'" + this.id + "'),")
       this.ruleresult.push({
         script: resultOutput
        // id: this.id,
        // wop: this.wop,
        // flatExtra: this.flatExtra,
        // flatDuration: this.flatDuration,
        // uwclass: this.uwclass,
        // aps: this.orderAPS,
        // labs: this.orderLABS,
        // requirement: this.requirement,
        // task: this.task,
        // verbiage: this.verbiage,
        // decision: this.decision,
        // resultId: this.resultId
    })
    // Snackbar implementation when you add result
    this.snackbar = true
  },
  genGUID () {
      this.id = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    clear () {
      this.id= '',
      this.wop= 'null',
      this.flatExtra= null,
      this.flatDuration= null,
      this.uwclass= 'null',
      this.orderAPS= '0',
      this.orderLABS= '0',
      this.orderCDT= '0',
      this.requirement= null,
      this.task= null,
      this.verbiage= null,
      this.decision= '10',
      this.tentaive= 'null'
    }
}
}
</script>
<style scoped>
.container {
  min-width: 100%;
}
.script-text {
  font-weight: bold;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
}

.skipstep-form {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 20px;
  padding: 30px;
}

.v-input {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    font-size: 14px;
    text-align: left;
}

.v-text-field {
    padding-top: 12px;
    margin-top: 4px;
    height: 50px;
}

.v-input--selection-controls.v-input .v-label {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    top: 0;
    height: auto;
    font-size: small;
}

.labs-style {
  margin-bottom: -40px;
}

.flex.xs6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 50%;
    padding: 10px;
}
</style>

