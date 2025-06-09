"use client";
import { Box, Typography, AppBar, Toolbar, Container, Grid, Card, CardContent, Chip, Link, Stack, IconButton, Divider, useTheme, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuIcon from '@mui/icons-material/Menu';
import { useRef, useState, useEffect } from 'react';

const sections = [
  { id: "hero", label: "Home" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
];

export default function Home() {
  const theme = useTheme();
  const navbarRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [clickedSection, setClickedSection] = useState(null);
  const clickTimeout = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Smooth scroll handler with offset for navbar
  const handleNavClick = (id) => {
    setClickedSection(id);
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => setClickedSection(null), 600);
    const el = document.getElementById(id);
    const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 8; // 8px extra space
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setDrawerOpen(false); // Close drawer on mobile after click
  };

  // Add scroll-margin-top to each section for anchor navigation
  const sectionStyle = {
    scrollMarginTop: (navbarRef.current ? navbarRef.current.offsetHeight : 64) + 12, // fallback 64px
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
      let current = sections[0].id;
      let minDist = Number.POSITIVE_INFINITY;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - navbarHeight - 16);
          if (rect.top - navbarHeight - 16 <= 0 && dist < minDist) {
            minDist = dist;
            current = s.id;
          }
        }
      }
      // Only force last section if truly at the bottom (within 40px)
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 40)) {
        current = sections[sections.length - 1].id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a23 0%, #23234f 100%)' }}>
      {/* Responsive Navbar with Drawer for mobile */}
      <AppBar ref={navbarRef} position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', borderBottom: '1px solid #222' }}>
        <Toolbar sx={{ justifyContent: 'center', minHeight: { xs: 56, sm: 64 } }}>
          {/* Hamburger for mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)}>
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
          {/* Inline links for md+ */}
          <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {sections.map((s) => (
              <Link
                key={s.id}
                underline="none"
                color="inherit"
                sx={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  position: 'relative',
                  fontSize: { xs: '1rem', md: '1.1rem', lg: '1.15rem' },
                  transition: 'color 0.2s, text-shadow 0.2s',
                  color: (clickedSection ?? activeSection) === s.id ? theme.palette.primary.main : 'inherit',
                  textShadow: (clickedSection ?? activeSection) === s.id ? `0 0 8px ${theme.palette.primary.main}, 0 0 16px ${theme.palette.secondary.main}` : 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  '&:after': (clickedSection ?? activeSection) === s.id ? {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -6,
                    height: '4px',
                    borderRadius: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 0 12px 2px ${theme.palette.primary.main}`,
                    opacity: 1,
                  } : {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -6,
                    height: '4px',
                    borderRadius: '4px',
                    background: 'transparent',
                    opacity: 0,
                  },
                }}
                onClick={() => handleNavClick(s.id)}
              >
                {s.label}
              </Link>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ zIndex: theme.zIndex.appBar + 1, '& .MuiDrawer-paper': { background: 'rgba(20, 20, 40, 0.85)', backdropFilter: 'blur(12px)' } }}>
        <Box sx={{ width: 220, pt: 2 }}>
          <List>
            {sections.map((s) => (
              <ListItem key={s.id} disablePadding>
                <ListItemButton onClick={() => handleNavClick(s.id)} selected={(clickedSection ?? activeSection) === s.id}>
                  <ListItemText
                    primary={s.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      sx: {
                        color: (clickedSection ?? activeSection) === s.id ? theme.palette.primary.main : 'inherit',
                        textShadow: (clickedSection ?? activeSection) === s.id ? `0 0 8px ${theme.palette.primary.main}, 0 0 16px ${theme.palette.secondary.main}` : 'none',
                        transition: 'color 0.2s, text-shadow 0.2s',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Toolbar /> {/* Spacer for fixed navbar */}

      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Hero/Intro (no 3D model) */}
        <Box id="hero" textAlign="center" mb={8} sx={{ position: 'relative', ...sectionStyle }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Praneeth P Nairy
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            Software Engineer | Web & Backend Developer
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Udupi, Karnataka, India · praneethnairy@gmail.com · 8095182075
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
            <IconButton color="inherit" href="https://github.com/Praneethnairy" target="_blank"><GitHubIcon /></IconButton>
            <IconButton color="inherit" href="https://www.linkedin.com/in/praneeth-p-nairy-474071202/" target="_blank"><LinkedInIcon /></IconButton>
            <IconButton color="inherit" href="https://leetcode.com/u/praneethnairy/" target="_blank"><CodeIcon /></IconButton>
            <IconButton color="inherit" href="https://www.geeksforgeeks.org/user/praneethnairy/" target="_blank"><LanguageIcon /></IconButton>
          </Stack>
        </Box>
        <SectionDivider />

        {/* Education */}
        <Box id="education" mb={8} sx={sectionStyle}>
          <SectionTitle icon={<SchoolIcon />} title="Education" />
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <EduCard school="PES University" degree="B.Tech Computer Science and Engineering" year="2020 - 2024" location="Bengaluru, India" gpa="8.71/10" />
            </Grid>
            <Grid item xs={12} md={4}>
              <EduCard school="Viveka Pre-University College" degree="Class XII, Karnataka State Board" year="2019 - 2020" location="Udupi, India" gpa="96/100" />
            </Grid>
            <Grid item xs={12} md={4}>
              <EduCard school="Viveka English Medium High School" degree="Class X, Karnataka State Board" year="2017 - 2018" location="Udupi, India" gpa="94.25/100" />
            </Grid>
          </Grid>
        </Box>
        <SectionDivider />

        {/* Work Experience */}
        <Box id="experience" mb={8} sx={sectionStyle}>
          <SectionTitle icon={<WorkIcon />} title="Work Experience" />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <HoverCard>
                <CardContent>
                  <Typography variant="h6">Jr. Software Engineer, Egnyte</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Jul 2024 - Present · Remote</Typography>
                  <Typography variant="body2" mt={1}>
                    • Engineered back-end modules for Smart Cache system<br/>
                    • Built RESTful services using Go (Golang)<br/>
                    • Extended Smart Cache SNS with C-based integrations<br/>
                    • Produced maintainable, production-ready code<br/>
                    • Peer reviews, unit testing, root cause analysis
                  </Typography>
                </CardContent>
              </HoverCard>
              <HoverCard>
                <CardContent>
                  <Typography variant="h6">Software Engineer Intern, Egnyte</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Jan 2024 - Jun 2024 · Remote</Typography>
                  <Typography variant="body2" mt={1}>
                    • Created test scripts in Python for Smart Cache<br/>
                    • Extended Egnyte's internal libraries (pycsm, pysmb, pyscwin)<br/>
                    • Platform-specific testing (Linux, Windows)
                  </Typography>
                </CardContent>
              </HoverCard>
              <HoverCard>
                <CardContent>
                  <Typography variant="h6">Web Development Intern, Stonovation</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Jun 2023 - Dec 2023 · Remote</Typography>
                  <Typography variant="body2" mt={1}>
                    • Improved web portal with React.js, Material-UI, Ant Design<br/>
                    • Async data sync, reduced loading<br/>
                    • Backend logic in Java for secure operations<br/>
                    • Responsive layouts, accessibility, modular architecture
                  </Typography>
                </CardContent>
              </HoverCard>
            </Grid>
          </Grid>
        </Box>
        <SectionDivider />

        {/* Skills */}
        <Box id="skills" mb={8} sx={sectionStyle}>
          <SectionTitle icon={<CodeIcon />} title="Skills" />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="C/C++" />
            <Chip label="Python" />
            <Chip label="Javascript" />
            <Chip label="HTML/CSS" />
            <Chip label="Go Lang" />
            <Chip label="NodeJS" />
            <Chip label="ReactJS" />
            <Chip label="ExpressJS" />
            <Chip label="NextJS" />
            <Chip label="Tanstack Query" />
            <Chip label="MongoDB" />
            <Chip label="MySQL" />
            <Chip label="DSA" />
            <Chip label="Git" />
            <Chip label="JWT" />
            <Chip label="Google Firebase" />
            <Chip label="Jira" />
            <Chip label="REST API's" />
            <Chip label="Ant Design" />
            <Chip label="MaterialUI" />
          </Stack>
        </Box>
        <SectionDivider />

        {/* Projects */}
        <Box id="projects" mb={8} sx={sectionStyle}>
          <SectionTitle icon={<CodeIcon />} title="Projects" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <ProjectCard title="Hotel Billing System" desc="Full-stack app for hotel invoices and billing using React.js, Node.js, Express.js, MongoDB. Planned OAuth & Firestore support." link="#" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ProjectCard title="Yet Another Kafka" desc="Kafka simulator in Python sockets: Zookeeper, Brokers, Producer, Consumer, file replication." link="https://github.com/Praneethnairy/YetAnotherKafka" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ProjectCard title="New Bank of India" desc="Simulated online banking with React.js, Node.js, Express.js, MySQL. Account management & transactions." link="https://github.com/Praneethnairy/NewBankOfIndia-OnlineBankingWebApp" />
            </Grid>
          </Grid>
        </Box>
        <SectionDivider />

        {/* Achievements */}
        <Box id="achievements" mb={8} sx={sectionStyle}>
          <SectionTitle icon={<EmojiEventsIcon />} title="Key Achievements" />
          <Typography variant="body1" mb={1}>200+ problems solved <Link href="https://www.geeksforgeeks.org/user/praneethnairy/" target="_blank">Geeks for Geeks</Link></Typography>
          <Typography variant="body1">180+ problems solved <Link href="https://leetcode.com/u/praneethnairy/" target="_blank">Leetcode</Link></Typography>
        </Box>
      </Container>
    </Box>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
      {icon}
      <Typography variant="h5" fontWeight={600}>{title}</Typography>
    </Stack>
  );
}

function SectionDivider() {
  return <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.08)' }} />;
}

function EduCard({ school, degree, year, location, gpa }) {
  return (
    <HoverCard>
      <CardContent>
        <Typography variant="h6">{school}</Typography>
        <Typography variant="subtitle2" color="text.secondary">{degree}</Typography>
        <Typography variant="body2" color="text.secondary">{year} · {location}</Typography>
        <Typography variant="body2" color="primary">GPA: {gpa}</Typography>
      </CardContent>
    </HoverCard>
  );
}

function ProjectCard({ title, desc, link }) {
  return (
    <HoverCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>{desc}</Typography>
        {link && <Link href={link} target="_blank" rel="noopener" color="primary">View Project</Link>}
      </CardContent>
    </HoverCard>
  );
}

// Card with hover effect
function HoverCard({ children }) {
  return (
    <Card
      variant="outlined"
      sx={{
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: 2,
        borderRadius: 3,
        '&:hover': {
          transform: 'translateY(-6px) scale(1.03)',
          boxShadow: 8,
          borderColor: 'primary.main',
        },
        mb: 2,
        background: 'rgba(24,24,48,0.95)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {children}
    </Card>
  );
}
