  const dailyContent = [
            {
                title: "Slow Sunday",
                quotes: [
                    "Rest is part of the journey, not a reward for finishing it.",
                    "Let today be a quiet reminder that you are allowed to slow down.",
                    "A little stillness can make room for a brighter week.",
                    "Take the day gently; you do not have to earn your rest.",
                    "Let the week wait while you enjoy this moment.",
                    "Slow mornings and open time can be their own kind of progress.",
                    "Pause, breathe, and return to yourself.",
                    "Rest today so tomorrow can begin with a little more room.",
                    "Choose what restores you, not what fills every hour.",
                    "A peaceful day is a good use of a day.",
                    "Give yourself permission to do less and feel more."
                ]
            },
            {
                title: "Fresh Start",
                quotes: [
                    "A new week is a fresh chance to begin with intention.",
                    "Start where you are, and let one good step lead to the next.",
                    "Give your attention to what matters, and momentum will follow.",
                    "You do not need a perfect plan; begin with one clear priority.",
                    "Set the tone for your week with the choice you make next.",
                    "A fresh start is built one focused moment at a time.",
                    "Bring your energy to the task in front of you.",
                    "Begin with purpose, then let consistency do its work.",
                    "Make space for what matters before the week gets loud.",
                    "New beginnings are often just small steps taken again.",
                    "Choose a direction for today and start moving."
                ]
            },
            {
                title: "Keep Going",
                quotes: [
                    "Small steps still move you forward.",
                    "Keep going; steady effort can carry you farther than a perfect plan.",
                    "You do not need to see the whole path to take the next step.",
                    "Progress is built by showing up for the next small thing.",
                    "Stay with it; your effort is adding up, even when it is quiet.",
                    "Keep your pace steady and your attention on the next step.",
                    "A difficult middle is still part of the way through.",
                    "You have already come farther than the version of you who began.",
                    "Do what you can today; that is how momentum grows.",
                    "Consistency carries you when inspiration takes a break.",
                    "Keep moving forward, one honest effort at a time."
                ]
            },
            {
                title: "Midweek Check",
                quotes: [
                    "Pause, take stock, and choose what deserves your energy next.",
                    "You can adjust your direction without giving up on the destination.",
                    "A thoughtful reset can turn an ordinary day around.",
                    "Check in with yourself before you decide what comes next.",
                    "You are allowed to revise the plan and keep the goal.",
                    "A pause is not lost time; it can bring your focus back.",
                    "Notice what is working and give it more of your attention.",
                    "Midway through is a good time to choose your next step with care.",
                    "Release what is distracting you; return to what matters.",
                    "You can begin again in the middle of the week.",
                    "Take a breath, reset your focus, and keep going."
                ]
            },
            {
                title: "Almost There",
                quotes: [
                    "Finish the week with care, not just speed.",
                    "Your consistent effort is adding up, even when progress feels quiet.",
                    "Close one open loop today and give yourself room to breathe.",
                    "Bring the week to a thoughtful finish, one task at a time.",
                    "Do what needs doing, then let the rest wait.",
                    "Your steady work deserves to be noticed, especially by you.",
                    "End the week proud of your effort, not only your checklist.",
                    "Tie up what matters and leave room for a softer evening.",
                    "You are close; finish with intention rather than hurry.",
                    "Let a little progress be enough for today.",
                    "Make space to finish well and welcome what comes next."
                ]
            },
            {
                title: "Friday Energy",
                quotes: [
                    "Notice how far you have come, then make space for joy.",
                    "You deserve to enjoy the good things you worked hard for.",
                    "Celebrate the small wins; they are how big days are built.",
                    "Let yourself exhale; the weekend is here.",
                    "Joy belongs on your schedule, not only at the end of your goals.",
                    "Make today a celebration of effort and possibility.",
                    "Carry your wins into the weekend and leave the stress behind.",
                    "You made it through the week; give yourself a moment to enjoy that.",
                    "Choose something fun without needing to justify it.",
                    "Good work deserves a little celebration.",
                    "Finish the week with gratitude and a plan for something you love."
                ]
            },
            {
                title: "Free Day",
                quotes: [
                    "Make room for the people and moments that make life feel full.",
                    "A day well spent can be as simple as being here, now.",
                    "Follow your curiosity and let today hold a little surprise.",
                    "Let the day unfold without turning every moment into a task.",
                    "Be where your feet are and enjoy what is already around you.",
                    "Make time for fresh air, good company, or a little adventure.",
                    "The best plans sometimes leave room for spontaneity.",
                    "Enjoy the freedom to follow what feels meaningful today.",
                    "Collect moments, not obligations.",
                    "Let curiosity lead you somewhere new.",
                    "Give your attention to the people and pleasures you love."
                ]
            }
        ];

        const today = new Date();
        const dayOfWeek = today.getDay();
        const todaysContent = dailyContent[dayOfWeek];
        const title = document.getElementById("title");
        const advice = document.getElementById("advice");
        const posterImage = document.getElementById("poster-img");
        const imageStatus = document.getElementById("image-status");

        title.textContent = todaysContent.title;
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        document.getElementById("date").textContent = today.toLocaleDateString("en-US", options);
        document.getElementById("refresh-page").addEventListener("click", () => {
            window.location.reload();
        });

        const quoteIndex = Math.floor(Math.random() * todaysContent.quotes.length);
        advice.textContent = `“${todaysContent.quotes[quoteIndex]}”`;

        async function loadPhotoPool() {
            const page = Math.floor(Math.random() * 10) + 1;
            const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=100`);
            if (!response.ok) {
                throw new Error(`Photo collection request failed with status ${response.status}.`);
            }

            const photos = await response.json();
            const uniquePhotos = [...new Map(photos.map(photo => [photo.id, photo])).values()];
            if (uniquePhotos.length < 51) {
                throw new Error(`Expected at least 51 unique photos, received ${uniquePhotos.length}.`);
            }

            const photo = uniquePhotos[Math.floor(Math.random() * uniquePhotos.length)];
            posterImage.addEventListener("error", () => {
                imageStatus.textContent = "The landscape could not be loaded. Refresh the page to try another photo.";
            }, { once: true });
            posterImage.src = `https://picsum.photos/id/${photo.id}/1200/675`;
            posterImage.alt = "Random landscape";
        }

        loadPhotoPool().catch(error => {
            imageStatus.textContent = "Could not load a landscape. Check your connection and refresh the page.";
            console.error("Unable to load random landscape photos:", error);
        });