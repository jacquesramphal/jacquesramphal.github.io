<template>
  <div class="form">
    <!-- <form
      class="grid-parent container"
      action="contact.php"
      method="post"
      enctype="text/plain"
    > 
    <form
      class="grid-parent container"
      action="mailto:jacquesramphal@gmail.com?subject=Hey Jake"
      method="post"
      enctype="text/plain"
      onsubmit="location.href='Work.vue';"

    > 
    -->
    
    <form
      class="grid-parent container"
      @submit.prevent="sendEmail"
      onsubmit="alert('submit!');return false"
    >
      <TextBlock title="Get in touch" />

      <MyInput
        label="Name"
        id="name"
        name="user_name"
        placeholder="Enter your name"
      />
      <MyInput
        label="Email"
        id="email"
        type="email"
        name="user_email"
        placeholder="Your Email"
      />
     
      <TextArea
        class="wide"
        label="Message"
        id="message"
        name="message"
        placeholder="Enter your message"
      />
      <!-- <Select label="Select" id="select" name="select" /> -->
      <MyButton
        type="primary"
        name="submit"
        class="btn btn-primary"
        label="Send"
      />

    </form>
  </div>
</template>
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
<script>
import MyInput from "@/components/form/MyInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import emailjs from "emailjs-com";

export default {
  name: "MyForm",
  components: {
    MyInput,
    TextArea,
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
  methods: {
    sendEmail: (e) => {
      emailjs
        .sendForm(
          "service_scmpikn",
          "template_brjg3ef",
          e.target,
          "user_3ZaUX9RnOWjgi2HTqsKCD"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}

.container {
  /*  padding-block-start: 4rem !important;
  padding-block-end: 9.6rem !important; */
}
#form {
  /* block-size: 100vh; */
}
#textblock {
  grid-column: 1 / 4;
}
#form {
  grid-column: 1 / 4;
  padding: 1em 0 0 0;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 768px) {
  #textblock {
    grid-column: 1 / 3;
  }
  #form {
    grid-column: auto;
    padding: 0 2.8em 2.8em 0;
  }
  h4 {
    margin-block-start: -1rem;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #message {
      display: none;
      grid-column: 1 / 4 !important;
    }
    #textblock {
      grid-column: 1 / 1;
      grid-row: 1 / 4 !important;
    }
    .container {
    }
  }
}
</style>
