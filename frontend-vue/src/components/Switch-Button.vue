<template>
  <div class="container">
    <input @click="switchMode()" id="switch-shadow" class="switch switch--shadow" type="checkbox" />
    <label for="switch-shadow"></label>
  </div>
</template>

<script>
export default {
  name: "switch-button",
  methods: {
    switchMode() {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode) {
        localStorage.removeItem("darkMode")
        document.querySelector(`body`).classList.remove("bg-dark");
      } else {
        localStorage.setItem("darkMode", true);
        document.querySelector(`body`).classList.add("bg-dark");
      }
    }
  },
  mounted() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
        document.querySelector(`body`).classList.add("bg-dark");
        document.getElementById("switch-shadow").checked = true;
    }
    else {
        document.querySelector(`body`).classList.remove("bg-dark");
        document.getElementById("switch-shadow").checked = false;
    }
  }
};
</script>

<style>
.bg-dark {
  background: #060a16;
}

/* start switch button */
/* https://willianjusten.com.br/criando-um-switch-button-com-css/ */
.container {
  position: absolute;
  top: 50px;
  right: 30px;
}

.switch {
  position: absolute;
  margin-left: -9999px;
  visibility: hidden;
}

.switch + label {
  display: block;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
}

.switch--shadow + label {
  padding: 2px;
  width: 40px;
  height: 20px;
  background-color: transparent;
  border-radius: 60px;
}

.switch--shadow + label:before,
.switch--shadow + label:after {
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  content: "";
}

.switch--shadow + label:before {
  right: 1px;
  background-color: #eee;
  border-radius: 40px;
  transition: all 0.4s;
}

.switch--shadow + label:after {
  width: 17px;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.4s;
}

.switch--shadow:checked + label:before {
  background-color: #0d152d;
}

.switch--shadow:checked + label:after {
  transform: translateX(22px);
}
/* https://willianjusten.com.br/criando-um-switch-button-com-css/ */
/* end switch button  */

@media (max-width: 577px) {
  .container {
    left: 10px;
  }
}
</style>