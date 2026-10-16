const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

// "2026-10-27T09:00:00+11:00" -> "09:00:00, 27 October 2026 (UTC+11)"
function formatStart(iso) {
    const [date, rest] = iso.split("T")
    const [year, month, day] = date.split("-")
    return rest.slice(0, 8) + ", " + Number(day) + " " + MONTHS[Number(month) - 1] + " " + year +
        " (UTC" + rest.slice(8).replace(/^([+-])0/, "$1").replace(/:00$/, "") + ")"
}

// "2026-10-27T09:00:00+11:00" -> "Tue 27 Oct, 09:00"
function formatShort(iso) {
    const date = new Date(iso.slice(0, 10) + "T00:00:00Z")
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getUTCDay()]
    return day + " " + date.getUTCDate() + " " + MONTHS[date.getUTCMonth()].slice(0, 3) + ", " + iso.slice(11, 16)
}

const SYSTEM_STORAGE_KEY = "examSystem"
const STORAGE_KEY = "trackedExam"
const SIDE_STORAGE_KEY = "sideExams"
const PAGE_TITLE = document.title

// Which state's exams are shown (see exams.js)
let system
// That state's exam sessions, in order
let sessions
// Every exam on its own, so one can be picked and tracked
let examList
// null means "whatever exam is next"
let trackedExam
// extra clocks shown on the side of the screen
let sideExams

useSystem(loadSystem())

// A saved choice, otherwise a guess from the browser's time zone, otherwise VIC
function loadSystem() {
    try {
        const saved = SYSTEMS.find(other => other.id === localStorage.getItem(SYSTEM_STORAGE_KEY))
        if (saved) return saved
    } catch (e) {
        // storage unavailable, fall through to guessing
    }
    try {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const guess = SYSTEMS.find(other => other.timeZones.includes(zone))
        if (guess) return guess
    } catch (e) {
        // no Intl, just use the default
    }
    return SYSTEMS[0]
}

function saveSystem() {
    try {
        localStorage.setItem(SYSTEM_STORAGE_KEY, system.id)
    } catch (e) {
        // storage unavailable, the choice just won't persist
    }
}

function useSystem(next) {
    system = next
    sessions = next.sessions.map(session => ({...session, time: new Date(session.start).getTime()}))
    examList = sessions.flatMap(session => session.exams.map(name => ({
        name, start: session.start, time: session.time, release: Boolean(session.release), info: session.info,
    })))
    trackedExam = loadTrackedExam()
    sideExams = loadSideExams()
    // VIC (the default, and what search crawlers get) keeps the page's own title, which names every state
    document.title = next === SYSTEMS[0] ? PAGE_TITLE : "2026 " + next.name + " Exam Countdown | ATAR Countdown"
}

// Selections are saved per state, since exam names repeat between states.
// VIC keeps the original keys so selections saved before other states were added still load.
function storageKey(base) {
    return system.id === "vic" ? base : base + ":" + system.id
}

function loadTrackedExam() {
    try {
        const name = localStorage.getItem(storageKey(STORAGE_KEY))
        return examList.find(exam => exam.name === name) || null
    } catch (e) {
        return null
    }
}

function saveTrackedExam(exam) {
    try {
        if (exam) localStorage.setItem(storageKey(STORAGE_KEY), exam.name)
        else localStorage.removeItem(storageKey(STORAGE_KEY))
    } catch (e) {
        // storage unavailable (private window etc.), selection just won't persist
    }
}

function loadSideExams() {
    try {
        const names = JSON.parse(localStorage.getItem(storageKey(SIDE_STORAGE_KEY)) || "[]")
        return Array.isArray(names) ? examList.filter(exam => names.includes(exam.name)) : []
    } catch (e) {
        return []
    }
}

function saveSideExams() {
    try {
        localStorage.setItem(storageKey(SIDE_STORAGE_KEY), JSON.stringify(sideExams.map(exam => exam.name)))
    } catch (e) {
        // same as above
    }
}

// Some sessions have 20+ language exams at once, so long lists get cut down to keep the heading short.
// The full list is still in the exam picker.
function listExams(names) {
    if (names.length <= 4) return names.join(", ")
    return names.slice(0, 3).join(", ") + " + " + (names.length - 3) + " more"
}

function nextSession(now) {
    return sessions.find(session => session.time > now)
}

function setText(id, text) {
    const el = document.getElementById(id)
    if (el && el.textContent !== text) el.textContent = text
}

