<template>



  <a-row type="flex" align="middle">
    <a-col :flex="auto"> <img src="../assets/img-accueil.jpg" alt=""
        :style="{ width: windowWidth, height: windowHeight, objectFit: 'cover', }" /></a-col>
    <a-col :flex="200">
      <a-typography-title :level="2" id="title">Se connecter</a-typography-title>
      <a-typography-title :level="2" id="connect">CFLEX</a-typography-title>

      <a-card :style="{
        width: windowWidthForm,
      }" id="macarte">
        <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
          @finishFailed="onFinishFailed">
          <a-typography-text>
            Email
          </a-typography-text>
          <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-typography-text>
            Mot de passe
          </a-typography-text>
          <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="login-form-wrap">
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">Forgot password</a>
          </div>

          <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
              Log in
            </a-button>
            Or
            <a href="">register now!</a>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- <img src="../assets/logo.png"/> -->
    </a-col>
  </a-row>

</template>


<script>
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      windowWidth: window.innerWidth * 0.6 + "px",
      windowHeight: window.innerHeight + "px",
      windowWidthForm: window.innerWidth * 0.35 + "px",
      success: false,
    };
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth * 0.6 + "px";
      this.windowHeight = window.innerHeight + "px";
      //this.windowWidthForm=window.innerWidth * 0.35 + "px";
    };
  },
  setup() {
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });

    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
});
</script>

<style>
#macarte {

  margin: auto;

}

#title {

  margin-left: auto;
  margin-right: auto;

}

img {
  height: 25px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

#connect {
  color: #FB5A00;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#title {

  position: fixed;
  top: 35%;
  left: 80%;
  transform: translate(-50%, -50%);
}
</style>

