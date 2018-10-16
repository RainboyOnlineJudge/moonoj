<template>
<div class="loading">
  <svg class="loading--svg" width="80px" height="75px" viewBox="-6 0 146 75">
    <path class="loading--path" d="M3.44921875,65.0390638 C3.44921875,-14.6640591 134.007812,-19.9999982 134.007812,65.0390639" ></path>
  </svg>
  - Loading -
</div>
</template>

<script>
export default {
  data(){
    return {
    }
  }
}
</script>
<style>

.loading {
  font-family: sans-serif;
  color: #0090FF;
  font-size: 20px;
  font-weight: 200;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  text-align: center;
  border: 2px solid;
  padding: 1em 1.5em;
  border-radius: .5em;
  box-shadow: 0 0.125em #0090FF;
}
.loading--svg {
  display: block;
  margin: 0 auto .25em;
}
.loading--path {
  fill: transparent;
  stroke: currentColor;
  stroke-width: 6;
  stroke-dasharray: 200;
  stroke-dashoffset: 150;
  -webkit-animation-duration: 3s;
          animation-duration: 3s;
  -webkit-animation-name: bounce;
          animation-name: bounce;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

@-webkit-keyframes bounce {
  0% {
    stroke-width: 12;
    stroke-dashoffset: 150;
  }
  15% {
    stroke-width: 2;
  }
  30% {
    stroke-width: 12;
  }
  50% {
    stroke-width: 12;
    stroke-dashoffset: -150;
  }
  65% {
    stroke-width: 2;
  }
  80% {
    stroke-width: 12;
  }
  100% {
    stroke-width: 12;
    stroke-dashoffset: 150;
  }
}

@keyframes bounce {
  0% {
    stroke-width: 12;
    stroke-dashoffset: 150;
  }
  15% {
    stroke-width: 2;
  }
  30% {
    stroke-width: 12;
  }
  50% {
    stroke-width: 12;
    stroke-dashoffset: -150;
  }
  65% {
    stroke-width: 2;
  }
  80% {
    stroke-width: 12;
  }
  100% {
    stroke-width: 12;
    stroke-dashoffset: 150;
  }
}
</style>
