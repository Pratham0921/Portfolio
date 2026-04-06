import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import BioSection from './components/BioSection'
import ProjectsGrid from './components/ProjectsGrid'
import ToolboxSection from './components/ToolboxSection'
import CaseStudies from './components/CaseStudies'
import LearningTimeline from './components/LearningTimeline'
import ContactForm from './components/ContactForm'
import PageTransition from './components/PageTransition'
import PixelSnow from './components/PixelSnow'
import IntroOverlay from './components/IntroOverlay'
import MinimalBackground from './components/MinimalBackground'


export default function App() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [introCompleted, setIntroCompleted] = useState(false)

  const handleNavigate = () => {
    setIsNavigating(true)
    setTimeout(() => setIsNavigating(false), 600)
  }

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 }
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Pixel Snow Background per user request */}
      <MinimalBackground />
      <PixelSnow density={60} speed={0.5} />

      {/* Intro Overlay */}
      <IntroOverlay onComplete={() => setIntroCompleted(true)} />

      {/* Main Content - Fades in after intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introCompleted ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: introCompleted ? 'auto' : 'none' }}
      >
        {/* Navigation */}
        <Navigation onNavigate={handleNavigate} />

        {/* Page Content */}
        <PageTransition isNavigating={isNavigating}>
          <main>
            {/* Hero Section */}
            <HeroSection />

          {/* Bio Section */}
          <BioSection />

          {/* Toolbox Section (moved before projects for better flow) */}
          <ToolboxSection />

          {/* Projects Grid */}
          <ProjectsGrid />

          {/* Case Studies */}
          <CaseStudies />

          {/* Learning Timeline */}
          <LearningTimeline />

          {/* Contact Form */}
          <ContactForm />

          {/* Footer */}
          <footer className="py-12 border-t border-surface text-center relative bg-background">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={footerVariants}
            >
              <p className="text-text-secondary text-sm mb-2 font-mono">
                (c) {new Date().getFullYear()} Pratham Goyal
              </p>
              <p className="text-text-muted text-xs">
                Built with React, Tailwind, Framer Motion | UE5 Gameplay Programmer Portfolio
              </p>
              <p className="text-accent text-xs mt-2 font-mono">
                v1.0 | Last updated: {new Date().toISOString().split('T')[0]}
              </p>
            </motion.div>
          </footer>
        </main>
      </PageTransition>
      </motion.div>

    </div>
  )
}
