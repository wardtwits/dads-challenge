// Dad's Challenge Board - Main Application Logic

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE SYSTEM ---
  const USERS = {
    pierce: { name: "Pierce", avatar: "👦", password: "password" },
    graham: { name: "Graham", avatar: "🧑", password: "password" }
  };

  let currentUser = null; // Username string or null
  let db = {
    completions: {}, // format: { "pierce_scavenger-hunt": { text: "...", timestamp: 12345 } }
  };

  // --- INITIALIZE DATA ---
  function initLocalStorage() {
    // Load currentUser if saved
    const savedUser = localStorage.getItem("board_current_user");
    if (savedUser && USERS[savedUser]) {
      currentUser = savedUser;
    }

    // Load completions database
    const savedCompletions = localStorage.getItem("board_completions");
    if (savedCompletions) {
      try {
        db.completions = JSON.parse(savedCompletions);
      } catch (e) {
        console.error("Error parsing completions from localStorage, resetting...", e);
        db.completions = {};
      }
    } else {
      // Seed initial empty completions if none exists
      db.completions = {};
      localStorage.setItem("board_completions", JSON.stringify(db.completions));
    }
  }

  function saveDatabase() {
    localStorage.setItem("board_completions", JSON.stringify(db.completions));
  }

  // --- CORE UTILITIES ---
  
  // Calculate scores based on challenges array
  function getPlayerScore(username) {
    let score = 0;
    CHALLENGES.forEach(challenge => {
      const completionKey = `${username}_${challenge.id}`;
      if (db.completions[completionKey]) {
        // Complete challenge yields its points
        score += challenge.points;
      }
    });
    return score;
  }

  // Update navbar, leaderboard elements, profiles
  function updateUIState() {
    // 1. Leaderboard
    const pierceScore = getPlayerScore("pierce");
    const grahamScore = getPlayerScore("graham");

    document.getElementById("lb-pts-pierce").textContent = `${pierceScore} PTS`;
    document.getElementById("lb-pts-graham").textContent = `${grahamScore} PTS`;

    const tagPierce = document.getElementById("leaderboard-pierce");
    const tagGraham = document.getElementById("leaderboard-graham");

    // Add glowing winner tag
    tagPierce.classList.remove("winner");
    tagGraham.classList.remove("winner");
    if (pierceScore > grahamScore) {
      tagPierce.classList.add("winner");
    } else if (grahamScore > pierceScore) {
      tagGraham.classList.add("winner");
    }

    // 2. Auth Badge
    const btnShowLogin = document.getElementById("btn-show-login");
    const userProfileBadge = document.getElementById("user-profile-badge");

    if (currentUser) {
      btnShowLogin.classList.add("hidden");
      userProfileBadge.classList.remove("hidden");
      
      const user = USERS[currentUser];
      document.getElementById("current-user-avatar").textContent = user.avatar;
      document.getElementById("current-user-name").textContent = user.name;
      document.getElementById("current-user-score").textContent = `${getPlayerScore(currentUser)} PTS`;
    } else {
      btnShowLogin.classList.remove("hidden");
      userProfileBadge.classList.add("hidden");
    }

    // 3. Re-render challenge list to show checkmarks / status
    renderChallenges();
  }

  // Render the challenge grid dynamically
  function renderChallenges() {
    const grid = document.getElementById("challenges-grid");
    grid.innerHTML = "";

    CHALLENGES.forEach(challenge => {
      const card = document.createElement("article");
      card.className = "challenge-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Challenge: ${challenge.title}. Value ${challenge.points} points.`);

      // Check completions
      const hasCompleted = currentUser ? !!db.completions[`${currentUser}_${challenge.id}`] : false;
      const pierceCompleted = !!db.completions[`pierce_${challenge.id}`];
      const grahamCompleted = !!db.completions[`graham_${challenge.id}`];

      if (hasCompleted) {
        card.classList.add("completed");
      }

      // Build HTML content
      let completionPills = "";
      if (pierceCompleted) {
        completionPills += `<span class="badge completed-indicator" style="background:rgba(34,211,238,0.1); border-color:var(--accent-cyan); color:var(--accent-cyan)">👦 P ✓</span>`;
      }
      if (grahamCompleted) {
        completionPills += `<span class="badge completed-indicator" style="background:rgba(249,115,22,0.1); border-color:var(--accent-orange); color:var(--accent-orange)">🧑 G ✓</span>`;
      }

      card.innerHTML = `
        <div>
          <div class="card-top">
            <span class="card-icon" role="img" aria-hidden="true">${challenge.icon}</span>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px">
              <span class="badge badge-pts">${challenge.points} PTS</span>
              ${hasCompleted ? '<span class="badge badge-completed">✓ DONE</span>' : ''}
            </div>
          </div>
          <h3 class="card-title">${challenge.title}</h3>
          <p class="card-desc">${challenge.description}</p>
        </div>
        <div class="card-footer">
          <span class="card-action-text">${currentUser ? (hasCompleted ? 'Review proof' : 'Start quest') : 'Locked 🔒'}</span>
          <div style="display:flex; gap:5px">
            ${completionPills}
          </div>
        </div>
      `;

      // Event listener for opening details
      card.addEventListener("click", () => {
        openChallengeDetails(challenge);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openChallengeDetails(challenge);
        }
      });

      grid.appendChild(card);
    });
  }

  // --- MODALS ACTIONS ---

  // Challenge Details Modal
  function openChallengeDetails(challenge) {
    const modal = document.getElementById("details-modal");
    document.getElementById("detail-challenge-icon").textContent = challenge.icon;
    document.getElementById("detail-challenge-title").textContent = challenge.title;
    document.getElementById("detail-challenge-points").textContent = `${challenge.points} PTS`;
    document.getElementById("detail-challenge-description").textContent = challenge.description;

    const lockWarning = document.getElementById("lock-warning");
    const submissionForm = document.getElementById("submission-form");
    const completedBadge = document.getElementById("completed-badge");
    const submissionText = document.getElementById("submission-text");
    const submitBtn = document.getElementById("btn-submit-proof");

    document.getElementById("submission-challenge-id").value = challenge.id;

    if (!currentUser) {
      // Hide form, show lock warning
      lockWarning.classList.remove("hidden");
      submissionForm.classList.add("hidden");
    } else {
      // Show form, hide lock warning
      lockWarning.classList.add("hidden");
      submissionForm.classList.remove("hidden");

      const completionKey = `${currentUser}_${challenge.id}`;
      const previousSubmission = db.completions[completionKey];

      if (previousSubmission) {
        completedBadge.classList.remove("hidden");
        submissionText.value = previousSubmission.text;
        submitBtn.textContent = "UPDATE DETAILS";
      } else {
        completedBadge.classList.add("hidden");
        submissionText.value = "";
        submitBtn.textContent = "SUBMIT PROOF";
      }
    }

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // disable scroll
  }

  function closeChallengeDetails() {
    const modal = document.getElementById("details-modal");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // enable scroll
  }

  // Login Modal
  function showLoginModal() {
    const modal = document.getElementById("login-modal");
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("login-error-msg").classList.add("hidden");
    
    // Reset avatar selectors
    document.querySelectorAll(".avatar-option").forEach(el => el.classList.remove("selected"));

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLoginModal() {
    const modal = document.getElementById("login-modal");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Dad Console Modal
  function showDadModal() {
    const modal = document.getElementById("dad-modal");
    document.getElementById("dad-password").value = "";
    document.getElementById("dad-login-error").classList.add("hidden");
    document.getElementById("dad-login-form").classList.remove("hidden");
    document.getElementById("dad-panel").classList.add("hidden");

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDadModal() {
    const modal = document.getElementById("dad-modal");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // --- CELEBRATION TOAST ---
  function triggerToast(isNewCompletion) {
    const toast = document.getElementById("completion-toast");
    const toastTitle = toast.querySelector(".toast-title");
    const toastMsg = toast.querySelector(".toast-msg");

    if (isNewCompletion) {
      toastTitle.textContent = "QUEST COMPLETED! ✨";
      toastMsg.textContent = "Points awarded to your character score!";
      toast.style.borderColor = "var(--accent-green)";
      toast.querySelector(".toast-icon").textContent = "✨";
    } else {
      toastTitle.textContent = "SUBMISSION UPDATED 📝";
      toastMsg.textContent = "Your details have been saved for Dad to review.";
      toast.style.borderColor = "var(--accent-purple)";
      toast.querySelector(".toast-icon").textContent = "📝";
    }

    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 4000);
  }

  // --- SUBMISSIONS SUBMIT LOGIC ---
  document.getElementById("submission-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const challengeId = document.getElementById("submission-challenge-id").value;
    const submissionText = document.getElementById("submission-text").value.trim();
    
    if (!submissionText) return;

    const completionKey = `${currentUser}_${challengeId}`;
    const isNewCompletion = !db.completions[completionKey];

    // Write submission
    db.completions[completionKey] = {
      text: submissionText,
      timestamp: Date.now()
    };

    saveDatabase();
    updateUIState();
    closeChallengeDetails();
    triggerToast(isNewCompletion);
  });

  // --- LOGIN PORTAL LOGIC ---

  // Click on avatar selection in login
  document.querySelectorAll(".avatar-option").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".avatar-option").forEach(el => el.classList.remove("selected"));
      card.classList.add("selected");
      const username = card.getAttribute("data-username");
      document.getElementById("login-username").value = username;
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Form Submit
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("login-username").value.trim().toLowerCase();
    const passwordInput = document.getElementById("login-password").value;
    const errorMsg = document.getElementById("login-error-msg");

    if (USERS[usernameInput] && USERS[usernameInput].password === passwordInput) {
      // Login Success
      currentUser = usernameInput;
      localStorage.setItem("board_current_user", currentUser);
      
      updateUIState();
      closeLoginModal();
    } else {
      // Login Failure
      errorMsg.classList.remove("hidden");
    }
  });

  // Logout Button
  document.getElementById("btn-logout").addEventListener("click", () => {
    currentUser = null;
    localStorage.removeItem("board_current_user");
    updateUIState();
  });

  // Trigger login modal buttons
  document.getElementById("btn-show-login").addEventListener("click", showLoginModal);
  document.getElementById("btn-close-login").addEventListener("click", closeLoginModal);
  document.getElementById("btn-close-details").addEventListener("click", closeChallengeDetails);
  document.getElementById("btn-trigger-login-from-modal").addEventListener("click", () => {
    closeChallengeDetails();
    showLoginModal();
  });

  // --- DAD CONSOLE LOGIC ---
  document.getElementById("btn-trigger-dad-console").addEventListener("click", showDadModal);
  document.getElementById("btn-close-dad").addEventListener("click", closeDadModal);

  // Dad Login Form
  document.getElementById("dad-login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const pin = document.getElementById("dad-password").value;
    const error = document.getElementById("dad-login-error");

    if (pin === "password") { // Simple PIN authorization for Dad
      document.getElementById("dad-login-form").classList.add("hidden");
      document.getElementById("dad-panel").classList.remove("hidden");
      renderDadSubmissions();
    } else {
      error.classList.remove("hidden");
    }
  });

  // Dad Panel Tabs
  document.querySelectorAll(".dad-tabs .tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".dad-tabs .tab-btn").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-tab");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Render submissions on Dad's viewer
  function renderDadSubmissions() {
    const container = document.getElementById("dad-submissions-container");
    container.innerHTML = "";

    const keys = Object.keys(db.completions);

    if (keys.length === 0) {
      container.innerHTML = `<p class="no-submissions">No submissions logged by Pierce or Graham yet.</p>`;
      return;
    }

    // Sort submissions by timestamp (newest first)
    const sortedSubmissions = keys.map(key => {
      const [username, challengeId] = key.split("_");
      const data = db.completions[key];
      const challenge = CHALLENGES.find(c => c.id === challengeId);
      return {
        key,
        username,
        challengeTitle: challenge ? challenge.title : challengeId,
        text: data.text,
        timestamp: data.timestamp
      };
    }).sort((a, b) => b.timestamp - a.timestamp);

    sortedSubmissions.forEach(sub => {
      const card = document.createElement("div");
      card.className = "dad-submission-card";

      const timeStr = new Date(sub.timestamp).toLocaleString();
      const userDetails = USERS[sub.username] || { name: sub.username };

      card.innerHTML = `
        <div class="sub-header">
          <span class="sub-player ${sub.username}">${userDetails.name}</span>
          <span class="sub-time">${timeStr}</span>
        </div>
        <div class="sub-title">${sub.challengeTitle}</div>
        <div class="sub-text ${sub.username}">${escapeHtml(sub.text)}</div>
      `;
      container.appendChild(card);
    });
  }

  // Escape HTML utility for safety
  function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }

  // --- DAD SETTINGS / DATABASE MANAGEMENT ---

  // Individual reset
  document.getElementById("btn-reset-pierce").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset Pierce's score and submissions? This cannot be undone.")) {
      Object.keys(db.completions).forEach(key => {
        if (key.startsWith("pierce_")) {
          delete db.completions[key];
        }
      });
      saveDatabase();
      updateUIState();
      renderDadSubmissions();
      alert("Pierce's records have been cleared.");
    }
  });

  document.getElementById("btn-reset-graham").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset Graham's score and submissions? This cannot be undone.")) {
      Object.keys(db.completions).forEach(key => {
        if (key.startsWith("graham_")) {
          delete db.completions[key];
        }
      });
      saveDatabase();
      updateUIState();
      renderDadSubmissions();
      alert("Graham's records have been cleared.");
    }
  });

  // Global reset
  document.getElementById("btn-reset-all").addEventListener("click", () => {
    if (confirm("WARNING: Are you sure you want to delete ALL completions and scores for both players? This action is permanent!")) {
      db.completions = {};
      currentUser = null;
      localStorage.removeItem("board_current_user");
      saveDatabase();
      updateUIState();
      renderDadSubmissions();
      alert("All records deleted successfully.");
    }
  });

  // Data Export (JSON)
  document.getElementById("btn-export-data").addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db.completions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dad_board_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Data Import Trigger
  document.getElementById("btn-import-data-trigger").addEventListener("click", () => {
    document.getElementById("import-data-file").click();
  });

  // File selected handler for import
  document.getElementById("import-data-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const importedData = JSON.parse(evt.target.result);
        
        // Basic schema validation
        if (typeof importedData === "object" && importedData !== null) {
          db.completions = importedData;
          saveDatabase();
          updateUIState();
          renderDadSubmissions();
          alert("Database imported successfully!");
        } else {
          alert("Invalid file format. Import failed.");
        }
      } catch (err) {
        alert("Failed to parse JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  });

  // Initialize
  initLocalStorage();
  updateUIState();
});
