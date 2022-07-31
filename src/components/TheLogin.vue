<template>
  <Wrapper>
    <Container class="width2">
      <h1>Login</h1>
      <div>
        <input type="text" name="username" placeholder="Username" />

        <input type="password" name="password" placeholder="Password" />
   
        <!-- <MyButton size="small" @click="logIn" label="Enter Site" /> -->
        <button @click="logIn">Log in</button>
      </div>
    </Container>
  </Wrapper>
</template>

<script>
export default {
  name: "TheLogin",
  methods: {
    logIn() {
      this.$emit("TheLogin::loginResult", { loginResult: true });
    },
  },
};
</script>
