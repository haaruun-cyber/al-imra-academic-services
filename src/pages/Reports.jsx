import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '../lib/api.js';
import { Button, Card } from '../components/ui.jsx';
import { prettyStatus } from '../lib/utils.js';

const colors = ['#0f766e', '#d99a18', '#2563eb', '#dc2626', '#7c3aed', '#059669'];

export default function Reports() {
  const [reports, setReports] = useState({ statuses: [], faculties: [], departments: [], monthly: [], yearly: [] });
  useEffect(() => { api.get('/reports').then(({ data }) => setReports(data)); }, []);

  function exportExcel() {
    const workbook = XLSX.utils.book_new();
    Object.entries(reports).forEach(([name, rows]) => XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), name));
    XLSX.writeFile(workbook, 'al-imra-reports.xlsx');
  }

  function exportPdf() {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text('AL-IMRA Academic Services Reports', 14, 18);
    pdf.setFontSize(11);
    reports.statuses.forEach((row, index) => pdf.text(`${prettyStatus(row.name)}: ${row.value}`, 14, 34 + index * 8));
    pdf.save('al-imra-reports.pdf');
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">Total, pending, accepted, rejected, completed, monthly, yearly, faculty, and department reports.</p></div>
        <div className="flex gap-2"><Button variant="outline" onClick={exportPdf}><Download size={16} />PDF</Button><Button onClick={exportExcel}><Download size={16} />Excel</Button></div>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Status Overview"><ResponsiveContainer width="100%" height={290}><PieChart><Pie data={reports.statuses} dataKey="value" nameKey="name" outerRadius={98} label>{reports.statuses.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip formatter={(value, name) => [value, prettyStatus(name)]} /><Legend formatter={prettyStatus} /></PieChart></ResponsiveContainer></ChartCard>
        <ChartCard title="Faculty Reports"><ResponsiveContainer width="100%" height={290}><BarChart data={reports.faculties}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#0f766e" /></BarChart></ResponsiveContainer></ChartCard>
        <ChartCard title="Monthly Reports"><ResponsiveContainer width="100%" height={290}><AreaChart data={reports.monthly}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Area type="monotone" dataKey="value" stroke="#2563eb" fill="#93c5fd" /></AreaChart></ResponsiveContainer></ChartCard>
        <ChartCard title="Yearly Reports"><ResponsiveContainer width="100%" height={290}><LineChart data={reports.yearly}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#d99a18" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartCard>
      </div>
      <ChartCard title="Department Reports"><ResponsiveContainer width="100%" height={320}><BarChart data={reports.departments}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#7c3aed" /></BarChart></ResponsiveContainer></ChartCard>
    </div>
  );
}

function ChartCard({ title, children }) {
  return <Card className="p-5"><h2 className="mb-4 font-semibold">{title}</h2>{children}</Card>;
}
