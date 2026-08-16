import { PipelineAsset, PlatformCapability, Publication, ImpactStat, LabLocation, MolecularTarget } from '../types';

export const PIPELINE_ASSETS: PipelineAsset[] = [
  {
    id: 'sb-402',
    code: 'SB-402',
    name: 'Atropos-KRAS',
    target: 'KRAS G12D',
    targetFull: 'Kirsten Rat Sarcoma Viral Oncogene Homolog (G12D mutant allele)',
    therapeuticArea: 'Oncology',
    phase: 'Phase II',
    phaseProgress: 68,
    indication: 'Non-Small Cell Lung & Colorectal Carcinoma',
    modality: 'Epigenetic Transcriptional Silencer (dCas12-KRAB)',
    deliveryMethod: 'Targeted LNP (Lipid Nanoparticle with EGFR homing peptide)',
    description: 'First-in-class chromatin-remodeling therapy that selectively installs repressive H3K9me3 marks on the mutated KRAS G12D locus, achieving permanent transcriptional shutdown without DNA double-strand breaks.',
    mechanismSummary: 'Selective epigenetic methylation of promoter CpG islands causing selective 98.7% downregulation of oncogenic transcription.',
    bindingAffinity: '0.018 nM Kd',
    structureResolution: '0.74 Å',
    safetyMargin: '>320x Therapeutic Index',
    partnerOrRights: 'Wholly Owned Global Rights',
    milestones: [
      { year: '2024 Q2', event: 'First Patient Dosed (Phase I Escalation)', completed: true },
      { year: '2025 Q1', event: 'Primary Safety & PK Endpoints Met (0 DLTs)', completed: true },
      { year: '2025 Q4', event: 'Initiation of Global Phase II Expansion Cohort', completed: true },
      { year: '2026 Q3', event: 'Interim Overall Response Rate (ORR) Data Readout', completed: false },
    ],
    keyDataPoints: [
      { label: 'ORR (Phase Ib)', value: '64.3%', subtext: 'Confirmed partial/complete tumor regression' },
      { label: 'Circulating Tumor DNA', value: '-89.2%', subtext: 'Median reduction by week 6' },
      { label: 'Off-Target Cleavage', value: '0.000%', subtext: 'Validated by deep CIRCLE-seq' },
    ]
  },
  {
    id: 'sb-819',
    code: 'SB-819',
    name: 'NeuroShield-Tau',
    target: 'Tau-4R / PHF',
    targetFull: 'Hyperphosphorylated 4-Repeat Tau Paired Helical Filaments',
    therapeuticArea: 'Neurodegeneration',
    phase: 'Phase I',
    phaseProgress: 42,
    indication: 'Early-Stage Alzheimer’s Disease & Frontotemporal Dementia',
    modality: 'De Novo Designed Bispecific Chaperone-Engager',
    deliveryMethod: 'Blood-Brain Barrier (BBB) Transferrin Receptor Shuttle',
    description: 'Engineered macrocyclic protein that binds specifically to pathogenic beta-sheet seeds of hyperphosphorylated Tau, catalytically unzipping fibrils and routing them to microglial lysosomal degradation.',
    mechanismSummary: 'Catalytic monomerization and targeted ubiquitin-independent microglial clearance of neurotoxic oligomers.',
    bindingAffinity: '0.035 nM Kd',
    structureResolution: '0.88 Å',
    safetyMargin: '>180x vs Monomeric Tau',
    partnerOrRights: 'Co-Development Collaboration',
    milestones: [
      { year: '2024 Q3', event: 'IND Clearance & CTA Approval in EU', completed: true },
      { year: '2025 Q2', event: 'CSF Biomarker Target Engagement Demonstrated', completed: true },
      { year: '2026 Q2', event: 'Phase I Multiple Ascending Dose (MAD) Completion', completed: false },
      { year: '2027 Q1', event: 'Phase II Tau-PET Imaging Biomarker Study', completed: false },
    ],
    keyDataPoints: [
      { label: 'BBB Penetrance', value: '14.8%', subtext: 'CSF-to-serum ratio (vs 0.1% for standard mAbs)' },
      { label: 'Fibril Dissolution', value: '92.1%', subtext: 'In vitro clearance within 48h' },
      { label: 'Synaptic Density', value: '+31%', subtext: 'Preservation measured in primate models' },
    ]
  },
  {
    id: 'sb-104',
    code: 'SB-104',
    name: 'ImmunoCore-M',
    target: 'CD47 / SIRPα + GPC3',
    targetFull: 'Dual-Antigen Synthetic Notch Guided Macrophage Receptor',
    therapeuticArea: 'Oncology',
    phase: 'Preclinical',
    phaseProgress: 26,
    indication: 'Glioblastoma & Hepatocellular Carcinoma',
    modality: 'Allogeneic Logic-Gated CAR-Macrophage (CAR-M)',
    deliveryMethod: 'Autologous / Off-the-shelf Stem Cell Derived Infusion',
    description: 'Programmable macrophages armed with synthetic Boolean AND-logic circuits that infiltrate immunologically "cold" solid tumors, phagocytose tumor cells, and secrete proinflammatory cytokines to remodel the stroma.',
    mechanismSummary: 'Strict Boolean gate activation requiring both tumor antigen AND stromal suppression signal removal.',
    bindingAffinity: '0.110 nM Kd',
    structureResolution: '1.02 Å',
    safetyMargin: '>500x vs Healthy Parenchyma',
    partnerOrRights: 'Wholly Owned',
    milestones: [
      { year: '2024 Q4', event: 'Proof of Concept in Orthotopic GBM Models', completed: true },
      { year: '2025 Q3', event: 'GMP Master Cell Bank Generation Completed', completed: true },
      { year: '2026 Q1', event: 'Pre-IND FDA Type B Briefing Package Submission', completed: false },
      { year: '2026 Q4', event: 'Phase I First-in-Human Initiation', completed: false },
    ],
    keyDataPoints: [
      { label: 'Tumor Infiltration', value: '8.4x', subtext: 'Greater tissue penetration than CAR-T' },
      { label: 'Eradication Rate', value: '94%', subtext: 'Long-term survival in syngeneic models' },
      { label: 'Cytokine Storm Risk', value: 'Negligible', subtext: 'Local activation mechanism only' },
    ]
  },
  {
    id: 'sb-670',
    code: 'SB-670',
    name: 'Aevum-FXN',
    target: 'Frataxin (FXN) GAA Repeat',
    targetFull: 'Frataxin Intron 1 Heterochromatin Epigenetic Restorer',
    therapeuticArea: 'Rare Genetic',
    phase: 'Phase I',
    phaseProgress: 48,
    indication: 'Friedreich’s Ataxia Cardiomyopathy & Neuropathy',
    modality: 'Synthetic Epigenetic Activator (Zinc-Finger TET1-dCas Complex)',
    deliveryMethod: 'Cardiotropic & Neurotropic AAV-Synthetic Capsid (AAV-Syn9)',
    description: 'Epigenetic de-repressor designed to reverse transcriptional silencing caused by pathological GAA triplet expansions in the FXN gene, restoring native mitochondrial frataxin synthesis in cardiac and neuronal tissues.',
    mechanismSummary: 'Targeted demethylation and histone acetylation of silenced FXN promoter, restoring endogenous transcription.',
    bindingAffinity: '0.012 nM Kd',
    structureResolution: '0.68 Å',
    safetyMargin: '>400x Normal Genomic Baseline',
    partnerOrRights: 'Wholly Owned Global Rights',
    milestones: [
      { year: '2024 Q1', event: 'FDA Orphan Drug & Fast Track Designation', completed: true },
      { year: '2025 Q1', event: 'Systemic Dosing in Phase I Patient Cohort', completed: true },
      { year: '2025 Q4', event: 'Cardiac MRI Ejection Fraction Stabilization Data', completed: true },
      { year: '2026 Q3', event: 'Phase I/II Pivotal Expansion Protocol Agreement', completed: false },
    ],
    keyDataPoints: [
      { label: 'Mitochondrial FXN', value: '+410%', subtext: 'Restoration to carrier-equivalent level' },
      { label: 'Cardiac Output', value: '+26.4%', subtext: 'Improved stroke volume index at 6 months' },
      { label: 'Durability', value: '>36 Months', subtext: 'Sustained epigenetic mark stability' },
    ]
  },
  {
    id: 'sb-905',
    code: 'SB-905',
    name: 'SynBlock-Dual',
    target: 'IL-23p19 / TGF-β1',
    targetFull: 'Bifunctional Epitope Neutralizer with pH-Dependent Recycling',
    therapeuticArea: 'Autoimmune',
    phase: 'Preclinical',
    phaseProgress: 22,
    indication: 'Refractory Crohn’s Disease & Fibrotic Colitis',
    modality: 'De Novo Engineered Tetravalent Bispecific Fusion',
    deliveryMethod: 'Subcutaneous Injectable Formulation (Monthly Q4W)',
    description: 'Simultaneously halts pathogenic TH17 inflammatory cascades and suppresses sub-epithelial myofibroblast fibrosis through dual stoichiometric blockade of IL-23 and active TGF-β1.',
    mechanismSummary: 'Dual cooperative receptor neutralization preventing both mucosal inflammation and irreversible bowel stricture formation.',
    bindingAffinity: '0.024 nM Kd',
    structureResolution: '0.79 Å',
    safetyMargin: '>250x Systemic Tolerance',
    partnerOrRights: 'Out-Licensed Regional (Asia-Pac Co-Dev)',
    milestones: [
      { year: '2024 Q3', event: 'Cryo-EM Ternary Complex Structure Resolved', completed: true },
      { year: '2025 Q2', event: 'Non-Human Primate 90-day GLP Tox Study Completed', completed: true },
      { year: '2026 Q1', event: 'IND Filing with Global Regulatory Agencies', completed: false },
      { year: '2026 Q3', event: 'Phase I Healthy Volunteer Safety & Bioavailability', completed: false },
    ],
    keyDataPoints: [
      { label: 'Fibrosis Reduction', value: '-78.5%', subtext: 'Reversal of established tissue stiffness' },
      { label: 'SubQ Bioavailability', value: '94.2%', subtext: 'Ultra-high concentration solubility (>150mg/mL)' },
      { label: 'Half-Life in Vivo', value: '28.4 Days', subtext: 'Engineered FcRn recycling domain' },
    ]
  },
  {
    id: 'sb-312',
    code: 'SB-312',
    name: 'MetaboPrime-FGF21',
    target: 'FGFR1c / KLB Complex',
    targetFull: 'Bi-specific Beta-Klotho Agonist with Stabilized Hinge',
    therapeuticArea: 'Cardiometabolic',
    phase: 'Discovery',
    phaseProgress: 14,
    indication: 'Metabolic Dysfunction-Associated Steatohepatitis (MASH / MASH-F3)',
    modality: 'Computer-Designed Synthetic Mimetope',
    deliveryMethod: 'Extended-Release Biodegradable Depot',
    description: 'Hyper-stable de novo mimic of fibroblast growth factor 21 that eliminates mitogenic FGFR activation while amplifying lipid oxidation, reversing hepatic steatosis without bone mineral density loss.',
    mechanismSummary: 'Allosteric locking of the Klotho receptor interface with 100x stability against proteolytic degradation.',
    bindingAffinity: '0.052 nM Kd',
    structureResolution: '0.91 Å',
    safetyMargin: '>600x vs Natural Hormone',
    partnerOrRights: 'Wholly Owned',
    milestones: [
      { year: '2025 Q1', event: 'De Novo Backbone In Silico Generation', completed: true },
      { year: '2025 Q3', event: 'Cellular Receptor Phosphorylation Assay Screen', completed: true },
      { year: '2026 Q2', event: 'In Vivo MASH Murine Liver Fat Efficacy Study', completed: false },
      { year: '2026 Q4', event: 'Candidate Nomination for Preclinical Development', completed: false },
    ],
    keyDataPoints: [
      { label: 'Hepatic Triglycerides', value: '-82.0%', subtext: 'Reduction in diet-induced MASH models' },
      { label: 'Proteolytic Half-Life', value: '>120 Hours', subtext: 'Resistant to DPP4 and FAP cleavage' },
      { label: 'Insulin Sensitivity', value: '+54.0%', subtext: 'HOMA-IR improvement in pre-diabetic models' },
    ]
  }
];