// Footer line for an exam session, or for the results release
function startText(entry, now) {
    if (entry.info) return entry.info
    const when = formatStart(entry.start)
    if (entry.release) return (entry.time > now ? "Results will be released at " : "Results were released at ") + when
    return (entry.time > now ? "This exam will start at " : "This exam started at ") + when
}

// The heading links to the timetable, or to the results site when that's what's being counted down to
function setLink(release) {
    const linkEl = document.getElementById("exam_link")
    const href = release ? system.resultsUrl : system.timetableUrl
    if (linkEl && linkEl.href !== href) linkEl.href = href
}

// The time being counted down to, or null when there's nothing left to count down to
function showTarget(now) {
    if (trackedExam) {
        setLink(trackedExam.release)
        setText("exam_info", startText(trackedExam, now))
        if (trackedExam.time > now) {
            setText("exam_name", "Tracking: " + trackedExam.name)
            return trackedExam.time
        }
        setText("exam_name", trackedExam.release
            ? "Results are out! Check your ATAR"
            : trackedExam.name + " has started. Good luck!")
        return null
    }

    const session = nextSession(now)
    if (!session) {
        const last = sessions[sessions.length - 1]
        setLink(last.release)
        setText("exam_name", last.release ? "Results are out! Check your ATAR" : "That's all the 2026 " + system.name + " exams. Go touch grass.")
        setText("exam_info", startText(last, now))
        return null
    }
    setLink(session.release)
    setText("exam_name", "Next up: " + listExams(session.exams))
    setText("exam_info", startText(session, now))
    return session.time
}

const zeroStr = "00:00:00:00.000"

// milliseconds -> "dd:hh:mm:ss.mmm"
function formatDistance(distance) {
    if (distance <= 0) return zeroStr

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    distance %= (1000 * 60 * 60 * 24)

    const hours = Math.floor(distance / (1000 * 60 * 60))
    distance %= (1000 * 60 * 60)

    const minutes = Math.floor(distance / (1000 * 60))
    distance %= (1000 * 60)

    const seconds = Math.floor(distance / 1000)
    const milliseconds = distance % 1000

    let time_str = String(days).padStart(2, "0") + ":"
    time_str += String(hours).padStart(2, "0") + ":"
    time_str += String(minutes).padStart(2, "0") + ":"
    time_str += String(seconds).padStart(2, "0") + "."
    time_str += String(milliseconds).padStart(3, "0")
    return time_str
}

function tick() {
    const now = Date.now()
    const targetTime = showTarget(now)
    const time_str = targetTime === null ? zeroStr : formatDistance(targetTime - now)

    const timerEl = document.getElementById("timer")
    const subTimerEl = document.getElementById("submission_timer")
    if (timerEl) timerEl.innerHTML = time_str
    if (subTimerEl) subTimerEl.innerHTML = time_str

    let counting = targetTime !== null
    for (const clock of sideClocks) {
        const distance = clock.exam.time - now
        const done = distance <= 0
        clock.li.classList.toggle("done", done)
        clock.timeEl.textContent = done ? (clock.exam.release ? "Released!" : "Completed!") : formatDistance(distance)
        if (!done) counting = true
    }

    // stop once every clock has hit zero
    if (!counting) clearInterval(x)
}

let x

function restart() {
    // only an exam that's been picked can be shoved to the side, not "whatever's next"
    const shoveEl = document.getElementById("side_shove")
    if (shoveEl) shoveEl.hidden = !trackedExam

    clearInterval(x)
    tick()
    x = setInterval(tick, 50)
}

function trackExam(exam) {
    trackedExam = exam
    saveTrackedExam(exam)
    restart()
}

// Side clocks
const sideClocksEl = document.getElementById("side_clocks")
let sideClocks = []

function toggleSideExam(exam) {
    sideExams = sideExams.includes(exam)
        ? sideExams.filter(other => other !== exam)
        : examList.filter(other => other === exam || sideExams.includes(other))
    saveSideExams()
    renderSideClocks()
    restart()
}

// Send the main clock's exam to the side, and go back to "whatever's next"
function shoveTrackedExam() {
    if (!trackedExam) return
    sideExams = examList.filter(other => other === trackedExam || sideExams.includes(other))
    saveSideExams()
    renderSideClocks()
    trackExam(null)
}

