"use client";

import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { Camera, RefreshCw, X, AlertCircle } from "lucide-react";

interface CameraScannerProps {
  onScanSuccess: (data: string) => void;
  onCancel: () => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  onScanSuccess,
  onCancel,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const animFrameId = useRef<number | null>(null);

  // Start camera stream
  const startCamera = async (mode: "environment" | "user") => {
    try {
      setCameraError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        setIsScanning(true);
      }
    } catch (err: any) {
      console.warn("Camera access error:", err);
      let errorMsg = "Could not access camera.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        errorMsg = "Camera permission was denied. Please allow camera access in browser settings or use the QR Upload option.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorMsg = "No video camera detected on this device. Please use QR Image Upload.";
      }
      setCameraError(errorMsg);
    }
  };

  useEffect(() => {
    startCamera(facingMode);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Frame processing loop
  useEffect(() => {
    if (!isScanning) return;

    const scanFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && video.readyState === video.HAVE_ENOUGH_DATA && canvas) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "attemptBoth",
          });

          if (code && code.data && code.data.trim().length > 0) {
            setIsScanning(false);
            if (stream) {
              stream.getTracks().forEach((track) => track.stop());
            }
            onScanSuccess(code.data.trim());
            return;
          }
        }
      }

      animFrameId.current = requestAnimationFrame(scanFrame);
    };

    animFrameId.current = requestAnimationFrame(scanFrame);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isScanning, stream, onScanSuccess]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onCancel();
  };

  return (
    <div className="relative w-full aspect-square max-h-[340px] bg-ink rounded-[22px] overflow-hidden border-[3px] border-ink flex flex-col items-center justify-center">
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {cameraError ? (
        <div className="p-6 text-center text-white flex flex-col items-center justify-center">
          <AlertCircle className="w-10 h-10 text-coral mb-3" />
          <p className="text-sm font-semibold mb-4 max-w-xs">{cameraError}</p>
          <button
            onClick={handleClose}
            className="btn-secondary text-xs py-2 px-4 bg-white text-ink"
          >
            Switch to QR Image Upload
          </button>
        </div>
      ) : (
        <>
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            autoPlay
          />

          {/* Viewfinder Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            {/* Corner Aiming Brackets */}
            <div className="relative w-52 h-52">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[4px] border-l-[4px] border-butter rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[4px] border-r-[4px] border-butter rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[4px] border-l-[4px] border-butter rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[4px] border-r-[4px] border-butter rounded-br-lg" />

              {/* Animated Laser Sweep */}
              <div className="animate-laser" />
            </div>

            <p className="mt-3 text-xs font-bold text-white uppercase tracking-wider bg-ink/75 px-3 py-1 rounded-full backdrop-blur-xs border border-white/20">
              Align QR Code Inside Camera Frame
            </p>
          </div>

          {/* Camera Controls Bar */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-auto">
            <span className="badge bg-mint text-ink text-[10px] font-mono py-1 px-2.5 border border-ink shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              LIVE_CAMERA
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFacingMode}
                className="w-8 h-8 rounded-full bg-white text-ink border-[2px] border-ink flex items-center justify-center shadow-xs hover:bg-cream transition"
                title="Flip Camera"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white text-ink border-[2px] border-ink flex items-center justify-center shadow-xs hover:bg-cream transition"
                title="Close Camera"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
