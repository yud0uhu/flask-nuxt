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
          <v-tab>洋食</v-tab>
          <v-tab>和食</v-tab>
          <v-tab>中華</v-tab>
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
        <h2>検索結果（{{ shops.length }}件）</h2>
        <p v-if="error">データの取得に失敗しました</p>
        <NuxtLink to="/note">Note</NuxtLink>

        <v-expansion-panels>
          <v-expansion-panel v-for="shop in shops" :key="shop.id">
            <v-expansion-panel-header>
              <p>{{ shop.name }}</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>{{ shop.genre.catch }}</p>
              <p>{{ shop.genre.name }}</p>
              <p>{{ shop.tel }}</p>
              <p>{{ shop.address }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>
    </v-sheet>
  </v-card>
</template>
<script>
export default {
  layout: "test",
  data() {
    return {
      shops: [],
      error: false,
    };
  },
  methods: {
    //レスポンス後の処理
    setShop(res) {
      this.shops = res.data.results.shop;
    },
    //エラーが発生した場合の処理
    setError(err) {
      console.log(err);
      this.error = true;
    },
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      //APIからデータを取得
      this.$axios
        .get("http://localhost:3000/api/gourmet/v1/", {
          //パラメータの設定
          params: {
            key: process.env.apikey,
            lat: position.coords.latitude, //取得した緯度を設定
            lng: position.coords.longitude, //取得した経度を設定
            format: "json",
          },
        })
        .then(this.setShop)
        .catch(this.setError);
    }, this.setError);
  },
};
</script>
