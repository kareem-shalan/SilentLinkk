import { DASHBOARD_CONTENT } from '../../utils/constants';
import SearchIcon from '../../assets/search-icon.svg';
import NameIcon from '../../assets/name-icon.svg';

function SosHistoryPanel({ historyRows, title }) {
  return (
    <section className="rounded-[var(--radius-sm)] bg-[#1a8e5f] p-4 text-white">
      <header className="px-6 pt-4 mb-2 flex flex-wrap items-center justify-between">
        <h3 className="m-0 text-xl font-semibold">{title}</h3>
        <div className="bg-white text-black px-4 py-1 rounded-sm text-sm cursor-pointer shadow-sm">
          {title}
        </div>
      </header>

      <div className="flex px-6 mb-2"> 
        <div className="flex mt-1 mb-6 items-center bg-white rounded-sm px-3 py-1 w-[130px] shadow-sm border border-gray-100">
          <input 
            type="text" 
            placeholder="Search" 
            className="outline-none text-sm text-black w-full bg-transparent" 
          />
          <img src={SearchIcon} alt="search" className="w-4 h-5 opacity-70 ml-2" />
        </div>
      </div>

      {/* الجدول: شيلنا h-[204px] وخليناه h-fit عشان يبين كل الأسامي */}
      <div className="w-[477px] h-fit overflow-hidden rounded-md bg-white text-black border border-gray-300 ml-6 shadow-sm">
        
        {/* سطر العناوين */}
        <div className="grid grid-cols-3 border-b border-gray-300 bg-[#f9f9f9] font-bold h-[35px] items-center">
          <span className="px-3 border-r border-gray-300 text-[12px] h-full flex items-center">
            Name
          </span>
          <span className="px-3 border-r border-gray-300 text-[12px] h-full flex items-center pl-8">
            Status
          </span>
          <span className="px-3 text-[12px] h-full flex items-center pl-8">
            Emergency Type
          </span>
        </div>

        {/* سطر البيانات */}
        <div className="divide-y divide-gray-200">
          {historyRows && historyRows.map((row, index) => (
            <div key={index} className="grid grid-cols-3 items-center h-[40px] text-sm">
              <span className="flex items-center gap-2 px-3 border-r border-gray-200 h-full">
                <img 
                  src={NameIcon} 
                  alt="icon" 
                  className="w-[26px] h-[26.39px] object-contain" 
                />
                <span className="text-[11px] font-medium">{row.name}</span>
              </span>

              <span className="px-3 border-r border-gray-200 h-full flex items-center text-[11px] pl-8">
                {row.status}
              </span>

              <span className="px-3 flex items-center text-[11px] font-bold pl-8">
                {row.emergencyType}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SosHistoryPanel;