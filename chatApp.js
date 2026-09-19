/**
 * AuraChat • Application Controller (Mobile-First & Pure Biometrics)
 * Synchronizes real-time facial axis tracking, neutral baseline calibration,
 * mobile single-screen navigation, and dynamic emotional typography.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Main Layout & Navigation
  const chatLayout = document.getElementById('chatLayout');
  const btnBackToContacts = document.getElementById('btnBackToContacts');
  const messageInput = document.getElementById('messageInput');
  const composerForm = document.getElementById('composerForm');
  const messagesContainer = document.getElementById('messagesContainer');
  const contactList = document.getElementById('contactList');

  // Header Elements
  const headerEmotionIcon = document.getElementById('headerEmotionIcon');
  const headerEmotionName = document.getElementById('headerEmotionName');
  const valCoord = document.getElementById('valCoord');
  const liveEmotionDisplay = document.getElementById('liveEmotionDisplay');
  const userEmotionTag = document.getElementById('userEmotionTag');
  const myAvatarRing = document.getElementById('myAvatarRing');

  // Calibration & Wizard Controls
  const btnCalibrateNeutral = document.getElementById('btnCalibrateNeutral');
  const btnWizardCalibrate = document.getElementById('btnWizardCalibrate');
  const btnCancelWizard = document.getElementById('btnCancelWizard');
  const btnQuickFinish = document.getElementById('btnQuickFinish');
  const wizardStepBadge = document.getElementById('wizardStepBadge');
  const wizardEmoji = document.getElementById('wizardEmoji');
  const wizardTitle = document.getElementById('wizardTitle');
  const wizardDesc = document.getElementById('wizardDesc');
  const wizardSubStatus = document.getElementById('wizardSubStatus');
  const calibrateBtnText = document.getElementById('calibrateBtnText');
  const calibrationOverlay = document.getElementById('calibrationOverlay');
  const calProgressFill = document.getElementById('calProgressFill');
  const calProgressPct = document.getElementById('calProgressPct');

  // Axis Telemetry Elements (In FACS Biometrics Modal)
  const valEngagement = document.getElementById('valEngagement');
  const barEngagement = document.getElementById('barEngagement');
  const deltaBrow = document.getElementById('deltaBrow');
  const barBrow = document.getElementById('barBrow');
  const deltaSmile = document.getElementById('deltaSmile');
  const barSmile = document.getElementById('barSmile');
  const deltaCheek = document.getElementById('deltaCheek');
  const barCheek = document.getElementById('barCheek');
  const deltaBrowRaise = document.getElementById('deltaBrowRaise');
  const barBrowRaise = document.getElementById('barBrowRaise');
  const deltaFrown = document.getElementById('deltaFrown');
  const barFrown = document.getElementById('barFrown');
  const deltaJaw = document.getElementById('deltaJaw');
  const barJaw = document.getElementById('barJaw');
  const poseVal = document.getElementById('poseVal');

  // Composer Live Emotion Badge
  const pillEmoji = document.getElementById('pillEmoji');
  const pillName = document.getElementById('pillName');

  // Live Confidence Diagnostic Meter Elements
  const fillAngry = document.getElementById('fillAngry');
  const pctAngry = document.getElementById('pctAngry');
  const fillHappy = document.getElementById('fillHappy');
  const pctHappy = document.getElementById('pctHappy');
  const fillCalm = document.getElementById('fillCalm');
  const pctCalm = document.getElementById('pctCalm');
  const fillSurprise = document.getElementById('fillSurprise');
  const pctSurprise = document.getElementById('pctSurprise');
  const fillSad = document.getElementById('fillSad');
  const pctSad = document.getElementById('pctSad');

  // Active Chat Header
  const currentContactName = document.getElementById('currentContactName');
  const currentContactStatus = document.getElementById('currentContactStatus');
  const currentContactAvatar = document.getElementById('currentContactAvatar');
  const currentContactEmotionBadge = document.getElementById('currentContactEmotionBadge');

  // Camera PIP HUD
  const cameraPip = document.getElementById('cameraPip');
  const btnToggleCamera = document.getElementById('btnToggleCamera');
  const camBtnLabel = document.getElementById('camBtnLabel');
  const btnSwitchToCamera = document.getElementById('btnSwitchToCamera');
  const btnMinimizePip = document.getElementById('btnMinimizePip');
  const btnClosePip = document.getElementById('btnClosePip');
  const pipFps = document.getElementById('pipFps');
  const pipEmotionBadge = document.getElementById('pipEmotionBadge');
  const pipStatusTag = document.getElementById('pipStatusTag');
  const simAvatar = document.getElementById('simAvatar');
  const hudValence = document.getElementById('hudValence');
  const hudArousal = document.getElementById('hudArousal');
  const hudCalStatus = document.getElementById('hudCalStatus');
  const sensRange = document.getElementById('sensRange');
  const sensVal = document.getElementById('sensVal');
  const moodChips = document.querySelectorAll('.mood-chip');

  // Telemetry Modal
  const telemetryModal = document.getElementById('telemetryModal');
  const btnToggleMeshHUD = document.getElementById('btnToggleMeshHUD');
  const btnCloseTelemetry = document.getElementById('btnCloseTelemetry');

  // Mismatch Banner
  const toneMismatchBanner = document.getElementById('toneMismatchBanner');
  const btnDismissMismatch = document.getElementById('btnDismissMismatch');

  // Guide Modal
  const guideModal = document.getElementById('guideModal');
  const btnIntegrationGuide = document.getElementById('btnIntegrationGuide');
  const btnCloseGuide = document.getElementById('btnCloseGuide');
  const btnCloseGuideBtn = document.getElementById('btnCloseGuideBtn');
  const btnClearChat = document.getElementById('btnClearChat');

  // Web Audio Synthesizer for Clean Feedback Tones
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playTone(type = 'send') {
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'send') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'receive') {
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch (e) {}
  }

  // Emotion Definitions & Emoji Mapping
  const emotionMeta = {
    angry: { name: 'Angry', emoji: '😡' },
    happy: { name: 'Joyful', emoji: '😊' },
    sad: { name: 'Sad', emoji: '😢' },
    surprised: { name: 'Surprised', emoji: '😲' },
    warm: { name: 'Warm', emoji: '💖' },
    neutral: { name: 'Neutral', emoji: '😐' }
  };

  // Contacts Data
  const contacts = [
    {
      id: 'ahmed',
      name: 'Ahmed',
      initials: 'AH',
      status: 'online • Emotion Aura Active',
      mood: 'happy',
      lastSeen: '11:42 AM',
      messages: [
        {
          id: 1,
          sender: 'them',
          text: "Hey! Try smiling or frowning into your camera — watch how the text font color morphs live!",
          time: "11:38 AM",
          emotion: 'happy',
          color: '#00e676'
        },
        {
          id: 2,
          sender: 'them',
          text: "Tap 'Calibrate' at the top to record your neutral resting face. Everything measures against your baseline.",
          time: "11:39 AM",
          emotion: 'warm',
          color: '#ff6584'
        }
      ]
    },
    {
      id: 'alex',
      name: 'Alex Rivera',
      initials: 'AR',
      status: 'online • Biometrics Live',
      mood: 'neutral',
      lastSeen: '11:30 AM',
      messages: [
        {
          id: 101,
          sender: 'them',
          text: "The delta formula (Δ = Live - Baseline) removes resting face bias completely. It adapts to whoever is looking at the camera.",
          time: "11:28 AM",
          emotion: 'neutral',
          color: '#f0f2f5'
        }
      ]
    },
    {
      id: 'maya',
      name: 'Maya Lin',
      initials: 'ML',
      status: 'offline • last seen 2h ago',
      mood: 'warm',
      lastSeen: '9:15 AM',
      messages: [
        {
          id: 201,
          sender: 'them',
          text: "Love the new mobile layout! Feels super responsive on my phone.",
          time: "9:14 AM",
          emotion: 'warm',
          color: '#ff6584'
        }
      ]
    }
  ];

  let activeContactId = 'ahmed';

  // Initialize Parametric Emotion Engine
  const engine = new ParametricEmotionEngine({
    videoElement: document.getElementById('webcamVideo'),
    canvasElement: document.getElementById('faceMeshCanvas'),
    onEmotionUpdate: handleParametricUpdate,
    onCalibrationProgress: handleCalibrationProgress,
    onWizardProgress: handleWizardProgress,
    onTelemetryUpdate: handleTelemetryUpdate
  });

  /**
   * Continuous Real-Time Telemetry & Facial Synchronization (60 FPS)
   */
  function handleParametricUpdate(data) {
    const { dominantEmotion, confidence, color, affectiveSpace, parameterDeltas, headPose, isCalibrated } = data;
    const meta = emotionMeta[dominantEmotion] || emotionMeta.neutral;

    // 1. Update Global Dynamic CSS Variables
    document.documentElement.style.setProperty('--active-emotion-color', color.hex);
    document.documentElement.style.setProperty('--active-emotion-glow', color.glow);
    document.documentElement.style.setProperty('--active-emotion-bg', color.bg);

    // 2. Update Header Status
    headerEmotionIcon.textContent = meta.emoji;
    headerEmotionName.textContent = meta.name;
    const valText = (affectiveSpace.valence >= 0 ? '+' : '') + affectiveSpace.valence.toFixed(2);
    valCoord.textContent = valText;

    // 3. User Avatar Ring & Tag
    userEmotionTag.textContent = `${meta.name} (${confidence}%)`;
    myAvatarRing.style.borderColor = color.hex;

    // 4. Composer Live Emotion Pill & Message Input Color
    pillEmoji.textContent = meta.emoji;
    pillName.textContent = `${meta.name} (Valence: ${valText})`;
    messageInput.style.color = color.hex;
    messageInput.style.textShadow = `0 0 8px ${color.glow}`;

    // 5. FACS-Inspired Action Units Telemetry (in Modal & HUD)
    if (data.moodMeFACS) {
      const { AU4, AU12, AU6, AU1_2, AU15, AU26, engagement } = data.moodMeFACS;
      if (valEngagement && barEngagement) {
        valEngagement.textContent = `${Math.round(engagement || 0)}%`;
        barEngagement.style.width = `${Math.round(engagement || 0)}%`;
      }
      if (deltaBrow && barBrow) {
        deltaBrow.textContent = `${Math.round(AU4 || 0)}%`;
        barBrow.style.width = `${Math.round(AU4 || 0)}%`;
      }
      if (deltaSmile && barSmile) {
        deltaSmile.textContent = `${Math.round(AU12 || 0)}%`;
        barSmile.style.width = `${Math.round(AU12 || 0)}%`;
      }
      if (deltaCheek && barCheek) {
        deltaCheek.textContent = `${Math.round(AU6 || 0)}%`;
        barCheek.style.width = `${Math.round(AU6 || 0)}%`;
      }
      if (deltaBrowRaise && barBrowRaise) {
        deltaBrowRaise.textContent = `${Math.round(AU1_2 || 0)}%`;
        barBrowRaise.style.width = `${Math.round(AU1_2 || 0)}%`;
      }
      if (deltaFrown && barFrown) {
        deltaFrown.textContent = `${Math.round(AU15 || 0)}%`;
        barFrown.style.width = `${Math.round(AU15 || 0)}%`;
      }
      if (deltaJaw && barJaw) {
        deltaJaw.textContent = `${Math.round(AU26 || 0)}%`;
        barJaw.style.width = `${Math.round(AU26 || 0)}%`;
      }
    } else {
      const dBrow = parameterDeltas.browFurrowAxis || 0;
      const dSmile = (parameterDeltas.mouthSmileLeftAxis + parameterDeltas.mouthSmileRightAxis) / 2 || 0;
      const dFrown = parameterDeltas.mouthFrownAxis || 0;
      const dJaw = parameterDeltas.mouthOpenAxis || 0;

      if (deltaBrow && barBrow) {
        deltaBrow.textContent = (dBrow >= 0 ? '+' : '') + dBrow.toFixed(2);
        barBrow.style.width = `${Math.min(100, Math.max(5, (dBrow + 0.2) * 100))}%`;
      }
      if (deltaSmile && barSmile) {
        deltaSmile.textContent = (dSmile >= 0 ? '+' : '') + dSmile.toFixed(2);
        barSmile.style.width = `${Math.min(100, Math.max(5, (dSmile + 0.2) * 100))}%`;
      }
      if (deltaFrown && barFrown) {
        deltaFrown.textContent = (dFrown >= 0 ? '+' : '') + dFrown.toFixed(2);
        barFrown.style.width = `${Math.min(100, Math.max(5, (dFrown + 0.2) * 100))}%`;
      }
      if (deltaJaw && barJaw) {
        deltaJaw.textContent = (dJaw >= 0 ? '+' : '') + dJaw.toFixed(2);
        barJaw.style.width = `${Math.min(100, Math.max(5, (dJaw + 0.2) * 100))}%`;
      }
    }

    if (poseVal) {
      const pitchDeg = Math.round(headPose.pitch * (180 / Math.PI));
      const yawDeg = Math.round(headPose.yaw * (180 / Math.PI));
      const rollDeg = Math.round(headPose.roll * (180 / Math.PI));
      poseVal.textContent = `${pitchDeg}° / ${yawDeg}° / ${rollDeg}°`;
    }

    // 6. Floating Camera PiP values
    pipEmotionBadge.textContent = `${dominantEmotion.toUpperCase()}`;
    pipEmotionBadge.style.color = color.hex;
    pipEmotionBadge.style.borderColor = color.hex;
    simAvatar.textContent = meta.emoji;
    hudValence.textContent = valText;
    hudArousal.textContent = affectiveSpace.arousal.toFixed(2);
    hudCalStatus.textContent = isCalibrated ? "Calibrated ✓" : "Default";

    if (pipStatusTag && data.trackingStatus) {
      pipStatusTag.textContent = data.trackingStatus;
      if (data.hasFaceLock) {
        pipStatusTag.style.color = '#00e676';
        pipStatusTag.style.borderColor = 'rgba(0, 230, 118, 0.4)';
        pipStatusTag.style.background = 'rgba(0, 230, 118, 0.15)';
      } else {
        pipStatusTag.style.color = '#ffb300';
        pipStatusTag.style.borderColor = 'rgba(255, 179, 0, 0.4)';
        pipStatusTag.style.background = 'rgba(255, 179, 0, 0.15)';
      }
    }

    // 7. Update Live Diagnostic Confidence Meters (60 FPS)
    if (data.livePcts) {
      const { angry, happy, neutral, surprised, sad } = data.livePcts;
      if (fillAngry && pctAngry) {
        fillAngry.style.width = `${Math.min(100, angry)}%`;
        pctAngry.textContent = `${angry}%`;
      }
      if (fillHappy && pctHappy) {
        fillHappy.style.width = `${Math.min(100, happy)}%`;
        pctHappy.textContent = `${happy}%`;
      }
      if (fillCalm && pctCalm) {
        fillCalm.style.width = `${Math.min(100, neutral)}%`;
        pctCalm.textContent = `${neutral}%`;
      }
      if (fillSurprise && pctSurprise) {
        fillSurprise.style.width = `${Math.min(100, surprised)}%`;
        pctSurprise.textContent = `${surprised}%`;
      }
      if (fillSad && pctSad) {
        fillSad.style.width = `${Math.min(100, sad)}%`;
        pctSad.textContent = `${sad}%`;
      }
    }
  }

  function handleTelemetryUpdate(t) {
    if (pipFps) pipFps.textContent = `${t.fps} FPS`;
  }

  /**
   * Neutral Baseline Calibration Progress Handler
   */
  function handleCalibrationProgress(data) {
    if (data.isCalibrating) {
      calibrationOverlay.style.display = 'flex';
      calProgressFill.style.width = `${data.progress}%`;
      calProgressPct.textContent = `${data.progress}%`;
    } else {
      calibrationOverlay.style.display = 'none';
      calibrateBtnText.textContent = 'Reset 😐';
      playTone('send');
    }
  }

  /**
   * Guided 3-Step Calibration Wizard Progress Handler
   */
  function handleWizardProgress(data) {
    if (!data.isVisible) {
      calibrationOverlay.style.display = 'none';
      return;
    }

    calibrationOverlay.style.display = 'flex';
    if (data.step && wizardStepBadge) {
      wizardStepBadge.textContent = data.stepName === 'complete' ? 'Setup Complete' : `Step ${data.step} of ${data.totalSteps}`;
    }
    if (data.emoji && wizardEmoji) wizardEmoji.textContent = data.emoji;
    if (data.title && wizardTitle) wizardTitle.textContent = data.title;
    if (data.desc && wizardDesc) wizardDesc.textContent = data.desc;
    if (data.progress !== undefined && calProgressFill && calProgressPct) {
      calProgressFill.style.width = `${data.progress}%`;
      calProgressPct.textContent = `${data.progress}%`;
    }

    if (wizardSubStatus) {
      if (data.stepName === 'neutral') {
        wizardSubStatus.textContent = 'Relax face, looking at camera...';
      } else if (data.stepName === 'smile') {
        wizardSubStatus.textContent = 'Smile naturally! Learning your joy threshold...';
      } else if (data.stepName === 'angry') {
        wizardSubStatus.textContent = 'Knit eyebrows together! Learning anger threshold...';
      } else if (data.stepName === 'complete') {
        wizardSubStatus.textContent = 'Personalized face geometry locked in! ✓';
        playTone('receive');
      }
    }
  }

  // Guided Wizard Launch and Actions
  if (btnWizardCalibrate) {
    btnWizardCalibrate.addEventListener('click', () => {
      engine.startGuidedWizard();
    });
  }

  if (btnCancelWizard) {
    btnCancelWizard.addEventListener('click', () => {
      engine.cancelGuidedWizard();
    });
  }

  if (btnQuickFinish) {
    btnQuickFinish.addEventListener('click', () => {
      engine.cancelGuidedWizard();
      engine.startNeutralCalibration(1800);
    });
  }

  // Quick Mood Override Chips
  moodChips.forEach(chip => {
    chip.addEventListener('click', () => {
      moodChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const mood = chip.getAttribute('data-mood');
      engine.setManualEmotion(mood);
    });
  });

  // Real-time Expression Sensitivity Slider
  if (sensRange && sensVal) {
    sensRange.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      sensVal.textContent = `${val.toFixed(1)}x`;
      engine.setSensitivity(val);
    });
  }

  // Quick Neutral Reset from Header button or Emotion Pill
  btnCalibrateNeutral.addEventListener('click', () => {
    engine.startNeutralCalibration(2000);
  });
  liveEmotionDisplay.addEventListener('click', () => {
    engine.startGuidedWizard();
  });

  // Mobile Navigation: Back to Contacts
  btnBackToContacts.addEventListener('click', () => {
    chatLayout.classList.remove('mobile-chat-open');
  });

  /**
   * Message Send Handler
   */
  composerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text) return;

    const emotion = engine.dominantEmotion;
    const color = engine.currentColor;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: text,
      time: getCurrentTime(),
      emotion: emotion,
      color: color.hex,
      glow: color.glow
    };

    const contact = contacts.find(c => c.id === activeContactId);
    if (contact) {
      contact.messages.push(newMessage);
      renderMessages(contact.messages);
    }

    messageInput.value = '';
    messageInput.style.height = 'auto';
    toneMismatchBanner.style.display = 'none';
    playTone('send');
    scrollToBottom();

    // Contextual simulated reply
    simulateContactReply(contact, newMessage);
  });

  function simulateContactReply(contact, userMsg) {
    const origStatus = contact.status;
    currentContactStatus.textContent = "typing...";

    setTimeout(() => {
      let replyText = "";
      let replyEmotion = "neutral";
      let replyColor = "#f0f2f5";

      if (userMsg.emotion === 'angry') {
        replyEmotion = 'surprised';
        replyColor = '#ff2a55';
        replyText = `Noticed your crimson text! Are you feeling frustrated? Everything okay?`;
      } else if (userMsg.emotion === 'happy') {
        replyEmotion = 'happy';
        replyColor = '#00e676';
        replyText = `Love seeing that bright emerald green text! Your smile really shines through!`;
      } else if (userMsg.emotion === 'sad') {
        replyEmotion = 'warm';
        replyColor = '#38b6ff';
        replyText = `Soft blue text detected... sending warm vibes your way! 💙`;
      } else if (userMsg.emotion === 'surprised') {
        replyEmotion = 'surprised';
        replyColor = '#b026ff';
        replyText = `Violet surprise text! What just happened?! 💜`;
      } else {
        replyText = `Got it! The baseline comparison accurately reflected your natural resting expression.`;
      }

      contact.messages.push({
        id: Date.now() + 1,
        sender: 'them',
        text: replyText,
        time: getCurrentTime(),
        emotion: replyEmotion,
        color: replyColor
      });

      renderMessages(contact.messages);
      currentContactStatus.textContent = origStatus;
      playTone('receive');
      scrollToBottom();
      renderContactList();
    }, 1100);
  }

  function renderMessages(messages) {
    messagesContainer.innerHTML = '';

    const divider = document.createElement('div');
    divider.className = 'system-date-divider';
    divider.innerHTML = `<span>Today • Live Emotion Typography Active</span>`;
    messagesContainer.appendChild(divider);

    messages.forEach(msg => {
      const isMe = msg.sender === 'me';
      const meta = emotionMeta[msg.emotion] || emotionMeta.neutral;
      const bubbleColor = msg.color || '#f0f2f5';

      const row = document.createElement('div');
      row.className = `message-row ${isMe ? 'outgoing' : 'incoming'}`;

      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      bubble.style.borderLeft = `3px solid ${bubbleColor}`;
      bubble.style.boxShadow = `0 2px 10px ${bubbleColor}22`;

      const emotionTag = document.createElement('div');
      emotionTag.className = 'bubble-emotion-tag';
      emotionTag.innerHTML = `
        <span class="bubble-sender-name">${isMe ? 'You' : currentContactName.textContent}</span>
        <span class="bubble-emotion-pill" style="color: ${bubbleColor}; background: ${bubbleColor}20; border: 1px solid ${bubbleColor}40;">
          <span>${meta.emoji}</span>
          <span>${meta.name}</span>
        </span>
      `;
      bubble.appendChild(emotionTag);

      const textElem = document.createElement('div');
      textElem.className = 'message-text';
      textElem.textContent = msg.text;
      textElem.style.color = bubbleColor;
      textElem.style.textShadow = `0 0 8px ${bubbleColor}44`;
      bubble.appendChild(textElem);

      const footer = document.createElement('div');
      footer.className = 'bubble-footer';
      footer.innerHTML = `
        <span class="bubble-time">${msg.time}</span>
        ${isMe ? `
          <span class="bubble-status">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-3 0a.5.5 0 0 0-.708-.708L5 7.293l.646.647 3.708-3.586z"/>
            </svg>
          </span>
        ` : ''}
      `;
      bubble.appendChild(footer);

      row.appendChild(bubble);
      messagesContainer.appendChild(row);
    });
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function getCurrentTime() {
    const d = new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function renderContactList() {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
      const item = document.createElement('div');
      item.className = `contact-item ${contact.id === activeContactId ? 'active' : ''}`;
      const lastMsg = contact.messages[contact.messages.length - 1];
      const meta = emotionMeta[contact.mood] || emotionMeta.neutral;

      item.innerHTML = `
        <div class="avatar-wrapper">
          <div class="avatar contact-avatar">${contact.initials}</div>
        </div>
        <div class="contact-info">
          <div class="contact-top">
            <span class="contact-title">${contact.name}</span>
            <span class="contact-time">${lastMsg ? lastMsg.time : contact.lastSeen}</span>
          </div>
          <div class="contact-bottom">
            <span class="contact-snippet">${lastMsg ? lastMsg.text : 'No messages'}</span>
            <span class="contact-badge-pill">${meta.emoji}</span>
          </div>
        </div>
      `;

      item.addEventListener('click', () => {
        activeContactId = contact.id;
        currentContactName.textContent = contact.name;
        currentContactStatus.textContent = contact.status;
        currentContactAvatar.textContent = contact.initials;
        renderContactList();
        renderMessages(contact.messages);
        scrollToBottom();

        // On mobile, switch view to active conversation
        chatLayout.classList.add('mobile-chat-open');
      });

      contactList.appendChild(item);
    });
  }

  // Mobile Back Button: Return from conversation view to contacts list
  if (btnBackToContacts) {
    btnBackToContacts.addEventListener('click', () => {
      chatLayout.classList.remove('mobile-chat-open');
    });
  }

  // Camera Hardware Toggle
  async function toggleCamera() {
    if (engine.isCameraActive) {
      engine.stopCamera();
      btnToggleCamera.classList.remove('active');
      camBtnLabel.textContent = 'Camera';
    } else {
      camBtnLabel.textContent = 'Starting...';
      const res = await engine.startCamera();
      if (res.success) {
        btnToggleCamera.classList.add('active');
        camBtnLabel.textContent = 'Live';
      } else {
        btnToggleCamera.classList.remove('active');
        camBtnLabel.textContent = 'Camera';
        alert(res.error || 'Camera could not start. Note: Mobile browsers require HTTPS (or localhost) and camera permissions.');
      }
    }
  }

  btnToggleCamera.addEventListener('click', toggleCamera);
  btnSwitchToCamera.addEventListener('click', toggleCamera);

  // Floating PiP Controls
  btnMinimizePip.addEventListener('click', () => {
    cameraPip.classList.toggle('minimized');
  });

  btnClosePip.addEventListener('click', () => {
    cameraPip.style.display = 'none';
  });

  // Telemetry Modal
  btnToggleMeshHUD.addEventListener('click', () => {
    telemetryModal.style.display = 'flex';
  });
  btnCloseTelemetry.addEventListener('click', () => {
    telemetryModal.style.display = 'none';
  });

  // Blueprint Guide Modal
  btnIntegrationGuide.addEventListener('click', () => { guideModal.style.display = 'flex'; });
  const closeGuide = () => { guideModal.style.display = 'none'; };
  btnCloseGuide.addEventListener('click', closeGuide);
  btnCloseGuideBtn.addEventListener('click', closeGuide);

  // Clear Chat
  btnClearChat.addEventListener('click', () => {
    const contact = contacts.find(c => c.id === activeContactId);
    if (contact) {
      contact.messages = [];
      renderMessages([]);
    }
  });

  // Dismiss Tone Mismatch Banner
  btnDismissMismatch.addEventListener('click', () => {
    toneMismatchBanner.style.display = 'none';
  });

  // Auto-resize Textarea as user types
  messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + 'px';
  });

  // Close modals on clicking backdrop
  window.addEventListener('click', (e) => {
    if (e.target === guideModal) guideModal.style.display = 'none';
    if (e.target === telemetryModal) telemetryModal.style.display = 'none';
  });

  // Initial render
  renderContactList();
  const initContact = contacts.find(c => c.id === activeContactId);
  if (initContact) renderMessages(initContact.messages);
  scrollToBottom();

  // On larger screens, ensure chat view is visible; on mobile start with chat or list
  if (window.innerWidth <= 768) {
    chatLayout.classList.add('mobile-chat-open'); // Start in chat with back button
  }
});
