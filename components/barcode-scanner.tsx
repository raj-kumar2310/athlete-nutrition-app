"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Use pragmatic `any` for scanned food shape to avoid parser/runtime issues

/**
 * BarcodeScanner component – scans a food barcode and auto‑searches via our
 * server endpoint `/api/scan-barcode`. Users can also manually type a barcode.
 */
export default function BarcodeScanner() {
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState<any | null>(null);
  const [error, setError] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const fetchFood = async (code: string) => {
    setLoading(true);
    setFood(null);
    setError('');
    try {
      const res = await fetch(`/api/scan-barcode?barcode=${encodeURIComponent(code)}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to fetch food');
      }
      const data = await res.json();
      setFood(data);
      setBarcode(code);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch food');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      // cleanup animation frame
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setError('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera not supported in this browser');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      scanLoop();
    } catch (err) {
      setError('Unable to access camera');
    }
  };

  const stopCamera = () => {
    setScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const scanLoop = async () => {
    try {
      const vd = (window as any).BarcodeDetector;
      if (vd && videoRef.current) {
        const detector = new vd({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] });
        const detectOnce = async () => {
          try {
            const barcodes = await detector.detect(videoRef.current as HTMLVideoElement);
            if (barcodes && barcodes.length > 0) {
              const code = barcodes[0].rawValue;
              if (code) {
                stopCamera();
                await fetchFood(code);
                return;
              }
            }
          } catch (e) {
            // detection may throw intermittently; ignore
          }
          rafRef.current = requestAnimationFrame(detectOnce);
        };
        rafRef.current = requestAnimationFrame(detectOnce);
        return;
      }

      // Fallback: draw video to canvas and attempt no-op (we don't have a fallback library installed).
      // Inform user to use manual entry if BarcodeDetector is unavailable.
      setError('Barcode scanning not available in this browser — use manual lookup.');
      stopCamera();
    } catch (err) {
      setError('Scanner error');
      stopCamera();
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode.trim()) fetchFood(barcode.trim());
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Barcode Scanner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video preview */}
        <div className="relative aspect-square bg-muted rounded overflow-hidden">
          {scanning ? (
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm text-center p-4">
              {error || 'Camera scanning is not active. Use manual entry or start camera.'}
            </div>
          )}
        </div>

        {/* Manual entry */}
        <form onSubmit={handleManualSubmit} className="flex gap-2 items-center">
          <Input
            placeholder="Enter barcode manually"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>Lookup</Button>
          <Button type="button" variant="secondary" onClick={() => (scanning ? stopCamera() : startCamera())}>
            {scanning ? 'Stop Camera' : 'Start Camera'}
          </Button>
        </form>

        {/* Loading / error / result */}
        {loading && (
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="h-5 w-5 animate-spin" /> Searching…
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {food && (
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Food Details</h3>
            <p><strong>Name:</strong> {food.name}</p>
            <p><strong>Calories:</strong> {food.calories} kcal</p>
            <p><strong>Protein:</strong> {food.protein_g} g</p>
            <p><strong>Carbs:</strong> {food.carbs_g} g</p>
            <p><strong>Fat:</strong> {food.fats_g} g</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
