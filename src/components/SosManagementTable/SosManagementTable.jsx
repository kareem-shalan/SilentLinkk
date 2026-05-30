function SosManagementTable({ columns, historyRows, onRowClick, selectedId }) {
	return (
		<section className="overflow-x-auto rounded-[var(--radius-sm)] border border-[#c8c8c8] bg-[var(--color-surface)]">
			<div className="min-w-[760px]">
				<div 
  style={{ 
    height: '55px',              // الطول من فيجما
    backgroundColor: '#C5D5B9',  // اللون من فيجما
    borderTopLeftRadius: '10px', // التدويرة شمال
    borderTopRightRadius: '10px' // التدويرة يمين
  }}
  className="grid grid-cols-[0.8fr_1.5fr_1.8fr_1.2fr_1fr_1.2fr] gap-4 items-center px-4 text-[#2f2f2f] font-bold text-[14px]"
>
  {columns.map((column) => (
    <span 
      key={column} border-r
      className={column === 'Emergency type' ? 'w-[126px]' : ''}
    >
      {column}
    </span>
  ))}
</div>
				{historyRows && historyRows.map((row) => (
 <div 
  key={row.alertId}
  // 1. إضافة الضغطة (onClick)
  onClick={() => onRowClick(row)} 
  
  // 2. إضافة التلوين الرمادي لما يكون هو المختار
  className={`grid grid-cols-[0.8fr_1.5fr_1.8fr_1.2fr_1fr_1.2fr] gap-4 items-center p-3 cursor-pointer transition-all ${
    selectedId === row.alertId ? 'bg-[#F2F2F2]' : 'hover:bg-[#F9F9F9]'
  }`}
>
    <span>{row.alertId}</span>
    <span className="font-bold text-black">{row.user}</span>
    
    {/* هنا ثبتنا مقاس الـ Emergency Type وصغرنا خطه شوية عشان يبقى شيك */}
    <span className="w-[126px] text-[13px] font-bold text-black">{row.emergencyType}</span>
    
    <span>{row.location}</span>
    <span>{row.time}</span>
    
    {/* الـ Status Badge بالمقاسات والألوان اللي ثبتناها */}
    <span 
      className="inline-flex items-center justify-center rounded-[4px] font-bold text-[12px] shadow-sm"
      style={{ 
        width: row.status.includes('Resolved') ? '104px' : '93px', 
        height: '29px',
        backgroundColor: row.status.includes('Resolved') ? '#9bd0a3' : '#d59b9b',
        color: row.status.includes('Resolved') ? '#0f4c26' : '#5a1111',
        display: 'inline-flex'
      }}
    >
       {row.status}
    </span>
  </div>
))}
			</div>
		</section>
	);
}

export default SosManagementTable;
