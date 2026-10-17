export interface Project {
  id: string;
  title: string;
  category: 'AI & Machine Learning' | 'Robotics & Hardware' | 'Web Development' | 'Programming' | 'Creative & Music' | 'Data' | 'Electronics & Hardware';
  description: string;
  tags: string[];
  status: 'Completed' | 'In Progress' | 'Concept (Placeholder)';
  featured?: boolean;
  highlights: string[];
  image: string;
  link?: string;
  github?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  category: 'Poster' | 'Portrait' | 'Concept' | 'Community';
  description: string;
  aspectRatio: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  genre: string;
  duration: number; // in seconds
  durationFormatted: string;
  src: string;
  key: string;
  tempo: number;
  description: string;
}

export interface YouTubeItem {
  id: string;
  title: string;
  type: 'Video' | 'Shorts';
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  views?: string;
}

export const PORTFOLIO_INFO = {
  name: 'Shreyas Chaturvedi',
  title: 'Student • Innovator • Creative Technologist',
  tagline: 'Bridging the realms of Logic, Artificial Intelligence, Robotics & Music',
  bio: 'A curious student driven by deep passion for programming, web development, artificial intelligence, robotics, and electronics. I love solving algorithmic puzzles, handling data, building hardware prototypes, and exploring the creative harmony between mathematics and music.',
  location: 'India',
  status: 'Student & Lifelong Learner',
  avatarImage: '/shreyas-original-portrait.png',
  posterImage: '/shreyas-opening-poster.png',
  cinematicImage: '/shreyas-cinematic-portrait.png',
  hairConceptImage: '/shreyas-hairstyle-edited-concept.png',
  youtubeChannelUrl: 'https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR',
  domains: [
    'Programming & Algorithms',
    'Full-Stack Web Development',
    'Artificial Intelligence & ML',
    'Robotics & Embedded Systems',
    'Electronics & Circuit Design',
    'Data Handling & Analytics',
    'Logical Problem Solving',
    'Music & Creative Production',
  ],
  socialPlaceholders: {
    github: 'https://github.com/shreyas-chaturvedi',
    youtube: 'https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR',
    linkedin: 'https://linkedin.com/in/shreyas-chaturvedi',
    email: 'shreyas.chaturvedi.contact@example.com',
  },
};

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'poster-1',
    title: 'Ornate Royal Poster',
    subtitle: 'The Grand Opening Visual',
    src: '/shreyas-opening-poster.png',
    category: 'Poster',
    description: 'An ornate circular design featuring golden sacred mandalas, royal crown, flying white doves, glowing pink-cyan neon rim lighting, and elegant calligraphy.',
    aspectRatio: '1:1',
  },
  {
    id: 'cinematic-1',
    title: 'The Cinematic Dhurandhar',
    subtitle: 'Atmospheric Stylized Portrait',
    src: '/shreyas-cinematic-portrait.png',
    category: 'Portrait',
    description: 'A dramatic cinematic visual concept featuring a textured leather jacket, dark sunglasses, and glowing embers amidst architectural shadows.',
    aspectRatio: '9:16',
  },
  {
    id: 'original-1',
    title: 'Authentic Student Portrait',
    subtitle: 'Original Photograph',
    src: '/shreyas-original-portrait.png',
    category: 'Portrait',
    description: 'Original authentic photograph of Shreyas with his genuine smile, backpack, and natural appearance.',
    aspectRatio: '4:3',
  },
  {
    id: 'hair-1',
    title: 'Styled Hair Concept',
    subtitle: 'Exploratory Hairstyle Visual Concept',
    src: '/shreyas-hairstyle-edited-concept.png',
    category: 'Concept',
    description: 'A creative conceptual visual exploring modern textured hairstyle styling while preserving natural facial identity.',
    aspectRatio: '4:3',
  },
];

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'track-1',
    title: 'Dil Pe Zakhm Khate Hain',
    subtitle: 'Soulful Ghazal & Classical Ballad',
    artist: 'Original Selection',
    genre: 'Ghazal / Sufi Fusion',
    duration: 330,
    durationFormatted: '5:30',
    src: '/audio/track1.wav',
    key: 'D Minor',
    tempo: 78,
    description: 'A deeply moving poetic ballad blending acoustic strings, tabla beats, and expressive soulful melody.',
  },
  {
    id: 'track-2',
    title: 'Aa Jaawe Aa Jaa (Sajana)',
    subtitle: 'Folk Rhythm & Electronic Groove',
    artist: 'Original Selection',
    genre: 'Punjabi Folk / Contemporary Beat',
    duration: 254,
    durationFormatted: '4:14',
    src: '/audio/track2.wav',
    key: 'C Major',
    tempo: 104,
    description: 'An uplifting energetic Sufi-folk fusion driven by dholak grooves, harmonium lead, and infectious rhythm.',
  },
  {
    id: 'track-3',
    title: 'Tu Ne Parda Uthaya (Naina Ladaawaan)',
    subtitle: 'Romantic Ghazal & Acoustic Melody',
    artist: 'Original Selection',
    genre: 'Semi-Classical Romance',
    duration: 224,
    durationFormatted: '3:44',
    src: '/audio/track3.wav',
    key: 'G Major',
    tempo: 84,
    description: 'A melodious romantic acoustic piece with tender guitar strums, flute interludes, and soulful lyrical phrasing.',
  },
  {
    id: 'track-4',
    title: 'Jo Tere Sang Kaati Raaten',
    subtitle: 'Emotional Bollywood Pop-Rock Ballad',
    artist: 'Original Selection',
    genre: 'Pop / Emotional Rock',
    duration: 307,
    durationFormatted: '5:07',
    src: '/audio/track4.wav',
    key: 'A Minor',
    tempo: 92,
    description: 'A poignant and stirring ballad featuring resonant acoustic arpeggios, dynamic percussive beats, and evocative harmonies.',
  },
];

