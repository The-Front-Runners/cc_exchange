export default function CarbonFootprintCard() {
  return (
    <div className="flex flex-col gap-3 text-center">
      <h2 className="text-xl font-semibold">PEGADA DE CARBONO DO SEU PAÍS</h2>
      <div className="flex items-center gap-2">
        <div className="text-green-500 font-semibold">VERDE</div>
        <div className="relative flex-1">
          <div className="absolute left-0 w-full h-3 bg-slate-200 rounded-full"></div>
          <div className="absolute left-0 h-3 bg-lime-500 rounded-full" style={{ width: '40%' }}></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-green-800 rounded-full"></div>
        </div>
        <div className="text-red-500 font-semibold">POLUENTE</div>
      </div>
    </div>
  );
}