// Swap a side clock with the main clock
function focusSideExam(exam) {
    const previous = trackedExam
    // "whatever's next" has no single exam to send to the side, so it just gets replaced
    sideExams = examList.filter(other => other === previous || (other !== exam && sideExams.includes(other)))
    saveSideExams()
    renderSideClocks()
    trackExam(exam)
}

function sideClock(exam) {
    const li = document.createElement("li")

    const removeEl = document.createElement("button")
    removeEl.type = "button"
    removeEl.className = "side_remove"
    removeEl.textContent = "×"
    removeEl.title = "Remove"
    removeEl.setAttribute("aria-label", "Remove " + exam.name + " clock")
    removeEl.addEventListener("click", () => toggleSideExam(exam))

    const nameEl = document.createElement("span")
    nameEl.className = "side_name"
    nameEl.textContent = exam.name

    const timeEl = document.createElement("span")
    timeEl.className = "side_time"

    const whenEl = document.createElement("small")
    whenEl.textContent = formatShort(exam.start)

    const focusEl = document.createElement("button")
    focusEl.type = "button"
    focusEl.className = "side_focus"
    focusEl.title = "Make this the main clock"
    focusEl.append(nameEl, timeEl, whenEl)
    focusEl.addEventListener("click", () => focusSideExam(exam))

    // remove button comes after so it sits on top of the focus button
    li.append(focusEl, removeEl)
    return {exam, li, timeEl}
}

function renderSideClocks() {
    if (!sideClocksEl) return
    sideClocks = sideExams.map(sideClock)
    sideClocksEl.replaceChildren(...sideClocks.map(clock => clock.li))
    sideClocksEl.hidden = sideClocks.length === 0
}

renderSideClocks()
restart()

// State/territory switcher
const systemPickEl = document.getElementById("system_pick")
if (systemPickEl) {
    for (const option of SYSTEMS) systemPickEl.add(new Option(option.label, option.id))
    systemPickEl.value = system.id
    systemPickEl.addEventListener("change", function () {
        useSystem(SYSTEMS.find(option => option.id === systemPickEl.value))
        saveSystem()
        renderSideClocks()
        restart()
    })
}

document.getElementById("side_shove")?.addEventListener("click", shoveTrackedExam)

// Exam picker modal, used both for the main clock ("track") and the side clocks ("side")
const modal = document.getElementById("exam_modal")
const modalTitleEl = document.getElementById("exam_modal_title")
const examListEl = document.getElementById("exam_list")
const searchEl = document.getElementById("exam_search")
let modalMode = "track"

function isSelected(exam) {
    return modalMode === "track" ? exam === trackedExam : sideExams.includes(exam)
}

function examOption(label, when, exam) {
    const li = document.createElement("li")
    const button = document.createElement("button")
    button.type = "button"
    button.setAttribute("aria-current", String(isSelected(exam)))

    const nameEl = document.createElement("span")
    nameEl.textContent = label
    button.appendChild(nameEl)

    if (when) {
        const whenEl = document.createElement("small")
        whenEl.textContent = when
        button.appendChild(whenEl)
    }

    button.addEventListener("click", function () {
        if (modalMode === "track") {
            trackExam(exam)
            modal.close()
            return
        }
        // side clocks can be toggled several at a time, so the modal stays open
        toggleSideExam(exam)
        button.setAttribute("aria-current", String(isSelected(exam)))
    })

    li.dataset.search = label.toLowerCase()
    li.appendChild(button)
    return li
}

function renderExamList() {
    const now = Date.now()
    examListEl.replaceChildren()

    // Selected exams go on top, past exams are hidden unless they're selected
    const selected = examList.filter(isSelected)
    const rest = examList.filter(exam => exam.time > now && !isSelected(exam))

    selected.forEach(exam => examListEl.appendChild(examOption(exam.name, formatShort(exam.start), exam)))
    if (modalMode === "track") examListEl.appendChild(examOption("Whatever's next", null, null))
    rest.forEach(exam => examListEl.appendChild(examOption(exam.name, formatShort(exam.start), exam)))
}

function filterExamList() {
    const query = searchEl.value.trim().toLowerCase()
    for (const li of examListEl.children) {
        li.hidden = !li.dataset.search.includes(query)
    }
}

function openModal(mode) {
    modalMode = mode
    modalTitleEl.textContent = mode === "track"
        ? "Which exam are you counting down to?"
        : "Pick exams to add to (or remove from) the side"
    renderExamList()
    searchEl.value = ""
    modal.showModal()
    searchEl.focus()
}

