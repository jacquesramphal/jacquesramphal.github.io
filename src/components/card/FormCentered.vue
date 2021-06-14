<template>
  <div class="form fullvh">
    <form
      class="grid-parent container offwhite"
      @submit.prevent="sendEmail"
      onsubmit="alert('submit!');return false"
    >
      <TextDefault header="Contact Me" eyebrow="" details="" />
      <div id="form-row">
        <Input
          label="Name"
          id="name"
          type="name"
          name="user_name"
          placeholder="What's your name?"
        />
        <Input
          label="Email"
          id="email"
          type="email"
          name="user_email"
          placeholder="example@mail.com "
        />
        <TextArea
          class="wide"
          label="Message"
          id="message"
          name="message"
          placeholder="What's on your mind?"
        />
      </div>
        <MyButton
          type="submit"
          name="submit"
          class="btn btn-primary"
          text="Send"
        />
    </form>
  </div>
</template>

<script>
import Input from "@/components/form/Input.vue";
import TextArea from "@/components/form/TextArea.vue";
import MyButton from "@/components/MyButton.vue";
import emailjs from "emailjs-com";
import TextDefault from "@/components/text/TextDefault.vue";

export default {
  name: "FormCentered",
  components: {
    Input,
    TextArea,
    MyButton,
    TextDefault,
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

#textdefault {
  grid-column: 1 / 4;
  text-align: center;
}
#form {
  grid-column: 1 / 4;
  padding: 1em 0 0 0;
}
#form-row{
  grid-column: 1 / 4;
  display: grid;
  grid-row-gap: 3rem;
  

}
#input, #textarea{
  grid-column: 1 / 4;


}
 .btn {
     grid-column: 1 / 4 !important;
    }
 
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #textdefault {
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
      #form-row{
  grid-column: 2 / 3;

}
    #textdefault {
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
