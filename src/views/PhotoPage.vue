<template>
  <HeaderSlot>
    <div class="routes-wrap">
      <router-link class="routes-link" to="/"
        ><IconSearchLoop />
        <p class="routes-text">Поиск</p></router-link
      >
      <router-link class="routes-link" to="/saved"
        ><IconHeart />
        <p class="routes-text">Избранное</p></router-link
      >
    </div>
  </HeaderSlot>
  <div class="photo_main_bg">
    <img :src="photo?.urls?.full" alt="" />
  </div>
  <main class="photo_main">
    <div class="main_header">
      <div class="author_info">
        <div class="author_avatar">
          <img :src="photo?.user?.profile_image?.large" alt="" />
        </div>
        <div class="author_wrap">
          <p class="author_name">{{ photo?.user?.name }}</p>
          <p class="author_email">{{ photo?.user?.instagram_username }}</p>
        </div>
      </div>
      <div class="page_controls">
        <iconIsLiked class="like-icon" v-if="isLiked" @click="likePhoto" />
        <IconLike class="like-icon" v-else @click="likePhoto" />

        <div class="download_btn" @click="downLoadImg">
          <IconDownload class="download_icon" />
          <p class="download_btn_text">Downloand</p>
        </div>
      </div>
    </div>
    <div class="image_container">
      <img :src="photo?.urls?.full" alt="" />
    </div>
  </main>
  <a
    id="hidenLink"
    :href="photo?.links.download"
    download
    target="_blank"
    style="display: none"
  ></a>
</template>
<script setup>
import HeaderSlot from "../components/HeaderSlot.vue";
import IconLike from "../components/icons/IconLike.vue";
import iconIsLiked from "../components/icons/iconIsLiked.vue";
import IconDownload from "../components/icons/IconDownload.vue";
import IconHeart from "../components/icons/IconHeart.vue";
import IconSearchLoop from "../components/icons/IconSearchLoop.vue";
import { computed, onMounted, ref, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { usePhotoStore } from "../stores/photos";
const photosStore = usePhotoStore();
const route = useRoute();
const isLiked = computed(() => {
  return photosStore.isLiked;
});
const photo = computed(() => {
  return photosStore.photo;
});
const likePhoto = () => {
  photosStore.likePhoto(route.params.id);
};
const downLoadImg = () => {
  document.querySelector("#hidenLink").click();
};
onMounted(() => {
  const id = route.params.id;
  console.log(id);
  photosStore.getPhoto(id).then(() => {
    console.log(photo.value);
  });
});
</script>
<style>
.main_header {
  display: flex;
  justify-content: space-between;
  margin-top: 43px;
  align-items: center;
}
.author_wrap {
  color: white;
}
.author_info {
  display: flex;
  gap: 10px;
}
.author_avatar {
  border-radius: 8px;
  border: 1px solid #fff;
  width: 55px;
  height: 55px;
  overflow: hidden;
}
.author_avatar img {
  object-fit: cover;
  width: 55px;
  height: 55px;
  border-radius: 8px;
}
.author_email {
  color: var(--Gray-6, #f2f2f2);
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.author_name {
  color: var(--Gray-6, #f2f2f2);
  font-family: Roboto;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.download_btn {
  border-radius: 8px;
  border: 1px solid #fff200;
  background: #fff200;
  padding: 13.5px 23px;
  height: 49px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.download_btn_text {
  color: #000;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.page_controls {
  display: flex;
  gap: 20px;
}
.like-icon {
  width: 49px;
  height: 49px;
}
.download_btn,
.like-icon {
  cursor: pointer;
}
.download_icon {
  width: 26px;
  height: 22px;
}
.photo_main {
  width: 77.1vw;
  margin: 0 auto;
  position: relative;
}
.photo_main_bg {
  position: absolute;
  left: 0;
  top: 0;
  max-width: 100vw;
  min-width: 98vw;
  z-index: -2;
  height: 774px;
}
.photo_main_bg img {
  min-width: 100vw;
  height: 774px;
  object-fit: cover;
  filter: grayscale(1);
}
.photo_main_bg::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100vw;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  height: 774px;
}
.image_container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 47px;
}
.image_container img {
  max-height: 90vh;
  border-radius: 8px;
}
@media (max-width: 700px) {
  .main_header {
    margin-top: 40px;
    padding: 0 20px;
  }
  .author_avatar,
  .author_avatar img {
    width: 48px;
    height: 48px;
  }
  .author_name {
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .author_email {
    color: var(--Gray-4, #bdbdbd);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .photo_main_bg,
  .download_btn_text {
    display: none;
  }
  .download_btn {
    width: 41px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }
  .page_controls {
    align-items: center;
    gap: 8px;
  }
  .image_container img {
    max-width: 65vw;
  }
  .download_icon {
    width: 20px;
    height: 20px;
  }
  .image_container {
    margin-top: 36px;
    padding-bottom: 100px;
  }
}
</style>
