// 2026 VCE written examination timetable (start times, Melbourne time / AEDT UTC+11).
// Source: https://vcaa.vic.edu.au/sites/default/files/2026-10/VCEExamsTimetable2026.pdf
// Oral/performance exams and the Extended Investigation are scheduled individually, so they're not included.
const EXAMS = [
    {start: "2026-10-15T08:00:00+11:00", exams: ["Auslan Sign Comprehension and Sign Production"]},
    {start: "2026-10-15T09:25:00+11:00", exams: ["Classical Hebrew"]},
    {
        start: "2026-10-15T14:00:00+11:00", exams: [
            "Armenian", "Bengali", "Bosnian", "Chin Hakha", "Croatian", "Dutch", "Filipino", "Hebrew", "Hindi",
            "Hungarian", "Karen", "Khmer", "Macedonian", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian",
            "Russian", "Serbian", "Sinhala", "Swedish", "Tamil", "Turkish"
        ]
    },
    {start: "2026-10-16T13:55:00+11:00", exams: ["Classical Greek"]},

    {start: "2026-10-27T09:00:00+11:00", exams: ["English", "English as an Additional Language (EAL)"]},

    {start: "2026-10-28T09:00:00+11:00", exams: ["Agricultural and Horticultural Studies"]},
    {start: "2026-10-28T11:45:00+11:00", exams: ["Art Making and Exhibiting"]},
    {start: "2026-10-28T15:00:00+11:00", exams: ["English Language", "Indonesian First Language", "Vietnamese First Language"]},

    {start: "2026-10-29T09:00:00+11:00", exams: ["VET Business", "VET Community Services", "Theatre Studies"]},
    {start: "2026-10-29T11:45:00+11:00", exams: ["Economics"]},
    {start: "2026-10-29T15:00:00+11:00", exams: ["Chinese First Language", "Japanese First Language", "Korean First Language", "Literature"]},

    {start: "2026-10-30T09:00:00+11:00", exams: ["Psychology"]},
    {start: "2026-10-30T14:00:00+11:00", exams: ["General Mathematics Examination 1"]},

    {start: "2026-11-02T09:00:00+11:00", exams: ["Biology"]},
    {start: "2026-11-02T14:00:00+11:00", exams: ["General Mathematics Examination 2"]},

    // Tuesday 3 November: Melbourne Cup public holiday

    {start: "2026-11-04T09:00:00+11:00", exams: ["Art Creative Practice", "VET Engineering Studies", "VET Health Allied", "VET Health Services Assistance"]},
    {start: "2026-11-04T11:45:00+11:00", exams: ["Aboriginal Languages of Victoria", "Algorithmics (HESS)", "Classical Studies", "Korean Second Language", "Vietnamese Second Language"]},
    {start: "2026-11-04T15:00:00+11:00", exams: ["Business Management"]},

    {start: "2026-11-05T09:00:00+11:00", exams: ["Mathematical Methods Examination 1", "Music Composition"]},
    {start: "2026-11-05T11:45:00+11:00", exams: ["VET Equine Studies", "VET Hospitality"]},
    {start: "2026-11-05T15:00:00+11:00", exams: ["Chinese Language, Culture and Society", "Health and Human Development"]},

    {start: "2026-11-06T09:00:00+11:00", exams: ["Dance", "VET Integrated Technologies"]},
    {start: "2026-11-06T11:45:00+11:00", exams: ["Mathematical Methods Examination 2"]},
    {start: "2026-11-06T15:00:00+11:00", exams: ["Arabic", "Legal Studies", "VET Creative and Digital Media"]},

    {start: "2026-11-09T09:00:00+11:00", exams: ["Music Inquiry", "Specialist Mathematics Examination 1"]},
    {start: "2026-11-09T11:45:00+11:00", exams: ["Applied Computing: Data Analytics", "Physical Education", "Spanish"]},
    {start: "2026-11-09T15:00:00+11:00", exams: ["History: Revolutions", "Industry and Enterprise"]},

    {start: "2026-11-10T09:00:00+11:00", exams: ["Chemistry"]},
    {start: "2026-11-10T14:00:00+11:00", exams: ["Environmental Science", "Greek", "Media", "Text and Traditions"]},

    {start: "2026-11-11T09:00:00+11:00", exams: ["VET Furnishing", "Visual Communication Design"]},
    {start: "2026-11-11T11:45:00+11:00", exams: ["History: Australian History", "Outdoor and Environmental Studies", "Specialist Mathematics Examination 2"]},
    {start: "2026-11-11T15:00:00+11:00", exams: ["Accounting"]},

    {start: "2026-11-12T09:00:00+11:00", exams: ["Physics"]},
    {start: "2026-11-12T14:00:00+11:00", exams: ["History: Ancient History", "Geography", "Sociology"]},

    {start: "2026-11-13T09:00:00+11:00", exams: ["Product Design and Technologies", "VET Information and Communications Technology", "VET Music (Sound Production)"]},
    {start: "2026-11-13T11:45:00+11:00", exams: ["Drama", "VET Sport and Recreation"]},
    {start: "2026-11-13T15:00:00+11:00", exams: ["Applied Computing: Software Development", "German", "Philosophy"]},

    {start: "2026-11-16T09:00:00+11:00", exams: ["Food Studies"]},
    {start: "2026-11-16T11:45:00+11:00", exams: ["VET Hospitality (Cookery)", "VET Laboratory Skills", "Systems Engineering"]},
    {start: "2026-11-16T15:00:00+11:00", exams: ["Latin", "Politics", "Religion and Society"]},

    {start: "2026-11-17T09:00:00+11:00", exams: ["Music Contemporary Performance", "Music Repertoire Performance"]},
    {start: "2026-11-17T11:45:00+11:00", exams: ["Indonesian Second Language", "Italian"]},
    {start: "2026-11-17T15:00:00+11:00", exams: ["Foundation Mathematics", "French"]},

    {start: "2026-11-18T09:00:00+11:00", exams: ["Japanese Second Language"]},
    {start: "2026-11-18T14:00:00+11:00", exams: ["Chinese Second Language", "Chinese Second Language Advanced"]},

    // Not an exam, but worth counting down to. Source: https://vtac.edu.au/dates
    {start: "2026-12-10T07:00:00+11:00", exams: ["ATAR & study scores release"], release: true},
].map(session => ({...session, time: new Date(session.start).getTime()}))

