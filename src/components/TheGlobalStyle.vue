<template>
  <div class="wrap">
    <slot />
  </div>
</template>

<style lang="scss">
// @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css');

.wrap {
  height: 100%;
}

* {
	margin: 0;
	padding: 0;
	border: 0;
	// font-family: 'Noto Sans KR', sans-serif;
	font-family: 'NanumSquare', sans-serif;
	//-webkit-font-smoothing: antialiased;
	vertical-align: baseline;
	text-decoration: none;
}

html, body {
  height: 100%;
  overflow: hidden;
}

body {
	line-height: 1;
}

ol, ul {
	list-style: none;
}

p, span {
  line-height: 1.25;
	font-size: 13px;
  font-weight: 600;
  color: $text-secondary;
  position: relative;
  display: inline-block;
  transform: skew(-0.1deg);
}

strong {
  font-weight: 800;
  color: $text-dark;
}

button {
  background-color: transparent;
  cursor: pointer;
  outline: none;
}

#nprogress {
  pointer-events: none;
}

#nprogress .bar {    
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 1031 !important;
  background-color: $primary;
}

</style>