export const PLATFORM_CAPABILITIES: PlatformCapability[] = [
  {
    id: 'protein-design',
    title: 'De Novo Generative Protein Design',
    subtitle: 'Atomic-Precision Macromolecular Synthesis',
    badge: 'Generative Physics Engine',
    iconName: 'Dna',
    accentColor: 'emerald',
    description: 'We bypass nature’s billion-year evolutionary bottleneck by algorithmically generating synthetic tertiary protein conformations optimized directly for target surface topography and electrostatic affinity.',
    longDescription: 'Leveraging diffusion-based deep generative architectures coupled with all-atom molecular dynamics and quantum chemical energy approximations, Synthetix generates de novo binders with sub-nanomolar affinity directly from target cryo-EM coordinates in under 72 hours.',
    capabilities: [
      'Zero-shot de novo sequence generation with 99.1% folding fidelity',
      'Quantum-mechanics / Molecular-mechanics (QM/MM) free energy estimation',
      'Allosteric binding pocket creation on traditionally "undruggable" targets',
      'Automatic immunogenicity de-immunization filtering against MHC-II alleles'
    ],
    metrics: [
      { label: 'Design-to-Synthesis Speed', value: '4.2 Days' },
      { label: 'Wet-Lab In Vitro Hit Rate', value: '87.4%' },
      { label: 'Average Kd Target Affinity', value: '< 0.05 nM' }
    ],
    demoType: 'protein-fold'
  },
  {
    id: 'epigenetic-switch',
    title: 'Programmable Epigenetic Silencing',
    subtitle: 'Permanent Genomic Control Without Double-Strand Breaks',
    badge: 'Zero-DNA-Break CRISPR',
    iconName: 'Sparkles',
    accentColor: 'cyan',
    description: 'Precision writing and erasing of chromatin marks (H3K9me3, DNA CpG methylation) to switch disease-driving genes permanently ON or OFF without risking chromosomal translocations or genomic off-targets.',
    longDescription: 'Traditional CRISPR-Cas9 creates dangerous double-strand DNA breaks that lead to chromosomal rearrangements and unintended p53 activation. Our engineered catalytically dead Cas enzymes deliver human chromatin-remodeling complexes directly to promoter hotspots, achieving durable transgenerational silencing.',
    capabilities: [
      'Multi-locus multiplexed transcriptional tuning (0% to 100% titration)',
      'Zero double-strand breaks: eliminates translocation and oncogenesis risks',
      'Permanent memory retention across >150 cell division generations',
      'Reversible epigenetic switches enabled via complementary erasure enzymes'
    ],
    metrics: [
      { label: 'On-Target Specificity', value: '99.98%' },
      { label: 'Transcriptional Knockdown', value: '98.7%' },
      { label: 'Off-Target Cleavage Events', value: '0.00%' }
    ],
    demoType: 'epigenetic-switch'
  },
  {
    id: 'pk-pd-simulator',
    title: 'Quantum Biophysical PK/PD Modeling',
    subtitle: 'In Silico Tissue Penetrance & Pharmacokinetics',
    badge: 'Predictive Pharmacology',
    iconName: 'Activity',
    accentColor: 'violet',
    description: 'Full-body physiological compartmental simulations powered by GPU physics engines calculate human blood-brain barrier transport, receptor occupancy, and clearance dynamics before first animal dosing.',
    longDescription: 'Synthetix combines microfluidic organ-on-chip experimental telemetry with whole-body physiologically based pharmacokinetic (PBPK) differential equations, eliminating the standard 80% failure rate seen in preclinical-to-clinical translational pharmacology.',
    capabilities: [
      'Blood-Brain Barrier (BBB) receptor-mediated transcytosis modeling',
      'Solid tumor microenvironment diffusion and interstitial pressure physics',
      'Hepatic CYP450 metabolism & renal clearance kinetic forecasting',
      'Dose-ranging optimization for maximal human therapeutic window'
    ],
    metrics: [
      { label: 'Clinical PK Correlation', value: 'R² = 0.94' },
      { label: 'Prediction Acceleration', value: '120x' },
      { label: 'Tox Screen Concordance', value: '96.2%' }
    ],
    demoType: 'pk-curve'
  },
  {
    id: 'spatial-cartography',
    title: 'Multi-Omic Spatial Cartography',
    subtitle: 'Sub-Cellular 3D Transcriptomic Resolution',
    badge: 'High-Dimensional Biology',
    iconName: 'Layers',
    accentColor: 'amber',
    description: 'Mapping billions of RNA transcripts, chromatin accessibility states, and protein expressions simultaneously across intact human patient biopsies at single-cell and sub-cellular resolution.',
    longDescription: 'Disease is not a homogenized mixture of cells; it is an organized, multicellular ecosystem. Our spatial sequencing pipeline reveals the exact architectural microenvironment where immune cells encounter tumor margins or amyloid aggregates, identifying target vulnerabilities invisible to bulk sequencing.',
    capabilities: [
      'Simultaneous 10,000+ gene multiplexing per single tissue specimen',
      'Sub-diffraction optical barcoding down to 100nm localization',
      'AI stromal cell-type deconvolution & immune infiltration scoring',
      'Direct integration with patient retrospective clinical outcome datasets'
    ],
    metrics: [
      { label: 'Transcripts Mapped / Slice', value: '42.5M' },
      { label: 'Optical Spatial Resolution', value: '180 nm' },
      { label: 'Tissue Library Datasets', value: '12,000+' }
    ],
    demoType: 'spatial-map'
  }
];

