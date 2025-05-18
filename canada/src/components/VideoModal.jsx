"use client";

import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, title, Question, videoSrc, region }) => {
    const modalRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showCenterButton, setShowCenterButton] = useState(true);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        console.log('VideoModal isOpen:', isOpen, 'Title:', title, 'VideoSrc:', videoSrc);
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen && videoRef.current) {
            videoRef.current.currentTime = 0;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                        setShowCenterButton(true);
                        timeoutRef.current = setTimeout(() => {
                            setShowCenterButton(false);
                        }, 3000);
                        setError(null);
                    })
                    .catch((error) => {
                        console.error('Video play failed:', error);
                        setIsPlaying(false);
                        setShowCenterButton(true);
                        setError('Failed to play video. Please try again.');
                    });
            }
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };
    }, [isOpen, onClose]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
                setShowCenterButton(true);
                setError(null);
            } else {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                            setShowCenterButton(true);
                            timeoutRef.current = setTimeout(() => {
                                setShowCenterButton(false);
                            }, 3000);
                            setError(null);
                        })
                        .catch((error) => {
                            console.error('Video play failed:', error);
                            setIsPlaying(false);
                            setShowCenterButton(true);
                            setError('Failed to play video. Please try again.');
                        });
                }
            }
        }
    };

    if (!isOpen) return null;

    const videoSource = videoSrc || 'https://cdn-cf-east.streamable.com/video/mp4/801x69.mp4';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-2xl w-full max-w-5xl mx-4 overflow-hidden transform transition-all duration-300 ease-in-out"
            >
                <div className="flex items-center justify-between p-4">
                    <div className="flex justify-between items-center w-full">
                        <h3 className="text-[27px] font-bold text-[#0097B2]">{title}</h3>
                        <h3 className="text-[27px] font-bold text-[#0097B2]">{region}</h3>
                    </div>
                    <button
                        onClick={() => {
                            console.log('Close button clicked');
                            onClose();
                        }}
                        className="text-gray-500 hover:text-gray-700 pb-10 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="relative">
                    <div className="bg-gray-100 rounded-xl px-2">
                        <video
                            ref={videoRef}
                            src={videoSource}
                            className="w-full max-w-[1280px] aspect-video bg-gray-300 px-2 rounded-xl mx-auto"
                            style={{ transform: 'translateZ(0)' }}
                            onClick={togglePlay}
                            onError={(e) => {
                                console.error('Video failed to load:', e);
                                setError('Video failed to load. Please check the URL.');
                            }}
                            onEnded={() => {
                                setIsPlaying(false);
                                setShowCenterButton(true);
                                onClose();
                            }}
                            playsInline
                            preload="auto"
                            muted
                        >
                            {videoSource && <source src={videoSource} type="video/mp4" />}
                        </video>

                        {showCenterButton && (
                            <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center">
                                <button
                                    onClick={togglePlay}
                                    className="h-16 w-16 rounded-full bg-teal-600/90 text-white flex items-center justify-center hover:bg-teal-700 transition-colors duration-200"
                                >
                                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                                </button>
                            </div>
                        )}
                        <div className="pt-2 text-gray-700">
                            <p className="text-left text-[27px] ml-5 pb-4 text-black font-bold">Q: '{Question}'</p>
                            {error && <p className="text-red-500 text-center">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;