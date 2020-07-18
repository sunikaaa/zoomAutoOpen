<template>
  <v-edit-dialog large @save="save" @open="open">
    <span class="spanBox" v-if="!time">{{data.item[changeDataValue]}}</span>
    <span class="spanBox" v-if="time">{{disPlayTime}}</span>
    <template v-slot:input>
      <v-text-field label="編集" v-if="!time" single-line counter autofocus v-model="updateData"></v-text-field>
      <v-card width="300px">
        <v-container v-if="time" width="300px">
          <v-row>
            <v-col cols="5">
              <v-select :items="Array.from([...Array(24)],(v,i)=>i)" label="時" v-model="hour"></v-select>
            </v-col>
            <v-col align-self="center" cols="1">
              <span>:</span>
            </v-col>
            <v-col cols="5">
              <v-select :items="Array.from([...Array(60)],(v,i)=>i)" label="分" v-model="minute"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </v-edit-dialog>
</template>

<script>
export default {
  props: {
    week: Number,
    changeDataValue: String,
    data: {
      required: true
    },
    time: Boolean
  },
  data() {
    return {
      updateData: "",
      hour: "",
      minute: ""
    };
  },
  methods: {
    save() {
      const weekDay = this.week;
      console.log(weekDay);
      if (!this.time) {
        this.$store.commit("updateZoomData", {
          ...this.data.item,
          [this.changeDataValue]: this.updateData,
          weekDay
        });
      } else {
        this.$store.commit("updateZoomData", {
          ...this.data.item,
          time: this.hour * 60 + this.minute,
          weekDay
        });
      }
    },
    open() {
      this.updateData = this.data.item[this.changeDataValue];
      console.log(this.data, this.changeDataValue);
      this.hour = Math.floor(this.data.item.time / 60);
      this.minute = this.data.item.time % 60;
    }
  },
  computed: {
    disPlayTime() {
      if (this.time) {
        const minute = this.minute < 10 ? "0" + this.minute : this.minute;
        const hour = this.hour < 10 ? "0" + this.hour : this.hour;
        return hour + ":" + minute;
      } else {
        return 0;
      }
    }
  },
  created() {
    this.hour = Math.floor(this.data.item.time / 60);
    this.minute = this.data.item.time % 60;
  }
};
</script>

<style>
</style>