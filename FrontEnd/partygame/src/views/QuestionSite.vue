<template>
  <div class="flex-row mx-auto d-flex justify-center">
    <div align="center" class="mx-auto verticalAlign">
      <button
        class="buttonsMenu mb-3"
        role="button"
        @click="openCreateQuestionDialog"
      >
        Neue Fragen Hinzufügen
      </button>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="fragen"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            @click="editQuestion(item)"
            small
            plain
            class="primary mt-2 mb-2 me-2"
            >Bearbeiten</v-btn
          >
        </template>
      </v-data-table>
    </div>
    <v-dialog max-width="600" v-model="createDialog">
      <v-card>
        <v-form>
          <div>
            <v-text-field
              label="Frage"
              required
              v-model="newQuestion.fragen"
            ></v-text-field>
            <v-radio-group v-model="questionType" column>
              <v-radio
                label="Gruppen Frage"
                color="red"
                value="group"
              ></v-radio>
              <v-radio
                label="Single Frage"
                color="red"
                value="single"
              ></v-radio>
            </v-radio-group>
          </div>
          <div>
            <v-select
              :items="gameNames"
              label="Spiel"
              outlined
              v-model="newQuestion.gameID"
            ></v-select>
            <v-select
              v-if="newQuestion.gameID != ''"
              :items="
                games
                  .find((e) => e.Name == newQuestion.gameID)
                  .Kategorien.split(';')
              "
              label="Kategorien"
              outlined
              v-model="newQuestion.kategorie"
            ></v-select>
          </div>
          <v-btn color="primary" text @click="createDialog = false">
            Schließen
          </v-btn>
          <v-btn color="success" @click="createQuestion">
            Frage Hinzufügen
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600" v-model="editDialog">
      <v-card>
        <v-card-title>Frage Bearbeiten</v-card-title>
        <div>
          <v-text-field
            label="Frage"
            required
            v-model="curQuestion.Frage"
          ></v-text-field>
          <v-select
            v-if="curQuestion.Game_ID != ''"
            :items="
              games
                .find((e) => e.Game_ID == curQuestion.Game_ID)
                .Kategorien.split(';')
            "
            label="Kategorien"
            outlined
            v-model="curQuestion.Kategorie"
          ></v-select>
        </div>
        <v-card-actions>
          <v-btn color="primary" text @click="editDialog = false">
            Schließen
          </v-btn>
          <v-btn color="deep-purple lighten-2" text @click="saveQuestion">
            Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import server from '@/serverInterface';
export default {
  data() {
    return {
      search: '',
      fragen: [],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'Fragen_ID',
        },
        { text: 'Frage', value: 'Frage' },
        { text: 'Kategorie', value: 'Kategorie' },
        { text: 'Gruppenfrage', value: 'GruppenFrage' },
        { text: 'Einzelfrage', value: 'SingleFrage' },
        { text: 'Game', value: 'Game_ID' },
        { text: 'Actions', value: 'action' },
      ],
      createDialog: false,
      editDialog: false,
      newQuestion: {
        fragen: '',
        kategorie: '',
        singleFrage: '',
        gruppenFrage: '',
        gameID: '',
      },
      games: [],
      gameNames: [],
      questionType: '',
      curQuestion: {},
    };
  },
  methods: {
    async saveQuestion() {
      await server.patch(
        `${process.env.VUE_APP_SERVER_BASE_URL}/ask/editQuestion/${this.curQuestion.Fragen_ID}`,
        {
          Frage: this.curQuestion.Frage,
          Kategorie: this.curQuestion.Kategorie,
          SingleFrage: this.curQuestion.SingleFrage,
          GruppenFrage: this.curQuestion.GruppenFrage,
        }
      );
      this.editDialog = false;
      this.getAllFragen();
    },
    editQuestion(question) {
      this.curQuestion = question;
      this.editDialog = true;
    },
    async getAllFragen() {
      this.fragen = (
        await server.get(
          `${process.env.VUE_APP_SERVER_BASE_URL}/ask/gameQuestions`
        )
      ).data;

      this.games = (
        await server.get(
          `${process.env.VUE_APP_SERVER_BASE_URL}/game/allGames/question`
        )
      ).data;
      this.games.forEach((element) => {
        this.gameNames.push(element.Name);
      });
    },
    async createQuestion() {
      switch (this.questionType) {
        case 'single':
          this.newQuestion.singleFrage = true;
          this.newQuestion.gruppenFrage = false;
          break;
        case 'group':
          this.newQuestion.singleFrage = false;
          this.newQuestion.gruppenFrage = true;
          break;
      }

      switch (this.newQuestion.gameID) {
        case 'Trinkspiel Fragen':
          this.newQuestion.gameID = 1;
          break;

        case 'Ich hab noch nie':
          this.newQuestion.gameID = 2;
          break;

        case 'Würdest du eher':
          this.newQuestion.gameID = 3;
          break;
      }

      await server.post(
        `${process.env.VUE_APP_SERVER_BASE_URL}/ask/newQuestion`,
        {
          Frage: this.newQuestion.fragen,
          Kategorie: this.newQuestion.kategorie,
          SingleFrage: this.newQuestion.singleFrage,
          GruppenFrage: this.newQuestion.gruppenFrage,
          Game_ID: this.newQuestion.gameID,
        }
      );
      this.newQuestion.gameID = '';
      this.createDialog = false;

      this.getAllFragen();
    },
    openCreateQuestionDialog() {
      this.createDialog = true;
    },
  },
  created() {
    this.getAllFragen();
    this.curQuestion.Game_ID = '';
    this.newQuestion.gameID = '';
  },
};
</script>

<style>
.buttonsMenu {
  appearance: button;
  background-color: #000;
  background-image: none;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: ITCAvantGardeStd-Bk, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.buttonsMenu:focus {
  text-decoration: none;
}

.buttonsMenu:hover {
  text-decoration: none;
}

.buttonsMenu:active {
  box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
  outline: 0;
}

.buttonsMenu:not([disabled]):active {
  box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .buttonsMenu {
    padding: 12px 50px;
  }
}

.verticalAlign {
  margin: 0;
  position: absolute;
  top: 40%;
  -ms-transform: translateY(-40%);
  transform: translateY(-40%);
}
</style>
