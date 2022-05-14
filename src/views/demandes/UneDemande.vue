<template>
  <a-card
    :style="{
      padding: '24px',
      background: '#fff',
      minHeight: '360px',
    }"
  >
  <a-row>
    <a-col :span="8" :offset="4">col-8</a-col>
    <a-col :span="8" :offset="4">
    <div>
      <a-typography-title :level="4">Demande #1069</a-typography-title><p>Block</p><p>Block</p>
    </div>
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
              <a-space align="center">
                <a-avatar
                  :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
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
  padding: 32px 8px 16px;
}
</style>