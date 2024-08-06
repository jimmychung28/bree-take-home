import Modal from 'react-modal';


import React from 'react';

type ResultModalProps = Readonly<{
  isOpen: boolean;
  closeModal: () => void;
  result: Partial<{ nameMatches: boolean; dobMatches: boolean; countryMatches: boolean; fetched: boolean; }>
}>;



const ResultModal: React.FC<ResultModalProps> = ({ isOpen, closeModal, result }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Result Modal"
      className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20 w-4/5 h-2/4 justify-center items-center relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
        <h2 className='font-bold'>{result?.nameMatches || result?.dobMatches || result?.countryMatches ? 'Hit' : 'Clear'}</h2>
        <br />
        <h2>Results</h2>
        <div>
            <p>Name: {result?.nameMatches ? "✅" : "❌"}</p>
            <p>DOB: {result?.dobMatches ? "✅" : "❌"}</p>
            <p>Country: {result?.countryMatches ? "✅" : "❌"}</p>
        </div>
        <button 
        onClick={closeModal} 
        className="absolute top-4 right-4 text-lg font-bold"
        >
                &times;
            </button>
    </Modal>
  );
};

export default ResultModal;


