import { Mail, MapPin, Phone } from 'lucide-react';
import { Card } from '../components/ui.jsx';

export default function Contact() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Reach the academic services team for certificate request support, document verification, and registrar office inquiries.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card className="p-6"><Mail className="text-primary" /><h2 className="mt-4 font-semibold">Email</h2><p className="text-sm text-muted-foreground">registrar@alimra.edu</p></Card>
        <Card className="p-6"><Phone className="text-primary" /><h2 className="mt-4 font-semibold">Phone</h2><p className="text-sm text-muted-foreground">+252 61 000 0000</p></Card>
        <Card className="p-6"><MapPin className="text-primary" /><h2 className="mt-4 font-semibold">Office</h2><p className="text-sm text-muted-foreground">Academic Affairs Building</p></Card>
      </div>
    </main>
  );
}
