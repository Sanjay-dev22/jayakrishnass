// Central content for the academic portfolio.
// All facts sourced from Dr Jayakrishna S S's profile + uploaded research material.

import nematode from "@/assets/proj-nematode.jpg";
import algae from "@/assets/proj-algae.jpg";
import rhizopus from "@/assets/proj-rhizopus.jpg";
import drone from "@/assets/proj-drone.jpg";
import stomata from "@/assets/proj-stomata.jpg";
import strawberry from "@/assets/proj-strawberry.jpg";

export const PROFILE = {
  name: "Dr Jayakrishna S S",
  title: "AI Researcher · Phytopathology & Computer Vision",
  email: "jayakrishnascientist@gmail.com",
  scholar: "https://scholar.google.com/citations?user=vaXil9UAAAAJ&hl=en",
  orcid: "https://orcid.org/0000-0002-5906-9163",
  linkedin: "https://www.linkedin.com/in/dr-jayakrishna-s-s-b1811a27a/",
  affiliation: "Postdoctoral Researcher, Indian Institute of Technology Delhi",
} as const;

export const HIGHLIGHTS = [
  { value: "5+", label: "Indexed journal papers" },
  { value: "8.9", label: "Highest impact factor" },
  { value: "4", label: "Research domains" },
  { value: "2025", label: "PhD, VIT" },
];

export const DOMAINS = [
  {
    title: "Computer Vision for Plant Pathology",
    body: "Deep-learning pipelines that detect micro-parasites, fungi and disease lesions directly from microscope and field imagery.",
  },
  {
    title: "Crop Stress Prediction",
    body: "Real-time AI models that infer biotic and abiotic stress from leaf, stomata and canopy signals.",
  },
  {
    title: "Biodiversity Monitoring",
    body: "Drone, remote-sensing and georeferenced datasets fused into AI pipelines for forest health assessment.",
  },
  {
    title: "Sustainable Agriculture AI",
    body: "Decision-support tools that translate lab-grade microbiology into farmer-facing diagnostics.",
  },
];

export type ResearchProject = {
  slug: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  doi?: string;
  image: string;
  year: string;
  domain: string;
};

export const PROJECTS: ResearchProject[] = [
  {
    slug: "nematode",
    title: "Pathogenic nematode detection in banana crops",
    problem:
      "Banana pseudostem nematodes spread silently from soil into vascular tissue, causing yield loss before symptoms appear.",
    approach:
      "An AI vision pipeline that classifies infectious morphology across larval stages from microscope imagery.",
    result:
      "Stage-wise nematode identification enabling pre-symptomatic intervention in the field.",
    doi: "https://doi.org/10.1016/j.compag.2025.110277",
    image: nematode,
    year: "2025",
    domain: "Computer Vision · Phytopathology",
  },
  {
    slug: "algae",
    title: "DAD-YOLO for harmful algae in irrigation water",
    problem:
      "Contaminated river water used for large-scale irrigation introduces toxic algal blooms into farmland.",
    approach:
      "DAD-YOLO — a domain-adapted detector — quantifies harmful algal species in turbid water samples.",
    result:
      "Predicts environmental impact in near real time, enabling safer irrigation decisions.",
    doi: "https://doi.org/10.1016/j.jwpe.2025.107439",
    image: algae,
    year: "2025",
    domain: "Computer Vision · Water Quality",
  },
  {
    slug: "rhizopus",
    title: "Slowed ripening activates Botrytis & Rhizopus on strawberries",
    problem:
      "Cold-chain ripening delays unexpectedly accelerate Botrytis cinerea and Rhizopus mycelium colonisation.",
    approach:
      "An AI-based SSFI model inspects spore proliferation directly from postharvest microscopy.",
    result:
      "Quantitative early warning for postharvest fungal spoilage in frozen produce.",
    doi: "https://doi.org/10.1016/j.postharvbio.2025.113984",
    image: rhizopus,
    year: "2026",
    domain: "Postharvest Biology",
  },
  {
    slug: "electric-field",
    title: "Electric-field treatment for pathogen eradication",
    problem:
      "Chemical pesticides erode soil microbiomes and resist sustainable scaling.",
    approach:
      "AI-validated study of electric-field treatments as a pathogen-eradicating, yield-boosting agronomic strategy.",
    result:
      "Game-changing sustainable energy strategy validated on living crops.",
    doi: "https://doi.org/10.1016/j.nexus.2025.100438",
    image: drone,
    year: "2025",
    domain: "Sustainable Agriculture",
  },
  {
    slug: "stomata",
    title: "Banana leaf stomata detection from bright-field microscopy",
    problem:
      "Stomatal density and aperture are critical phenotypes — but counting them by hand is slow and error-prone.",
    approach:
      "An enhanced deep-learning workflow detects stomata across noisy bright-field microscopy.",
    result:
      "Automated stomata phenotyping at scale for plant physiology research.",
    doi: "https://ieeexplore.ieee.org/abstract/document/10574610",
    image: stomata,
    year: "2024",
    domain: "Plant Phenomics",
  },
  {
    slug: "mango-anthracnose",
    title: "Classifying anthracnose-infected mango leaves",
    problem:
      "Anthracnose disease severely impacts mango yields and is hard to grade visually in the field.",
    approach:
      "Deep-learning classifier trained on field-collected mango leaf imagery.",
    result:
      "Reliable infection classification deployable to mobile devices.",
    doi: "https://ieeexplore.ieee.org/abstract/document/9418383/",
    image: strawberry,
    year: "2021",
    domain: "Field Diagnostics",
  },
];