export const YOUTUBE_CHANNEL_ITEMS: YouTubeItem[] = [
  {
    id: 'yt-1',
    title: '3D Pen Unboxing & Creative Gadget Exploration ✍️',
    type: 'Video',
    category: 'Creative Tech & Unboxing',
    duration: '06:15',
    thumbnail: '/shreyas-original-portrait.png',
    videoUrl: 'https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR',
    description: 'Unboxing and testing the creative 3D printing pen, drawing 3D structures and exploring gadget mechanics.',
    views: 'Featured Upload',
  },
  {
    id: 'yt-2',
    title: 'Gomti Riverfront & Marine Drive Lucknow Tour 🌊',
    type: 'Video',
    category: 'Explore & Travel Vlog',
    duration: '08:42',
    thumbnail: '/shreyas-cinematic-portrait.png',
    videoUrl: 'https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR',
    description: 'Exploring the vibrant architectural landscapes and evening lights along the Gomti Riverfront in Lucknow.',
    views: 'Popular Vlog',
  },
  {
    id: 'yt-3',
    title: 'Badminton Fun Match & Outdoor Sports Moments 🏸',
    type: 'Video',
    category: 'Sports & Personal Life',
    duration: '04:50',
    thumbnail: '/shreyas-hairstyle-edited-concept.png',
    videoUrl: 'https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR',
    description: 'Energetic weekend badminton rally and sportsmanship fun with family and friends.',
    views: 'Community Favorite',
  },
  {
    id: 'yt-4',
    title: 'Scenic Mountain & Train Journey Highlights 🚂',
    type: 'Shorts',
    category: 'Travel Shorts',
    duration: '00:58',
    thumbnail: '/shreyas-opening-poster.png',
    videoUrl: 'https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR',
    description: 'Breathtaking train journey passing through misty mountain ranges, bridges, and winding rail tracks. #journey #train',
    views: 'Shorts Highlight',
  },
  {
    id: 'yt-5',
    title: 'Underwater World: Amazing Fishes & Coral Aquarium 🐠',
    type: 'Shorts',
    category: 'Nature Shorts',
    duration: '00:45',
    thumbnail: '/shreyas-original-portrait.png',
    videoUrl: 'https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR',
    description: 'Vibrant tropical fishes gliding through luminous coral reef aquariums. #shorts #wondersverse',
    views: 'Shorts Highlight',
  },
  {
    id: 'yt-6',
    title: 'Manautiyon Ke Raja & Cultural Heritage Exploration 🛕',
    type: 'Shorts',
    category: 'Culture & Heritage',
    duration: '00:52',
    thumbnail: '/shreyas-cinematic-portrait.png',
    videoUrl: 'https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR',
    description: 'Exploring the grand spiritual architecture and historic heritage of Lucknow. #explore #culture',
    views: 'Shorts Highlight',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Autonomous Line-Following & Obstacle Rover',
    category: 'Robotics & Hardware',
    description: 'An autonomous robotic vehicle engineered using Arduino, IR sensor arrays, and ultrasonic distance sensors with PID motor control logic.',
    tags: ['Robotics', 'Arduino', 'C++', 'PID Control', 'Sensors'],
    status: 'In Progress',
    featured: true,
    image: '/shreyas-original-portrait.png',
    highlights: [
      'Dual-loop differential drive with calibrated IR reflectance array',
      'Ultrasonic obstacle avoidance routine with safety braking',
      'Custom acrylic chassis with motor driver H-bridge wiring',
    ],
    github: 'https://github.com/shreyas-chaturvedi/autonomous-rover-prototype',
  },
  {
    id: 'proj-2',
    title: 'Cinematic Personal Portfolio & Audio Engine',
    category: 'Web Development',
    description: 'A responsive portfolio built with React, TypeScript, and HTML5 Audio featuring a simulated terminal, virtual piano, and music station.',
    tags: ['React', 'TypeScript', 'HTML5 Audio', 'Tailwind CSS', 'Canvas'],
    status: 'Completed',
    featured: true,
    image: '/shreyas-opening-poster.png',
    highlights: [
      'Direct unadulterated audio playback with 0 artificial effects',
      'Simulated CLI terminal with command parser and history',
      'Dynamic HTML5 Canvas certificate generation engine',
    ],
    link: '#',
    github: 'https://github.com/shreyas-chaturvedi/cinematic-portfolio',
  },
  {
    id: 'proj-3',
    title: 'Edge AI Object Recognition & Vision System',
    category: 'AI & Machine Learning',
    description: 'An exploratory computer vision project using lightweight neural networks (MobileNet) for real-time edge detection and object tagging.',
    tags: ['Python', 'TensorFlow Lite', 'OpenCV', 'Computer Vision'],
    status: 'In Progress',
    featured: true,
    image: '/shreyas-cinematic-portrait.png',
    highlights: [
      'Optimized model inference for low-power microcontrollers',
      'Custom bounding box overlays with 30fps webcam stream',
      'Dataset curation for everyday educational objects',
    ],
    github: 'https://github.com/shreyas-chaturvedi/edge-vision-ai',
  },
  {
    id: 'proj-4',
    title: 'IoT Ambient Sensor Station',
    category: 'Electronics & Hardware',
    description: 'A multi-sensor hardware station monitoring room temperature, humidity, light intensity, and air quality via ESP32 microcontrollers.',
    tags: ['ESP32', 'IoT', 'C++', 'I2C', 'Sensors'],
    status: 'In Progress',
    image: '/shreyas-hairstyle-edited-concept.png',
    highlights: [
      'DHT22 and LDR sensor readings logged over local Wi-Fi telemetry',
      'OLED 128x64 display displaying live environmental statistics',
      'Energy-efficient deep sleep cycles for battery longevity',
    ],
  },
  {
    id: 'proj-5',
    title: 'Algorithmic Problem Solving & Data Structures Hub',
    category: 'Programming',
    description: 'A curated repository of algorithmic implementations in C++ and Python covering graph theory, dynamic programming, sorting, and recursion.',
    tags: ['Algorithms', 'Data Structures', 'C++', 'Python', 'Logic'],
    status: 'In Progress',
    image: '/shreyas-original-portrait.png',
    highlights: [
      'Solutions for classic problem solving challenges',
      'Custom implementations of Binary Search Trees and Heaps',
      'Time and space complexity benchmarks',
    ],
    github: 'https://github.com/shreyas-chaturvedi/dsa-mastery',
  },
  {
    id: 'proj-6',
    title: 'Interactive Data Analytics Dashboard',
    category: 'Data',
    description: 'A conceptual data visualization platform turning multi-dimensional datasets into intuitive interactive charts and heatmaps.',
    tags: ['Data Science', 'JavaScript', 'D3.js', 'Statistics'],
    status: 'Concept (Placeholder)',
    image: '/shreyas-cinematic-portrait.png',
    highlights: [
      'Placeholder project planned for future school science research',
      'Focuses on real-time CSV parsing and reactive chart rendering',
      'Statistical distribution analysis modules',
    ],
  },
];

