<template>
  <GridWrapper>
    <GridContainer>
      <GridParent
      tight
        @submit.prevent="sendEmail"
        onsubmit="alert('submit!');return false"
      >
        <TextBlock title="Get in touch" />
        <GridWrapper>
          <MyInput
            label="Name"
            name="user_name"
            placeholder="Enter your name"
          />
          <MyInput
            label="Email"
            type="email"
            name="user_email"
            placeholder="Your Email"
          />
        </GridWrapper>
        <GridWrapper>
          <TextArea
            class="wide"
            label="Message"
            name="message"
            placeholder="Enter your message"
          />
        </GridWrapper>
        <MyButton type="primary" name="submit" label="Send" />
      </GridParent>
    </GridContainer>
  </GridWrapper>
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
</style>
