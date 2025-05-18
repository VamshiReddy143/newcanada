"use client";

import React, { useState } from 'react';
import Header from './components/Header';
import VideoModal from './components/VideoModal';
import Footer from './components/Footer';
import FormModal from './components/FormModal'; // Import FormModal

const App = () => {
  // State for VideoModal
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    Question: '',
    videoSrc: '',
  });

  // State for FormModal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Functions to control FormModal
  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);

  return (
    <div className="min-h-screen bg-[#002B6B]">
      <Header
        setModalState={(newState) => {
          setModalState(newState);
        }}
      />
      <VideoModal
        isOpen={modalState.isOpen}
        onClose={() => {
          setModalState((prev) => ({ ...prev, isOpen: false }));
        }}
        title={modalState.title}
        Question={modalState.Question}
        videoSrc={modalState.videoSrc}
        region={modalState.region}
      />
      <FormModal isOpen={isFormModalOpen} onClose={closeFormModal} />
      <Footer onOpenModal={openFormModal} />
    </div>
  );
};

export default App;