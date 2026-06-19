import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api.js';
import { Button, Card, Input, Select, Textarea } from '../components/ui.jsx';

const initialForm = {
  studentName: '', studentId: '', motherName: '', placeOfBirth: '', dateOfBirth: '',
  mobile1: '', mobile2: '', email: '', secondarySchool: '', graduationYear: '',
  faculty: '', department: '', academicYear: '', modeOfStudy: '', notes: ''
};

export default function RequestCertificate() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function setField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post('/requests/public', { ...form, graduationYear: Number(form.graduationYear) });
      setSuccess(true);
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.errors?.[0] || error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold">Certificate Request</h1>
        <p className="mt-3 text-muted-foreground">Complete the form with accurate student and academic information. Required fields are validated before submission.</p>
      </div>
      <Card className="p-5 md:p-8">
        <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
          <Field label="Student Name"><Input required value={form.studentName} onChange={(e) => setField('studentName', e.target.value)} /></Field>
          <Field label="Student ID"><Input required value={form.studentId} onChange={(e) => setField('studentId', e.target.value)} /></Field>
          <Field label="Mother Name"><Input required value={form.motherName} onChange={(e) => setField('motherName', e.target.value)} /></Field>
          <Field label="Place of Birth"><Input required value={form.placeOfBirth} onChange={(e) => setField('placeOfBirth', e.target.value)} /></Field>
          <Field label="Date of Birth"><Input required type="date" value={form.dateOfBirth} onChange={(e) => setField('dateOfBirth', e.target.value)} /></Field>
          <Field label="Student Email"><Input required type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} /></Field>
          <Field label="Student Mobile 1"><Input required pattern="^[+()\-\s0-9]{7,20}$" value={form.mobile1} onChange={(e) => setField('mobile1', e.target.value)} /></Field>
          <Field label="Student Mobile 2"><Input pattern="^[+()\-\s0-9]{7,20}$" value={form.mobile2} onChange={(e) => setField('mobile2', e.target.value)} /></Field>
          <Field label="Secondary School"><Input required value={form.secondarySchool} onChange={(e) => setField('secondarySchool', e.target.value)} /></Field>
          <Field label="Graduation Year"><Input required type="number" min="1950" max="2100" value={form.graduationYear} onChange={(e) => setField('graduationYear', e.target.value)} /></Field>
          <Field label="Faculty"><Input required value={form.faculty} onChange={(e) => setField('faculty', e.target.value)} /></Field>
          <Field label="Department"><Input required value={form.department} onChange={(e) => setField('department', e.target.value)} /></Field>
          <Field label="Academic Year"><Input required placeholder="2025/2026" value={form.academicYear} onChange={(e) => setField('academicYear', e.target.value)} /></Field>
          <Field label="Mode of Study"><Select required value={form.modeOfStudy} onChange={(e) => setField('modeOfStudy', e.target.value)}><option value="">Select mode</option><option>Full Time</option><option>Part Time</option><option>Distance Learning</option></Select></Field>
          <Field label="Additional Notes" className="md:col-span-2"><Textarea value={form.notes} onChange={(e) => setField('notes', e.target.value)} /></Field>
          <div className="md:col-span-2"><Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Certificate Request'}</Button></div>
        </form>
      </Card>
      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </main>
  );
}

function Field({ label, children, className = '' }) {
  return <label className={`space-y-2 text-sm font-medium ${className}`}><span>{label}</span>{children}</label>;
}

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md rounded-lg bg-background p-8 text-center shadow-soft">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 size={38} />
        </motion.div>
        <h2 className="mt-5 text-2xl font-bold">Certificate Request Submitted Successfully</h2>
        <p className="mt-3 text-muted-foreground">Waad dalbatay shahaadada. Waxa kula soo xiriiri doona xafiiska Registrarka Jaamacadda.</p>
        <Button className="mt-6 bg-green-700 text-white hover:bg-green-800" onClick={onClose}>Done</Button>
      </motion.div>
    </div>
  );
}
