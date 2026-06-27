import { Mail, MapPin, Phone } from 'lucide-react';
import { Card } from '../components/ui.jsx';

export default function Contact() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/90">Reach the Al-Imra Academic Services team for certificate request support, document verification, and registrar office inquiries.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card className="p-6 hover:shadow-card transition">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-success">
            <Mail className="text-success-foreground" size={24} />
          </div>
          <h2 className="mt-4 font-bold text-lg">Email</h2>
          <p className="text-sm text-muted-foreground mt-2">info@aiu.so</p>
          <p className="text-xs text-muted-foreground mt-1">Primary contact for all inquiries</p>
        </Card>

        <Card className="p-6 hover:shadow-card transition">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary">
            <Phone className="text-primary-foreground" size={24} />
          </div>
          <h2 className="mt-4 font-bold text-lg">Phone</h2>
          <p className="text-sm text-muted-foreground mt-2">+252 661 655 636</p>
          <p className="text-xs text-muted-foreground mt-1">Main office line</p>
        </Card>

        <Card className="p-6 hover:shadow-card transition">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-secondary">
            <Phone className="text-secondary-foreground" size={24} />
          </div>
          <h2 className="mt-4 font-bold text-lg">Phone</h2>
          <p className="text-sm text-muted-foreground mt-2">+252 661 706 1918</p>
          <p className="text-xs text-muted-foreground mt-1">Registrar support line</p>
        </Card>
      </div>

      <Card className="p-8 bg-muted border-0">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent flex-shrink-0">
            <MapPin className="text-accent-foreground" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg">Visit Us</h2>
            <p className="text-muted-foreground mt-2">Shaqaalaha Jayuushka Street</p>
            <p className="text-muted-foreground">Mogadishu, Somalia</p>
            <p className="text-muted-foreground mt-3">Al-Imra University</p>
            <p className="text-sm text-muted-foreground mt-4">Office hours: Monday - Friday, 8:00 AM - 5:00 PM (CAT)</p>
          </div>
        </div>
      </Card>
    </main>
  );
}
