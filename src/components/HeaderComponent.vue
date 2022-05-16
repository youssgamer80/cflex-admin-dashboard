<template>
  <a-layout-header
    :style="{
      margin: '24px',
      background: '#FB5A00',
      textAlign: 'center',

      boxShadow: '0 8px 24px 5px rgba(208, 216, 243, 0.7)',
      borderRadius: '10px',
    }"
    :bordered="false"
    id="macarte"
  >
    <a-row>
      <a-col :span="8"
        ><DownOutlined
          :style="{ fontSize: '16px', color: '#fff' }" /><bell-filled
          :style="{ fontSize: '16px', color: '#fff' }" /><bell-filled
          :style="{ fontSize: '16px', color: '#fff' }"
      /></a-col>
      <a-col :span="8" :offset="8">
        <a-space align="center">
          <search-outlined :style="{ fontSize: '16px', color: '#fff' }" />
          <bell-filled :style="{ fontSize: '16px', color: '#fff' }" />

          <div class="mock-block">
            <a-space direction="vertical">
              <a-dropdown>
                <a
                  class="ant-dropdown-link"
                  @click.prevent
                  :style="{ fontSize: '16px', color: '#fff' }"
                >
                  Utilisateur 1
                  <DownOutlined :style="{ fontSize: '16px', color: '#fff' }" />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a href="javascript:;">1st menu item</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">2nd menu item</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">3rd menu item</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </div>
          <a-avatar
            size="large"
            src="https://img.freepik.com/free-photo/black-woman-city_1157-17533.jpg?t=st=1652662556~exp=1652663156~hmac=1bc6a18e9e194be9f3a46c36b6382f3a44fdcfcfc5dc00dee56644611eeaf0e5&w=826"
          >
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
        </a-space>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<script>
import { defineComponent, ref } from "vue";
import {
  UserOutlined,
  DownOutlined,
  BellFilled,
  SearchOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    UserOutlined,
    DownOutlined,
    BellFilled,
    SearchOutlined,
  },
  data() {
    return {
      windowWidth: window.innerWidth * 0.8 + "px",
      windowHeight: window.innerHeight * 0.125 + "px",
      success: false,
    };
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth * 0.8 + "px";
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