export const IMPACT_STATS: ImpactStat[] = [
  {
    id: 'molecules-screened',
    number: '14.8',
    suffix: 'M+',
    numericVal: 14.8,
    label: 'Virtual Molecules Synthesized',
    sublabel: 'High-fidelity generative conformations',
    change: '+310% YoY',
    trend: 'up'
  },
  {
    id: 'clinical-assets',
    number: '6',
    suffix: ' Assets',
    numericVal: 6,
    label: 'Active Clinical Pipeline',
    sublabel: 'Phase I & II trials underway globally',
    change: '2 INDs in 2025',
    trend: 'up'
  },
  {
    id: 'precision-rate',
    number: '99.4',
    suffix: '%',
    numericVal: 99.4,
    label: 'On-Target Epigenetic Specificity',
    sublabel: 'Verified by ultra-deep CIRCLE-seq',
    change: '0.00% Off-Target',
    trend: 'up'
  },
  {
    id: 'lead-acceleration',
    number: '180',
    suffix: 'x',
    numericVal: 180,
    label: 'Lead Optimization Speed',
    sublabel: 'From target discovery to animal validation',
    change: '14 mo vs 6.5 yrs',
    trend: 'up'
  },
  {
    id: 'compute-capacity',
    number: '840',
    suffix: ' PFLOPS',
    numericVal: 840,
    label: 'Dedicated Bio-Simulation Cluster',
    sublabel: 'Quantum-accelerated molecular dynamics',
    change: '24/7 Autonomous',
    trend: 'up'
  }
];