export const LEARNING_JOURNEY = [
  {
    year: 'Phase 1: Foundations',
    title: 'Logic, Mathematics & Introductory Coding',
    category: 'Core Fundamentals',
    description: 'Began exploring logical deduction, mathematical puzzles, and introductory coding concepts in Python and C++.',
    skillsLearned: ['Algorithmic Thinking', 'Python Basics', 'Loops & Conditions', 'Logical Problem Solving'],
  },
  {
    year: 'Phase 2: Web & Interactive Design',
    title: 'Modern Web Development & User Interfaces',
    category: 'Software Engineering',
    description: 'Dove into modern web technologies, crafting responsive web experiences with HTML, CSS, JavaScript, and React.',
    skillsLearned: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React & State', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    year: 'Phase 3: Hardware & Circuits',
    title: 'Electronics, Microcontrollers & Robotics',
    category: 'Physical Computing',
    description: 'Constructed initial circuits with breadboards, LEDs, resistors, Arduino microcontrollers, and sensory motor drivers.',
    skillsLearned: ['Ohm’s Law & Schematics', 'Arduino C++', 'IR & Ultrasonic Sensors', 'Motor Drivers'],
  },
  {
    year: 'Phase 4: Artificial Intelligence & Data',
    title: 'Machine Learning Concepts & Vision Models',
    category: 'Emerging Tech',
    description: 'Investigating neural network principles, classification algorithms, dataset cleaning, and computer vision exploration.',
    skillsLearned: ['TensorFlow Lite', 'OpenCV', 'Data Preparation', 'Model Evaluation', 'Edge AI'],
  },
  {
    year: 'Current Horizon',
    title: 'Robotics Integration & Creative Audio Engineering',
    category: 'Ongoing Exploration',
    description: 'Combining hardware sensors, automated intelligence, and digital sound synthesis into unified creative projects.',
    skillsLearned: ['Autonomous Systems', 'HTML5 Audio Engine', 'System Architecture', 'Creative Coding'],
  },
];

