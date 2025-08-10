// Sample data
export const platforms = [
  { name: "GitHub Copilot", active: true },
  { name: "ChatGPT", active: false },
  { name: "Grok", active: false },
  { name: "Claude", active: false },
  { name: "Perplexity", active: false },
  { name: "Mistral", active: false },
  { name: "Gemini", active: false },
  { name: "Meta", active: false },
];

export const categories = [
  { name: "Developer Prompts", count: 51, active: false },
  { name: "Ethereum Developer", count: 12, active: false },
  { name: "Linux Terminal", count: 8, active: false },
  { name: "JavaScript Console", count: 15, active: false },
  { name: "Excel Sheet", count: 6, active: false },
  { name: "UX/UI Developer", count: 23, active: false },
  { name: "Cyber Security Specialist", count: 9, active: false },
  { name: "Web Design Consultant", count: 18, active: false },
  { name: "Smart Domain Name Generator", count: 4, active: false },
  { name: "Tech Reviewer", count: 7, active: false },
  { name: "Developer Relations Consultant", count: 11, active: false },
  { name: "IT Architect", count: 13, active: false },
];

export const prompts = [
  {
    id: 1,
    title: "Add Your Prompt",
    description:
      "Share your creative prompts with the community! Submit a pull request to add your prompts to the collection.",
    category: "Community",
    isSpecial: true,
    author: "Community",
    likes: 0,
  },
  {
    id: 2,
    title: "Act as an Ethereum Developer",
    description:
      "Imagine you are an experienced Ethereum developer tasked with creating a smart contract for a blockchain messenger. The objective is to save messages on the blockchain, making them readable...",
    category: "Developer",
    author: "@ethdev-2024",
    likes: 1247,
  },
  {
    id: 3,
    title: "Act as a Linux Terminal",
    description:
      "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and...",
    category: "Developer",
    author: "linuxmaster",
    likes: 892,
  },
  {
    id: 4,
    title: "Act as a JavaScript Console",
    description:
      "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique...",
    category: "Developer",
    author: "jsexpert",
    likes: 1156,
  },
  {
    id: 5,
    title: "Act as an Excel Sheet",
    description:
      "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference...",
    category: "Productivity",
    author: "excelguru",
    likes: 634,
  },
  {
    id: 6,
    title: "Act as a UX/UI Developer",
    description:
      "I want you to act as a UX/UI developer. I will provide some specific information about how a user interface or other digital product, and it will be your job to come up with creative ways to improve its user experienc...",
    category: "Design",
    author: "uxdesigner",
    likes: 789,
  },
  {
    id: 7,
    title: "Act as a Cyber Security Specialist",
    description:
      "I want you to act as a cyber security specialist. I will provide some specific information about how data is stored and shared, and it will be your job to come up with strategies for protecting this data from...",
    category: "Security",
    author: "cybersec",
    likes: 543,
  },
  {
    id: 8,
    title: "Act as a Web Design Consultant",
    description:
      "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most...",
    category: "Design",
    author: "webdesign",
    likes: 721,
  },
  {
    id: 9,
    title: "Act as a Prompt Enhancer",
    description:
      "Act as a Prompt Enhancer AI that takes user-input prompts and transforms them into more engaging, detailed, and thought-provoking questions. Describe the process you follow to enhance a prompt, the...",
    category: "AI",
    author: "promptmaster",
    likes: 1089,
  },
  {
    id: 10,
    title: "Act as a Software Quality Assurance Tester",
    description:
      "I want you to act as a software quality assurance tester for a new software application. Your job is to test the functionality and performance of the software to ensure it meets the required...",
    category: "Testing",
    author: "qatester",
    likes: 456,
  },
  {
    id: 11,
    title: "Act as a Smart Domain Name Generator",
    description:
      "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt...",
    category: "Business",
    author: "domainexpert",
    likes: 378,
  },
  {
    id: 12,
    title: "Act as a Tech Reviewer",
    description:
      "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other...",
    category: "Technology",
    author: "techreviewer",
    likes: 692,
  },
];
