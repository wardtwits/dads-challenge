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
    scoreHistory: [],
    activeWeekStartMs: null
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

    // Load archived weekly score history, seeded from score-history.js.
    const savedScoreHistory = localStorage.getItem("board_score_history");
    if (savedScoreHistory) {
      try {
        db.scoreHistory = mergeScoreHistory(JSON.parse(savedScoreHistory), getSeedScoreHistory());
      } catch (e) {
        console.error("Error parsing score history from localStorage, reseeding...", e);
        db.scoreHistory = getSeedScoreHistory();
      }
    } else {
      db.scoreHistory = getSeedScoreHistory();
    }

    const savedActiveWeekStart = Number(localStorage.getItem("board_active_week_start"));
    db.activeWeekStartMs = Number.isFinite(savedActiveWeekStart) && savedActiveWeekStart > 0
      ? savedActiveWeekStart
      : null;

    applyWeeklyRollover();
    saveDatabase();
  }

  function saveDatabase() {
    localStorage.setItem("board_completions", JSON.stringify(db.completions));
    localStorage.setItem("board_score_history", JSON.stringify(db.scoreHistory));
    localStorage.setItem("board_active_week_start", String(db.activeWeekStartMs));
  }

  function getSeedScoreHistory() {
    if (!Array.isArray(window.INITIAL_SCORE_HISTORY)) return [];
    return window.INITIAL_SCORE_HISTORY.map(entry => ({
      id: entry.id,
      label: entry.label,
      endedAt: entry.endedAt,
      scores: {
        pierce: Number(entry.scores?.pierce) || 0,
        graham: Number(entry.scores?.graham) || 0
      }
    }));
  }

  function mergeScoreHistory(savedHistory, seedHistory) {
    const historyById = new Map();

    [...seedHistory, ...(Array.isArray(savedHistory) ? savedHistory : [])].forEach(entry => {
      if (!entry || !entry.id) return;

      historyById.set(entry.id, {
        id: entry.id,
        label: entry.label || entry.id,
        endedAt: entry.endedAt || "",
        scores: {
          pierce: Number(entry.scores?.pierce) || 0,
          graham: Number(entry.scores?.graham) || 0
        }
      });
    });

    return Array.from(historyById.values()).sort((a, b) => {
      return new Date(a.endedAt).getTime() - new Date(b.endedAt).getTime();
    });
  }

  function getEasternParts(date) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    const parts = Object.fromEntries(
      formatter.formatToParts(date).map(part => [part.type, part.value])
    );
    const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);

    return {
      year: Number(parts.year),
      month: Number(parts.month),
      day: Number(parts.day),
      hour: Number(parts.hour),
      minute: Number(parts.minute),
      weekdayIndex
    };
  }

  function getEasternOffsetMinutes(utcMs) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      timeZoneName: "shortOffset"
    });
    const timeZonePart = formatter
      .formatToParts(new Date(utcMs))
      .find(part => part.type === "timeZoneName")?.value || "GMT-5";
    const match = timeZonePart.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);

    if (!match) return -300;

    const sign = match[1] === "+" ? 1 : -1;
    return sign * ((Number(match[2]) * 60) + Number(match[3] || 0));
  }

  function easternDateTimeToUtcMs(year, month, day, hour, minute = 0) {
    const firstGuessMs = Date.UTC(year, month - 1, day, hour, minute);
    const firstOffsetMinutes = getEasternOffsetMinutes(firstGuessMs);
    const secondGuessMs = firstGuessMs - (firstOffsetMinutes * 60 * 1000);
    const secondOffsetMinutes = getEasternOffsetMinutes(secondGuessMs);

    return firstGuessMs - (secondOffsetMinutes * 60 * 1000);
  }

  function getCurrentWeekStartMs(now = new Date()) {
    const easternNow = getEasternParts(now);
    const fridayIndex = 5;
    let daysSinceFriday = (easternNow.weekdayIndex - fridayIndex + 7) % 7;

    if (daysSinceFriday === 0 && easternNow.hour < 20) {
      daysSinceFriday = 7;
    }

    const candidateDate = new Date(Date.UTC(easternNow.year, easternNow.month - 1, easternNow.day - daysSinceFriday, 12));
    const candidateMs = easternDateTimeToUtcMs(
      candidateDate.getUTCFullYear(),
      candidateDate.getUTCMonth() + 1,
      candidateDate.getUTCDate(),
      20
    );

    if (now.getTime() < candidateMs) {
      const previousDate = new Date(Date.UTC(candidateDate.getUTCFullYear(), candidateDate.getUTCMonth(), candidateDate.getUTCDate() - 7, 12));
      return easternDateTimeToUtcMs(
        previousDate.getUTCFullYear(),
        previousDate.getUTCMonth() + 1,
        previousDate.getUTCDate(),
        20
      );
    }

    return candidateMs;
  }

  function formatEasternDate(ms) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(ms));
  }

  function getWeekHistoryId(endedAtMs) {
    const parts = getEasternParts(new Date(endedAtMs));
    const month = String(parts.month).padStart(2, "0");
    const day = String(parts.day).padStart(2, "0");
    return `week-ending-${parts.year}-${month}-${day}`;
  }

  function getArchivedScore(username) {
    return db.scoreHistory.reduce((total, entry) => total + (Number(entry.scores?.[username]) || 0), 0);
  }

  function getPlayerTotalScore(username) {
    return getArchivedScore(username) + getPlayerScore(username);
  }

  function archiveCurrentWeek(endedAtMs) {
    const existingEntry = db.scoreHistory.find(entry => entry.id === getWeekHistoryId(endedAtMs));
    const scoreEntry = {
      id: getWeekHistoryId(endedAtMs),
      label: `Week ending ${formatEasternDate(endedAtMs)}`,
      endedAt: new Date(endedAtMs).toISOString(),
      scores: {
        pierce: Math.max(Number(existingEntry?.scores?.pierce) || 0, getPlayerScore("pierce")),
        graham: Math.max(Number(existingEntry?.scores?.graham) || 0, getPlayerScore("graham"))
      }
    };
    const hasPoints = scoreEntry.scores.pierce > 0 || scoreEntry.scores.graham > 0;
    const hasSubmissions = Object.keys(db.completions).length > 0;

    if (!hasPoints && !hasSubmissions) return;

    db.scoreHistory = mergeScoreHistory(
      db.scoreHistory.filter(entry => entry.id !== scoreEntry.id).concat(scoreEntry),
      getSeedScoreHistory()
    );
  }

  function applyWeeklyRollover(now = new Date()) {
    const currentWeekStartMs = getCurrentWeekStartMs(now);

    if (!db.activeWeekStartMs) {
      db.activeWeekStartMs = currentWeekStartMs;
      return;
    }

    if (db.activeWeekStartMs >= currentWeekStartMs) return;

    archiveCurrentWeek(currentWeekStartMs);
    db.completions = {};
    db.activeWeekStartMs = currentWeekStartMs;
  }

  function checkWeeklyRollover() {
    const previousWeekStartMs = db.activeWeekStartMs;
    applyWeeklyRollover();

    if (previousWeekStartMs !== db.activeWeekStartMs) {
      saveDatabase();
      updateUIState();
      renderDadSubmissions();
    }
  }

  const REVIEW_CODE_PREFIX = "DAD-REVIEW-V1:";

  function encodeReviewPayload(payload) {
    return REVIEW_CODE_PREFIX + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  }

  function decodeReviewPayload(code) {
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      throw new Error("Paste a review code first.");
    }

    if (!trimmedCode.startsWith(REVIEW_CODE_PREFIX)) {
      return JSON.parse(trimmedCode);
    }

    const encodedPayload = trimmedCode.slice(REVIEW_CODE_PREFIX.length);
    return JSON.parse(decodeURIComponent(escape(atob(encodedPayload))));
  }

  function getCompletionsForUser(username) {
    return Object.fromEntries(
      Object.entries(db.completions).filter(([key]) => key.startsWith(`${username}_`))
    );
  }

  function normalizeCompletionPayload(payload) {
    const source = payload && payload.completions ? payload.completions : payload;

    if (!source || typeof source !== "object" || Array.isArray(source)) {
      throw new Error("Review data must be an object of submissions.");
    }

    const normalized = {};

    Object.entries(source).forEach(([key, value]) => {
      const separatorIndex = key.indexOf("_");
      const username = key.slice(0, separatorIndex);
      const challengeId = key.slice(separatorIndex + 1);

      if (separatorIndex === -1 || !USERS[username] || !challengeId) return;
      if (!value || typeof value.text !== "string" || !value.text.trim()) return;

      normalized[key] = {
        text: value.text.trim(),
        timestamp: Number.isFinite(value.timestamp) ? value.timestamp : Date.now()
      };
    });

    if (Object.keys(normalized).length === 0) {
      throw new Error("No valid Pierce or Graham submissions were found.");
    }

    return normalized;
  }

  function createReviewCodeForUser(username) {
    const completions = getCompletionsForUser(username);
    const count = Object.keys(completions).length;

    if (count === 0) {
      throw new Error("Submit at least one challenge before sending a review code.");
    }

    return encodeReviewPayload({
      version: 1,
      exportedAt: Date.now(),
      exportedBy: username,
      completions
    });
  }

  function importCompletionRecords(records) {
    const normalizedRecords = normalizeCompletionPayload(records);
    db.completions = {
      ...db.completions,
      ...normalizedRecords
    };
    saveDatabase();
    updateUIState();
    renderDadSubmissions();
    return Object.keys(normalizedRecords).length;
  }

  function setTemporaryButtonText(button, text) {
    const originalText = button.textContent;
    button.textContent = text;
    setTimeout(() => {
      button.textContent = originalText;
    }, 2500);
  }

  function setReviewCodeStatus(message, isError = false) {
    const status = document.getElementById("review-code-status");
    status.textContent = message;
    status.style.color = isError ? "var(--accent-red)" : "var(--accent-green)";
  }

  async function copyTextToClipboard(text) {
    if (!navigator.clipboard || !window.isSecureContext) {
      throw new Error("Clipboard copy is only available on HTTPS or localhost.");
    }

    await navigator.clipboard.writeText(text);
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
    document.getElementById("lb-total-pierce").textContent = `TOTAL ${getPlayerTotalScore("pierce")} PTS`;
    document.getElementById("lb-total-graham").textContent = `TOTAL ${getPlayerTotalScore("graham")} PTS`;

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
      document.getElementById("current-user-score").textContent = `${getPlayerScore(currentUser)} WK / ${getPlayerTotalScore(currentUser)} TOTAL`;
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

    const descriptionCard = document.querySelector(".challenge-desc-card");
    const existingPrintableLink = descriptionCard.querySelector(".printable-challenge-link");
    if (existingPrintableLink) {
      existingPrintableLink.remove();
    }

    if (challenge.printUrl) {
      const printableLink = document.createElement("a");
      printableLink.className = "printable-challenge-link";
      printableLink.href = challenge.printUrl;
      printableLink.target = "_blank";
      printableLink.rel = "noopener";
      printableLink.textContent = "Open printable mission";
      descriptionCard.appendChild(printableLink);
    }

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
      toastMsg.textContent = "Points awarded. Use Send to Dad when you're ready for review.";
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

  document.getElementById("btn-copy-dad-code").addEventListener("click", async () => {
    if (!currentUser) return;

    const button = document.getElementById("btn-copy-dad-code");
    let reviewCode = "";

    try {
      reviewCode = createReviewCodeForUser(currentUser);
      await copyTextToClipboard(reviewCode);
      setTemporaryButtonText(button, "Copied!");
    } catch (err) {
      if (reviewCode) {
        prompt("Copy this Dad review code and send it to Dad:", reviewCode);
        setTemporaryButtonText(button, "Code Ready");
      } else {
        alert(err.message);
      }
    }
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

  document.getElementById("btn-import-review-code").addEventListener("click", () => {
    const codeInput = document.getElementById("dad-review-code");

    try {
      const payload = decodeReviewPayload(codeInput.value);
      const importedCount = importCompletionRecords(payload);
      codeInput.value = "";
      setReviewCodeStatus(`Imported ${importedCount} submission${importedCount === 1 ? "" : "s"}.`);
    } catch (err) {
      setReviewCodeStatus(err.message, true);
    }
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
    if (confirm("Reset Pierce's weekly score and submissions? His archived total will stay saved.")) {
      Object.keys(db.completions).forEach(key => {
        if (key.startsWith("pierce_")) {
          delete db.completions[key];
        }
      });
      saveDatabase();
      updateUIState();
      renderDadSubmissions();
      alert("Pierce's weekly records have been cleared.");
    }
  });

  document.getElementById("btn-reset-graham").addEventListener("click", () => {
    if (confirm("Reset Graham's weekly score and submissions? His archived total will stay saved.")) {
      Object.keys(db.completions).forEach(key => {
        if (key.startsWith("graham_")) {
          delete db.completions[key];
        }
      });
      saveDatabase();
      updateUIState();
      renderDadSubmissions();
      alert("Graham's weekly records have been cleared.");
    }
  });

  // Global reset
  document.getElementById("btn-reset-all").addEventListener("click", () => {
    if (confirm("Reset this week's submissions and leaderboard for both players? Archived totals will stay saved.")) {
      db.completions = {};
      currentUser = null;
      localStorage.removeItem("board_current_user");
      saveDatabase();
      updateUIState();
      renderDadSubmissions();
      alert("This week's records were cleared successfully.");
    }
  });

  // Data Export (JSON)
  document.getElementById("btn-export-data").addEventListener("click", () => {
    const backup = {
      version: 2,
      exportedAt: Date.now(),
      activeWeekStartMs: db.activeWeekStartMs,
      completions: db.completions,
      scoreHistory: db.scoreHistory
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
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
        const normalizedRecords = normalizeCompletionPayload(importedData);
        db.completions = normalizedRecords;
        db.scoreHistory = mergeScoreHistory(importedData.scoreHistory, getSeedScoreHistory());
        db.activeWeekStartMs = Number(importedData.activeWeekStartMs) || getCurrentWeekStartMs();
        saveDatabase();
        updateUIState();
        renderDadSubmissions();
        const importedCount = Object.keys(normalizedRecords).length;
        alert(`Database restored successfully. ${importedCount} weekly submission${importedCount === 1 ? "" : "s"} loaded.`);
      } catch (err) {
        alert("Failed to parse JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  });

  // Initialize
  initLocalStorage();
  updateUIState();
  setInterval(checkWeeklyRollover, 60 * 1000);
});
