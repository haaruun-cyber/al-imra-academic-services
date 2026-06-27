import { Card, Badge, Alert } from '../components/ui.jsx';
import { Check, Target, Eye, Zap } from 'lucide-react';

export default function About() {
  const blocks = [
    {
      title: 'Mission',
      text: 'To deliver accurate, secure, and responsive academic certificate services for students and graduates.',
      icon: Check,
      color: 'text-success'
    },
    {
      title: 'Vision',
      text: 'To become a trusted digital academic services office with transparent workflows and verified documents.',
      icon: Eye,
      color: 'text-primary'
    },
    {
      title: 'Objectives',
      text: 'Improve request handling, strengthen document verification, centralize archives, and provide useful reports.',
      icon: Target,
      color: 'text-secondary'
    },
    {
      title: 'Services',
      text: 'Certificate requests, student records, registrar review, finance clearance, document archiving, and analytics.',
      icon: Zap,
      color: 'text-accent'
    }
  ];

  const teams = [
    {
      name: 'Registrar Office',
      description: 'Handles student record management and certificate verification with accuracy and care.'
    },
    {
      name: 'Finance Office',
      description: 'Manages financial clearances and ensures all records are properly documented.'
    },
    {
      name: 'Academic Administration',
      description: 'Oversees academic policies and ensures compliance with university standards.'
    }
  ];

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-4">ABOUT AL-IMRA</Badge>
          <h1 className="text-5xl font-bold">AL-IMRA Academic Services</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">
            Supporting academic offices with a complete certificate management workflow, from public student submission to official PDF generation and long-term document archival.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold">Our Core Values</h2>
          <p className="mt-3 text-lg text-muted-foreground">Building trust through excellence in academic services</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {blocks.map(({ title, text, icon: Icon, color }) => (
            <Card key={title} className="p-8 hover:shadow-card transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Icon className={`${color}`} size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                  <p className="mt-3 text-muted-foreground text-base">{text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold">Our Teams</h2>
          <p className="mt-3 text-lg text-muted-foreground">Dedicated departments working together for your success</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.name} className="p-6 hover:shadow-card transition">
              <div className="h-32 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary/30">{team.name.split(' ')[0][0]}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{team.name}</h3>
              <p className="text-muted-foreground mt-2">{team.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-primary-foreground">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <Alert variant="success" className="bg-white/10 border-white/30 text-white mb-4">
            <p className="font-semibold">We're here to help with all your academic service needs</p>
          </Alert>
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a href="mailto:info@aiu.so" className="text-accent font-semibold hover:underline">info@aiu.so</a>
              <p className="text-sm text-white/80 mt-1">For all general inquiries</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Main Office</h3>
              <a href="tel:+252661655636" className="text-accent font-semibold hover:underline">+252 661 655 636</a>
              <p className="text-sm text-white/80 mt-1">Registrar office line</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Support Line</h3>
              <a href="tel:+252661706191:8" className="text-accent font-semibold hover:underline">+252 661 706 1918</a>
              <p className="text-sm text-white/80 mt-1">Student support services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="mx-auto max-w-7xl px-4 py-16 bg-muted rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Why Choose AL-IMRA?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex gap-4">
            <Check className="text-success flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold">Secure & Verified</h3>
              <p className="text-sm text-muted-foreground">All certificates are verified and digitally signed</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Check className="text-success flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold">Fast Processing</h3>
              <p className="text-sm text-muted-foreground">24-hour review response for all requests</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Check className="text-success flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold">Professional Documentation</h3>
              <p className="text-sm text-muted-foreground">Official PDFs with signatures and QR verification</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Check className="text-success flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold">Centralized Archive</h3>
              <p className="text-sm text-muted-foreground">Secure long-term document storage and retrieval</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