if (modal) {
    document.getElementById("exam_pick").addEventListener("click", () => openModal("track"))
    document.getElementById("side_add").addEventListener("click", () => openModal("side"))
    document.getElementById("exam_close").addEventListener("click", () => modal.close())
    // close when clicking the backdrop
    modal.addEventListener("click", function (e) {
        if (e.target === modal) modal.close()
    })
    searchEl.addEventListener("input", filterExamList)
    // enter picks the first match
    searchEl.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return
        const first = Array.from(examListEl.children).find(li => !li.hidden)
        if (first) first.querySelector("button").click()
    })
}

// Self promo. Classes are called "plug" rather than "ad" because ad blockers hide anything with an "ad" class.
const plugEl = document.getElementById("plug")
const plugToggleEl = document.getElementById("plug_toggle")
const PLUG_STORAGE_KEY = "plugCollapsed"

// Collapsing shrinks it down to just the label. It starts collapsed, and the choice is remembered
function setPlugCollapsed(collapsed) {
    plugEl.classList.toggle("collapsed", collapsed)
    plugToggleEl.textContent = collapsed ? "+" : "×"
    plugToggleEl.title = collapsed ? "Expand" : "Collapse"
    plugToggleEl.setAttribute("aria-expanded", String(!collapsed))
    try {
        localStorage.setItem(PLUG_STORAGE_KEY, collapsed ? "1" : "0")
    } catch (e) {
        // storage unavailable, it just won't be remembered
    }
}

if (plugEl && plugToggleEl) {
    let collapsed = true
    try {
        collapsed = localStorage.getItem(PLUG_STORAGE_KEY) !== "0"
    } catch (e) {
        // same as above
    }
    setPlugCollapsed(collapsed)
    plugToggleEl.addEventListener("click", () => setPlugCollapsed(!plugEl.classList.contains("collapsed")))
}

// Glow: split the text into characters so a glow can sweep across it
const plugLinkEl = plugEl && plugEl.querySelector(".plug_link")
const adTextEl = plugEl && plugEl.querySelector(".plug_text")
if (adTextEl) {
    const text = adTextEl.textContent.replace(/\s+/g, " ").trim()
    plugLinkEl.setAttribute("aria-label", plugLinkEl.textContent.replace(/\s+/g, " ").trim())
    adTextEl.replaceChildren()

    let i = 0
    text.split(" ").forEach((word, index) => {
        if (index > 0) {
            adTextEl.append(" ")
            i++
        }
        // words don't break in the middle when wrapping on small screens
        const wordEl = document.createElement("span")
        wordEl.className = "plug_word"
        wordEl.setAttribute("aria-hidden", "true")
        for (const char of word) {
            const charEl = document.createElement("span")
            charEl.className = "plug_char"
            charEl.dataset.i = String(i++)
            charEl.textContent = char
            wordEl.appendChild(charEl)
        }
        adTextEl.appendChild(wordEl)
    })

    // Every so often a soft light drifts across the text. Timing, speed and brightness vary a little
    // each time so it doesn't look mechanical.
    const chars = Array.from(adTextEl.querySelectorAll(".plug_char"))
    const base = getComputedStyle(adTextEl).color
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const random = (min, max) => min + Math.random() * (max - min)

    // three layers: a tight white halo, a wider white bloom and a faint green haze to match the pill
    const shadow = alpha => `0 0 4px rgba(255, 255, 255, ${alpha}), 0 0 12px rgba(255, 255, 255, ${alpha * 0.8}), ` +
        `0 0 20px rgba(9, 156, 10, ${alpha * 0.7})`

    function sweep() {
        const step = random(25, 35)         // ms between neighbouring characters
        const duration = random(1200, 1600) // how long each character takes to brighten and fade
        const peak = Math.round(random(250, 255))
        const glow = random(0.9, 1)
        let end = 0 // when the last character finishes fading

        for (const charEl of chars) {
            const charDuration = duration * random(0.9, 1.1)
            const charDelay = Number(charEl.dataset.i) * step + random(0, 40)
            end = Math.max(end, charDelay + charDuration)

            charEl.animate([
                {color: base, textShadow: shadow(0)},
                {color: `rgb(${peak}, ${peak}, ${peak})`, textShadow: shadow(glow), offset: 0.4},
                {color: base, textShadow: shadow(0)},
            ], {
                duration: charDuration,
                delay: charDelay,
                easing: "ease-in-out",
            })
        }

        // next sweep starts two seconds after this one has faded out
        setTimeout(sweep, end + 2000)
    }

    if (!reduceMotion && chars.length && chars[0].animate) setTimeout(sweep, random(500, 1500))
}

