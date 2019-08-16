<template>
  <div class="login-container">
    <form @submit="handleSubmit">
      <img src="../assets/logo.svg" alt="Tindev" />
      <input placeholder="Digite seu usuário no Github" v-model="username" />
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import api from "../services/api";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      err: {}
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();

      try {
        const response = await api.post("/devs", {
          username: this.username
        });
        const { _id } = response.data;

        this.$router.push({ name: "main", params: { id: _id } });
      } catch (err) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text:
            err.response.status === 400
              ? err.response.data.error
              : "Internal error, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container form {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.login-container form input {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 48px;
  padding: 0 20px;
  font-size: 16px;
  color: #666;
}

.login-container form input::placeholder {
  color: #999;
}

.login-container form button {
  margin-top: 10px;
  border: 0;
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
  background: #df4723;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
</style>