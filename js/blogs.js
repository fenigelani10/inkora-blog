/**
 * INKORA - Blog Data & Dynamic Rendering Engine
 * Handles blog post data, filtering, searching, sorting, details rendering,
 * likes, bookmarks, and comments with localStorage persistence.
 */

// Comprehensive sample blog dataset (9 curated posts across 6 categories)
const BLOGS_DATA = [
  {
    id: 1,
    title: "How AI Is Changing Everyday Life: Beyond the Hype and Fear",
    category: "Technology",
    description: "From ambient computing to invisible assistants, artificial intelligence is quietly reshaping our daily workflows, creative pursuits, and human connections.",
    author: {
      name: "Marcus Vance",
      role: "Principal Tech Essayist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      bio: "Covering the intersection of artificial intelligence, human agency, and societal design."
    },
    date: "Sep 24, 2026",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    trending: true,
    likes: 342,
    bookmarks: 89,
    quote: "True innovation doesn't replace humanity; it removes the mechanical friction so our curiosity can flourish.",
    content: `
      <p class="lead-text">We are living through a quiet revolution. Unlike the thunderous introductions of smartphones or personal computers, the rise of modern artificial intelligence has arrived like a gentle tide, permeating the mundane crevices of our everyday lives.</p>
      
      <h2>From Grand Spectacle to Ambient Utility</h2>
      <p>When generative models first captured global headlines, the discourse oscillated between apocalyptic dread and utopic hyperbole. Yet in reality, AI is settling into a far more interesting role: ambient utility. It assists your morning email drafting, optimizes the heating in your home before you step out of bed, and refines the lighting in your smartphone photography before you even press the shutter.</p>
      
      <p>Rather than feeling like an intimidating robot sitting beside us, the technology is fading into the background of user experience, becoming as natural and unremarkable as electricity.</p>

      <h2>The Re-imagining of Creative Labor</h2>
      <p>The most profound shift is taking place in how creative people think about ideation. Designers, writers, and software architects are no longer starting with a blank canvas. Instead, intelligent copilots act as sounding boards, generating early variations and synthesizing complex datasets in seconds.</p>

      <ul class="article-list">
        <li><strong>Accelerated Prototyping:</strong> Designers can test dozens of typographic layouts and palette combinations in minutes rather than hours.</li>
        <li><strong>Personalized Learning Companions:</strong> Students have access to patient, 24/7 socratic tutors capable of breaking down complex theorems step-by-step.</li>
        <li><strong>Cognitive Offloading:</strong> Automating repetitive synthesis leaves more cognitive bandwidth for deep, contemplative strategy.</li>
      </ul>

      <h2>The Human Imperative: Curation and Empathy</h2>
      <p>If machines can synthesize words and generate pixels with effortless velocity, what remains distinctly human? The answer is discernment, taste, and empathy. The future belongs not to those who can produce the most content, but to those who possess the editorial discipline to ask the right questions and care deeply about the human resonance of the answers.</p>

      <div class="takeaway-box">
        <h3>Key Takeaway</h3>
        <p>AI will not replace authentic storytelling or deep human connection. It will simply raise the baseline of production, elevating original perspective and genuine vulnerability into the rarest, most prized currencies in the digital landscape.</p>
      </div>
    `
  },
  {
    id: 2,
    title: "7 Places That Make You Want to Travel: Quiet Escapes and Hidden Valleys",
    category: "Travel",
    description: "Step away from crowded tourist hubs to discover serene coastlines, mist-covered alpine lakes, and historic hamlets that rekindle your wonder.",
    author: {
      name: "Sienna Brooks",
      role: "Travel Journalist & Photographer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      bio: "Documenting hidden landscapes, sustainable wandering, and local cultures around the world."
    },
    date: "Sep 21, 2026",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    trending: true,
    likes: 418,
    bookmarks: 145,
    quote: "To travel slowly is not simply to see different lands, but to return with a new set of eyes.",
    content: `
      <p class="lead-text">In an era of viral geotags and bucket-list checklists, travel has often surrendered its most sacred quality: serendipity. To travel well is not to capture an itinerary; it is to grant yourself permission to get lost.</p>

      <h2>1. The Lofoten Archipelago, Norway</h2>
      <p>Towering granite peaks rise directly out of jade-green arctic fjords. In summer, the midnight sun turns the night into an endless golden twilight. In winter, the northern lights dance above historic red fishermen's cabins (rorbuer). Lofoten reminds you how small you are in the face of timeless geological majesty.</p>

      <h2>2. Val d'Orcia, Tuscany, Italy</h2>
      <p>Rolling clay hills, solitary cypress avenues, and ancient hilltop stone villages. Here, lunch stretches for three unhurried hours over homemade pici pasta and local Brunello di Montalcino wine.</p>

      <h2>3. Takayama and the Japanese Alps</h2>
      <p>Tucked deep within Gifu Prefecture, Takayama preserves wooden merchant houses from the Edo period alongside morning riverside markets where local farmers trade crisp seasonal produce and hand-carved cedar crafts.</p>

      <ul class="article-list">
        <li><strong>4. Salar de Uyuni, Bolivia:</strong> The world's largest salt flat, turning into a mirror of the heavens during the brief rainy season.</li>
        <li><strong>5. Isle of Skye, Scotland:</strong> Dramatic sea cliffs, fairy pools, and windswept moors woven with centuries of Celtic mythology.</li>
        <li><strong>6. Sintra's Hidden Forests, Portugal:</strong> Mossy stone pathways winding between romantic palaces and subtropical microclimates.</li>
        <li><strong>7. Luang Prabang, Laos:</strong> Where saffron-robed monks walk at dawn amidst French colonial architecture and tranquil Mekong waterways.</li>
      </ul>

      <div class="takeaway-box">
        <h3>Travel Philosophy</h3>
        <p>Before packing your bags, remember that the goal of travel isn't to take photos for others to applaud. It's to be changed by the silence of a foreign horizon and the quiet kindness of a stranger.</p>
      </div>
    `
  },
  {
    id: 3,
    title: "Creating a Slow and Meaningful Morning: Routines for Intentional Living",
    category: "Lifestyle",
    description: "Reclaim your first waking hours. How intentional silence, analogue rituals, and screen-free mornings set the tone for focus and emotional calm.",
    author: {
      name: "Julian Rivera",
      role: "Wellness Editor & Author",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      bio: "Writing on minimalist living, restorative habits, and finding peace in modern noise."
    },
    date: "Sep 18, 2026",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    trending: false,
    likes: 279,
    bookmarks: 112,
    quote: "The way you greet your morning is the blueprint for how you experience your entire day.",
    content: `
      <p class="lead-text">Most of us wake up in a state of defense. The alarm blares, our hand instinctively grasps the glowing glass rectangle on the nightstand, and within ninety seconds our nervous system is bombarded by notifications, news alerts, and urgent requests.</p>

      <h2>The Analogue Boundary</h2>
      <p>The single most transformative decision you can make for your mental well-being is establishing an analogue buffer between sleep and the digital world. Keep your phone charging outside the bedroom. Purchase a simple mechanical alarm clock.</p>

      <p>When you protect the first thirty to forty-five minutes of your day, you establish an emotional foundation of sovereignty. You are deciding who enters your consciousness before the world demands your attention.</p>

      <h2>The Three Pillars of a Grounded Morning</h2>
      <ul class="article-list">
        <li><strong>Hydration and Light:</strong> Drink a large glass of filtered water with a pinch of sea salt, and step outside for five minutes of direct morning sunlight to anchor your circadian rhythm.</li>
        <li><strong>Movement without Metric:</strong> Gentle stretching, yoga, or a brisk neighborhood walk without fitness trackers or podcasts. Allow your mind to wander freely.</li>
        <li><strong>The Mindful Cup:</strong> Whether you brew pour-over coffee or steep loose-leaf green tea, perform the preparation with complete presence. Listen to the water boiling; smell the roasted grounds.</li>
      </ul>

      <div class="takeaway-box">
        <h3>Remember</h3>
        <p>A slow morning isn't about luxury or waking up at 4:30 AM. It is about treating your opening consciousness with gentle respect rather than frantic urgency.</p>
      </div>
    `
  },
  {
    id: 4,
    title: "Why Creative Thinking Matters in an Algorithmic World",
    category: "Creativity",
    description: "As optimization algorithms push culture toward uniformity, non-linear imagination and daring taste become our greatest distinct human superpowers.",
    author: {
      name: "Claire Dupont",
      role: "Design Critic & Creative Director",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      bio: "Curating conversations around aesthetic philosophy, typography, and original thinking."
    },
    date: "Sep 15, 2026",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: true,
    likes: 520,
    bookmarks: 231,
    quote: "Algorithms optimize for what has already worked. Creativity dares to imagine what has never yet existed.",
    content: `
      <p class="lead-text">Take a look at contemporary architecture, pop music playlists, or coffee shop branding from Tokyo to London to São Paulo. You will notice a strange homogenizing effect: muted neutral interiors, identical typography, and melodies crafted strictly to satisfy algorithm retention metrics.</p>

      <h2>The Tyranny of the Mean</h2>
      <p>Recommendation engines are mathematically designed to find the common denominator of mass appeal. Over time, optimization flattens idiosyncrasy. It rewards safe predictability while punishing daring eccentricities.</p>

      <p>True creativity, on the other hand, is inherently inefficient. It requires wandering down blind alleys, embracing accidental discoveries, and drawing analogies across disparate disciplines—like pairing Renaissance painting techniques with quantum mechanics.</p>

      <h2>Cultivating Un-algorithmic Taste</h2>
      <ul class="article-list">
        <li><strong>Cross-Pollinate Fields:</strong> Read outside your industry. If you are an engineer, read ancient poetry. If you are a poet, read astrophysics.</li>
        <li><strong>Seek Physical Tangibility:</strong> Sketch with ink and paper, build with clay, or browse the physical stacks of an antiquarian library.</li>
        <li><strong>Embrace Productive Boredom:</strong> Creativity rarely strikes when your brain is plugged into high-frequency stimulation feeds. It emerges in quiet gaps.</li>
      </ul>

      <div class="takeaway-box">
        <h3>Perspective</h3>
        <p>The future belongs to the idiosyncratic thinkers. When everyone has access to the same machine models, your eccentric perspective is your ultimate competitive moat.</p>
      </div>
    `
  },
  {
    id: 5,
    title: "Learning Beyond the Classroom: The Rise of Self-Directed Mastery",
    category: "Education",
    description: "Curiosity is the new curriculum. How independent thinkers build custom knowledge stacks, practice open learning, and master high-leverage skills.",
    author: {
      name: "David Chen",
      role: "Open Education Advocate",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      bio: "Building systems for lifelong autodidacts and decentralizing intellectual curiosity."
    },
    date: "Sep 12, 2026",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: false,
    likes: 195,
    bookmarks: 78,
    quote: "Formal education will make you a living; self-education will make you a legend.",
    content: `
      <p class="lead-text">For centuries, knowledge was scarce. If you wished to study advanced mathematics, philosophy, or fine arts, you had to physically travel to specialized cloisters or universities guarded by gatekeepers.</p>

      <h2>The Inverted Knowledge Pyramid</h2>
      <p>Today, the bottleneck is no longer access to information; it is the discipline of attention. Lectures from the world's most brilliant Nobel laureates, open-source repositories, and peer-reviewed papers are available for free to anyone with an internet connection.</p>

      <h2>The Autodidact's Playbook</h2>
      <ul class="article-list">
        <li><strong>Project-Based Learning:</strong> Don't read books passively. Build something tangible—a website, a research paper, an open-source tool—that forces you to apply theories immediately.</li>
        <li><strong>The Feynman Technique:</strong> Explain complex ideas in simple, jargon-free language to a novice. If you cannot explain it simply, you do not truly understand it.</li>
        <li><strong>Public Accountability:</strong> Document your journey in public essays and code repositories. Sharing what you learn attracts mentors and peers.</li>
      </ul>

      <div class="takeaway-box">
        <h3>Summary</h3>
        <p>Your degree is a timestamp of what you once studied; your learning habit is the engine of what you are capable of becoming tomorrow.</p>
      </div>
    `
  },
  {
    id: 6,
    title: "Small Habits That Create Big Changes: The Science of Tiny Compounding",
    category: "Personal Growth",
    description: "Radical life transformations rarely occur overnight. Discover how micro-habits and 1% daily increments compound into profound breakthroughs.",
    author: {
      name: "Aria Thorne",
      role: "Behavioral Psychologist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      bio: "Specializing in habit loops, cognitive performance, and sustainable personal growth."
    },
    date: "Sep 09, 2026",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: true,
    likes: 630,
    bookmarks: 310,
    quote: "You do not rise to the level of your goals; you fall to the level of your systems.",
    content: `
      <p class="lead-text">Every January, millions of well-intentioned people attempt monumental overhauls. They vow to run five miles daily, cut out all sugar, read fifty books a month, and wake up at dawn. By February, more than eighty percent have abandoned their ambitions.</p>

      <h2>The Delusion of Dramatic Overhauls</h2>
      <p>Our brains are wired for homeostasis. When we introduce a massive, jarring disruption to our routines, the amygdala flags it as a threat, triggering resistance and willpower fatigue. Willpower is a finite battery; identity and friction design are renewable energy.</p>

      <h2>The Mathematics of 1% Compounding</h2>
      <p>If you improve by just one percent every day for a single year, you end up 37 times better by year's end. Conversely, declining by one percent daily degrades your baseline almost to zero.</p>

      <ul class="article-list">
        <li><strong>Make it Ridiculously Small:</strong> Instead of "read for an hour", start with "read two pages before closing your eyes".</li>
        <li><strong>Habit Stacking:</strong> Anchor the new behavior directly to an existing automatic cue. <em>After I brew my morning tea, I will write down three priorities.</em></li>
        <li><strong>Friction Optimization:</strong> Prepare your environment the night before. Place your notebook open on your desk with a favorite pen.</li>
      </ul>

      <div class="takeaway-box">
        <h3>Daily Rule</h3>
        <p>Never break the chain twice. Missing one day is an accident; missing two is the beginning of a new habit.</p>
      </div>
    `
  },
  {
    id: 7,
    title: "The Architecture of Digital Simplicity: Why Less Code Means More Focus",
    category: "Technology",
    description: "Exploring the aesthetic beauty of lightweight engineering, zero-dependency philosophy, and why intentional constraints foster true elegance.",
    author: {
      name: "Marcus Vance",
      role: "Principal Tech Essayist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      bio: "Covering the intersection of artificial intelligence, human agency, and societal design."
    },
    date: "Sep 05, 2026",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: false,
    likes: 312,
    bookmarks: 140,
    quote: "Simplicity is prerequisite for reliability. Complex systems always fail in complex ways.",
    content: `
      <p class="lead-text">Modern web development often feels burdened by its own weight. A simple portfolio or content publication frequently pulls in gigabytes of node dependencies, multiple transpilers, and complicated hydration cycles.</p>

      <h2>Rediscovering the Vanilla Foundation</h2>
      <p>HTML, CSS, and modern vanilla JavaScript have evolved remarkably. With native CSS Grid, Flexbox, custom properties, modern fetch APIs, and semantic tags, developers can build breathtaking, blazing-fast interfaces with zero external compilation overhead.</p>

      <p>When you build close to the web platform, your applications load instantly, consume minimal battery, and remain maintainable for decades without fear of dependency rot.</p>

      <h2>The Principles of Craftsmanship</h2>
      <ul class="article-list">
        <li><strong>Lightweight Footprint:</strong> Zero megabytes of JS framework bundles means your pages render smoothly on any device across the globe.</li>
        <li><strong>Semantic Integrity:</strong> Accessible by design, friendly to screen readers, and naturally discoverable by search engines.</li>
        <li><strong>Aesthetic Restraint:</strong> Focus on typography, breathing room, and micro-interactions rather than bloated visual gimmicks.</li>
      </ul>

      <div class="takeaway-box">
        <h3>Design Epiphany</h3>
        <p>Mastery is not reached when there is nothing left to add, but when there is nothing left to strip away.</p>
      </div>
    `
  },
  {
    id: 8,
    title: "The Art of Slow Wandering: Finding Stillness in Kyoto's Old Alleys",
    category: "Travel",
    description: "A sensory journey through stone lantern paths, moss temples, and the serene tea traditions of Japan's ancient imperial capital.",
    author: {
      name: "Sienna Brooks",
      role: "Travel Journalist & Photographer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      bio: "Documenting hidden landscapes, sustainable wandering, and local cultures around the world."
    },
    date: "Aug 29, 2026",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: false,
    likes: 388,
    bookmarks: 167,
    quote: "In the silence between temple bells, the noisy mind finally learns how to listen.",
    content: `
      <p class="lead-text">Kyoto is not a city that yields its treasures to the hurried tourist. If you rush between the famous golden pavilions with a selfie stick, you will miss the essence of what has made this sanctuary sacred for over a thousand years.</p>

      <h2>The Path of Philosophy at Dawn</h2>
      <p>Waking before sunrise allows you to walk the Tetsugaku-no-Michi (Philosopher's Walk) when the only sound is the gentle murmur of the canal water flowing past stone banks and cherry boughs. Here, 20th-century philosopher Nishida Kitaro practiced daily meditation in motion.</p>

      <h2>The Sacred Architecture of Tea</h2>
      <p>Entering a traditional chashitsu (tea room) requires bowing your head to pass through a modest, low entryway (nijiriguchi). Regardless of your social status or wealth, all who enter become equals before the hot kettle and the bamboo whisk.</p>

      <ul class="article-list">
        <li><strong>Wabi-Sabi Aesthetics:</strong> Finding profound beauty in imperfection, asymmetry, and weathered surfaces.</li>
        <li><strong>Karesansui Dry Gardens:</strong> Raked white gravel and moss stones that invite contemplative silence.</li>
        <li><strong>Seasonal Reverence:</strong> Savoring seasonal wagashi sweets that reflect the fleeting bloom of maple or plum blossoms.</li>
      </ul>

      <div class="takeaway-box">
        <h3>Travel Wisdom</h3>
        <p>The true traveler is not someone who travels far, but someone who knows how to dwell deeply wherever their feet are planted.</p>
      </div>
    `
  },
  {
    id: 9,
    title: "The Curated Home: Designing Spaces That Breathe and Inspire",
    category: "Lifestyle",
    description: "Interior minimalism is not about empty white walls; it is about filling your space only with objects that carry story, texture, and emotional resonance.",
    author: {
      name: "Claire Dupont",
      role: "Design Critic & Creative Director",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      bio: "Curating conversations around aesthetic philosophy, typography, and original thinking."
    },
    date: "Aug 22, 2026",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: false,
    likes: 412,
    bookmarks: 184,
    quote: "Your home should be the antidote to modern chaos, not its storage container.",
    content: `
      <p class="lead-text">We live in an age of sensory overload. When you return home at the end of a demanding day, does your environment nourish you, or does it whisper an unending list of chores and clutter to be managed?</p>

      <h2>Beyond Clinical Minimalism</h2>
      <p>Many people associate minimalism with stark, sterile hospital-like spaces devoid of warmth or personality. But authentic spatial curation is the opposite of sterile: it is rich with tactile linen, warm oak timber, handcrafted pottery, and natural ambient light.</p>

      <h2>Three Steps to an Inspiring Sanctuary</h2>
      <ul class="article-list">
        <li><strong>The Editorial Purge:</strong> Walk through each room with a critical eye. Ask not just "is this useful?", but "does this object elevate my emotional baseline?".</li>
        <li><strong>Warm Layered Lighting:</strong> Avoid harsh overhead downlights. Instead, position gentle ambient lamps at varying heights with 2700K warm incandescent glow.</li>
        <li><strong>Bring the Living World Inside:</strong> Large leafy statement plants, dried botanicals, and raw stone bookends ground the psyche in natural rhythms.</li>
      </ul>

      <div class="takeaway-box">
        <h3>Spatial Philosophy</h3>
        <p>Space is the ultimate luxury. When you leave empty surface area on your table, you create psychological room for creative thoughts to unfold.</p>
      </div>
    `
  }
];

