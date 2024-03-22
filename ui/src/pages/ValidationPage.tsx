import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ValidationPage() {
  const [validator, setValidator] = useState('');
  const [operationName, setOperationName] = useState('');
  const [validationFormLink, setValidationFormLink] = useState('');

  const handleSubmit = (e: FormEvent)=> {
    e.preventDefault();
    toast.success('Formulário enviado com sucesso!');
    // Additional form submission logic goes here
  };

  return (
    <div className="bg-green-900 h-screen p-5">
      <h1 className="text-white text-xl font-bold mb-5">VALIDAÇÃO</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <select
            value={validator}
            onChange={(e) => setValidator(e.target.value)}
            className="w-full p-3 rounded-md bg-green-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="" disabled>Selecione a instituição validadora</option>
            <option value="validador1">Validador 1</option>
            <option value="validador2">Validador 2</option>
            <option value="validador3">Validador 3</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Nome da sua operação"
            value={operationName}
            onChange={(e) => setOperationName(e.target.value)}
            className="w-full p-3 rounded-md bg-green-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Formulário de validação"
            value={validationFormLink}
            onChange={(e) => setValidationFormLink(e.target.value)}
            className="w-full p-3 rounded-md bg-green-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 rounded-md bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:from-green-500 hover:to-blue-600"
        >
          Enviar solicitação
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
