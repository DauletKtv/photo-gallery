<template>
  <header class="header">
    <router-link to="/"> <IconLogo class="logo" /> </router-link>
    <slot>
      <div class="routes-wrap">
        <router-link class="routes-link" to="/saved"
          ><IconHeart />
          <p class="routes-text">Избранное</p></router-link
        >
      </div>
    </slot>
  </header>
</template>

<script setup>
import IconLogo from "./icons/IconLogo.vue";
import IconHeart from "./icons/IconHeart.vue";
</script>

<style>
.header {
  height: 148px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 29px 221px;
  background-color: black;
}
.routes-wrap {
  display: flex;
  align-items: center;
  gap: 38px;
}
.routes-link {
  display: flex;
  gap: 10px;
  align-items: center;
}
.routes-text {
  color: #fff;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
@media (max-width: 700px) {
  .routes-text {
    display: none;
  }
  .header {
    padding: 0 20px;
    height: 70px;
    align-items: center;
    justify-content: space-around;
  }
  .logo {
    width: 84px;
    height: 32.908px;
  }
}
</style>