export const ACHIEVEMENTS = [
  {
    id: 'ach-1',
    title: 'Robotics & Embedded Systems Workshop',
    institution: 'Student Tech Workshop',
    year: 'Recent Milestone',
    description: 'Successfully designed, built, and programmed an autonomous line-following prototype vehicle during intensive hands-on lab sessions.',
    status: 'Verified Certificate',
  },
  {
    id: 'ach-2',
    title: 'Computer Science & Algorithmic Problem Solving',
    institution: 'Self-Directed & School Curriculum',
    year: 'Ongoing',
    description: 'Consistent practice in data structures, algorithms, and logic challenges in C++ and Python.',
    status: 'Active Milestone',
  },
  {
    id: 'ach-3',
    title: 'Creative Audio & Digital Music Exploration',
    institution: 'Independent Creative Arts',
    year: '2025 - Present',
    description: 'Deep appreciation and study of semi-classical melodies, ghazals, rhythms, and audio engineering.',
    status: 'Creative Pursuit',
  },
  {
    id: 'ach-4',
    title: 'Science Fair & Innovation Showcase (Upcoming)',
    institution: 'Annual School Science & Tech Fair',
    year: 'Upcoming',
    description: 'Preparing an automated sensor-based smart rover prototype for the upcoming innovation symposium.',
    status: 'Placeholder (In Preparation)',
  },
];

// Easy, engaging questions for everyone as requested by user
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What does "AI" stand for in modern technology?',
    options: ['Artificial Intelligence', 'Automated Internet', 'Apple iPhone', 'Analog Instrument'],
    answerIndex: 0,
    explanation: 'AI stands for Artificial Intelligence — the science of training computers to perform tasks that typically require human reasoning.',
  },
  {
    id: 2,
    question: 'What is the main component called that acts as the "brain" of a computer?',
    options: ['CPU (Central Processing Unit)', 'Computer Mouse', 'Power Cable', 'Computer Monitor'],
    answerIndex: 0,
    explanation: 'The CPU (Central Processing Unit) executes instructions and carries out calculations, making it the computer’s central brain.',
  },
  {
    id: 3,
    question: 'Which popular instrument features black and white keys that produce musical notes?',
    options: ['Piano', 'Flute', 'Guitar', 'Drums'],
    answerIndex: 0,
    explanation: 'The Piano has 88 black and white keys that strike strings when pressed to produce acoustic sounds.',
  },
  {
    id: 4,
    question: 'Which programming language is famous for its simple syntax and is named after a comedy group (or a snake)?',
    options: ['Python', 'HTML', 'SQL', 'CSS'],
    answerIndex: 0,
    explanation: 'Python was created by Guido van Rossum and named after the British comedy troupe "Monty Python"!',
  },
  {
    id: 5,
    question: 'What is an Arduino or microcontroller mainly used for in robotics?',
    options: ['Reading sensors and controlling motors', 'Streaming 4K movies', 'Making phone calls', 'Baking cookies'],
    answerIndex: 0,
    explanation: 'A microcontroller reads input from sensors (like light, distance) and controls outputs like motors, LEDs, and relays.',
  },
];
