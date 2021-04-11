<template>
  <div class="">
    <form
      class="grid-parent container"
      action="http://ramphal.design"
      method="post"
    >
      <h4
        id="section-header"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="0"
        data-aos-once="true"
        tabIndex="0"
      >
        {{ header }}
      </h4>
      <Input
        label="Email"
        id="email"
        type="email"
        name="email"
        placeholder="Enter Your Email"
      />
      <Select
        label="Select"
        id="select"
        name="select"
      />
      <MyButton type="submit" class="btn btn-primary">Login</MyButton>
    </form>

    <!--  <form action="http://ramphal.design" method="post">
        <label for="uname">Username</label><br />
        <input
          id="uname"
          type="name"
          name="username"
          placeholder="Username"
          required
        /><br />
        <label for="email">Email</label><br />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
        /><br />
        <label for="pword">Password</label><br />
        <input
          id="pword"
          type="password"
          name="password"
          placeholder="Password"
          required
        /><br />
        <button type="submit" class="btn btn-primary">Login</button>
      </form> -->
  </div>
</template>

<script>
import Input from "@/components/form/Input.vue";
import Select from "@/components/form/Select.vue";
import MyButton from "@/components/MyButton.vue";

export default {
  name: "DetailCard",
  components: {
    Input,
    MyButton,
    Select,
  },
  props: {
    header: {
      type: String,
      default: "Simple Form",
    },
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
.container {
  /*  padding-top: 4rem !important;
  padding-bottom: 9.6rem !important; */
}
#form {
  /* height: 100vh; */
}
#section-header {
  grid-column: 1 / 4;
}
#textdefault {
  grid-column: 1 / 4;
  padding: 1em 0 0 0;
}
h3 {
  /* margin-top: -10px; */
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #section-header {
    grid-column: 1 / 1;
  }
  #textdefault {
    grid-column: auto;
    padding: 0 2.8em 2.8em 0;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #section-header {
      grid-row: 1 / 3;
    }
    .container {
    }
  }
}
</style>
