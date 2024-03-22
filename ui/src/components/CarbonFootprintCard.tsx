import CO2Logo from '../icons/CO2Logo';

export default function CarbonFootprintCard() {
  return (
    <div className="flex flex-col gap-3 text-center">
      <h2 className="text-xl font-semibold">PEGADA DE CARBONO DO SEU PAÍS</h2>
      <div className="flex items-center gap-2">
        <div>VERDE</div>
        <div className="w-[500px] rounded-full bg-slate-200 border border-slate-300 shadow-xl py-2 relative">
          <div className="ml-[60px] w-[200px] h-7 rounded-full bg-lime-500"></div>
          <div className="w-14 h-14 bg-green-800 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className=" absolute [&>svg]:w-[100px] [&>svg]:h-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CO2Logo />
          </div>
        </div>
        <div>POLUENTE</div>
      </div>
    </div>
  );
}
