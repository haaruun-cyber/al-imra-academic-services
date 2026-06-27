import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, BookOpenCheck, ShieldCheck, Users, Mail, Phone, MapPin } from 'lucide-react';
import { Button, Card, Badge } from '../components/ui.jsx';

export default function Home() {
  const stats = [
    ['12k+', 'Student Records'],
    ['3.8k+', 'Certificates Processed'],
    ['24h', 'Review Response'],
    ['99%', 'Verified Archive']
  ];

  const features = [
    ['Secure Requests', ShieldCheck, 'Protected submissions, verified identity details, and controlled staff access.'],
    ['Academic Records', BookOpenCheck, 'Structured student, faculty, department, and academic year management.'],
    ['Official PDFs', Award, 'Professional documents with signatures, stamp area, and QR verification.']
  ];

  const contact = [
    { icon: Mail, label: 'Email', value: 'info@aiu.so', href: 'mailto:info@aiu.so' },
    { icon: Phone, label: 'Phone', value: '+252 661 655 636', href: 'tel:+252661655636' },
    { icon: Phone, label: 'Registrar', value: '+252 661 706 1918', href: 'tel:+252661706191:8' }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl content-center px-4 py-20 text-white">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">AL-IMRA ACADEMIC SERVICES</Badge>
            <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Certificate Management Excellence
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-white/90">A modern, secure platform for certificate requests, verification, reporting, and document archival for Al-Imra University academic offices.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/request-certificate">Request Certificate</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center transform hover:scale-105 transition">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{value}</div>
                <p className="text-sm text-muted-foreground mt-2 font-medium">{label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-border bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 max-w-2xl">
            <Badge variant="primary" className="mb-3">OUR FEATURES</Badge>
            <h2 className="text-4xl font-bold">Academic services built for trust</h2>
            <p className="mt-4 text-lg text-muted-foreground">Students submit a complete request once. Staff review, approve, generate PDF documents, sign, archive, and report from one secure portal.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(([title, Icon, text]) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-card transition">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="font-bold text-lg">{title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12">
          <Badge variant="primary" className="mb-3">CONTACT INFORMATION</Badge>
          <h2 className="text-4xl font-bold">Get in Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">Reach our academic services team for any inquiries</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {contact.map(({ icon: Icon, label, value, href }) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-card transition cursor-pointer h-full">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-lg">{label}</h3>
                <p className="text-primary font-medium text-sm mt-2">{value}</p>
              </Card>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-16 bg-muted rounded-xl">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Submit your certificate request today and join thousands of verified academic records.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6">
          <Link to="/request-certificate" className="inline-flex items-center gap-2">
            <Users size={20} /> Start Your Request Now
          </Link>
        </Button>
      </section>
    </main>
  );
}
