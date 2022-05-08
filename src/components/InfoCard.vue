<template>
  <article class="card">
    <div class="wrapper">
      <div class="image-section">
        <img
          v-if="employee.imagePortraitUrl"
          :src="employee.imagePortraitUrl"
          alt=""
          class="employee-image"
          @error="errorImg"
        />
        <img
          v-else
          src="../assets/no-image.jpeg"
          alt=""
          class="placeholder-image"
        />
      </div>
      <div class="info-section">
        <div class="employee-info">
          <p>{{ employee.name }}</p>
          <p>Office: {{ employee.office }}</p>
        </div>
        <div class="employee-socials">
          <div>
            <a
              v-if="employee.linkedIn"
              :href="`https://linkedin.com/${employee.linkedIn}`"
              target="_blank"
            >
              <img src="../assets/icons8-linkedin-circled.svg" alt="" />
            </a>
            <a v-else>
              <img
                src="../assets/icons8-linkedin-circled.svg"
                alt=""
                class="faded-link"
              />
            </a>
          </div>
          <div>
            <a
              v-if="employee.gitHub"
              :href="`https://github.com/${employee.gitHub}`"
              target="_blank"
            >
              <img src="../assets/icons8-github.svg" alt="" />
            </a>
            <a v-else>
              <img
                src="../assets/icons8-github.svg"
                alt=""
                class="faded-link"
              />
            </a>
          </div>
          <div>
            <a
              v-if="employee.twitter"
              :href="`https://twitter.com/${employee.twitter}`"
              target="_blank"
            >
              <img src="../assets/icons8-twitter-circled.svg" alt="" />
            </a>
            <a v-else>
              <img
                src="../assets/icons8-twitter-circled.svg"
                alt=""
                class="faded-link"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import placeHolderImg from "../assets/no-image.jpeg";
export default {
  name: "EmployeeCard",
  props: {
    employee: Object,
  },
  methods: {
    errorImg(event) {
      event.target.src = placeHolderImg;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "./InfoCard.scss";
</style>
