<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Zoom自動起動</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <section>このページ毎週Zoom開始時刻が決まっていてわざわざURLを探してアクセスしなくて済むようにこのページ１つで自動でZoomを起動してくれるようにしたサイトです。</section>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-col>
        <v-switch v-model="isCopyPass" label="zoom起動時にパスワードをコピーする"></v-switch>
      </v-col>
      <v-col cols="2">
        <createDataModal :weekNumber="selectedWeek" :dayOfWeek="week" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="selectedWeek" fixed-tabs>
          <v-tab v-for="day in week" :key="day.value">{{day.text}}</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12">
        <oneDay :dayOfWeekData="weekData[selectedWeek]" :week="selectedWeek" />
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col
        cols="12"
      >ChromeはZoomを起動するためにクリックしなくてはならないため非推奨です。IEはデフォルトでFireFoxは設定により自動起動が可能になるためそちらを推奨します。</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">またログイン等は存在せず、すべてのデータをブラウザに保存するため利用しているPC自体を誰かに見られない限りZoomのURLが外部に漏れることはありません。</v-col>
    </v-row>
    <input type="text" class="fixed-out" v-model="secretCopy" />
  </v-container>
</template>

<script>
import oneDay from "@/components/oneDay";
import { mapGetters } from "vuex";
import createDataModal from "@/components/createDataModal";

export default {
  components: {
    oneDay,
    createDataModal
  },
  data: () => ({
    week: [
      { text: "日曜日", value: 0 },
      { text: "月曜日", value: 1 },
      { text: "火曜日", value: 2 },
      { text: "水曜日", value: 3 },
      { text: "木曜日", value: 4 },
      { text: "金曜日", value: 5 },
      { text: "土曜日", value: 6 }
    ],
    selectedWeek: 0,
    isCopyPass: false,
    secretCopy: ""
  }),
  computed: {
    ...mapGetters({
      weekData: "allWeekData"
    })
  },
  methods: {},
  created() {
    let dayOfWeek = new Date().getDay();
    this.selectedWeek = dayOfWeek;
    setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const nowTime = hour * 60 + minute;
      const dayOfWeek = date.getDay();
      this.weekData[dayOfWeek].forEach(day => {
        if (nowTime === day.time) {
          if (day.isEffect) {
            if (!day.url.includes("?pwd=")) {
              if (this.isCopyPass) {
                this.secretCopy = day.pass;
                this.$copyText(this.secretCopy).then(
                  function(e) {
                    console.log(e);
                  },
                  function(e) {
                    console.log(e);
                  }
                );
              }
            }
            window.open(day.url);
          }
        }
        console.log(nowTime, day.time);
      });
    }, 1000 * 60);
  }
};
</script>
<style scoped>
.fixed-out {
  position: fixed;
  left: -100vw;
}
</style>