<template>
  <HeaderSlot>
    <div class="routes-wrap">
      <router-link class="routes-link" to="/"
        ><IconSearchLoop />
        <p class="routes-text">Поиск</p></router-link
      >
    </div>
  </HeaderSlot>
  <main class="main__wrap" style="max-width: 100vw">
    <div class="images_block">
      <div v-for="item in photosList" :key="item.id" class="image_block">
        <img
          class="image"
          :src="item.urls.full"
          alt=""
          @click="$router.push(`/photo/${item.id}`)"
        />
      </div>
    </div>
  </main>
  <footer class="footer">
    <div class="footer__controls">
      <IconLoader v-if="loading" class="icon-loader" />
    </div>
  </footer>
</template>
<script setup>
import { computed, onMounted, ref, watch, onBeforeUnmount } from "vue";
import { usePhotoStore } from "../stores/photos";
import HeaderSlot from "../components/HeaderSlot.vue";
import IconUp from "../components/icons/IconUp.vue";
import IconLoader from "../components/icons/IconLoader.vue";
import IconSearchLoop from "../components/icons/IconSearchLoop.vue";

const photosStore = usePhotoStore();
const loading = computed(() => {
  return photosStore.loading;
});
const photosList = computed(() => {
  return photosStore.likedPhotos;
});

onMounted(() => {
  photosStore.getLikedPhotos();
});
</script>
<style></style>
