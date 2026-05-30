import RedPin from '../../assets/red-pin.png';
import GreenPin from '../../assets/green-pin.png';
import YellowPin from '../../assets/yellow-pin.png';
function DashboardMapLegend({ items }) {
	const toneClasses = ['text-[#df4f46]', 'text-[#33a05e]', 'text-[#ecb20d]'];

	return (
    <section className="w-[185px] h-[124px] rounded-[var(--radius-sm)] bg-[var(--color-surface)] p-2">
        <div className="space-y-4">
            {/* 1. Affected areas */}
            <div className="flex items-center gap-3">
                <img src={RedPin} alt="pin" className="w-[18px] h-[22px] object-contain" />
                <span className="text-[14px] font-bold text-[#1f1f1f]">Affected areas</span>
            </div>

            {/* 2. Safe places */}
            <div className="flex items-center gap-3">
                <img src={GreenPin} alt="pin" className="w-[18px] h-[22px] object-contain" />
                <span className="text-[14px] font-bold text-[#1f1f1f]">Safe places</span>
            </div>

            {/* 3. Help reached here */}
            <div className="flex items-center gap-3">
                <img src={YellowPin} alt="pin" className="w-[18px] h-[22px] object-contain" />
                <span className="text-[14px] font-bold text-[#1f1f1f]">Help reached here</span>
            </div>
        </div>
    </section>
);
}

export default DashboardMapLegend;