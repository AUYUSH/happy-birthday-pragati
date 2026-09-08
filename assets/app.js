(function () {
  "use strict";

  var PASSCODE = "0911";
  var LOADING_MS = 1200;

  var FLOWER_CYCLE = [
    "assets/flowers/flower-1.png",
    "assets/flowers/flower-2.png",
    "assets/flowers/flower-3.png",
    "assets/flowers/flower-1.png",
    "assets/flowers/flower-2.png",
    "assets/flowers/flower-3.png",
    "assets/flowers/flower-3.png",
    "assets/flowers/flower-1.png",
    "assets/flowers/flower-1.png",
    "assets/flowers/flower-2.png",
  ];

  // 10 UNIQUE PHOTOS
  var PHOTOS = [
    "assets/photos/user1.jpg",
    "assets/photos/user2.jpg",
    "assets/photos/user3.jpg",
    "assets/photos/user4.jpg",
    "assets/photos/user5.jpg",
    "assets/photos/user6.jpg",
    "assets/photos/user7.jpg",
    "assets/photos/user8.jpg",
    "assets/photos/user9.jpg",
    "assets/photos/user10.jpg",
  ];

  var LETTER_TEXT = `Happy 20th Birthday, my love. ❤️

I don't know why, Prayu, but this birthday feels a little different. Maybe because I wish more than anything that I could be there with you today. Not on a video call, not through a screen, not by sending you a message… but actually there. Sitting beside you, irritating you, making you laugh, stealing your food, and probably arguing with you over something completely stupid. 🥹

It's been almost three years of this long distance, and honestly, there are days when I hate how far away you are.

I miss you, Pragati.

I miss you in all the simplest ways.

I miss the way we spend time together when we're actually in the same place. The random conversations that don't even have a point. The stupid jokes. The laughing until we can't breathe. The little fights. The way we go out without even having a proper plan and somehow end up making the most random day into a memory.

I miss travelling with you, Prayu. I miss discovering new places with you, getting tired together, deciding where to go next, taking stupid pictures, getting lost sometimes, and then laughing about it later.

And I especially miss our little kitchen moments. 😂❤️

Hum dono ka saath mein khana banana, aadhe time khana banane se zyada ek dusre ko pareshaan karna, kuch theek ban jaaye toh aise behave karna jaise MasterChef jeet liya ho, aur kuch kharab ho jaaye toh ek dusre ko blame karna. 😂

I miss just being around you, Pragati.

I miss those days when we don't have to think about when we'll meet next. When I can just look at you whenever I want. When spending time together doesn't have to come with a countdown.

Because that's the hardest part about loving someone from so far away.

Every time we meet, it feels like the world becomes normal again.

And then, before I know it, it's time to say goodbye.

I hate that part.

But at the same time, I wouldn't trade any of these three years for anything. Because look at everything we've already done.

We've travelled together.
We've laughed together.
We've cooked together.
We've explored places together.
We've made stupid memories.
We've grown together.
We've seen different versions of each other.

And somehow, after all this time and all this distance, I'm still here thinking about you every single day.

And you know what makes me feel better, Prayu?

This isn't forever.

A few more years.

Bas kuch hi saal aur.

Then there won't be airports and countdowns and "I miss you" messages between us.

There'll just be you.

You'll be there when I wake up.
You'll be there when I want to go somewhere.
We'll cook together.
We'll travel whenever we feel like it.
We'll randomly go out.
We'll spend entire days doing absolutely nothing.
We'll make fun of each other.
We'll fight over stupid things.
We'll make up.
We'll create hundreds and thousands of new memories.

And honestly, Pragati, I can't wait for that life with you.

We've already travelled so much together, but I feel like we've barely started.

There are so many places I still want to see with you.
So many cities.
So many roads.
So many sunsets.
So many stupid pictures.
So many meals we'll cook.
So many birthdays we'll celebrate together.

And one day, your birthday won't be something I celebrate by writing a message on a screen.

I'll be there.

I'll probably still annoy you.
I'll probably still steal your food.
I'll probably still make you laugh at the worst possible time.

But I'll be there. ❤️

Until then, just know that I miss you more than I can properly put into words.

I miss your presence.
I miss your laugh.
I miss our chaos.
I miss our little world.
I miss simply having you next to me.

And today, on your 20th birthday, more than anything, I wish I could just hug you and tell you all of this while looking at you.

Happy 20th birthday, meri Prayu. ❤️

I hope this year brings you everything you've ever wished for.

And I hope that somewhere in all those wishes, there's a little place for me too.

Because I'm not going anywhere.

We're going to have so many more birthdays.
So many more trips.
So many more late-night conversations.
So many more meals we probably shouldn't be cooking.
So many more fights about absolutely nothing.
So many more laughs.

And most importantly…

So much more **us**.

I love you, Pragati.

And I miss you.

More than yesterday.
Less than tomorrow. ❤️

Happy Birthday, my favourite person. 🎂❤️

Now come back soon, Prayu.

I have a lot of travelling, cooking, irritating, laughing, and loving you left to do. 🥹❤️`;

  var giftLanding = document.getElementById("gift-landing");
  var giftBoxBtn = document.getElementById("gift-box-btn");
  var bloomField = document.getElementById("bloom-field");
  var page2 = document.getElementById("page2");
  var page3 = document.getElementById("page3");
  var page3Back = document.getElementById("page3-back");

  var lockBtn = document.getElementById("lock-btn");
  var lockHint = document.getElementById("lock-hint");
  var lockUnlockedMsg = document.getElementById("lock-unlocked-msg");

  var pkOverlay = document.getElementById("passkey-overlay");
  var pkClose = document.getElementById("pk-close");
  var pkDotsWrap = document.getElementById("pk-dots");
  var pkErrorMsg = document.getElementById("pk-error-msg");
  var pkTitle = document.getElementById("pk-title");
  var pkKeypad = document.getElementById("pk-keypad");
  var pkParticles = document.getElementById("pk-particles");

  var loadingOverlay = document.getElementById("loading-overlay");

  var savedScrollY = 0;

  // HAPPY BIRTHDAY MUSIC PLAYER & SYNTHESIZER
  var isPlayingHbSong = false;
  var audioCtx = null;

  function startHappyBirthdaySong() {
    var music = document.getElementById("bg-music");
    if (music) {
      music.play().catch(function (err) {
        console.log("Audio autoplay note:", err);
      });
    }

    if (isPlayingHbSong) return;
    isPlayingHbSong = true;
    try {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtx = new AudioContext();

      var notes = [
        { note: 261.63, dur: 0.35 },
        { note: 261.63, dur: 0.25 },
        { note: 293.66, dur: 0.60 },
        { note: 261.63, dur: 0.60 },
        { note: 349.23, dur: 0.60 },
        { note: 329.63, dur: 1.00 },

        { note: 261.63, dur: 0.35 },
        { note: 261.63, dur: 0.25 },
        { note: 293.66, dur: 0.60 },
        { note: 261.63, dur: 0.60 },
        { note: 392.00, dur: 0.60 },
        { note: 349.23, dur: 1.00 },

        { note: 261.63, dur: 0.35 },
        { note: 261.63, dur: 0.25 },
        { note: 523.25, dur: 0.60 },
        { note: 440.00, dur: 0.60 },
        { note: 349.23, dur: 0.60 },
        { note: 329.63, dur: 0.60 },
        { note: 293.66, dur: 0.80 },

        { note: 466.16, dur: 0.35 },
        { note: 466.16, dur: 0.25 },
        { note: 440.00, dur: 0.60 },
        { note: 349.23, dur: 0.60 },
        { note: 392.00, dur: 0.60 },
        { note: 349.23, dur: 1.20 }
      ];

      var step = 0;
      function playNextNote() {
        if (!audioCtx) return;
        var current = notes[step % notes.length];
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(current.note, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + current.dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + current.dur);

        step++;
        setTimeout(playNextNote, current.dur * 1000 + 80);
      }

      playNextNote();
    } catch (e) {
      console.log(e);
    }
  }

  document.addEventListener("click", function startAudioOnce() {
    startHappyBirthdaySong();
    document.removeEventListener("click", startAudioOnce);
  });

  var flowerIdCounter = 0;

  function spawnFlower(opts) {
    var img = document.createElement("img");
    img.src = FLOWER_CYCLE[flowerIdCounter % FLOWER_CYCLE.length];
    img.alt = "";
    img.className = "bloom-flower in";
    img.loading = "eager";
    img.decoding = "async";
    img.draggable = false;
    img.style.width = opts.size + "px";
    img.style.height = opts.size + "px";
    img.style.setProperty("--fx", opts.x - opts.size / 2 + "px");
    img.style.setProperty("--fy", opts.y - opts.size / 2 + "px");
    img.style.setProperty("--fall", opts.fallDist.toFixed(0) + "px");
    img.style.setProperty("--sway1", opts.sway1.toFixed(1) + "px");
    img.style.setProperty("--sway2", opts.sway2.toFixed(1) + "px");
    img.style.setProperty("--rot-start", opts.startRot.toFixed(1) + "deg");
    img.style.setProperty("--rot-end", opts.restRot.toFixed(1) + "deg");
    img.style.setProperty("--ldelay", opts.launchDelay.toFixed(2) + "s");
    img.style.setProperty("--rdur", opts.rdur.toFixed(2) + "s");
    img.style.setProperty("--dur", opts.floatDur.toFixed(2) + "s");
    img.style.setProperty("--fdelay", opts.floatDelay.toFixed(2) + "s");
    img.dataset.id = flowerIdCounter;
    img.dataset.x = opts.x;
    img.dataset.y = opts.y;
    img.dataset.size = opts.size;
    bloomField.appendChild(img);
    flowerIdCounter++;
    return img;
  }

  function startGiftOpen() {
    startHappyBirthdaySong();
    if (giftLanding.classList.contains("state-bloom")) return;
    giftLanding.classList.add("state-bloom");

    var w = window.innerWidth,
      h = window.innerHeight;
    var isMobile = Math.min(w, h) < 640;
    var desiredCount = isMobile ? 120 : 220;
    var hardCap = isMobile ? 160 : 300;
    var rainWindow = isMobile ? 1200 : 1600;
    var speedMin = isMobile ? 280 : 320;
    var speedRange = isMobile ? 100 : 140;

    var spacing = Math.sqrt((w * h) / desiredCount);
    spacing = Math.max(22, Math.min(80, spacing));

    var baseSize = isMobile ? 88 : 128;
    var sizeVar = isMobile ? 46 : 68;

    var cells = [];
    for (var gy = -spacing; gy < h + spacing; gy += spacing) {
      for (var gx = -spacing; gx < w + spacing; gx += spacing) {
        cells.push({
          x: gx + (Math.random() - 0.5) * spacing * 0.85,
          y: gy + (Math.random() - 0.5) * spacing * 0.85,
        });
      }
    }

    if (cells.length > hardCap) {
      var stride = Math.ceil(cells.length / hardCap);
      cells = cells.filter(function (_, i) {
        return i % stride === 0;
      });
    }

    var maxFinish = 0;

    cells.forEach(function (c) {
      var size = baseSize + Math.random() * sizeVar;
      var restRot = Math.random() * 32 - 16;
      var startRot = (Math.random() < 0.5 ? -1 : 1) * (28 + Math.random() * 35);

      var fallDist = c.y + size + 90 + Math.random() * 260;
      var speed = speedMin + Math.random() * speedRange;
      var rdur = fallDist / speed;
      var launchDelay = Math.random() * (rainWindow / 1000);
      var finish = launchDelay + rdur;
      if (finish > maxFinish) maxFinish = finish;

      var sway1 = (Math.random() < 0.5 ? -1 : 1) * (18 + Math.random() * 32);
      var sway2 = -sway1 * (0.5 + Math.random() * 0.35);

      var floatDur = 3 + Math.random() * 4;
      var floatDelay = finish + Math.random() * 1.5;

      spawnFlower({
        x: c.x,
        y: c.y,
        size: size,
        fallDist: fallDist,
        rdur: rdur,
        launchDelay: launchDelay,
        sway1: sway1,
        sway2: sway2,
        restRot: restRot,
        startRot: startRot,
        floatDur: floatDur,
        floatDelay: floatDelay,
      });
    });

    setTimeout(startCurtainOpen, maxFinish * 1000 + 200);
  }

  function startCurtainOpen() {
    giftLanding.classList.remove("state-bloom");
    giftLanding.classList.add("state-curtain");

    var w = window.innerWidth;
    var cx = w / 2;
    var shiftX = w / 2 + 260;
    var maxDx = Math.max(cx, w - cx) + 200;

    var flowers = bloomField.querySelectorAll(".bloom-flower");

    flowers.forEach(function (el) {
      var x = parseFloat(el.dataset.x);
      var dir = x < cx ? -1 : 1;
      var dx = Math.abs(x - cx);
      var edgeFactor = Math.min(1, dx / maxDx);
      var cdelay = (1 - edgeFactor) * 0.16;

      el.style.setProperty("--cx", dir * shiftX + "px");
      el.style.setProperty("--cy", (Math.random() * 50 - 25) + "px");
      el.style.setProperty("--cdelay", cdelay.toFixed(2) + "s");
      el.classList.remove("in");
    });

    void bloomField.offsetWidth;

    flowers.forEach(function (el) {
      el.classList.add("curtain-open");
    });

    setTimeout(goToPage2, 1100);
  }

  function goToPage2() {
    giftLanding.classList.add("hidden");
    page2.classList.add("shown");
    initPage2();
  }

  giftBoxBtn.addEventListener("click", startGiftOpen);

  var page2Initialised = false;

  function initPage2() {
    if (page2Initialised) return;
    page2Initialised = true;

    var rose = document.getElementById("rose-deco");
    setTimeout(function () {
      rose.classList.add("spring");
    }, 200);

    observeOnce(document.getElementById("smile-card"), 0.2, function (el) {
      el.classList.add("in");
    });
  }

  function observeOnce(el, threshold, cb) {
    if (!el) return;
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            obs.disconnect();
            cb(el);
          }
        });
      },
      { threshold: threshold }
    );
    obs.observe(el);
  }

  var isUnlocked = false;

  lockBtn.addEventListener("click", function () {
    openPasskey();
  });

  var pkEntered = "";
  var pkBusy = false;

  function buildParticles() {
    pkParticles.innerHTML = "";
    for (var i = 0; i < 24; i++) {
      var p = document.createElement("div");
      p.className = "pk-particle";
      var size = 1.5 + Math.random() * 3;
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.opacity = 0.12 + Math.random() * 0.3;
      p.style.animationDuration = 5 + Math.random() * 7 + "s";
      p.style.animationDelay = Math.random() * -10 + "s";
      pkParticles.appendChild(p);
    }
  }

  function renderPkDots() {
    var dots = pkDotsWrap.querySelectorAll(".pk-dot");
    var lines = pkDotsWrap.querySelectorAll(".pk-line");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("filled", i < pkEntered.length);
    });
    lines.forEach(function (line, i) {
      line.classList.toggle("on", i + 1 <= pkEntered.length);
    });
  }

  function openPasskey() {
    pkEntered = "";
    pkBusy = false;
    pkOverlay.classList.remove("error", "success");
    pkTitle.textContent = "Enter Passkey";
    pkErrorMsg.classList.remove("show");
    buildParticles();
    renderPkDots();
    pkOverlay.classList.add("shown");
  }

  function closePasskey() {
    pkOverlay.classList.remove("shown", "error", "success");
  }

  pkClose.addEventListener("click", closePasskey);

  function pkPress(key) {
    if (pkBusy) return;
    if (key === "del") {
      pkEntered = pkEntered.slice(0, -1);
      renderPkDots();
      return;
    }
    if (pkEntered.length >= 4) return;
    pkEntered += key;
    renderPkDots();
    if (pkEntered.length === 4) {
      pkBusy = true;
      if (pkEntered === PASSCODE) {
        pkOverlay.classList.add("success");
        pkTitle.textContent = "Unlocked";
        setTimeout(function () {
          closePasskey();
          startLoading();
        }, 400);
      } else {
        pkOverlay.classList.add("error");
        pkDotsWrap.classList.add("shake", "error");
        pkErrorMsg.classList.add("show");
        setTimeout(function () {
          pkDotsWrap.classList.remove("shake", "error");
          pkOverlay.classList.remove("error");
          pkErrorMsg.classList.remove("show");
          pkEntered = "";
          renderPkDots();
          pkBusy = false;
        }, 500);
      }
    }
  }

  pkKeypad.querySelectorAll(".pk-key[data-key]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      pkPress(btn.getAttribute("data-key"));
    });
  });

  document.addEventListener("keydown", function (e) {
    if (!pkOverlay.classList.contains("shown")) return;
    if (e.key >= "0" && e.key <= "9") pkPress(e.key);
    if (e.key === "Backspace") pkPress("del");
    if (e.key === "Escape") closePasskey();
  });

  function startLoading() {
    loadingOverlay.classList.remove("fade-out");
    loadingOverlay.classList.add("shown");
    setTimeout(function () {
      loadingOverlay.classList.add("fade-out");
      setTimeout(finishUnlock, 350);
    }, LOADING_MS - 350);
  }

  function finishUnlock() {
    loadingOverlay.classList.remove("shown", "fade-out");
    isUnlocked = true;

    lockBtn.style.display = "none";
    lockHint.style.display = "none";
    lockUnlockedMsg.style.display = "block";

    setTimeout(function () {
      savedScrollY = window.scrollY;
      page2.classList.remove("shown");
      page3.classList.add("shown");
      window.scrollTo(0, 0);
      revealLockedContent();
    }, 400);
  }

  page3Back.addEventListener("click", function () {
    page3.classList.remove("shown");
    page2.classList.add("shown");
    window.scrollTo(0, savedScrollY);

    isUnlocked = false;
    lockBtn.style.display = "";
    lockHint.style.display = "";
    lockUnlockedMsg.style.display = "none";
  });

  var lockedContentBuilt = false;

  function revealLockedContent() {
    if (!lockedContentBuilt) {
      buildPhotoGrid();
      buildLetter();
      lockedContentBuilt = true;
    }

    observeOnce(document.getElementById("photo-grid-section"), 0.1, function () {
      var cards = document.querySelectorAll(".photo-card");
      cards.forEach(function (card, i) {
        setTimeout(function () {
          card.classList.add("in");
        }, i * 60);
      });
    });

    observeOnce(document.getElementById("letter-section"), 0.1, function () {
      var paragraphs = document.querySelectorAll(".letter-card .letter-paragraph");
      paragraphs.forEach(function (p, i) {
        setTimeout(function () {
          p.classList.add("in");
        }, i * 80);
      });
    });

    var footerH2 = document.querySelector("#footer-section h2");
    var footerP = document.querySelector("#footer-section p");
    observeOnce(document.getElementById("footer-section"), 0.2, function () {
      footerH2.classList.add("in");
      footerP.classList.add("in");
    });
  }

  function buildPhotoGrid() {
    var grid = document.getElementById("photo-grid");
    grid.innerHTML = "";
    var tilts = [-5, 4, -3, 6, -6, 3, -4, 5, -3, 4];
    var sizes = ["lg", "sm", "md", "lg", "sm", "md", "lg", "sm", "md", "lg"];
    
    PHOTOS.forEach(function (src, n) {
      var card = document.createElement("div");
      card.className = "photo-card size-" + sizes[n % sizes.length];
      card.style.setProperty("--rot", tilts[n % tilts.length] + "deg");
      card.style.setProperty("--sway-delay", (n * 0.4).toFixed(1) + "s");

      var img = document.createElement("img");
      img.src = src;
      img.alt = "Memory " + (n + 1);
      img.loading = "lazy";
      card.appendChild(img);
      grid.appendChild(card);
    });
  }

  function buildLetter() {
    var wrap = document.getElementById("letter-words");
    wrap.innerHTML = "";
    var paragraphs = LETTER_TEXT.split(/\n\n+/);
    paragraphs.forEach(function (pText) {
      var p = document.createElement("p");
      p.className = "letter-paragraph";
      var words = pText.trim().split(/\s+/);
      words.forEach(function (w) {
        var span = document.createElement("span");
        span.className = "word";
        if (w.startsWith("**") && w.endsWith("**")) {
          span.style.fontWeight = "bold";
          span.textContent = w.slice(2, -2);
        } else {
          span.textContent = w;
        }
        p.appendChild(span);
        p.appendChild(document.createTextNode(" "));
      });
      wrap.appendChild(p);
    });
  }
})();
