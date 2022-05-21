<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="col-md-6 d-none d-md-flex bg-image"></div>
      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h4 class="display-4">Se connecter</h4>
                <p class="text-muted mb-4">heureux de vous revoir</p>

                <a-card id="macarte">
                  <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                    @finishFailed="onFinishFailed">
                    <a-form-item label="Username" name="username"
                      :rules="[{ required: true, message: 'Please input your username!' }]">
                      <a-input v-model:value="formState.username">
                        <template #prefix>
                          <UserOutlined class="site-form-item-icon" />
                        </template>
                      </a-input>
                    </a-form-item>

                    <a-form-item label="Password" name="password"
                      :rules="[{ required: true, message: 'Please input your password!' }]">
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
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>

//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
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
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#components-form-demo-normal-login .login-form-forgot {
  margin-bottom: 24px;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>