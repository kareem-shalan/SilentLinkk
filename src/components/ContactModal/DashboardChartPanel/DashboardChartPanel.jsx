import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// البيانات مطابقة تماماً لفيجما
const data = [
  { name: 'total sos', value: 50, goal: 52, trend: 0 },
  { name: 'ended sos', value: 30, goal: 52, trend: 20 },
  { name: 'running sos', value: 15, goal: 52, trend: 38 },
  { name: 'pennding sos', value: 8, goal: 52, trend: 48 },
];

const DashboardChartPanel = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm w-full">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            {/* الشبكة المنقطة بالعرض فقط */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            
            {/* الكلام المايل تحت بنفس الأسامي */}
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              interval={0}
              height={80}
              tick={{fill: '#666', fontSize: 11, fontWeight: 500}}
              axisLine={{stroke: '#666'}}
            />

            {/* الأرقام من الناحيتين */}
            <YAxis yAxisId="left" orientation="left" domain={[0, 55]} axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 55]} axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />

            <Tooltip cursor={{fill: 'transparent'}} />

            {/* الأعمدة الخضراء */}
            <Bar yAxisId="left" dataKey="value" fill="#49987A" barSize={35} />

            {/* الخط الأفقي العلوي (البرتقالي) */}
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="goal" 
              stroke="#FF8A00" 
              strokeWidth={1}
              dot={{ r: 4, fill: 'white', stroke: '#FF8A00', strokeWidth: 1 }} 
              activeDot={false}
            />
            
            {/* الخط القطري (الأزرق) */}
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="trend" 
              stroke="#8884d8" 
              strokeWidth={1}
              dot={{ r: 4, fill: 'white', stroke: '#8884d8', strokeWidth: 1 }} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* الـ Legend اللي تحت الرسمة */}
      <div className="flex justify-center items-center gap-6 mt-4 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#00acc1]"></div> 
          <span className="text-[12px] text-gray-600">1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#fb8c00]"></div> 
          <span className="text-[12px] text-gray-600">5</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-[#8884d8] flex items-center justify-center">
            <div className="w-1 h-1 bg-[#8884d8] rounded-full"></div>
          </div>
          <span className="text-[12px] text-gray-600">1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-[#FF8A00] flex items-center justify-center">
            <div className="w-1 h-1 bg-[#FF8A00] rounded-full"></div>
          </div>
          <span className="text-[12px] text-gray-600">5</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardChartPanel;