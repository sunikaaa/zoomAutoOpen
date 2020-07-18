<template>
  <div>
    <v-btn color="error" dark rounded large right @click="dialog = true">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Zoom予定作成</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Zoom名" v-model="name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <v-select label="曜日" :items="dayOfWeek" v-model="week"></v-select>{{week}}
              </v-col>
              <v-col cols="6">
                <v-container>
                  <v-row justify="center">
                    <v-col cols="4">
                      <v-select
                        :items="Array.from([...Array(24)],(v,i)=>i)"
                        label="時"
                        v-model="hour"
                      ></v-select>
                    </v-col>
                    <v-col align-self="center" cols="1">
                      <span>:</span>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        :items="Array.from([...Array(60)],(v,i)=>i)"
                        label="分"
                        v-model="minute"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ZoomURL" v-model="url"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Zoomパスワード" :disabled="isRequirePassWord" v-model="pass"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-btn color="green darken-1" text @click="dialog = false">キャンセル</v-btn>
        <v-btn color="green darken-1" text @click="createData">作成</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    weekNumber: Number,
    dayOfWeek: Array
  },
  data() {
    return {
      dialog: false,
      name: "",
      url: "",
      pass: "",
      hour: 0,
      minute: 0,
      week:0
    };
  },
  methods: {
    createData() {
      const name = this.name;
      const url = this.url;
      const pass = this.pass;
      const time = this.hour * 60 + this.minute
        // hour: this.hour,
        // minute: this.minute
    //   };
      const weekDay = this.week;
      this.$store.commit(
        "createZoomData",
        { name, url, pass, time, weekDay }
      );
      this.dialog = false;
    }
  },
  computed: {
    isRequirePassWord() {
      return this.url.includes("?pwd=");
    }
  },
  destroyed() {
    this.name = "";
    this.url = "";
    this.pass = "";
    this.hour = 0;
    this.minute = 0;
  }
};
</script>

<style>
.inline {
  display: inline;
}
</style>