import React from 'react';
import { Pie } from 'react-chartjs-2'; // غيرنا النوع هنا لـ Pie
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// تسجيل المكونات
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardPiePanel({ chartData }) {
  // تجهيز الأرقام (50, 30, 15, 5)
  const chartValues = chartData 
    ? chartData.map(stat => parseInt(stat.value)) 
    : [50, 30, 15, 5];

  const data = {
    labels: ['total sos', 'ended sos', 'running sos', 'pending sos'],
    datasets: [
      {
        data: chartValues,
        backgroundColor: [
          '#49987A', // الأخضر الأساسي
          '#DCEEC4', // الأخضر الفاتح
          '#89B791', // الأخضر الوسط
          '#C5D5B9', // الأخضر الباهت
        ],
        borderWidth: 0,
        hoverOffset: 15,
        // شيلنا الـ cutout عشان تبقى مقفولة
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // الأسماء على اليمين
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          color: '#636363',
          font: {
            size: 11,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 10,
        cornerRadius: 8,
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <section className="w-[320px] h-[220px] rounded-none bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden mt-10 ml-7">
      <div className="relative h-[140px] w-full flex items-center justify-center">
        {/* استخدمنا Pie هنا */}
        <Pie data={data} options={options} />
      </div>
    </section>
  );
}

export default DashboardPiePanel;