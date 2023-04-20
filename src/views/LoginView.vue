<template>
  <main class="main--login">
    <div class="login">
      <img
        src="../assets/images/rs2-notes-logo-wo-text.svg"
        alt="RS2 Notes App Logo"
        class="header__logo"
      />
      <div class="login__inputs">
        <div class="login__inputs--name margin-bottom-10">
          <input type="text" placeholder="First Name" class="margin-right-10" />
          <input type="text" placeholder="Surname" />
        </div>
        <input
          class="login__input--password"
          type="password"
          placeholder="Password"
        />
      </div>
      <button class="btn btn--primary">
        <i class="fa-solid fa-arrow-right-to-bracket margin-right-10"></i>
        Login to Notes
      </button>
      <a href="#">Register to Notes</a>
    </div>
  </main>
</template>
