import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, BookOpenCheck, ShieldCheck, Users } from 'lucide-react';
import { Button, Card } from '../components/ui.jsx';

export default function Home() {
  const stats = [['12k+', 'Student Records'], ['3.8k+', 'Certificates Processed'], ['24h', 'Review Response'], ['99%', 'Verified Archive']];
  const features = [
    ['Secure Requests', ShieldCheck, 'Protected submissions, verified identity details, and controlled staff access.'],
    ['Academic Records', BookOpenCheck, 'Structured student, faculty, department, and academic year management.'],
    ['Official PDFs', Award, 'Professional documents with signatures, stamp area, and QR verification.']
  ];

  return (
    <main>
      <section className="relative overflow-hidden bg-[linear-gradient(rgba(5,47,46,.78),rgba(15,23,42,.62)),url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center">
        <div className="mx-auto grid min-h-[620px] max-w-7xl content-center px-4 py-20 text-white">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">AL-IMRA Academic Services</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/86">A modern certificate request, verification, reporting, and document archive system for university academic offices.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="bg-accent text-accent-foreground"><Link to="/request-certificate">Request Certificate</Link></Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10"><Link to="/about">Learn More</Link></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => <Card key={label} className="p-5"><div className="text-3xl font-bold text-primary">{value}</div><p className="text-sm text-muted-foreground">{label}</p></Card>)}
        </div>
      </section>

      <section className="border-y border-border bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold">Academic services built for trust</h2>
            <p className="mt-3 text-muted-foreground">Students submit a complete request once. Staff review, approve, generate PDF documents, sign, archive, and report from one portal.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {features.map(([title, Icon, text]) => <Card key={title} className="p-6"><Icon className="mb-4 text-primary" /><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></Card>)}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Ready to begin your certificate request?</h2>
          <p className="text-muted-foreground">Submit your information and the registrar office will contact you.</p>
        </div>
        <Button><Users size={16} /><Link to="/request-certificate">Start Request</Link></Button>
      </section>
      <Footer />
    </main>
  );
}

function Footer() {
  return <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">© 2026 AL-IMRA Academic Services. Academic records managed with care.</footer>;
}
