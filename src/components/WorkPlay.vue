<template>
  <div id="grid-parent" class="grid-parent container">
    <span class="grid-card yellow">
      <span class="caption"><p>This is a label</p></span>
      <a class="zoom"><img draggable="false" src="@/assets/images/j.svg"></a>
    </span>
    <span class="grid-card grey">
      <span class="caption"><p>This is a label</p></span>
      <a class="zoom"><img draggable="false" src="@/assets/images/gob.svg"></a>
    </span>
    <span class="grid-card pink">
      <a class="gif hidemobile"/>
      <a class="showmobile"><img draggable="false" src="@/assets/images/avatar.svg"></a>
    </span>
    <span class="grid-card grey">
      <span class="caption"><p>This is a label</p></span>
      <a class="zoom"><img draggable="false" src="@/assets/images/template-m.svg"></a>
    </span>
    <span class="grid-card twowide rose">
      <span class="caption"><p>This is a label</p></span>
      <a class="zoom"><img draggable="false" src="@/assets/images/dod.svg"></a>
    </span>
    <span class="grid-card hero blue">
      <span class="caption"><p>This is a label</p></span>
      <a href="project.html" class="zoom"><img draggable="false" src="@/assets/images/glo.svg"></a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'WorkPlay',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
     padding-top: 0 !important;
}
.gif {
    display: none;
    background-image: url('../assets/images/avatar.svg');
    background-size: 100%;
    background-repeat: no-repeat;
    -webkit-transition: none;
    border-radius: 4px !important;
  }
  .gif:hover {
    background-image: url('../assets/images/avatar-h.svg');
  }
  .gif:active {
    background-image: url('../assets/images/avatar-a.svg');
  }
  /* ------------ BREAKPOINT MD ------------ */
 @media only screen and (min-width: 740px) {
   .gif {
       display: block;
   }
 }
</style>