// Helper to get all categories
const BLOG_CATEGORIES = [
  "All",
  "Technology",
  "Travel",
  "Lifestyle",
  "Creativity",
  "Education",
  "Personal Growth"
];

// LocalStorage Keys
const STORAGE_LIKES_KEY = "inkora_blog_likes";
const STORAGE_BOOKMARKS_KEY = "inkora_blog_bookmarks";
const STORAGE_COMMENTS_KEY = "inkora_blog_comments";

/**
 * Storage helpers for likes and bookmarks
 */
function getStoredLikes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_LIKES_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveStoredLikes(likes) {
  localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(likes));
}

function getStoredBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_BOOKMARKS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveStoredBookmarks(bookmarks) {
  localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

/**
 * Blog Card Generator (HTML element string)
 */
function createBlogCard(blog) {
  const userLikes = getStoredLikes();
  const isLiked = !!userLikes[blog.id];
  const userBookmarks = getStoredBookmarks();
  const isBookmarked = userBookmarks.includes(blog.id);
  const currentLikes = blog.likes + (isLiked ? 1 : 0);

  return `
    <article class="blog-card" data-id="${blog.id}" data-category="${blog.category}">
      <div class="card-media">
        <a href="blog.html?id=${blog.id}" class="card-image-link" aria-label="${blog.title}">
          <img 
            src="${blog.image}" 
            alt="${blog.title}" 
            class="card-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='images/placeholder.svg';" 
          />
        </a>
        <span class="category-pill">${blog.category}</span>
        <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                onclick="toggleBookmark(event, ${blog.id})" 
                aria-label="${isBookmarked ? 'Remove bookmark' : 'Bookmark this story'}" 
                title="${isBookmarked ? 'Bookmarked' : 'Bookmark story'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
      
      <div class="card-content">
        <div class="card-meta">
          <span class="meta-date">${blog.date}</span>
          <span class="meta-divider">•</span>
          <span class="meta-time">${blog.readingTime}</span>
        </div>
        
        <h3 class="card-title">
          <a href="blog.html?id=${blog.id}">${blog.title}</a>
        </h3>
        
        <p class="card-desc">${blog.description}</p>
        
        <div class="card-footer">
          <div class="author-info">
            <img 
              src="${blog.author.avatar}" 
              alt="${blog.author.name}" 
              class="author-avatar" 
              onerror="this.onerror=null; this.src='images/author-1.svg';" 
            />
            <div class="author-details">
              <span class="author-name">${blog.author.name}</span>
              <span class="author-role">${blog.author.role}</span>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="card-like-btn ${isLiked ? 'active' : ''}" 
                    onclick="toggleCardLike(event, ${blog.id})" 
                    aria-label="Like story">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span class="like-count">${currentLikes}</span>
            </button>
            <a href="blog.html?id=${blog.id}" class="read-more-link">
              <span>Read</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Trending Card Generator
 */
function createTrendingCard(blog, rank) {
  return `
    <article class="trending-card">
      <div class="trending-rank">0${rank}</div>
      <div class="trending-content">
        <div class="trending-meta">
          <span class="trending-category">${blog.category}</span>
          <span class="meta-divider">•</span>
          <span class="meta-time">${blog.readingTime}</span>
        </div>
        <h4 class="trending-title">
          <a href="blog.html?id=${blog.id}">${blog.title}</a>
        </h4>
        <div class="trending-author">
          <span>By ${blog.author.name}</span>
          <span class="meta-divider">•</span>
          <span>${blog.date}</span>
        </div>
      </div>
    </article>
  `;
}

/**
 * Like Toggle from card or list
 */
function toggleCardLike(event, blogId) {
  event.preventDefault();
  event.stopPropagation();
  const likes = getStoredLikes();
  const isLiked = !!likes[blogId];
  
  if (isLiked) {
    delete likes[blogId];
    if (window.showToast) window.showToast("Removed like from story", "info");
  } else {
    likes[blogId] = true;
    if (window.showToast) window.showToast("Story added to liked stories ❤️", "success");
  }
  saveStoredLikes(likes);

  // Update UI everywhere on page
  document.querySelectorAll(`.blog-card[data-id="${blogId}"] .card-like-btn`).forEach(btn => {
    btn.classList.toggle('active', !isLiked);
    const countSpan = btn.querySelector('.like-count');
    const blog = BLOGS_DATA.find(b => b.id === blogId);
    if (countSpan && blog) {
      countSpan.textContent = blog.likes + (!isLiked ? 1 : 0);
    }
  });

  // If on details page
  const detailLikeBtn = document.getElementById('blogDetailLikeBtn');
  if (detailLikeBtn && detailLikeBtn.dataset.id == blogId) {
    detailLikeBtn.classList.toggle('active', !isLiked);
    const countSpan = detailLikeBtn.querySelector('.like-count');
    const blog = BLOGS_DATA.find(b => b.id === blogId);
    if (countSpan && blog) {
      countSpan.textContent = blog.likes + (!isLiked ? 1 : 0);
    }
  }
}

/**
 * Bookmark Toggle
 */
function toggleBookmark(event, blogId) {
  event.preventDefault();
  event.stopPropagation();
  let bookmarks = getStoredBookmarks();
  const isBookmarked = bookmarks.includes(blogId);

  if (isBookmarked) {
    bookmarks = bookmarks.filter(id => id !== blogId);
    if (window.showToast) window.showToast("Story removed from your bookmarks", "info");
  } else {
    bookmarks.push(blogId);
    if (window.showToast) window.showToast("Story saved to your reading list 🔖", "success");
  }
  saveStoredBookmarks(bookmarks);

  // Update all instances
  document.querySelectorAll(`.blog-card[data-id="${blogId}"] .bookmark-btn`).forEach(btn => {
    btn.classList.toggle('active', !isBookmarked);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', !isBookmarked ? 'currentColor' : 'none');
  });

  const detailBookmarkBtn = document.getElementById('blogDetailBookmarkBtn');
  if (detailBookmarkBtn && detailBookmarkBtn.dataset.id == blogId) {
    detailBookmarkBtn.classList.toggle('active', !isBookmarked);
    const svg = detailBookmarkBtn.querySelector('svg');
    if (svg) svg.setAttribute('fill', !isBookmarked ? 'currentColor' : 'none');
  }
}

/**
 * Share Story helper
 */
function shareBlog(blog) {
  const shareData = {
    title: blog.title,
    text: blog.description,
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    // Copy link to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      if (window.showToast) window.showToast("Story link copied to clipboard! 📋", "success");
    }).catch(() => {
      if (window.showToast) window.showToast("Could not copy link automatically.", "warning");
    });
  }
}

/**
 * Comments Handler for Blog Details Page
 */
function getBlogComments(blogId) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_COMMENTS_KEY)) || {};
    return all[blogId] || [
      {
        id: "c1",
        author: "Sophia Sterling",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        date: "2 days ago",
        text: "This resonates so deeply with my current journey. The perspective on intentional craft is something we desperately need more of."
      },
      {
        id: "c2",
        author: "Devon Reed",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        date: "1 day ago",
        text: "Beautifully articulated. Bookmarked this to revisit whenever I feel overwhelmed by digital noise."
      }
    ];
  } catch (e) {
    return [];
  }
}

function saveBlogComment(blogId, commentObj) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_COMMENTS_KEY)) || {};
    if (!all[blogId]) all[blogId] = getBlogComments(blogId);
    all[blogId].unshift(commentObj);
    localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error("Error saving comment:", e);
  }
}

// Global scope export for other scripts
window.INKORA_BLOGS = {
  data: BLOGS_DATA,
  categories: BLOG_CATEGORIES,
  createBlogCard,
  createTrendingCard,
  toggleCardLike,
  toggleBookmark,
  shareBlog,
  getBlogComments,
  saveBlogComment
};