export const SCIENTIFIC_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-01',
    title: 'De novo computational design of sub-nanomolar allosteric inhibitors for oncogenic KRAS G12D via deep generative diffusion',
    journal: 'Nature Biotechnology',
    year: 2025,
    authors: 'Vance, E., Chen, S., Thorne, M., et al. (Synthetix Consortium)',
    doi: '10.1038/s41587-025-01984-x',
    citations: 284,
    impactFactor: 46.9,
    abstract: 'We report the complete in silico generation, cryogenic electron microscopy validation, and primate in vivo pharmacodynamics of a novel de novo macrocycle targeting KRAS G12D with 0.018 nM Kd affinity, exhibiting zero off-target cross-reactivity against wild-type KRAS.',
    category: 'Structure',
    keyFinding: 'Achieved 98.7% tumor regression in recalcitrant PDX models with zero hepatic toxicity.',
    badge: 'Cover Article'
  },
  {
    id: 'pub-02',
    title: 'Permanent locus-specific epigenetic silencing of pathological triplet repeats in Friedreich ataxia without genomic DNA cleavage',
    journal: 'Cell',
    year: 2025,
    authors: 'Kowalski, R., Alvarez, M., Thorne, M., et al.',
    doi: '10.1016/j.cell.2025.03.012',
    citations: 196,
    impactFactor: 64.5,
    abstract: 'Engineered dCas12a complexes fused with human epigenetic catalytic domains achieve 410% frataxin expression restoration in patient cardiocytes, maintaining durable expression across 36 months of longitudinal animal follow-up.',
    category: 'Epigenetics',
    keyFinding: 'Restored mitochondrial electron transport chain complex I & II activity to healthy wild-type baselines.',
    badge: 'Featured Paper'
  },
  {
    id: 'pub-03',
    title: 'Predicting human blood-brain barrier macromolecular transcytosis using GPU-accelerated spatial micro-vascular physics',
    journal: 'Science Translational Medicine',
    year: 2024,
    authors: 'Thorne, M., Lindqvist, H., Vance, E.',
    doi: '10.1126/scitranslmed.adk9981',
    citations: 342,
    impactFactor: 17.1,
    abstract: 'A deep-learning physics architecture accurately predicted human CSF-to-serum drug ratios across 48 clinical assets with R² = 0.94, outperforming all historical animal surrogate models.',
    category: 'AI Models',
    keyFinding: 'Predicted human CNS exposure with 10x greater fidelity than cynomolgus monkey pharmacokinetics.',
    badge: 'Editor’s Choice'
  },
  {
    id: 'pub-04',
    title: 'Single-cell multi-omic spatial mapping reveals immune checkpoint co-localization in glioblastoma perivascular niches',
    journal: 'Nature Genetics',
    year: 2024,
    authors: 'Alvarez, M., Zhao, K., Kowalski, R.',
    doi: '10.1038/s41588-024-01762-w',
    citations: 415,
    impactFactor: 31.7,
    abstract: 'Spatial cartography across 12,000 glioblastoma tissue cores identifies a specific macrophage-microglial subtype that suppresses CD8+ T cells through localized CD47 and SIRP-alpha interaction networks.',
    category: 'Clinical',
    keyFinding: 'Provided the mechanistic blueprint for the clinical development of logic-gated CAR-M candidate SB-104.',
    badge: 'Benchmark Study'
  }
];

