<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>コンテンツ1</v-tab>
          <v-tab>コンテンツ2</v-tab>
          <v-tab>コンテンツ3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 250px"></v-container>
      <section>
        <h2>検索結果（{{ infos.categories }}件）</h2>
        <p v-if="error">データの取得に失敗しました</p>

        <v-expansion-panels>
          <v-expansion-panel v-for="info in infos" v-bind:key="info.categories">
            <v-expansion-panel-header>
              <!-- ボタンをクリックするとログにapiを叩いた結果が出力される -->
              <v-btn><button v-on:click="showMessage">ボタン</button></v-btn>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>{{ info }}</p>
              <p>{{ info.categories }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>
    </v-sheet>
  </v-card>
</template>
<script>
export default {
  name: "note",
  data() {
    return {
      message: "Hello",
      infos: [],
      loading: true,
      errored: false,
    };
  },
  methods: {
    showMessage() {
      this.$axios
        .$get("/tasks")
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.$axios
      .$get("/categories")
      .then((response) => (this.infos = response))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
};
</script>
