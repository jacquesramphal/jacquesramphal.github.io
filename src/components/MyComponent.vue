<template>
     <div class="container mycomponent" :class="`mycomponent-myprop--${myprop}`">
        <p><slot></slot></p>
    </div>
</template>

<script>
export default {
    name: 'MyComponent',
    props: {
        myprop: {
            type: String,
            default: 'primary',
            required: true,
        },
    },
};
</script>

<style scoped>
@import "../assets/styles/all.css";

* {
  color: inherit;
}
.mycomponent {
    border: none;
    font-family: sans-serif;
    border-radius: 2px;
}

.mycomponent-myprop--primary {
  background-color: var(--color-red);
}

.mycomponent-myprop--variant {
  background-image: url("../assets/images/jacques.jpeg");
}

</style>
