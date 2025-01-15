<!-- <template>
    <div class="sect">
      <img class="logo" src="../assets/logo.png" alt="">
      <h1>Sign Up</h1>
  
      <div class="register">
        <input type="text" placeholder="Enter Your Name" v-model="name">
        <span v-if="hasErr">Name must be at least 3 characters long</span>
        <br><br>
  
        <input type="text" placeholder="Enter Your Email" v-model="email">
        <span v-if="error.email">{{ error.email }}</span>
        <br><br>
  
        <input type="password" placeholder="Enter Your Password" v-model="password">
        <span v-if="error.password">{{ error.password }}</span>
  
        <br><br>
        <button @click="registerUser">Sign Up</button>
        <p>
          <router-link to="login">Login</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: "SignUp",
    data() {
      return {
        name: '',
        email: '',
        password: '',
        hasErr: false,
        error: {},
      }
    },
    methods: {
      ...mapActions(['signUp']),
      async registerUser() {
        this.hasErr = this.name.length < 3;
        this.error = {};
  
        if (!this.email.includes('@') || !this.email.includes(".com")) {
          this.error.email = 'Invalid email format';
        }
  
        if (!this.password) {
          this.error.password = 'Password is required.';
        } else if (this.password.length < 8) {
          this.error.password = 'Password must be at least 8 characters.';
        } else if (!/[A-Z]/.test(this.password)) {
          this.error.password = 'Password must contain at least one uppercase letter.';
        }
  
        if (this.hasErr || Object.keys(this.error).length) return;
  
        try {
          await this.signUp({ name: this.name, email: this.email, password: this.password });
          this.$router.push({ name: 'Home' });
        } catch (error) {
          alert(this.error || "An error occurred during sign-up.");
        }
      }
    },
    mounted() {
      if (localStorage.getItem('user-info')) {
        this.$router.push({ name: 'Home' });
      }
    }
  }
  </script>
   -->

   <template>
    <div class="sect">
        <img class="logo" src="../assets/logo.png" alt="">
        <h1>Sign Up</h1>
    
        <div class="register">
            <input type="text" name="Name" placeholder="Enter Your Name" id="Name" v-model="name">
            <span v-if="hasErr">Name must be at least 3 characters long</span>
            <br><br>
    
            <input type="text" name="Email" placeholder="Enter Your Email" id="Email" v-model="email">
            <span v-if="error.email">{{ error.email }}</span>
            <br><br>
    
            <input type="password" name="Password" placeholder="Enter Your Password" id="Email" v-model="password">
            <span v-if="error.password">{{ error.password }}</span>
    
            <br><br>
            <button v-on:click="signUp">Sign Up</button>
            <p>
                <router-link to="login">Login</router-link>
            </p>
        </div>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
        name: "SignUp",
        data() {
            return {
                name: '',
                email: '',
                password: '',
                hasErr: false,
                error: {},
            }
        },
        methods: {
            async signUp() {
                this.hasErr = this.name.length < 3;
                this.error = {}
                if (!this.email.includes('@') || !this.email.includes(".com")) {
                    this.error.email = 'Invalid email';
                }
                if (!this.password) {
                    this.error.password = 'Password is required.';
                } else if (this.password.length < 8) {
                    this.error.password = 'Password must be at least 8 characters.';
                } else if (!/[A-Z]/.test(this.password)) {
                    this.error.password = 'Password must contain at least one uppercase letter.';
                }
    
                let register = await axios.post("http://localhost:3000/user", {
                    email: this.email,
                    password: this.password,
                    name: this.name
                })
                if (!Object.keys(this.error).length || (register.status===201 && register.data.length>0)) {
                    alert("Sign up done successfully")
                    localStorage.setItem("user-info", JSON.stringify(register.data))
                    this.$router.push({name: 'Home'})
                }
            }
        },
        mounted() {
            let user = localStorage.getItem('user-info')
            if (user) {
                this.$router.push({name: 'Home'})
            }
        }
    }
    </script>