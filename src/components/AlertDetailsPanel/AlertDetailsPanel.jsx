import React, { useState } from "react";
import UserIcon from "../../assets/icons/user-icon.svg";
import phoneIcon from "../../assets/icons/phone-icon.svg";
import { apiStateToUiStatus } from "../../services/organizationApi";

function AlertDetailsPanel({ title, details, isLoading, isUpdating, error, onStatusUpdate }) {
	const [status, setStatus] = useState('pending');
	const [syncedAlertId, setSyncedAlertId] = useState(null);

	if (details?.alertId && details.alertId !== syncedAlertId) {
		setSyncedAlertId(details.alertId);
		setStatus(details?.status ? apiStateToUiStatus(details.status) : 'pending');
	}

	async function handleUpdate() {
		if (onStatusUpdate) {
			await onStatusUpdate(status);
		}
	}

	return (
		<aside className="rounded-[var(--radius-sm)] bg-[#FBFCFB]">
		<header 
  style={{ 
    height: '102px',
    backgroundColor: '#C5D5B9',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
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
    <span className={
      `inline-flex items-center justify-center rounded-[4px] font-bold text-[12px] shadow-sm ${status === 'resolved' ? 'bg-[#9bd0a3] text-[#0f4c26] p-2 rounded-2xl ' : '  p-2 rounded-2xl bg-[#d59b9b] text-[#5a1111]'}`
    }>
      {details?.status}
    </span>
  </div>
</header>
			<div className="space-y-4 pl-2 p-3 text-[#252525]">
				{isLoading ? (
					<p className="m-0 text-[length:var(--font-size-sm)] text-[#666]">Loading details...</p>
				) : null}
				{error ? (
					<p className="m-0 text-[length:var(--font-size-sm)] text-[#8a1f1f]">{error}</p>
				) : null}
				<div className="space-y-5 text-[length:var(--font-size-sm)]">
					<p className="m-0 flex mb-4 items-center gap-3"> 
    <img src={UserIcon} alt="User" className="w-[30px] h-[30px] object-contain" />
    <span>
        User:
        <br />
        <strong className="font-bold">{details?.user || "No Name"}</strong>
    </span>
</p>


                  <div className="mt-4 space-y-3">
                 <div className="flex items-center gap-2">
                 <span className="text-[14px] font-bold text-[#1f1f1f]">ID:</span>
                 <span className="text-[14px] font-medium text-[#2d2d2d]">{details?.alertId}</span>
                 </div>

                 <div className="flex items-center gap-2">
                 <span className="text-[14px] font-bold text-[#1f1f1f]">Emergency Type:</span>
                 <span className="text-[14px] font-medium text-[#2d2d2d]">{details?.emergencyType}</span>
                 </div>

                <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-[#2d2d2d]">{details?.injuryType || ''}</span>
                </div>
                </div>
				</div>
				<div>
					<p className="m-0 mb-2 text-[length:var(--font-size-sm)] font-semibold">Location</p>
					{details?.location ? (
						<p className="m-0 text-[length:var(--font-size-sm)] text-[#252525]">{details.location}</p>
					) : details?.latitude && details?.longitude ? (
						<p className="m-0 text-[length:var(--font-size-sm)] text-[#252525]">
							Lat: {details.latitude}, Lng: {details.longitude}
						</p>
					) : (
						<p className="m-0 text-[length:var(--font-size-sm)] text-[#666]">No location data available</p>
					)}
				</div>
				<div>
					<p className="m-0 mb-2 text-[length:var(--font-size-sm)] font-semibold">Status</p>
				

<div>
 <div className="flex flex-col gap-2">
    <button 
      onClick={() => setStatus('pending')}
      disabled={isUpdating}
      style={{ 
        width: '93px', 
        height: '29px',
        backgroundColor: status === 'pending' ? '#E09A9A' : '#F5F5F5' 
      }}
      className="text-[12px] font-medium rounded-[5px] text-black transition-all border-none flex items-center justify-center"
    >
      Pending
    </button>
    
    <button 
      onClick={() => setStatus('resolved')}
      disabled={isUpdating}
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
  <div className="flex justify-center mt-6">
    <button 
      onClick={handleUpdate}
      disabled={isUpdating}
      style={{ 
        width: '104px', 
        height: '29px', 
        backgroundColor: '#C5D5B9',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      }}
      className="text-[12px] font-bold text-[#333] rounded-[5px] hover:brightness-95 transition-all disabled:opacity-60"
    >
      {isUpdating ? 'Updating...' : 'Update'}
    </button>
  </div>
</div>
				</div>
			</div>
		</aside>
	);
}

export default AlertDetailsPanel;
