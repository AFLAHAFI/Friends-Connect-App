const http = require('http');

const PORT = 5050;

const HTML_PAGE = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Friends Connect — Mobile OTP Login, Random Audio/Video Calls, Celebrities & Events</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #090d16;
      --panel: #111827;
      --panel-alt: #0b111e;
      --border: #1e293b;
      --text: #f8fafc;
      --muted: #94a3b8;
      --blue: #2563eb;
      --purple: #7c3aed;
      --emerald: #059669;
      --amber: #f59e0b;
      --rose: #e11d48;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      line-height: 1.5;
    }
    header {
      position: sticky;
      top: 0;
      z-index: 30;
      background: rgba(13, 19, 34, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 14px 24px;
    }
    .container { max-width: 1240px; margin: 0 auto; }
    .header-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand { display: flex; align-items: center; gap: 12px; }
    .logo {
      width: 42px; height: 42px; border-radius: 12px;
      background: linear-gradient(135deg, #2563eb, #6366f1);
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 16px;
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
    }
    .pill {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 700; padding: 3px 10px;
      border-radius: 999px; background: rgba(59, 130, 246, 0.16);
      color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.35);
    }
    .role-tabs {
      display: flex; flex-wrap: wrap; gap: 6px;
      background: #0b0f1a; padding: 6px; border-radius: 12px;
      border: 1px solid var(--border);
    }
    .tab-btn {
      background: transparent; color: var(--muted); border: none;
      padding: 8px 13px; border-radius: 8px; font-size: 12px;
      font-weight: 600; cursor: pointer; transition: all 0.15s;
    }
    .tab-btn:hover { color: #fff; background: #1e293b; }
    .tab-btn.active { background: var(--blue); color: #fff; }
    .wallet-badge {
      background: rgba(245, 158, 11, 0.14);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fcd34d; padding: 7px 14px; border-radius: 10px;
      font-size: 12px; font-weight: 700;
    }
    main { padding: 28px 24px 60px; }
    .grid-3 { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; }
    @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr; } }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 22px;
    }
    .hero-card {
      background: radial-gradient(circle at top left, rgba(37,99,235,0.28), rgba(17,24,39,0.95) 65%);
      border: 1px solid rgba(59, 130, 246, 0.35);
    }
    h2 { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
    h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
    p.sub { font-size: 13px; color: var(--muted); }
    .btn-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
    .btn {
      border: none; border-radius: 12px; padding: 11px 18px;
      font-size: 13px; font-weight: 700; cursor: pointer;
      color: #fff; display: inline-flex; align-items: center; gap: 8px;
      transition: transform 0.1s, opacity 0.15s;
    }
    .btn:active { transform: scale(0.98); }
    .btn-blue { background: var(--blue); box-shadow: 0 6px 18px rgba(37,99,235,0.35); }
    .btn-purple { background: linear-gradient(135deg, #7c3aed, #db2777); box-shadow: 0 6px 18px rgba(124,58,237,0.35); }
    .btn-emerald { background: var(--emerald); }
    .btn-amber { background: var(--amber); color: #090d16; }
    .btn-dark { background: #1e293b; border: 1px solid #334155; color: #e2e8f0; }
    .btn-rose { background: var(--rose); }
    .section { margin-top: 28px; }
    .celeb-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
    .avatar {
      width: 56px; height: 56px; border-radius: 14px;
      background: linear-gradient(135deg, #3b82f6, #ec4899);
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 20px;
    }
    .media-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 14px 0; }
    .media-item {
      background: var(--panel-alt); border: 1px solid var(--border);
      border-radius: 12px; padding: 12px;
    }
    .badge-online {
      display: inline-block; font-size: 11px; font-weight: 700;
      padding: 2px 9px; border-radius: 99px;
      background: rgba(16, 185, 129, 0.18); color: #6ee7b7;
    }
    .input, select {
      width: 100%; padding: 10px 12px; border-radius: 10px;
      background: var(--panel-alt); border: 1px solid #334155;
      color: #fff; font-size: 13px; margin-top: 4px; margin-bottom: 12px;
    }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
    th, td { text-align: left; padding: 12px 10px; border-bottom: 1px solid var(--border); }
    th { color: var(--muted); font-weight: 600; }
    .toast {
      position: fixed; bottom: 24px; right: 24px; z-index: 100;
      background: #2563eb; color: #fff; padding: 12px 18px;
      border-radius: 12px; font-size: 13px; font-weight: 600;
      box-shadow: 0 12px 30px rgba(0,0,0,0.5); display: none;
    }
    dialog {
      margin: auto; width: 92%; max-width: 540px;
      background: var(--panel); color: var(--text);
      border: 1px solid #334155; border-radius: 24px; padding: 24px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.75);
    }
    dialog::backdrop { background: rgba(9, 13, 22, 0.82); backdrop-filter: blur(6px); }
    .video-stage {
      position: relative; height: 270px; background: #050811;
      border: 1px solid var(--border); border-radius: 16px;
      overflow: hidden; display: flex; flex-direction: column;
      align-items: center; justify-content: center; margin: 16px 0;
    }
    #localVideo {
      position: absolute; bottom: 12px; right: 12px;
      width: 130px; height: 92px; border-radius: 10px;
      background: #1e293b; border: 2px solid #3b82f6; object-fit: cover;
    }
    #remoteVideo {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
    }
    .login-screen {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: radial-gradient(circle at top, rgba(37, 99, 235, 0.25), #090d16 65%);
    }
    .login-card {
      width: 100%;
      max-width: 440px;
      background: var(--panel);
      border: 1px solid #334155;
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.65);
    }
    .hidden { display: none !important; }
  </style>
</head>
<body>

  <!-- ==================== STEP 1: MOBILE NUMBER + DUMMY OTP LOGIN SCREEN ==================== -->
  <div id="otpLoginScreen" class="login-screen">
    <div class="login-card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <div class="logo">FC</div>
        <div>
          <h2 style="margin:0;font-size:21px;">Friends Connect</h2>
          <p class="sub">Mobile Number + OTP Login</p>
        </div>
      </div>

      <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.35);padding:12px;border-radius:12px;margin-bottom:18px;font-size:12px;color:#6ee7b7;">
        <strong>Dummy OTP Ready:</strong> मोबाइल നമ്പറും ഡമ്മി OTP <code>123456</code> ഉം താഴെ ഓട്ടോമാറ്റിക്കായി പൂരിപ്പിച്ചിട്ടുണ്ട്. നേരിട്ട് <strong>"Verify OTP & Enter Website"</strong> ക്ലിക്ക് ചെയ്യുക!
      </div>

      <label style="font-size:12px;color:var(--muted);">Choose Account Role to Login</label>
      <select id="loginRoleSelect" class="input">
        <option value="NORMAL">1. Normal User (Arjun Nair)</option>
        <option value="CELEBRITY">2. Celebrity Account (Dulquer Sithara)</option>
        <option value="ORG">3. Organization (Kochi Live Arena Events)</option>
        <option value="SUPPORT">4. Customer Care Support (Rahul)</option>
        <option value="SUPER_ADMIN">5. Super Admin (Platform Control)</option>
      </select>

      <label style="font-size:12px;color:var(--muted);">Mobile Number</label>
      <input id="loginPhoneInput" class="input" type="tel" value="+91 98765 43210" />

      <label style="font-size:12px;color:var(--muted);">6-Digit Dummy OTP / Password</label>
      <input id="loginOtpInput" class="input" type="text" value="123456" style="letter-spacing:4px;font-weight:800;font-size:15px;color:#6ee7b7;" />

      <button class="btn btn-blue" style="width:100%;justify-content:center;padding:13px;font-size:14px;margin-top:6px;" onclick="completeOtpLogin()">
        🔓 Verify OTP (123456) & Enter Website
      </button>
    </div>
  </div>

  <!-- ==================== STEP 2: MAIN APPLICATION WORKSPACE ==================== -->
  <div id="mainAppContainer" class="hidden">
    <header>
      <div class="container header-row">
        <div class="brand">
          <div class="logo">FC</div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <strong style="font-size:17px;">Friends Connect</strong>
              <span class="pill">WebRTC Audio & Video</span>
            </div>
            <div style="font-size:12px;color:var(--muted);">
              Random Friend Calls • Celebrity Calls • Location Events • Support • Super Admin
            </div>
          </div>
        </div>

        <div class="role-tabs">
          <button class="tab-btn active" id="tab-NORMAL" onclick="switchRole('NORMAL', this)">1. Normal User</button>
          <button class="tab-btn" id="tab-CELEBRITY" onclick="switchRole('CELEBRITY', this)">2. Celebrity Account</button>
          <button class="tab-btn" id="tab-ORG" onclick="switchRole('ORG', this)">3. Organization (Events)</button>
          <button class="tab-btn" id="tab-SUPPORT" onclick="switchRole('SUPPORT', this)">4. Customer Care</button>
          <button class="tab-btn" id="tab-SUPER_ADMIN" onclick="switchRole('SUPER_ADMIN', this)">5. Super Admin</button>
        </div>

        <div style="display:flex;align-items:center;gap:10px;">
          <div class="wallet-badge">🪙 <span id="coinBalanceText">650</span> Coins</div>
          <button class="btn btn-dark" style="padding:7px 12px;font-size:12px;" onclick="logoutToOtpScreen()">
            📱 <span id="activePhoneLabel">+91 98765 43210</span> (Logout)
          </button>
        </div>
      </div>
    </header>

    <main class="container">
      <!-- ==================== 1. NORMAL USER VIEW ==================== -->
      <div id="role-NORMAL" class="role-view">
        <div class="grid-3">
          <div class="card hero-card">
            <span class="badge-online">● 1,420 Friends Online Now</span>
            <h2 style="margin-top:10px;">1-Tap Random Friend Matchmaking (Audio & Video Call)</h2>
            <p class="sub">
              Connect immediately with another online friend using real-time <strong>WebRTC Audio Call</strong> or <strong>WebRTC Video Call</strong>. Your phone number stays 100% private.
            </p>
            <div class="btn-row">
              <button class="btn btn-blue" onclick="startWebRtcCall('RANDOM_AUDIO', 'Meera Krishnan (Matched Friend)', 0)">
                🎙️ Start Random Audio Call
              </button>
              <button class="btn btn-purple" onclick="startWebRtcCall('RANDOM_VIDEO', 'Meera Krishnan (Matched Friend)', 0)">
                📹 Start Random Video Call
              </button>
              <button class="btn btn-dark" onclick="startWebRtcCall('SUPPORT_AUDIO', 'Rahul — Customer Care Support', 0)">
                🎧 Customer Care (Audio-Only)
              </button>
            </div>
          </div>

          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <h3>Premium & Wallet Coins</h3>
              <span class="pill">VIP ACTIVE</span>
            </div>
            <p class="sub">Recharge coins to call Verified Celebrities via Audio or Video Call.</p>
            <div style="background:var(--panel-alt);padding:12px;border-radius:12px;margin:14px 0;display:flex;justify-content:space-between;align-items:center;border:1px solid var(--border);">
              <span style="font-size:12px;color:var(--muted);">Available Balance</span>
              <strong style="color:#fcd34d;font-size:18px;">🪙 <span id="coinBalanceCard">650</span> Coins</strong>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <button class="btn btn-amber" onclick="rechargeCoins(300)">+300 Coins (₹149)</button>
              <button class="btn btn-dark" onclick="rechargeCoins(1000)">+1000 Coins (₹399)</button>
            </div>
          </div>
        </div>

        <!-- Celebrities Section -->
        <div class="section">
          <h2>Verified Celebrities — Photos, Videos & Direct WebRTC Calling</h2>
          <p class="sub" style="margin-bottom:14px;">Connect with your favorite stars via Per-Minute Audio Call or Video Call</p>
          <div class="grid-2">
            <div class="card">
              <div class="celeb-header">
                <div style="display:flex;align-items:center;gap:12px;">
                  <div class="avatar">DS</div>
                  <div>
                    <h3>Dulquer Sithara <span style="color:#60a5fa;">✔</span></h3>
                    <p class="sub">Cinema & Pan-Indian Actor • <span class="badge-online">ONLINE</span></p>
                  </div>
                </div>
                <div style="text-align:right;font-size:12px;color:#fcd34d;font-weight:700;">
                  🎙️ 60c/m<br/>📹 150c/m
                </div>
              </div>
              <p class="sub">Available for live fan interactions! Check out my latest photo & video updates below.</p>
              <div class="media-grid" id="celebMediaGrid">
                <div class="media-item">
                  <span class="pill">📷 PHOTO</span>
                  <p style="font-size:12px;margin-top:8px;">Evening shoot wrap at Fort Kochi waterfront!</p>
                  <small style="color:var(--muted);">❤️ 4,320 likes</small>
                </div>
                <div class="media-item">
                  <span class="pill">▶ VIDEO</span>
                  <p style="font-size:12px;margin-top:8px;">Exclusive teaser before tonight's fan Video Calls!</p>
                  <small style="color:var(--muted);">❤️ 8,910 likes</small>
                </div>
              </div>
              <div class="btn-row">
                <button class="btn btn-blue" style="flex:1;justify-content:center;" onclick="startWebRtcCall('CELEB_AUDIO', 'Dulquer Sithara ✔', 60)">
                  🎙️ Audio Call (60 Coins/m)
                </button>
                <button class="btn btn-purple" style="flex:1;justify-content:center;" onclick="startWebRtcCall('CELEB_VIDEO', 'Dulquer Sithara ✔', 150)">
                  📹 Video Call (150 Coins/m)
                </button>
              </div>
            </div>

            <div class="card">
              <div class="celeb-header">
                <div style="display:flex;align-items:center;gap:12px;">
                  <div class="avatar" style="background:linear-gradient(135deg,#ec4899,#f59e0b);">AM</div>
                  <div>
                    <h3>Ananya Menon <span style="color:#60a5fa;">✔</span></h3>
                    <p class="sub">Playback Singer & Indie Artist • <span class="badge-online">ONLINE</span></p>
                  </div>
                </div>
                <div style="text-align:right;font-size:12px;color:#fcd34d;font-weight:700;">
                  🎙️ 40c/m<br/>📹 100c/m
                </div>
              </div>
              <p class="sub">Live acoustic requests & fan chats! Connect with me via Audio or Video Call.</p>
              <div class="media-grid">
                <div class="media-item">
                  <span class="pill">📷 PHOTO</span>
                  <p style="font-size:12px;margin-top:8px;">Studio acoustic session in Trivandrum!</p>
                  <small style="color:var(--muted);">❤️ 2,150 likes</small>
                </div>
                <div class="media-item">
                  <span class="pill">▶ VIDEO</span>
                  <p style="font-size:12px;margin-top:8px;">Unplugged rehearsal clip for fans!</p>
                  <small style="color:var(--muted);">❤️ 5,410 likes</small>
                </div>
              </div>
              <div class="btn-row">
                <button class="btn btn-blue" style="flex:1;justify-content:center;" onclick="startWebRtcCall('CELEB_AUDIO', 'Ananya Menon ✔', 40)">
                  🎙️ Audio Call (40 Coins/m)
                </button>
                <button class="btn btn-purple" style="flex:1;justify-content:center;" onclick="startWebRtcCall('CELEB_VIDEO', 'Ananya Menon ✔', 100)">
                  📹 Video Call (100 Coins/m)
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Location-Based Events Section -->
        <div class="section">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;">
            <div>
              <h2>Location-Based Events Near You</h2>
              <p class="sub">Automatically filtered based on your GPS location & city radius</p>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-dark" onclick="filterEvents('ALL')">📍 All Nearby</button>
              <button class="btn btn-dark" onclick="filterEvents('Kochi')">📍 Kochi (4.2 km)</button>
              <button class="btn btn-dark" onclick="filterEvents('Kozhikode')">📍 Kozhikode (42 km)</button>
            </div>
          </div>

          <div class="grid-2" id="eventsListContainer">
            <div class="card event-card" data-city="Kochi">
              <div style="display:flex;justify-content:space-between;font-size:12px;color:#60a5fa;font-weight:700;margin-bottom:6px;">
                <span>🏢 Kochi Live Arena Events</span>
                <span>📍 4.2 km away • Kochi</span>
              </div>
              <h3>Kochi Sunset Music & Indie Fest 2026</h3>
              <p class="sub" style="margin:6px 0 12px;">Live open-air concert at Bolgatty Palace Grounds featuring top bands & fan meetups.</p>
              <div style="display:flex;justify-content:space-between;align-items:center;background:var(--panel-alt);padding:12px;border-radius:12px;border:1px solid var(--border);">
                <div>
                  <strong style="font-size:13px;">VIP Fan Pit & General Access</strong>
                  <div style="font-size:12px;color:var(--muted);">₹499 • 188 seats remaining</div>
                </div>
                <button class="btn btn-emerald" onclick="bookTicket('Kochi Sunset Music & Indie Fest 2026', 499)">
                  🎟️ Book Ticket (₹499)
                </button>
              </div>
            </div>

            <div class="card event-card" data-city="Kozhikode">
              <div style="display:flex;justify-content:space-between;font-size:12px;color:#60a5fa;font-weight:700;margin-bottom:6px;">
                <span>🏢 Malabar Creators Hub</span>
                <span>📍 42.8 km away • Kozhikode</span>
              </div>
              <h3>Malabar Creators & Tech Conclave</h3>
              <p class="sub" style="margin:6px 0 12px;">Meet digital creators, filmmakers, and music artists at Calicut Trade Centre.</p>
              <div style="display:flex;justify-content:space-between;align-items:center;background:var(--panel-alt);padding:12px;border-radius:12px;border:1px solid var(--border);">
                <div>
                  <strong style="font-size:13px;">Standard Entry Pass</strong>
                  <div style="font-size:12px;color:var(--muted);">₹299 • 160 seats remaining</div>
                </div>
                <button class="btn btn-emerald" onclick="bookTicket('Malabar Creators & Tech Conclave', 299)">
                  🎟️ Book Ticket (₹299)
                </button>
              </div>
            </div>
          </div>

          <div class="card" style="margin-top:16px;">
            <h3>🎟️ My Booked Event QR Passes</h3>
            <div id="bookedTicketsList" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;">
              <div style="background:var(--panel-alt);border:1px solid rgba(16,185,129,0.4);padding:10px 14px;border-radius:12px;font-size:12px;">
                <strong>Kochi Sunset Music & Indie Fest 2026</strong> • Paid ₹499 • <code style="color:#6ee7b7;">QR: FC-QR-98A7F2C1</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== 2. CELEBRITY ACCOUNT VIEW ==================== -->
      <div id="role-CELEBRITY" class="role-view hidden">
        <div class="grid-3">
          <div class="card">
            <h3>Celebrity Studio — Dulquer Sithara ✔</h3>
            <p class="sub">Manage your Audio & Video Call per-minute coin rates and availability.</p>
            <div style="background:var(--panel-alt);padding:14px;border-radius:12px;margin:14px 0;border:1px solid var(--border);">
              <div style="font-size:12px;color:var(--muted);">Total Celebrity Call Earnings</div>
              <div style="font-size:22px;font-weight:800;color:#6ee7b7;">🪙 14,500 Earned Coins</div>
            </div>
            <label style="font-size:12px;color:var(--muted);">🎙️ Audio Call Rate (Coins / min)</label>
            <input class="input" type="number" value="60" />
            <label style="font-size:12px;color:var(--muted);">📹 Video Call Rate (Coins / min)</label>
            <input class="input" type="number" value="150" />
            <button class="btn btn-dark" style="width:100%;justify-content:center;" onclick="startWebRtcCall('SUPPORT_AUDIO', 'VIP Customer Care Support Desk', 0)">
              🎧 Call VIP Customer Care (Audio-Only)
            </button>
          </div>

          <div class="card">
            <h3>Upload Exclusive Photos & Videos to Fan Feed</h3>
            <p class="sub" style="margin-bottom:12px;">Posts appear immediately on Normal Users' Celebrity Feeds.</p>
            <label style="font-size:12px;color:var(--muted);">Media Type</label>
            <select id="celebMediaType">
              <option value="PHOTO">📷 Photo Post</option>
              <option value="VIDEO">▶ Short Video</option>
            </select>
            <label style="font-size:12px;color:var(--muted);">Caption</label>
            <input id="celebMediaCaption" class="input" placeholder="Share an update with your fans..." />
            <button class="btn btn-blue" onclick="publishCelebMedia()">Publish to Fan Feed</button>
          </div>
        </div>
      </div>

      <!-- ==================== 3. ORGANIZATION VIEW ==================== -->
      <div id="role-ORG" class="role-view hidden">
        <div class="grid-2">
          <div class="card">
            <h2>Organization — Publish Location-Based Event</h2>
            <p class="sub" style="margin-bottom:14px;">List events with city & GPS coordinates so nearby users can book tickets.</p>
            <label style="font-size:12px;color:var(--muted);">Event Title</label>
            <input id="orgEventTitle" class="input" placeholder="e.g., Trivandrum New Year Gala 2026" />
            <label style="font-size:12px;color:var(--muted);">City</label>
            <select id="orgEventCity">
              <option value="Kochi">Kochi</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Trivandrum">Trivandrum</option>
            </select>
            <label style="font-size:12px;color:var(--muted);">Ticket Price (₹)</label>
            <input id="orgEventPrice" class="input" type="number" value="499" />
            <button class="btn btn-blue" onclick="publishOrgEvent()">Publish Event & Open Ticket Booking</button>
          </div>

          <div class="card">
            <h2>Live Ticket Sales & QR Verification</h2>
            <p class="sub">Kochi Sunset Music & Indie Fest: <strong>386 / 600 tickets sold</strong></p>
            <p class="sub" style="margin-top:8px;">Malabar Creators & Tech Conclave: <strong>169 / 350 tickets sold</strong></p>
          </div>
        </div>
      </div>

      <!-- ==================== 4. CUSTOMER CARE SUPPORT VIEW ==================== -->
      <div id="role-SUPPORT" class="role-view hidden">
        <div class="grid-3">
          <div class="card">
            <span class="pill">Strict Audio-Only + Live Chat Policy</span>
            <h2 style="margin-top:10px;">Customer Care Support Queue</h2>
            <p class="sub" style="margin-bottom:14px;">
              Assist Normal Users and Celebrities via Live Chat or Audio-Only WebRTC Calls. Video is strictly disabled on support channels.
            </p>
            <div style="background:var(--panel-alt);padding:14px;border-radius:12px;border:1px solid rgba(245,158,11,0.4);margin-bottom:10px;">
              <strong style="color:#fcd34d;font-size:12px;">★ VIP CELEBRITY — Dulquer Sithara</strong>
              <p class="sub" style="margin:6px 0;"> October earnings payout verification</p>
              <button class="btn btn-blue" style="width:100%;justify-content:center;" onclick="startWebRtcCall('SUPPORT_AUDIO', 'Dulquer Sithara (Celebrity Support)', 0)">
                🎙️ Start Audio-Only Support Call
              </button>
            </div>
            <div style="background:var(--panel-alt);padding:14px;border-radius:12px;border:1px solid var(--border);">
              <strong style="font-size:12px;">NORMAL USER — Arjun Nair</strong>
              <p class="sub" style="margin:6px 0;">Event QR pass query</p>
              <button class="btn btn-dark" style="width:100%;justify-content:center;" onclick="startWebRtcCall('SUPPORT_AUDIO', 'Arjun Nair (User Support)', 0)">
                🎙️ Start Audio-Only Support Call
              </button>
            </div>
          </div>

          <div class="card">
            <h3>Omnichannel Customer Care Live Chat</h3>
            <div id="supportChatBox" style="background:var(--panel-alt);height:220px;overflow-y:auto;padding:12px;border-radius:12px;margin:12px 0;border:1px solid var(--border);font-size:13px;">
              <div style="margin-bottom:10px;"><strong style="color:#60a5fa;">Dulquer Sithara (Celebrity):</strong> Hi Support, can we verify my October coin withdrawal?</div>
              <div style="margin-bottom:10px;"><strong style="color:#6ee7b7;">Rahul (Support Desk):</strong> Sure! Your payout is approved. We can also hop on an Audio Support Call anytime.</div>
            </div>
            <div style="display:flex;gap:8px;">
              <input id="supportChatInput" class="input" style="margin:0;" placeholder="Reply to User or Celebrity..." />
              <button class="btn btn-blue" onclick="sendSupportChat()">Send</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== 5. SUPER ADMIN VIEW ==================== -->
      <div id="role-SUPER_ADMIN" class="role-view hidden">
        <div class="card">
          <h2>Super Admin — Platform Control, Blocks & Granular Call Restrictions</h2>
          <p class="sub">
            Block accounts or selectively toggle Random Audio, Random Video, or Celebrity Call permissions in real time. Try unchecking a permission below and testing it in the Normal User tab!
          </p>
          <table>
            <thead>
              <tr>
                <th>User / Mobile</th>
                <th>Role</th>
                <th>Status</th>
                <th>Random Audio</th>
                <th>Random Video</th>
                <th>Celebrity Calls</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Arjun Nair</strong><br/><small style="color:var(--muted);">+91 98765 43210</small></td>
                <td>NORMAL</td>
                <td><span id="userStatusBadge" class="badge-online">ACTIVE</span></td>
                <td><input type="checkbox" id="permRandomAudio" checked onchange="showToast('Updated Random Audio permission')" /></td>
                <td><input type="checkbox" id="permRandomVideo" checked onchange="showToast('Updated Random Video permission')" /></td>
                <td><input type="checkbox" id="permCelebCall" checked onchange="showToast('Updated Celebrity Call permission')" /></td>
                <td><button class="btn btn-rose" style="padding:6px 12px;font-size:12px;" onclick="toggleBlockUser()">Block / Unblock</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>

  <!-- ==================== LIVE WEBRTC CALL DIALOG ==================== -->
  <dialog id="webrtcCallDialog">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span class="badge-online" id="callDialogBadge">● LIVE WEBRTC CALL</span>
      <span id="callTimerText" style="font-family:monospace;font-weight:700;">00:00</span>
    </div>

    <div class="video-stage">
      <video id="remoteVideo" autoplay playsinline class="hidden"></video>
      <div id="audioAvatarStage" style="text-align:center;z-index:2;">
        <div style="font-size:42px;margin-bottom:8px;">🎙️</div>
        <h3 id="callPeerTitle">Peer Name</h3>
        <p class="sub" id="callSubText">WebRTC Opus Audio Stream Active</p>
      </div>
      <video id="localVideo" autoplay muted playsinline class="hidden"></video>
    </div>

    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;">
      <button class="btn btn-dark" id="muteBtn" onclick="toggleWebRtcMute()">🎙️ Mute Mic</button>
      <button class="btn btn-dark" id="camBtn" onclick="toggleWebRtcCamera()">📷 Toggle Camera</button>
      <button class="btn btn-rose" onclick="endWebRtcCall()">End Call</button>
    </div>
  </dialog>

  <div id="toast" class="toast"></div>

  <script>
    let coins = 650;
    let userBlocked = false;
    let localStream = null;
    let peerConnection = null;
    let callTimer = null;
    let elapsed = 0;
    let audioMuted = false;
    let videoEnabled = false;
    let videoPermitted = false;

    function completeOtpLogin() {
      const phone = document.getElementById('loginPhoneInput').value || '+91 98765 43210';
      const otp = document.getElementById('loginOtpInput').value;
      const role = document.getElementById('loginRoleSelect').value;

      if (!otp) {
        return showToast('Please enter Dummy OTP 123456');
      }

      document.getElementById('activePhoneLabel').textContent = phone;
      document.getElementById('otpLoginScreen').classList.add('hidden');
      document.getElementById('mainAppContainer').classList.remove('hidden');

      const tabBtn = document.getElementById('tab-' + role);
      if (tabBtn) {
        switchRole(role, tabBtn);
      }
      showToast('Logged in via Mobile OTP (' + phone + ')!');
    }

    function logoutToOtpScreen() {
      document.getElementById('mainAppContainer').classList.add('hidden');
      document.getElementById('otpLoginScreen').classList.remove('hidden');
    }

    function showToast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => { el.style.display = 'none'; }, 3500);
    }

    function switchRole(role, btn) {
      document.querySelectorAll('.role-view').forEach(v => v.classList.add('hidden'));
      document.getElementById('role-' + role).classList.remove('hidden');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    function rechargeCoins(amount) {
      coins += amount;
      document.getElementById('coinBalanceText').textContent = coins;
      document.getElementById('coinBalanceCard').textContent = coins;
      showToast('Recharged +' + amount + ' Wallet Coins!');
    }

    function toggleBlockUser() {
      userBlocked = !userBlocked;
      const badge = document.getElementById('userStatusBadge');
      badge.textContent = userBlocked ? 'BLOCKED' : 'ACTIVE';
      badge.style.background = userBlocked ? 'rgba(225,29,72,0.2)' : 'rgba(16,185,129,0.18)';
      badge.style.color = userBlocked ? '#fda4af' : '#6ee7b7';
      showToast('User account is now ' + (userBlocked ? 'BLOCKED' : 'ACTIVE'));
    }

    async function startWebRtcCall(callType, peerName, ratePerMin) {
      if (userBlocked) {
        return showToast('Your account is BLOCKED by Super Admin. Contact Customer Care.');
      }
      if (callType === 'RANDOM_AUDIO' && !document.getElementById('permRandomAudio').checked) {
        return showToast('Random Audio Calls are restricted by Super Admin.');
      }
      if (callType === 'RANDOM_VIDEO' && !document.getElementById('permRandomVideo').checked) {
        return showToast('Random Video Calls are restricted by Super Admin.');
      }
      if ((callType === 'CELEB_AUDIO' || callType === 'CELEB_VIDEO') && !document.getElementById('permCelebCall').checked) {
        return showToast('Celebrity Calling is restricted by Super Admin.');
      }
      if (ratePerMin > 0) {
        if (coins < ratePerMin) {
          return showToast('Insufficient Wallet Coins! Please recharge first.');
        }
        coins -= ratePerMin;
        document.getElementById('coinBalanceText').textContent = coins;
        document.getElementById('coinBalanceCard').textContent = coins;
      }

      // Strict Policy: Video is NEVER allowed on SUPPORT_AUDIO (Customer Care)
      videoPermitted = (callType === 'RANDOM_VIDEO' || callType === 'CELEB_VIDEO') && callType !== 'SUPPORT_AUDIO';
      videoEnabled = videoPermitted;
      audioMuted = false;

      document.getElementById('callDialogBadge').textContent = '● LIVE ' + callType.replace('_', ' ');
      document.getElementById('callPeerTitle').textContent = peerName;
      document.getElementById('callSubText').textContent =
        callType === 'SUPPORT_AUDIO'
          ? 'Strict Audio-Only Support Call (Video Disabled by Policy)'
          : (ratePerMin > 0 ? 'Metered Celebrity Call (' + ratePerMin + ' Coins/min)' : 'Encrypted P2P WebRTC Session');

      const camBtn = document.getElementById('camBtn');
      camBtn.style.display = videoPermitted ? 'inline-flex' : 'none';

      const dialog = document.getElementById('webrtcCallDialog');
      dialog.showModal();

      // Start Real Browser WebRTC (RTCPeerConnection + getUserMedia)
      try {
        peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          localStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: videoPermitted
          });
          localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

          const localVid = document.getElementById('localVideo');
          if (videoPermitted) {
            localVid.srcObject = localStream;
            localVid.classList.remove('hidden');
          } else {
            localVid.classList.add('hidden');
          }
        }
      } catch (err) {
        showToast('WebRTC active (Camera/Mic permission prompt: ' + (err.message || 'Simulator mode') + ')');
      }

      elapsed = 0;
      clearInterval(callTimer);
      callTimer = setInterval(() => {
        elapsed++;
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        document.getElementById('callTimerText').textContent = m + ':' + s;
      }, 1000);
    }

    function toggleWebRtcMute() {
      audioMuted = !audioMuted;
      if (localStream) {
        localStream.getAudioTracks().forEach(t => t.enabled = !audioMuted);
      }
      document.getElementById('muteBtn').textContent = audioMuted ? '🔇 Unmute Mic' : '🎙️ Mute Mic';
    }

    function toggleWebRtcCamera() {
      if (!videoPermitted) return;
      videoEnabled = !videoEnabled;
      if (localStream) {
        localStream.getVideoTracks().forEach(t => t.enabled = videoEnabled);
      }
      document.getElementById('localVideo').classList.toggle('hidden', !videoEnabled);
    }

    function endWebRtcCall() {
      clearInterval(callTimer);
      if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
        localStream = null;
      }
      if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
      }
      document.getElementById('localVideo').classList.add('hidden');
      document.getElementById('webrtcCallDialog').close();
      showToast('WebRTC Call Ended');
    }

    function filterEvents(city) {
      document.querySelectorAll('.event-card').forEach(card => {
        const match = city === 'ALL' || card.getAttribute('data-city') === city;
        card.style.display = match ? 'block' : 'none';
      });
      showToast('Filtered events for: ' + city);
    }

    function bookTicket(title, price) {
      const qr = 'FC-QR-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      const div = document.createElement('div');
      div.style = 'background:var(--panel-alt);border:1px solid rgba(16,185,129,0.4);padding:10px 14px;border-radius:12px;font-size:12px;';
      div.innerHTML = '<strong>' + title + '</strong> • Paid ₹' + price + ' • <code style="color:#6ee7b7;">QR: ' + qr + '</code>';
      document.getElementById('bookedTicketsList').prepend(div);
      showToast('Booked ticket for ' + title + '! QR Pass generated.');
    }

    function publishCelebMedia() {
      const type = document.getElementById('celebMediaType').value;
      const caption = document.getElementById('celebMediaCaption').value;
      if (!caption) return showToast('Please enter a caption');
      const div = document.createElement('div');
      div.className = 'media-item';
      div.innerHTML = '<span class="pill">' + (type === 'VIDEO' ? '▶ VIDEO' : '📷 PHOTO') + '</span><p style="font-size:12px;margin-top:8px;">' + caption + '</p><small style="color:var(--muted);">❤️ Just now</small>';
      document.getElementById('celebMediaGrid').prepend(div);
      document.getElementById('celebMediaCaption').value = '';
      showToast('Published to Celebrity Fan Feed!');
    }

    function publishOrgEvent() {
      const title = document.getElementById('orgEventTitle').value;
      const city = document.getElementById('orgEventCity').value;
      const price = document.getElementById('orgEventPrice').value;
      if (!title) return showToast('Please enter an Event Title');
      const div = document.createElement('div');
      div.className = 'card event-card';
      div.setAttribute('data-city', city);
      div.innerHTML = '<div style="display:flex;justify-content:space-between;font-size:12px;color:#60a5fa;font-weight:700;margin-bottom:6px;"><span>🏢 Verified Org</span><span>📍 ' + city + '</span></div><h3>' + title + '</h3><p class="sub" style="margin:6px 0 12px;">Newly published organization event.</p><div style="display:flex;justify-content:space-between;align-items:center;background:var(--panel-alt);padding:12px;border-radius:12px;border:1px solid var(--border);"><div><strong style="font-size:13px;">Standard Entry Pass</strong><div style="font-size:12px;color:var(--muted);">₹' + price + ' • 250 seats left</div></div><button class="btn btn-emerald" onclick="bookTicket(\\'' + title.replace(/'/g, "") + '\\', ' + price + ')">🎟️ Book Ticket (₹' + price + ')</button></div>';
      document.getElementById('eventsListContainer').prepend(div);
      document.getElementById('orgEventTitle').value = '';
      showToast('Published Event: ' + title);
    }

    function sendSupportChat() {
      const input = document.getElementById('supportChatInput');
      if (!input.value.trim()) return;
      const box = document.getElementById('supportChatBox');
      const msg = document.createElement('div');
      msg.style.marginBottom = '10px';
      msg.innerHTML = '<strong style="color:#6ee7b7;">Customer Care Desk:</strong> ' + input.value;
      box.appendChild(msg);
      box.scrollTop = box.scrollHeight;
      input.value = '';
    }
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(HTML_PAGE);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Friends Connect Web App running at http://localhost:' + PORT);
});
