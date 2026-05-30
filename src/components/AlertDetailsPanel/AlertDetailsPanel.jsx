import React, { useState } from "react";
import UserIcon from "../../assets/icons/user-icon.svg";
import phoneIcon from "../../assets/icons/phone-icon.svg";
function AlertDetailsPanel({ title, details }) {
	const [status, setStatus] = useState('pending');
	return (
		<aside className="rounded-[var(--radius-sm)] bg-[#FBFCFB]">
		<header 
  style={{ 
    height: '102px',              // الطول من فيجما
    backgroundColor: '#C5D5B9',   // اللون الأخضر من فيجما
    borderTopLeftRadius: '10px',  // تدويرة الحواف فوق شمال
    borderTopRightRadius: '10px', // تدويرة الحواف فوق يمين
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 15px'
  }}
  className="border-b border-[#E0E0E0]"
>
  <h3 className="m-0 text-[length:var(--font-size-xl)] font-semibold text-[#2d2d2d]">
    {title}
  </h3>
  
  <div className="mt-2 flex items-center gap-3">
    <span className="text-[length:var(--font-size-md)] font-bold text-[#1f1f1f]">
      {details?.alertId}
    </span>
    {/* الـ Badge بتاع الـ Status */}
    <span className="rounded px-2 py-1 text-[length:var(--font-size-xs)] font-semibold bg-[#E09A9A] text-[#5a1111]">
      {details?.status}
    </span>
  </div>
</header>
			<div className="space-y-4 pl-2 p-3 text-[#252525]">
				<div className="space-y-5 text-[length:var(--font-size-sm)]">
					<p className="m-0 flex mb-4 items-center gap-3"> 
    <img src={UserIcon} alt="User" className="w-[30px] h-[30px] object-contain" />
    <span>
        User: {/* تقدري تكتبي الكلمة دي ثابتة أو تستخدمي details?.userLabel */}
        <br />
        {/* التعديل هنا: غيرنا userName لـ user */}
        <strong className="font-bold">{details?.user || "No Name"}</strong>
    </span>
</p>

<p className="m-0 flex items-center gap-3">
    <img src={phoneIcon} alt="Phone" className="w-[19.97px] h-[19.97px] object-contain" />
    {/* تأكدي إن في الجدول البيانات فيها كلمة phone */}
    <span>{details?.phone || "No Phone"}</span>
</p>
                  <div className="mt-4 space-y-3">
                 <div className="flex items-center gap-2">
                 <span className="text-[14px] font-bold text-[#1f1f1f]">ID:</span>
                 <span className="text-[14px] font-medium text-[#2d2d2d]">{details.alertId}</span>
                 </div>

                 <div className="flex items-center gap-2">
                 <span className="text-[14px] font-bold text-[#1f1f1f]">Emergency Type:</span>
                 <span className="text-[14px] font-medium text-[#2d2d2d]">{details?.emergencyType}</span>
                 </div>

                <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-[#1f1f1f]">Injury Type:</span>
                <span className="text-[14px] font-medium text-[#2d2d2d]"></span>
                </div>
                </div>
				</div>
				<div>
					<p className="m-0 mb-2 text-[length:var(--font-size-sm)] font-semibold">Location</p>
					<div className="h-[140px] rounded-[var(--radius-sm)] bg-[linear-gradient(135deg,#eef2f6_0%,#d6dee8_100%)]" />
				</div>
				<div>
					<p className="m-0 mb-2 text-[length:var(--font-size-sm)] font-semibold">Status</p>
				

<div>
 <div className="flex flex-col gap-2">
    {/* زر Pending */}
    <button 
      onClick={() => setStatus('pending')}
      style={{ 
        width: '93px', 
        height: '29px',
        backgroundColor: status === 'pending' ? '#E09A9A' : '#F5F5F5' 
      }}
      className="text-[12px] font-medium rounded-[5px] text-black transition-all border-none flex items-center justify-center"
    >
      Pending
    </button>
    
    {/* زر Resolved */}
    <button 
      onClick={() => setStatus('resolved')}
      style={{ 
        width: '93px', 
        height: '31px',
       backgroundColor: status === 'resolved' ? '#4AAA6B' : '#F5F5F5'
      }}
      className="text-[12px] font-medium rounded-[5px] text-black transition-all border-none flex items-center justify-center"
    >
      Resolved
    </button>
  </div>
  {/* زر Update */}
  <div className="flex justify-center mt-6">
    <button 
      onClick={() => console.log("Updated:", status)}
      style={{ 
        width: '104px', 
        height: '29px', 
        backgroundColor: '#C5D5B9',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' // الـ Drop shadow اللي في فيجما
      }}
      className="text-[12px] font-bold text-[#333] rounded-[5px] hover:brightness-95 transition-all"
    >
      Update
    </button>
  </div>
</div>
				</div>
			</div>
		</aside>
	);
}

export default AlertDetailsPanel;
