<template>
  <div id="app">
    <nav id="navbar" class="navbar navbar-expand-lg">
      <div class="container-fluid">
          <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/Operators" class="nav-link">Operators</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    <RouterView></RouterView>
  </div>

</template>

<style scoped></style>
