import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    opportunityType: [],
    workAuth: 'authorized',
    relocation: false
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleOpportunityChange = (type) => {
    setFormData(prev => ({
      ...prev,
      opportunityType: prev.opportunityType.includes(type)
        ? prev.opportunityType.filter(t => t !== type)
        : [...prev.opportunityType, type]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Formspree endpoint - configure via .env or replace with your endpoint
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/your-form-id'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          timezone: 'IST (UTC+5:30)',
          availability: '9AM-6PM IST'
        })
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          opportunityType: [],
          workAuth: 'authorized',
          relocation: false
        })
        // Reset success message after 5s
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 relative bg-background overflow-hidden">
      <div className="content-width max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Interested in collaboration or have a project in mind? I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-text-secondary text-xs uppercase tracking-[0.2em] mb-4">
                Email
              </h3>
              <a
                href="mailto:pratham.goyal013@gmail.com"
                className="text-2xl md:text-3xl font-semibold text-white hover:text-accent transition-colors block font-mono"
              >
                pratham.goyal013@gmail.com
              </a>
            </div>

            <div>
              <h3 className="text-text-secondary text-xs uppercase tracking-[0.2em] mb-4">
                Social
              </h3>
              <div className="flex gap-6">
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-text-secondary hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  💼
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-text-secondary hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  🐙
                </a>
                <a
                  href="https://twitter.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-text-secondary hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  🐦
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-surface">
              <div className="space-y-4 text-sm text-text-secondary">
                <div className="flex items-center gap-3">
                  <span className="text-accent font-mono">Timezone:</span>
                  <span>IST (UTC+5:30)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent font-mono">Available:</span>
                  <span>9AM-6PM IST</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-surface rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-surface rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm text-text-secondary mb-2">
                Company / Studio
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-surface rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="Where do you work?"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-surface rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            {/* Opportunity Type */}
            <div>
              <label className="block text-sm text-text-secondary mb-3">
                Opportunity Type
              </label>
              <div className="flex flex-wrap gap-3">
                {['Full-time', 'Contract', 'Remote'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleOpportunityChange(type)}
                    className={`px-4 py-2 text-sm border rounded transition-all font-mono ${
                      formData.opportunityType.includes(type)
                        ? 'bg-accent text-black border-accent'
                        : 'border-surface text-text-secondary hover:border-accent hover:text-accent'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Work Authorization */}
            <div>
              <label className="block text-sm text-text-secondary mb-3">
                Work Authorization
              </label>
              <div className="space-y-2">
                {[
                  { value: 'visa', label: 'Need visa sponsorship' },
                  { value: 'authorized', label: 'Authorized to work' },
                  { value: 'relocation', label: 'Open to relocation' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="workAuth"
                      value={option.value}
                      checked={formData.workAuth === option.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.workAuth === option.value
                        ? 'border-accent'
                        : 'border-surface group-hover:border-accent/50'
                    }`}>
                      {formData.workAuth === option.value && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      formData.workAuth === option.value
                        ? 'text-white'
                        : 'text-text-secondary group-hover:text-accent'
                    }`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-accent text-black rounded-lg font-semibold font-mono transition-all hover:shadow-glow-accent relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : status === 'success' ? (
                  <span>✓ Message Sent!</span>
                ) : status === 'error' ? (
                  <span>✗ Error. Try again.</span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-accent-dark"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Success/Error Messages */}
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-emerald-400 font-mono"
              >
                Thanks! I'll respond within 24 hours.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-red-400"
              >
                Oops! Something went wrong. Please try again or email directly.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