export const JOURNALS = [
  {
    title:
      "Unveiling the infectious morphological behaviour of banana crop pathogenic nematodes inhabited from soil medium to pseudostem using an artificial intelligence approach",
    venue: "Computers and Electronics in Agriculture",
    citation: "234, 110277",
    impact: "8.9",
    doi: "https://doi.org/10.1016/j.compag.2025.110277",
    year: "2025",
  },
  {
    title:
      "DAD-YOLO as a novel computer vision tool to predict the environmental impact of harmful algae presence in contaminated river water employed for large-scale irrigation to agricultural field",
    venue: "Journal of Water Process Engineering",
    citation: "71, 107439",
    impact: "6.8",
    doi: "https://doi.org/10.1016/j.jwpe.2025.107439",
    year: "2025",
  },
  {
    title:
      "Unveiling the effects of electric field treatments on crop cultivation: a game-changing sustainable energy strategy for plant pathogen eradication and boosting yield growth in agriculture, validated with an artificial intelligence approach",
    venue: "Energy Nexus",
    citation: "18, 100438",
    impact: "9.5",
    doi: "https://doi.org/10.1016/j.nexus.2025.100438",
    year: "2025",
  },
  {
    title:
      "Slowing down the ripening process of frozen strawberries activates Botrytis Cinerea and Rhizopus mycelium fungus: Inspect through AI-based SSFI model",
    venue: "Postharvest Biology and Technology",
    citation: "232, 113984",
    impact: "6.8",
    doi: "https://doi.org/10.1016/j.postharvbio.2025.113984",
    year: "2026",
  },
  {
    title:
      "Artificial intelligence approach for diagnosing banana crop diseases through image processing framework: an insightful survey journey from farmers field to digital cloud",
    venue: "Archives of Phytopathology and Plant Protection",
    citation: "57(3), 163–199",
    impact: "1.0",
    doi: "https://doi.org/10.1080/03235408.2024.2347966",
    year: "2024",
  },
];

export const CONFERENCES = [
  {
    title:
      "Classification of Mango Leaves Infected by Fungal Disease Anthracnose Using Deep Learning",
    venue: "IEEE",
    doi: "https://ieeexplore.ieee.org/abstract/document/9418383/",
    year: "2021",
  },
  {
    title:
      "An Enhanced Deep-Learning-Based Workflow for Detection of Banana Leaf Stomata from Bright-field Microscopic Images",
    venue: "IEEE",
    doi: "https://ieeexplore.ieee.org/abstract/document/10574610",
    year: "2024",
  },
];

export const TIMELINE = [
  {
    period: "Present",
    role: "Postdoctoral Researcher",
    place: "Indian Institute of Technology Delhi (IIT Delhi)",
    detail: "AI for biodiversity monitoring",
  },
  {
    period: "2020 — 2025",
    role: "PhD",
    place: "Vellore Institute of Technology",
    detail: "Artificial Intelligence in Phytopathology",
  },
  {
    period: "2017 — 2019",
    role: "M.Tech",
    place: "Coimbatore Institute of Technology",
    detail: "Embedded and Real-Time Systems",
  },
  {
    period: "2014 — 2017",
    role: "B.Tech",
    place: "Anna University",
    detail: "Electrical and Electronics Engineering",
  },
];

export const SKILLS = [
  "Deep Learning",
  "Computer Vision",
  "YOLO / Detection",
  "PyTorch",
  "Microscopy AI",
  "Remote Sensing",
  "Geospatial AI",
  "Drone Pipelines",
  "Embedded Systems",
  "Edge Inference",
  "Image Segmentation",
  "Phenotyping",
];
