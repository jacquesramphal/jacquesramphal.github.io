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
      action="mailto:jacquesramphal@gmail.com?subject=Hey Jacques"
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
      <TextDefault header="Contact Me" eyebrow="" details="" />
      <!-- <h4
        id="section-header"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="0"
        data-aos-once="true"
        tabIndex="0"
      >
        {{ header }}
      </h4> -->
      <div id="form-row">
        <Input
          label="Name"
          id="name"
          type="name"
          name="user_name"
          placeholder="Enter your name"
        />
        <Input
          label="Email"
          id="email"
          type="email"
          name="user_email"
          placeholder="islandboy@hotmail.com"
        />
        <TextArea
          class="wide"
          label="Message"
          id="message"
          name="message"
          placeholder="Enter your message"
        />
      </div>
      <!-- <Select label="Select" id="select" name="select" /> -->
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