// Easter egg: every fifth click on the hourglass sets a copy loose to bounce around the screen.
// Clicking one of the loose ones pops it.
const hourglassEl = document.getElementById("hourglass")
let bouncers = []
let hourglassClicks = 0
let lastFrame = null
let bouncing = false

// Each click wobbles the hourglass a bit harder, hinting that something happens if you keep going
function shakeHourglass() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const progress = (hourglassClicks - 1) % 5 + 1 // 1 to 5
    const angle = 3 + progress * 2                 // degrees
    hourglassEl.animate([
        {transform: "rotate(0deg)"},
        {transform: `rotate(${-angle}deg)`},
        {transform: `rotate(${angle}deg)`},
        {transform: `rotate(${-angle * 0.6}deg)`},
        {transform: `rotate(${angle * 0.3}deg)`},
        {transform: "rotate(0deg)"},
    ], {duration: 350, easing: "ease-in-out"})
}

// Score in the bottom left, shown after the first pop
const scoreEl = document.getElementById("score")
const scoreCountEl = document.getElementById("score_count")
let score = 0

function addPoint() {
    if (!scoreEl) return
    score++
    scoreCountEl.textContent = String(score)
    scoreEl.hidden = false
    scoreEl.animate([
        {transform: "scale(1.3)", color: "whitesmoke"},
        {transform: "scale(1)"},
    ], {duration: 250, easing: "ease-out"})
}

function popBouncer(b) {
    addPoint()
    bouncers = bouncers.filter(other => other !== b)
    b.el.style.pointerEvents = "none"
    const at = `translate(${b.x}px, ${b.y}px)`
    b.el.animate([
        {transform: at + " scale(1)", opacity: 1},
        {transform: at + " scale(1.6)", opacity: 0},
    ], {duration: 200, easing: "ease-out", fill: "forwards"}).onfinish = () => b.el.remove()
}

function spawnBouncer() {
    const rect = hourglassEl.getBoundingClientRect()
    const height = 80
    const width = height * rect.width / rect.height

    const el = document.createElement("img")
    el.src = hourglassEl.currentSrc || hourglassEl.src
    el.alt = ""
    el.className = "bouncer"
    el.style.width = width + "px"
    el.style.height = height + "px"
    document.body.appendChild(el)

    // head off diagonally (never close to straight across or straight down) from the main hourglass
    const speed = 200 + Math.random() * 100 // px per second
    const angle = (Math.PI / 6 + Math.random() * Math.PI / 6) + Math.floor(Math.random() * 4) * Math.PI / 2
    const b = {
        el, width, height,
        x: rect.left + (rect.width - width) / 2,
        y: rect.top + (rect.height - height) / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
    }
    bouncers.push(b)
    el.addEventListener("click", () => popBouncer(b))

    if (!bouncing) {
        bouncing = true
        lastFrame = null
        requestAnimationFrame(bounce)
    }
}

function bounce(time) {
    // cap the step so a backgrounded tab doesn't make them jump when it comes back
    const dt = lastFrame === null ? 0 : Math.min((time - lastFrame) / 1000, 0.05)
    lastFrame = time

    const maxWidth = document.documentElement.clientWidth
    const maxHeight = document.documentElement.clientHeight

    for (const b of bouncers) {
        b.x += b.vx * dt
        b.y += b.vy * dt

        if (b.x <= 0) {
            b.x = 0
            b.vx = Math.abs(b.vx)
        } else if (b.x + b.width >= maxWidth) {
            b.x = Math.max(0, maxWidth - b.width)
            b.vx = -Math.abs(b.vx)
        }

        if (b.y <= 0) {
            b.y = 0
            b.vy = Math.abs(b.vy)
        } else if (b.y + b.height >= maxHeight) {
            b.y = Math.max(0, maxHeight - b.height)
            b.vy = -Math.abs(b.vy)
        }

        b.el.style.transform = `translate(${b.x}px, ${b.y}px)`
    }

    // stop the loop once they've all been popped
    if (bouncers.length) requestAnimationFrame(bounce)
    else bouncing = false
}

if (hourglassEl) {
    hourglassEl.addEventListener("click", function () {
        hourglassClicks++
        shakeHourglass()
        if (hourglassClicks % 5 === 0) spawnBouncer()
    })
}
