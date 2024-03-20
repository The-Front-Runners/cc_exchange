import CO2Logo from '../components/CO2Logo';

export default function Home() {
  return (
    <div className="flex items-center h-screen text-white bg-lime-500">
      <div className="w-[45%] px-24 ">
        <h2 className="font-bold text-6xl mb-4">
          "Se poluição é dinheiro, qual é o valor de um bom ar?"
        </h2>
        <p className="font-medium text-2xl">
          Para iniciar o processo de compra e venda de carbono, é necessário
          conectar sua carteira.
        </p>
      </div>
      <div className="w-[55%] relative">
        <div className="flex flex-col items-center text-center h-[90vh] rounded-l-lg bg-black/70">
          <div className="mt-20">
            <CO2Logo />
          </div>
          <h2 className="text-5xl mt-[-50px]">Bem-vindo novamente!</h2>
          <button className="bg-lime-600 hover:bg-lime-500 text-2xl rounded px-10 py-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[20%]">
            Conecte sua carteira
          </button>
        </div>
      </div>
    </div>
  );
}