export const MOLECULAR_TARGETS: MolecularTarget[] = [
  {
    id: 'kras-g12d',
    name: 'KRAS G12D Mutant',
    symbol: 'KRAS-G12D',
    class: 'Small GTPase (Oncogene)',
    diseaseAssociation: 'Pancreatic, Colorectal, NSCLC',
    aminoAcids: 188,
    defaultPdb: '8G12',
    defaultAffinity: 0.018,
    sequenceSnippet: 'MTEYKLVVVG AGGVGKSALT IQLIQNHFVD EYDPTIEDSY RKQVVIDGET CLLDILDTAG QEEYSAMRDQ YMRTGEGFLC VFAINNTKSF'
  },
  {
    id: 'tau-4r',
    name: 'Hyperphosphorylated Tau (4R)',
    symbol: 'MAPT-4R',
    class: 'Microtubule-Associated Protein',
    diseaseAssociation: 'Alzheimer’s, Frontotemporal Dementia',
    aminoAcids: 441,
    defaultPdb: '5O3L',
    defaultAffinity: 0.035,
    sequenceSnippet: 'MAEPRQEFEV MEDHAGTYGL GDRKDQGGYT MHQDQEGDTD AGLKESPLQT PTEDGSEEPG SETSDAKSTP TAEDVTAPLV DEGAPGKQAA'
  },
  {
    id: 'her2-neu',
    name: 'HER2 / ErbB2 Receptor',
    symbol: 'ERBB2',
    class: 'Receptor Tyrosine Kinase',
    diseaseAssociation: 'Breast, Gastric & Ovarian Cancers',
    aminoAcids: 1255,
    defaultPdb: '1N8Z',
    defaultAffinity: 0.022,
    sequenceSnippet: 'MELAALCRWG LLLALLPPGA ASTQVCTGTD MKLRLPASPE THLDMLRHLY QGCQVVQGNL ELTYLPTNAS LSFLQDIQEV QGYVLIAHNQ'
  },
  {
    id: 'pdl1-cd274',
    name: 'PD-L1 Immune Checkpoint',
    symbol: 'CD274',
    class: 'Transmembrane Glycoprotein',
    diseaseAssociation: 'Immune Evasion in Multiple Tumors',
    aminoAcids: 290,
    defaultPdb: '4ZQK',
    defaultAffinity: 0.040,
    sequenceSnippet: 'MRIFAVFIFM TYWHLLNAFT VTVPKDLYVV EYGSNMTIEC KFPVEKQLDL AALIVYWEME DKNIIQFVHG EEDLKVQHSS YRQRARLLKD'
  },
  {
    id: 'fxn-frataxin',
    name: 'Frataxin GAA Silenced Promoter',
    symbol: 'FXN',
    class: 'Mitochondrial Iron Chaperone',
    diseaseAssociation: 'Friedreich’s Ataxia',
    aminoAcids: 210,
    defaultPdb: '1EKG',
    defaultAffinity: 0.012,
    sequenceSnippet: 'MWTLGRRAVA GLLASPSPAQ AQTLTRVPRP AELAPLCGRR GLRTDIDATC TPRRASSNQR GLNQIWNVKK QSVYLMNLRK SGTLGHPGSL'
  }
];

export const LAB_LOCATIONS: LabLocation[] = [
  {
    city: 'Cambridge',
    country: 'United States',
    facility: 'Synthetix Discovery Bio-Hub (Kendall Square)',
    focus: 'Generative Protein Design & Robotic High-Throughput Bio-Foundry',
    status: 'Operational',
    coords: { x: 28, y: 35 }
  },
  {
    city: 'Basel',
    country: 'Switzerland',
    facility: 'Synthetix Europe Innovation Campus',
    focus: 'Clinical Development, Epigenetic Tooling & Regulatory Hub',
    status: 'Operational',
    coords: { x: 49, y: 32 }
  },
  {
    city: 'South San Francisco',
    country: 'United States',
    facility: 'Synthetix Cell Therapy & Spatial Omics Center',
    focus: 'Allogeneic CAR-M & Single-Cell Spatial Sequencing',
    status: 'Operational',
    coords: { x: 19, y: 39 }
  },
  {
    city: 'Oxford',
    country: 'United Kingdom',
    facility: 'Synthetix Computational Genomics Lab',
    focus: 'Quantum-Accelerated Molecular Dynamics & Structural Biology',
    status: 'Expanding',
    coords: { x: 46, y: 29 }
  }
];
