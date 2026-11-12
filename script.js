// ============================================
// Scholarship Test page — simple version
// Only one job right now: the "Get Started" button.
// ============================================

// Find the orange "Get Started" button on the page
const mainButton = document.querySelector(".main-button");

// When it is clicked, go to the next page.
// TODO: replace "#" with the real address of your next page,
// for example: window.location.href = "test.html";
mainButton.addEventListener("click", function () {
  window.location.href = "#";
});