
const modal = document.getElementById("featureModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const weddingDate = new Date("2027-01-29T21:00:00+05:30");
const receptionDate = new Date("2027-02-04T19:00:00+05:30");

function openModal(title, content) {
  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    hideModal();
  }
});

function getCountdown(date) {
  const difference = date.getTime() - Date.now();

  if (difference <= 0) {
    return "The celebration has begun!";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return `
    <div class="countdown-number">${days}</div>
    <p>Days</p>
    <strong>${hours} hours · ${minutes} minutes · ${seconds} seconds</strong>
  `;
}

function showCountdown() {
  openModal("The Countdown", `
    <div class="feature-card">
      <h3>Prayagraj — The Beginning</h3>
      <p>29 January 2027 · 9:00 PM</p>
      <div id="weddingTimer">${getCountdown(weddingDate)}</div>
    </div>

    <div class="feature-card">
      <h3>Pune — The Celebration</h3>
      <p>4 February 2027 · 7:00 PM</p>
      <div id="receptionTimer">${getCountdown(receptionDate)}</div>
    </div>
  `);

  const update = () => {
    const weddingTimer = document.getElementById("weddingTimer");
    const receptionTimer = document.getElementById("receptionTimer");

    if (weddingTimer) weddingTimer.innerHTML = getCountdown(weddingDate);
    if (receptionTimer) receptionTimer.innerHTML = getCountdown(receptionDate);
  };

  update();
  const interval = setInterval(() => {
    if (!modal.classList.contains("is-open")) {
      clearInterval(interval);
      return;
    }
    update();
  }, 1000);
}

function showWeddingPass() {
  openModal("Your Wedding Pass", `
    <div class="feature-card">
      <h3>DEVI ❤️ SHUBHAM</h3>
      <p>A Story in Two Cities</p>
      <p><strong>Prayagraj — The Beginning</strong></p>
      <p>29 January 2027 · 9:00 PM</p>
      <p><strong>Pune — The Celebration</strong></p>
      <p>4 February 2027 · 7:00 PM</p>
    </div>

    <label for="guestName">Enter your name:</label>
    <input id="guestName" type="text" placeholder="Your name">

    <button class="action-button" id="makePass">Personalise Pass</button>
    <div id="personalPass"></div>
    <p class="small-note">
      This is a personalised display pass, not an access-control or entry-verification system.
    </p>
  `);

  document.getElementById("makePass").addEventListener("click", () => {
    const name = document.getElementById("guestName").value.trim();
    const output = document.getElementById("personalPass");

    if (!name) {
      output.textContent = "Please enter your name first.";
      return;
    }

    const safeName = document.createElement("strong");
    safeName.textContent = name;

    output.replaceChildren();
    const greeting = document.createElement("p");
    greeting.textContent = "This pass is prepared for ";
    greeting.appendChild(safeName);
    output.appendChild(greeting);

    const message = document.createElement("p");
    message.textContent = "We look forward to celebrating with you!";
    output.appendChild(message);
  });
}

function showQuiz() {
  openModal("The Wedding Quiz", `
    <p>How many cities are part of Devi and Shubham's wedding story?</p>
    <div class="feature-card">
      <label><input type="radio" name="quizAnswer" value="1"> One</label><br>
      <label><input type="radio" name="quizAnswer" value="2"> Two</label><br>
      <label><input type="radio" name="quizAnswer" value="3"> Three</label>
    </div>
    <button class="action-button" id="checkQuiz">Submit Answer</button>
    <p id="quizResult"></p>
  `);

  document.getElementById("checkQuiz").addEventListener("click", () => {
    const answer = document.querySelector('input[name="quizAnswer"]:checked');
    const result = document.getElementById("quizResult");

    if (!answer) {
      result.textContent = "Please select an answer.";
    } else if (answer.value === "2") {
      result.textContent = "Correct! Prayagraj and Pune make one beautiful story.";
    } else {
      result.textContent = "Not quite! Try again.";
    }
  });
}

function showRSVP() {
  openModal("RSVP — We Hope You Can Join Us", `
    <p>Please share your response with the hosts.</p>

    <form id="rsvpForm">
      <input id="rsvpName" type="text" placeholder="Your full name" required>

      <select id="rsvpResponse" required>
        <option value="">Select your response</option>
        <option value="Joyfully accepts">Joyfully accepts</option>
        <option value="Regretfully declines">Regretfully declines</option>
      </select>

      <input id="rsvpGuests" type="number" min="1" max="20"
        value="1" placeholder="Number of guests" required>

      <textarea id="rsvpMessage"
        placeholder="A message for the couple (optional)"></textarea>

      <button class="action-button" type="submit">Prepare RSVP Message</button>
    </form>

    <p id="rsvpResult"></p>
    <p class="small-note">
      This demo prepares a message on your device. It does not submit or store an RSVP online.
    </p>
  `);

  document.getElementById("rsvpForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("rsvpName").value.trim();
    const response = document.getElementById("rsvpResponse").value;
    const guests = document.getElementById("rsvpGuests").value;
    const message = document.getElementById("rsvpMessage").value.trim();

    const text = [
      "Wedding RSVP — Devi & Shubham",
      `Name: ${name}`,
      `Response: ${response}`,
      `Number of guests: ${guests}`,
      `Message: ${message || "No additional message"}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      document.getElementById("rsvpResult").textContent =
        "Your RSVP message has been copied. You can now paste and send it to the hosts.";
    } catch {
      document.getElementById("rsvpResult").textContent =
        text;
    }
  });
}

function showMap() {
  openModal("The Wedding Map", `
    <div class="feature-card">
      <h3>Prayagraj — The Beginning</h3>
      <p>Wedding · 29 January 2027</p>
      <a target="_blank" rel="noopener"
        href="https://www.google.com/maps/search/?api=1&query=Prayagraj%2C+Uttar+Pradesh%2C+India">
        Find Prayagraj on Google Maps
      </a>
    </div>

    <div class="feature-card">
      <h3>Pune — The Celebration</h3>
      <p>Reception · Balewadi · 4 February 2027</p>
      <a target="_blank" rel="noopener"
        href="https://www.google.com/maps/search/?api=1&query=Balewadi%2C+Pune%2C+Maharashtra%2C+India">
        Find Balewadi on Google Maps
      </a>
    </div>

    <p class="small-note">
      These links show the city and area, not the exact venue pin.
    </p>
  `);
}

function showGuestbook() {
  openModal("The Memories — Guestbook", `
    <p>Leave a lovely message for Devi and Shubham.</p>

    <input id="guestbookName" type="text" placeholder="Your name">
    <textarea id="guestbookMessage" placeholder="Write your wishes"></textarea>

    <button class="action-button" id="saveGuestbook">Add Message</button>

    <h3>Messages</h3>
    <ul id="guestbookEntries"></ul>

    <p class="small-note">
      Messages are saved only in this browser on this device. They are not shared with other guests.
    </p>
  `);

  const entries = document.getElementById("guestbookEntries");

  function renderEntries() {
    entries.replaceChildren();

    let messages = [];
    try {
      messages = JSON.parse(localStorage.getItem("deviShubhamGuestbook") || "[]");
    } catch {
      messages = [];
    }

    messages.forEach((entry) => {
      const item = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = entry.name + ": ";
      item.appendChild(strong);
      item.appendChild(document.createTextNode(entry.message));
      entries.appendChild(item);
    });

    if (messages.length === 0) {
      const item = document.createElement("li");
      item.textContent = "Be the first to leave a message!";
      entries.appendChild(item);
    }
  }

  renderEntries();

  document.getElementById("saveGuestbook").addEventListener("click", () => {
    const name = document.getElementById("guestbookName").value.trim();
    const message = document.getElementById("guestbookMessage").value.trim();

    if (!name || !message) {
      alert("Please enter your name and message.");
      return;
    }

    let messages = [];
    try {
      messages = JSON.parse(localStorage.getItem("deviShubhamGuestbook") || "[]");
    } catch {
      messages = [];
    }

    messages.push({ name, message });

    try {
      localStorage.setItem("deviShubhamGuestbook", JSON.stringify(messages));
      document.getElementById("guestbookName").value = "";
      document.getElementById("guestbookMessage").value = "";
      renderEntries();
    } catch {
      alert("Your browser could not save this message.");
    }
  });
}

function showTravelGuide() {
  openModal("Travel Guide", `
    <div class="feature-card">
      <h3>Prayagraj — The Beginning</h3>
      <p>Wedding date: 29 January 2027</p>
      <p>Explore travel options to Prayagraj, Uttar Pradesh.</p>
      <a target="_blank" rel="noopener"
        href="https://www.google.com/maps/search/?api=1&query=Prayagraj+Uttar+Pradesh">
        Explore Prayagraj
      </a>
    </div>

    <div class="feature-card">
      <h3>Pune — The Celebration</h3>
      <p>Reception date: 4 February 2027</p>
      <p>Reception area: Balewadi, Pune.</p>
      <a target="_blank" rel="noopener"
        href="https://www.google.com/maps/search/?api=1&query=Balewadi+Pune">
        Explore Balewadi
      </a>
    </div>

    <p class="small-note">
      Exact venue addresses and accommodation details can be added once confirmed.
    </p>
  `);
}

const features = {
  pass: showWeddingPass,
  countdown: showCountdown,
  quiz: showQuiz,
  rsvp: showRSVP,
  map: showMap,
  guestbook: showGuestbook,
  travel: showTravelGuide
};

document.querySelectorAll(".hotspot").forEach((button) => {
  button.addEventListener("click", () => {
    const feature = button.dataset.feature;
    if (features[feature]) {
      features[feature]();
    }
  });
});
