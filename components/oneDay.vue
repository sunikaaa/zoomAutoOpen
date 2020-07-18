<template>
  <v-data-table
    :headers="headers"
    :items-per-page="5"
    class="elevation-1"
    :items="zoomData"
    hide-default-footer
    item-key="index"
  >
    <template v-slot:item.time="{item}">
      <editModal :week="week" :data="{item}" changeDataValue="time" time />
    </template>
    <template v-slot:item.name="{item}">
      <editModal :week="week" :data="{item}" changeDataValue="name" />
    </template>
    <template v-slot:item.url="{item}">
      <editModal :week="week" :data="{item}" changeDataValue="url" />
    </template>
    <template v-slot:item.password="{item}">
      <editModal :week="week" :data="{item}" changeDataValue="pass" />
    </template>
    <template v-slot:item.isEffect="{ item }">
      <v-simple-checkbox :value="item.isEffect" @click.prevent="chengeEffect(item)" />
    </template>
    <template v-slot:item.delete="{ item }">
      <v-btn class="ma-2" outlined small fab color="red" @click="deleteData(item)">×</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import editModal from "@/components/editModal";
export default {
  props: {
    dayOfWeekData: Array,
    week: Number
  },
  components: {
    editModal
  },
  data() {
    return {
      selectItem: []
    };
  },
  computed: {
    headers() {
      return [
        { text: "開始時間", value: "time", align: "start" },
        { text: "Zoom管理", value: "name", sortable: false },
        { text: "URL", value: "url", sortable: false },
        { text: "パスワード", value: "password", sortable: false },
        { text: "autoOpen", value: "isEffect", sortable: false },
        { text: "delete", value: "delete", sortable: false }
      ];
    },
    zoomData() {
      return this.dayOfWeekData.map((v, i) => {
        v.index = i;
        return v;
      });
    }
  },
  methods: {
    chengeEffect(data) {
      this.$store.commit("updateZoomData", {
        ...data,
        isEffect: !data.isEffect,
        weekDay: this.week
      });
    },

    deleteData(data) {
      this.$store.commit("deleteZoomData", {
        index: data.index,
        weekDay: this.week
      });
    }
  }
};
</script>

<style>
</style>