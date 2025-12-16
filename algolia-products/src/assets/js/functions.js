const tab1Btn = document.getElementById("tab1-btn");
const tab2Btn = document.getElementById("tab2-btn");

const tab1Content = document.getElementById("tab1-content");
const tab2Content = document.getElementById("tab2-content");

tab1Btn.addEventListener("click", () => {
  tab1Content.style.display = "block";
  tab2Content.style.display = "none";
});

tab2Btn.addEventListener("click", () => {
  tab1Content.style.display = "none";
  tab2Content.style.display = "block";
});
