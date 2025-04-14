
import { Seminar } from '../types';

export const seminars: Seminar[] = [
  {
    id: "1",
    title: "Quantum Computing: New Frontiers",
    description: "This seminar explores the latest advances in quantum computing and its potential applications in solving complex computational problems.",
    presenter: "Dr. Jane Smith",
    organization: "MIT",
    date: "5/15/2025",
    time: "2:00 PM - 4:00 PM EST",
    timeFrame: "in about 1 month",
    location: "MIT Building 32, Room 123",
    topics: ["Physics", "Computer Science"],
    agenda: [
      { time: "1:30 PM", description: "Registration and coffee" },
      { time: "2:00 PM", description: "Introduction to quantum computing principles" },
      { time: "2:45 PM", description: "Recent breakthroughs in quantum algorithms" },
      { time: "3:30 PM", description: "Q&A session" },
      { time: "4:00 PM", description: "Closing remarks" },
    ]
  },
  {
    id: "2",
    title: "CRISPR-Cas9: Ethical Implications",
    description: "A discussion on the ethical considerations surrounding gene editing technologies, with a focus on CRISPR-Cas9 and its implications for human health and society.",
    presenter: "Prof. Michael Johnson",
    organization: "Harvard University",
    date: "5/20/2025",
    time: "1:00 PM - 3:00 PM EST",
    timeFrame: "in about 1 month",
    location: "Harvard Medical School, Auditorium C",
    topics: ["Biology", "Medicine", "Ethics"],
    agenda: [
      { time: "12:30 PM", description: "Registration" },
      { time: "1:00 PM", description: "Introductory remarks and overview of CRISPR technology" },
      { time: "1:30 PM", description: "Current applications in research and medicine" },
      { time: "2:00 PM", description: "Ethical frameworks and considerations" },
      { time: "2:30 PM", description: "Panel discussion with bioethicists" },
      { time: "3:00 PM", description: "Audience Q&A and conclusion" },
    ]
  },
  {
    id: "3",
    title: "Machine Learning in Astrophysics",
    description: "This seminar will cover how machine learning techniques are revolutionizing data analysis in astrophysics, from exoplanet detection to galaxy classification.",
    presenter: "Dr. Sarah Chen",
    organization: "Caltech",
    date: "6/5/2025",
    time: "11:00 AM - 1:00 PM PST",
    timeFrame: "in about 2 months",
    location: "Caltech Cahill Center, Room 275",
    topics: ["Computer Science", "Astronomy"],
    agenda: [
      { time: "10:30 AM", description: "Check-in" },
      { time: "11:00 AM", description: "Introduction and basics of ML in astronomy" },
      { time: "11:45 AM", description: "Case studies: Exoplanet detection algorithms" },
      { time: "12:15 PM", description: "Future directions and challenges" },
      { time: "12:45 PM", description: "Q&A and networking" },
    ]
  },
  {
    id: "4",
    title: "Climate Change: Latest Models and Predictions",
    description: "An overview of the most recent climate models and their predictions for global climate patterns over the next century, with a focus on mitigation strategies.",
    presenter: "Dr. Robert Martinez",
    organization: "Stanford University",
    date: "6/12/2025",
    time: "3:00 PM - 5:00 PM PST",
    timeFrame: "in about 2 months",
    location: "Stanford School of Earth Sciences, Room 101",
    topics: ["Environmental Science", "Climatology"],
    agenda: [
      { time: "2:30 PM", description: "Welcome and introductions" },
      { time: "3:00 PM", description: "Review of IPCC AR6 findings" },
      { time: "3:45 PM", description: "New climate modeling approaches" },
      { time: "4:15 PM", description: "Regional climate predictions" },
      { time: "4:45 PM", description: "Discussion and conclusion" },
    ]
  },
  {
    id: "5",
    title: "Neuroscience of Consciousness",
    description: "This talk will explore the neural correlates of consciousness and recent breakthroughs in understanding how the brain generates conscious experience.",
    presenter: "Prof. Emily Wilson",
    organization: "UCLA",
    date: "7/8/2025",
    time: "10:00 AM - 12:00 PM PST",
    timeFrame: "in 3 months",
    location: "UCLA Neuroscience Research Building, Auditorium",
    topics: ["Neuroscience", "Psychology"],
    agenda: [
      { time: "9:30 AM", description: "Registration" },
      { time: "10:00 AM", description: "Introduction to theories of consciousness" },
      { time: "10:45 AM", description: "Neural correlates and imaging studies" },
      { time: "11:30 AM", description: "Q&A and discussion" },
    ]
  },
  {
    id: "6",
    title: "Advances in Nuclear Fusion",
    description: "A discussion of recent breakthroughs in nuclear fusion research and the path toward sustainable fusion energy production.",
    presenter: "Dr. Daniel Kim",
    organization: "Princeton University",
    date: "7/15/2025",
    time: "2:30 PM - 4:30 PM EST",
    timeFrame: "in 3 months",
    location: "Princeton Plasma Physics Laboratory, Conference Room A",
    topics: ["Physics", "Energy"],
    agenda: [
      { time: "2:00 PM", description: "Sign-in and refreshments" },
      { time: "2:30 PM", description: "Current state of fusion research" },
      { time: "3:15 PM", description: "ITER project updates" },
      { time: "3:45 PM", description: "Alternative approaches to fusion" },
      { time: "4:15 PM", description: "Conclusion and future outlook" },
    ]
  }
];
