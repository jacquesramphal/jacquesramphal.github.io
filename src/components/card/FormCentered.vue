<template>
  <div class="form fullvh">
    <form
      class="grid-parent container"
      @submit.prevent="sendEmail"
      onsubmit="alert('submit!');return false"
    >
      <TextBlock eyebrow="" header="Contact Me" details="" />

      <div id="form-row">
        <Input
          label="Name"
          id="name"
          type="name"
          name="user_name"
          placeholder="What's your name?"
        />
        <Input
          id="email"
          label="Email"
          name="user_email"
          placeholder="example@mail.com "
          type="email"
        />
        <TextArea
          class="wide"
          id="message"
          label="Message"
          name="message"
          placeholder="What's on your mind?"
        />
      </div>

      <MyButton
        class="btn"
        label="Sign up"
        name="submit"
        primary
        size="large"
        type="submit"
      />
    </form>
  </div>
</template>

<script>
import Input from "@/components/form/Input.vue";
import TextArea from "@/components/form/TextArea.vue";
import MyButton from "@/stories/Button.vue";
import TextBlock from "@/components/TextBlock.vue";
import emailjs from "emailjs-com";

export default {
  name: "FormCentered",
  components: {
    Input,
    TextArea,
    TextBlock,
    MyButton,
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
  /*  padding-top: 4rem !important;
  padding-bottom: 9.6rem !important; */
  background-color: inherit;
}

#textblock {
  grid-column: 1 / 4;
}
#form {
  align-items: center;
  grid-column: 1 / 4;
  padding: 1em 0 0 0;
}
#form-row {
  grid-column: 1 / 4;
  display: grid;
  grid-row-gap: 3rem;
}
#input,
#textarea {
  grid-column: 1 / 4;
}
.btn {
  grid-column: 1 / 4 !important;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #textblock {
    grid-column: 1 / 3;
  }

  #form {
    grid-column: 2 / 3 !important;
    padding: 0 2.8em 2.8em 0;
  }
  h4 {
    margin-top: -1rem;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #message {
      display: none;
      grid-column: 1 / 4 !important;
    }
    #form-row {
      grid-column: 2 / 3;
    }
    #textblock {
      grid-column: 1 / 4;
      grid-row: 1 / 1 !important;
    }
    .container {
    }
    .btn {
      grid-column: 2 / 3 !important;
    }
  }
}
</style>
