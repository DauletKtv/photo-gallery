<template>
  <HeaderSlot />
  <section class="search-form">
    <div class="search-form_wrap">
      <img class="search-form_icon" src="/loop.svg" alt="" />
      <input
        class="search-form_input"
        type="text"
        placeholder="Поиск"
        v-model="searchVal"
      />
    </div>
  </section>
  <main class="main__wrap" style="max-width: 100vw">
    <!-- {{ photosList }} -->
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
      <IconUp class="icon-up" v-if="showUpBtn" @click="scrollToTop" />
    </div>
  </footer>
</template>
<script setup>
import { computed, onMounted, ref, watch, onBeforeUnmount } from "vue";
import { usePhotoStore } from "../stores/photos";
import HeaderSlot from "../components/HeaderSlot.vue";
import IconUp from "../components/icons/IconUp.vue";
import IconLoader from "../components/icons/IconLoader.vue";
const photosStore = usePhotoStore();
const loading = computed(() => {
  return photosStore.loading;
});
const photosList = computed(() => {
  return photosStore.photos;
});
const paginationPage = ref(1);
const showUpBtn = computed(() => {
  if (scrollTop.value > 0) {
    return true;
  }
  return false;
});
const scrollTop = ref(0);
const searchVal = ref("");
let searchTimeout;
watch(searchVal, () => {
  clearTimeout(searchTimeout);

  // Устанавливаем новый таймаут
  searchTimeout = setTimeout(() => {
    photosStore.getPhotos(searchVal.value, paginationPage.value, true);
  }, 1000);
});
const scrollToTop = () => {
  const scrollDuration = 1000; // Длительность анимации в миллисекундах
  const scrollStep = -window.scrollY / (scrollDuration / 15); // Шаг прокрутки

  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
};
function handleScroll() {
  scrollTop.value = window.scrollY;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("Скролл достиг самого низа страницы");
    paginationPage.value = paginationPage.value + 1;
    photosStore.getPhotos(searchVal.value, paginationPage.value, false);
  }
}
onMounted(() => {
  photosStore.getPhotos();
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style></style>
