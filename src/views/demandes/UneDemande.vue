<template>
  <a-card
    :style="{
      padding: '24px',
       margin: '24px',
      background: '#fff',
  
        textAlign: 'center'

    }"
  >
    <a-row>
      <a-col :span="8">
        <a-space direction="vertical">
          <a-typography-title :level="5"
            >Formulaire de demande</a-typography-title
          >
          <a-typography-text>Emis le:12-05-2022</a-typography-text>
        </a-space>
      </a-col>
      <a-col :span="8" :offset="8">
 <img
    src="../../assets/logo.png" alt="A black, brown, and white dog wearing a kerchief"
  />
      </a-col>
    </a-row>

    <a-divider style="border-color: #000" dashed />
    <a-row>
      <a-col :span="8">
        <div class="space-align-container">
          <div class="space-align-block">
            <a-space align="center">
  <a-image
    :width="200"
    src="https://img.freepik.com/free-photo/close-up-portrait-cheerful-young-black-man-grey-t-shirt-smiling-broadly_273609-430.jpg?t=st=1652708669~exp=1652709269~hmac=a0fc5376352607cb756d727c9d48078c692112a5456ec6d01ff5d43f9bfcf1eb&w=2000"
  />

              <div class="mock-block">
                <p>Card content</p>
                <p>Card content</p>
              </div>
            </a-space>
          </div>
        </div>
      </a-col>
      <a-col :span="8" :offset="8">
        <div class="space-align-container">
          <div class="space-align-block">
            <a-space align="center" :size="1">
              <a-avatar
                :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
              >
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>

              <div class="mock-block">
                <a-space direction="vertical">
                  <p>Card content</p>
                  <p>Card content</p>
                </a-space>
              </div>
            </a-space>
          </div>
        </div>
      </a-col>
    </a-row>
    <!-- section 2 -->
  </a-card>
</template>

<script>
import { defineComponent } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "UneDemande",
  components: {
    UserOutlined,
  },
});
</script>

<style scoped>
.space-align-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.space-align-block {
  margin: 8px 4px;
  padding: 4px;
  flex: none;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 20px 5px 5px;
}
img {
  height: 30px;
}
</style>