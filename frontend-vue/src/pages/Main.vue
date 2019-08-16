<template>
  <div  class="main-page">
    <div class="main-container">
      <router-link to="/">
        <img src="../assets/logo.svg" alt="Tindev" />
      </router-link>

      <switchButton selector="main-page"></switchButton>

      <ul v-if="users.length > 0">
        <li v-for="user in users" :key="user._id">
          <img :src="user.avatar" :alt="user.name" />
          <footer>
            <strong>{{user.name}}</strong>
            <p>{{user.bio}}</p>
          </footer>
          <div class="buttons">
            <button class="button" @click="() => handleDislike(user._id)">
              <img src="../assets/dislike.svg" alt="Dislike" />
            </button>
            <button class="button" @click="() => handleLike(user._id)">
              <img src="../assets/like.svg" alt="Like" />
            </button>
          </div>
        </li>
      </ul>
      <div v-else class="empty">Acabou :(</div>
      <div v-if="matchDev" class="match-container">
        <img src="../assets/itsamatch.png" alt="It's a match" />
        <img class="avatar" :src="matchDev.avatar" :alt="matchDev.name" />
        <strong>{{matchDev.name}}</strong>
        <p>{{matchDev.bio}}</p>

        <button type="button" @click="() => setMatchDev(null)">FECHAR</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import io from "socket.io-client";

import api from "../services/api";
import switchButton from "../components/Switch-Button.vue";

export default {
  name: "Main",
  components: {
    switchButton
  },
  data() {
    return {
      users: [],
      matchDev: null
    };
  },
  methods: {
    setUsers(array) {
      this.users = array;
    },
    setMatchDev(dev) {
      this.matchDev = dev;
    },
    async loadUsers() {
      const response = await api.get("/devs", {
        headers: {
          user: this.$route.params.id
        }
      });
      this.setUsers(response.data);
    },
    async handleDislike(id) {
      try {
        await api.post(`/devs/${id}/dislikes`, null, {
          headers: {
            user: this.$route.params.id
          }
        });
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

      this.setUsers(this.users.filter(user => user._id !== id));
    },
    async handleLike(id) {
      try {
        await api.post(`/devs/${id}/likes`, null, {
          headers: {
            user: this.$route.params.id
          }
        });
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

      this.setUsers(this.users.filter(user => user._id !== id));
    }
  },
  mounted() {
    this.loadUsers();
    const socket = io("http://localhost:3001", {
      query: { user: this.$route.params.id }
    });

    socket.on("match", dev => {
      this.setMatchDev(dev);
    });
  }
};
</script>

<style>
.main-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;
}

.main-container ul {
  list-style: none;
  display: grid;
  min-width: 300px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 50px;
}

.main-container ul li {
  display: flex;
  max-width: 300px;
  flex-direction: column;
}

.main-container ul li img {
  max-width: 100%;
}

.main-container ul li footer {
  flex: 1;
  background: #fff;
  border: 1px solid #eee;
  padding: 15px 20px;
  text-align: left;
  border-radius: 0 0 5px 5px;
}

.main-container ul li footer strong {
  font-size: 16px;
  color: #333;
}

.main-container ul li footer p {
  font-size: 14px;
  line-height: 20px;
  color: #999;
  margin-top: 5px;
}

.main-container ul li .buttons {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.main-container ul li .buttons button {
  height: 50px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
  border: 0;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.main-container ul li .buttons button:hover img {
  transform: translateY(-5px);
  transition: all 0.2s;
}

.main-container .empty {
  font-size: 32px;
  color: #999;
  font-weight: bold;
  margin-top: 150px;
}

.match-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0009;
}

.match-container .avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #fff;
  margin: 30px 0;
}

.match-container strong {
  font-size: 32px;
  color: #fff;
}

.match-container p {
  margin-top: 10px;
  font-size: 20px;
  line-height: 30px;
  max-width: 400px;
  color: #fff;
}

.match-container button {
  border: 0;
  background: none;
  font-weight: bold;
  color: #fff;
  font-size: 18px;
  margin-top: 30px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .main-container ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .main-container ul {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .main-container ul li {
    margin-bottom: 30px;
  }
}
</style>