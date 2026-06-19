import { Card } from '../components/ui.jsx';

export default function About() {
  const blocks = [
    ['Mission', 'To deliver accurate, secure, and responsive academic certificate services for students and graduates.'],
    ['Vision', 'To become a trusted digital academic services office with transparent workflows and verified documents.'],
    ['Objectives', 'Improve request handling, strengthen document verification, centralize archives, and provide useful reports.'],
    ['Services', 'Certificate requests, student records, registrar review, finance clearance, document archiving, and analytics.']
  ];
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-bold">About Al-Imra Academic Services</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">AL-IMRA Academic Services supports academic offices with a complete certificate management workflow, from public student submission to official PDF generation and long-term document archive.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {blocks.map(([title, text]) => <Card key={title} className="p-6"><h2 className="text-xl font-semibold text-primary">{title}</h2><p className="mt-2 text-muted-foreground">{text}</p></Card>)}
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Team Section</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {['Registrar Office', 'Finance Office', 'Academic Administration'].map((name) => <Card key={name} className="p-5"><div className="h-24 rounded-md bg-muted" /><h3 className="mt-4 font-semibold">{name}</h3><p className="text-sm text-muted-foreground">Responsible for careful review, verification, and student support.</p></Card>)}
          </div>
        </section>
        <section className="mt-12 rounded-lg bg-primary p-8 text-primary-foreground">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <p className="mt-2">Email: registrar@alimra.edu | Phone: +252 61 000 0000 | Office: Academic Affairs Building</p>
        </section>
      </section>
    </main>
  );
}
