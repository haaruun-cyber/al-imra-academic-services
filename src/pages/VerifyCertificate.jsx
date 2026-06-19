import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ArrowLeft, GraduationCap, Calendar, Award, Shield } from 'lucide-react';
import { api } from '../lib/api.js';
import { Card, Badge, Button } from '../components/ui.jsx';
import { prettyStatus } from '../lib/utils.js';

export default function VerifyCertificate() {
  const { requestNo } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get(`/requests/verify/${requestNo}`)
      .then(({ data }) => {
        setRequest(data.request);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Certificate request verification failed');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [requestNo]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/10 px-4">
        <div className="w-full max-w-xl space-y-4">
          <div className="h-12 w-1/3 animate-pulse rounded bg-muted"></div>
          <div className="h-64 w-full animate-pulse rounded-lg bg-muted"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/10 px-4 py-12">
      <div className="w-full max-w-2xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {error ? (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-red-200 bg-red-50/50 p-8 text-center dark:border-red-900/30 dark:bg-red-950/10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400">
                <AlertTriangle size={32} />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-red-700 dark:text-red-400">Invalid Certificate Reference</h2>
              <p className="mt-3 text-muted-foreground">
                We could not verify request number <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">{requestNo}</code>. Please double-check the QR code or link.
              </p>
              <div className="mt-8">
                <Button as="a" className="bg-red-600 hover:bg-red-700 text-white"><Link to="/contact">Contact Support</Link></Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="overflow-hidden border-teal-600/20 bg-background shadow-xl dark:border-teal-500/20">
              {/* Header Gradient */}
              <div className="bg-gradient-to-r from-teal-800 to-slate-900 p-6 text-white dark:from-teal-950 dark:to-slate-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-md bg-white/10 backdrop-blur-md">
                      <GraduationCap size={26} />
                    </span>
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-wide">AL-IMRA ACADEMIC SERVICES</h2>
                      <p className="text-xs text-teal-200">Official Verification Portal</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 border border-green-500/40 text-green-200">
                    Verified Record
                  </Badge>
                </div>
              </div>

              {/* Status Section */}
              <div className="border-b border-border bg-muted/20 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Certificate Status</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                      <CheckCircle2 size={14} />
                    </span>
                    <span className="font-bold text-foreground">{prettyStatus(request.status)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Document Code</p>
                  <p className="mt-1 font-mono text-sm font-bold text-teal-600 dark:text-teal-400">{request.requestNo}</p>
                </div>
              </div>

              {/* Student and Request Details */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 border-b border-border pb-2 text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    <Award size={16} /> Student Information
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <DetailRow label="Full Name" value={request.student.studentName} />
                    <DetailRow label="Student ID" value={request.student.studentId} />
                    <DetailRow label="Faculty" value={request.student.faculty} />
                    <DetailRow label="Department" value={request.student.department} />
                    <DetailRow label="Graduation Year" value={request.student.graduationYear} />
                    <DetailRow label="Mode of Study" value={request.student.modeOfStudy} />
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 border-b border-border pb-2 text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    <Calendar size={16} /> Request Information
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <DetailRow label="Academic Year" value={request.student.academicYear} />
                    <DetailRow label="Submitted Date" value={new Date(request.submittedAt).toLocaleDateString()} />
                  </div>
                </div>

                {/* Verification Statement */}
                <div className="rounded-lg border border-teal-500/10 bg-teal-50/20 p-4 dark:bg-teal-950/5 flex gap-3">
                  <div className="text-teal-600 dark:text-teal-400 mt-0.5">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-teal-800 dark:text-teal-300">Official Verification Statement</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Al-Imra Academic Services confirms that this request has been reviewed, approved, and successfully registered in the archive. Any printout matching this online verification screen is valid.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value || '-'}</p>
    </div>
  );
}
