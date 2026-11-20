(() => {
  const statusButton = document.querySelector("#status");
  const statusMessage = document.querySelector("#status-message");

  if (!statusButton || !statusMessage) return;

  const messages = [
    "Harry is rearranging some pixels...",
    "Something is swimming around here.",
    "404? No, just unfinished.",
    "Please do not disturb the fish.",
    "Compiling questionable ideas...",
    "The website is molting. Please wait.",
    "A small fish is holding the fort.",
    "Harry is untangling a cable.",
    "This page is 87% vibes, 13% HTML.",
    "Still waiting for the tide to come in.",
  ];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let lastIndex = 0;
  let rotationTimer = null;
  let fadeTimer = null;
  let hovered = false;
  let focused = false;

  function pickMessage() {
    let index = lastIndex;

    while (messages.length > 1 && index === lastIndex) {
      index = Math.floor(Math.random() * messages.length);
    }

    lastIndex = index;
    return messages[index];
  }

  function showMessage(text) {
    window.clearTimeout(fadeTimer);

    if (reducedMotion.matches) {
      statusMessage.textContent = text;
      statusMessage.classList.remove("is-changing");
      return;
    }

    statusMessage.classList.add("is-changing");
    fadeTimer = window.setTimeout(() => {
      statusMessage.textContent = text;
      statusMessage.classList.remove("is-changing");
    }, 180);
  }

  function advance() {
    showMessage(pickMessage());
  }

  function stopRotation() {
    if (rotationTimer === null) return;
    window.clearInterval(rotationTimer);
    rotationTimer = null;
  }

  function startRotation() {
    if (
      rotationTimer !== null ||
      reducedMotion.matches ||
      hovered ||
      focused ||
      document.hidden
    ) {
      return;
    }

    rotationTimer = window.setInterval(advance, 6500);
  }

  function updateRotation() {
    if (hovered || focused) {
      stopRotation();
    } else {
      startRotation();
    }
  }

  statusButton.addEventListener("click", () => {
    stopRotation();
    advance();
    updateRotation();
  });

  statusButton.addEventListener("mouseenter", () => {
    hovered = true;
    updateRotation();
  });

  statusButton.addEventListener("mouseleave", () => {
    hovered = false;
    updateRotation();
  });

  statusButton.addEventListener("focus", () => {
    focused = true;
    updateRotation();
  });

  statusButton.addEventListener("blur", () => {
    focused = false;
    updateRotation();
  });

  reducedMotion.addEventListener?.("change", () => {
    if (reducedMotion.matches) {
      stopRotation();
      window.clearTimeout(fadeTimer);
      statusMessage.classList.remove("is-changing");
    } else {
      updateRotation();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopRotation();
    } else {
      updateRotation();
    }
  });

  startRotation();
})();
