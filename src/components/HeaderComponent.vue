<template>
  <div
    :style="{
      padding: '24px',
      background: '#fff',
      textAlign: 'center',
      minWidth: windowWidth,
      minHeight: windowHeight,
      boxShadow: '0px 8px 24px 5px rgba(208, 216, 243, 0.6)',
    }"
    :bordered="false"
    id="macarte"
  >
    <a-row>
      <a-col :span="8">col-8</a-col>
      <a-col :span="8" :offset="8">
        <a-space>
          <a-avatar size="large">
            <template #icon><UserOutlined /></template>
          </a-avatar>
            <p>Admin</p>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    UserOutlined,
  },
  data() {
    return {
      windowWidth: window.innerWidth * 0.7 + "px",
      windowHeight: window.innerHeight * 0.125 + "px",
      success: false,
    };
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth * 0.7 + "px";
      this.windowHeight = window.innerHeight * 0.125 + "px";
    };
  },

  setup() {
    const current = ref(["mail"]);
    return {
      current,
    };
  },
  methods: {
    setLayout(layout) {
      this.$store.commit("SET_LAYOUT", layout);
    },
  },
});
</script>