const RESULTS_URL = "https://resultsandatar.vic.edu.au/"

const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

// "2026-10-27T09:00:00+11:00" -> "09:00:00, 27 October 2026 (UTC+11)"
function formatStart(iso) {
    const [date, rest] = iso.split("T")
    const [year, month, day] = date.split("-")
    return rest.slice(0, 8) + ", " + Number(day) + " " + MONTHS[Number(month) - 1] + " " + year +
        " (UTC" + rest.slice(8, 11).replace(/^([+-])0/, "$1") + ")"
}

// "2026-10-27T09:00:00+11:00" -> "Tue 27 Oct, 09:00"
function formatShort(iso) {
    const date = new Date(iso.slice(0, 10) + "T00:00:00Z")
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getUTCDay()]
    return day + " " + date.getUTCDate() + " " + MONTHS[date.getUTCMonth()].slice(0, 3) + ", " + iso.slice(11, 16)
}

// Every exam on its own, so one can be picked and tracked
const EXAM_LIST = EXAMS.flatMap(session => session.exams.map(name => ({
    name, start: session.start, time: session.time, release: Boolean(session.release),
})))

const STORAGE_KEY = "trackedExam"
const SIDE_STORAGE_KEY = "sideExams"

// null means "whatever exam is next"
let trackedExam = loadTrackedExam()
// extra clocks shown on the side of the screen
let sideExams = loadSideExams()

function loadTrackedExam() {
    try {
        const name = localStorage.getItem(STORAGE_KEY)
        return EXAM_LIST.find(exam => exam.name === name) || null
    } catch (e) {
        return null
    }
}

function saveTrackedExam(exam) {
    try {
        if (exam) localStorage.setItem(STORAGE_KEY, exam.name)
        else localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
        // storage unavailable (private window etc.), selection just won't persist
    }
}

function loadSideExams() {
    try {
        const names = JSON.parse(localStorage.getItem(SIDE_STORAGE_KEY) || "[]")
        return Array.isArray(names) ? EXAM_LIST.filter(exam => names.includes(exam.name)) : []
    } catch (e) {
        return []
    }
}

function saveSideExams() {
    try {
        localStorage.setItem(SIDE_STORAGE_KEY, JSON.stringify(sideExams.map(exam => exam.name)))
    } catch (e) {
        // same as above
    }
}

function nextSession(now) {
    return EXAMS.find(session => session.time > now)
}

function setText(id, text) {
    const el = document.getElementById(id)
    if (el && el.textContent !== text) el.textContent = text
}

// Footer line for an exam session, or for the results release
function startText(entry, now) {
    const when = formatStart(entry.start)
    if (entry.release) return (entry.time > now ? "Results will be released at " : "Results were released at ") + when
    return (entry.time > now ? "This exam will start at " : "This exam started at ") + when
}

// The heading links to the timetable, or to the results site when that's what's being counted down to
function setLink(release) {
    const linkEl = document.getElementById("exam_link")
    const href = release ? RESULTS_URL : TIMETABLE_URL
    if (linkEl && linkEl.href !== href) linkEl.href = href
}

const TIMETABLE_URL = document.getElementById("exam_link")?.href

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
        const last = EXAMS[EXAMS.length - 1]
        setLink(last.release)
        setText("exam_name", last.release ? "Results are out! Check your ATAR" : "That's all the 2026 VCE exams. Go touch grass.")
        setText("exam_info", startText(last, now))
        return null
    }
    setLink(session.release)
    setText("exam_name", "Next up: " + session.exams.join(", "))
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
        : EXAM_LIST.filter(other => other === exam || sideExams.includes(other))
    saveSideExams()
    renderSideClocks()
    restart()
}

// Swap a side clock with the main clock
function focusSideExam(exam) {
    const previous = trackedExam
    // "whatever's next" has no single exam to send to the side, so it just gets replaced
    sideExams = EXAM_LIST.filter(other => other === previous || (other !== exam && sideExams.includes(other)))
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
    const selected = EXAM_LIST.filter(isSelected)
    const rest = EXAM_LIST.filter(exam => exam.time > now && !isSelected(exam))

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

// Collapsing shrinks it down to just the label, and the choice is remembered
function setPlugCollapsed(collapsed) {
    plugEl.classList.toggle("collapsed", collapsed)
    plugToggleEl.textContent = collapsed ? "+" : "×"
    plugToggleEl.title = collapsed ? "Expand" : "Collapse"
    plugToggleEl.setAttribute("aria-expanded", String(!collapsed))
    try {
        if (collapsed) localStorage.setItem(PLUG_STORAGE_KEY, "1")
        else localStorage.removeItem(PLUG_STORAGE_KEY)
    } catch (e) {
        // storage unavailable, it just won't be remembered
    }
}

if (plugEl && plugToggleEl) {
    let collapsed = false
    try {
        collapsed = localStorage.getItem(PLUG_STORAGE_KEY) === "1"
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
