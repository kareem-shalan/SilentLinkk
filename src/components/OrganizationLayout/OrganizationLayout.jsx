function OrganizationLayout({ sidebar, children }) {
  return (
    <div className="min-h-screen bg-[#f4f4f4] font-[Arial,sans-serif] lg:flex">
      <aside className="w-full shrink-0 lg:fixed lg:left-0 lg:top-0 lg:z-10 lg:h-screen lg:w-[300px] lg:overflow-y-auto">
        {sidebar}
      </aside>
      <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:ml-[300px] lg:p-10">
        {children}
      </main>
    </div>
  );
}

export default OrganizationLayout;
