<template>
  <a-card
    :style="{
      padding: '24px',
       margin: '24px',
      background: '#fff',
      width: '816px',
      height: '1056px',
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
        <a-space>
          <a-avatar
            shape="square"
            size="large"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
          >
            <template #icon><UserOutlined /></template>
          </a-avatar>

          <p>CFLEX</p>
        </a-space>
      </a-col>
    </a-row>

    <a-divider style="border-color: #000" dashed />
    <a-row>
      <a-col :span="8">
        <div class="space-align-container">
          <div class="space-align-block">
            <a-space align="center">
              <a-avatar
                :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
                src="https://media-exp1.licdn.com/dms/image/C4E03AQGj_yjx5RPpYQ/profile-displayphoto-shrink_800_800/0/1649073187854?e=1658361600&v=beta&t=1Ti_8HAtVwMlNlGNbg_CHx4OgpLnc6gFbZ2iPezqDxk"
              >
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>

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
</style>