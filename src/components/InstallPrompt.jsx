import { useEffect, useState, useRef } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Dismiss flag
    const dismissed = localStorage.getItem('pwa-install-dismissed') === 'true'

    // Show banner after 30s on mobile-like devices if event captured
    if (!dismissed) {
      timerRef.current = setTimeout(() => {
        // small UA check for mobile
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
        if (isMobile && deferredPrompt) setVisible(true)
      }, 30000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [deferredPrompt])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
      setVisible(false)
      localStorage.setItem('pwa-install-dismissed', 'true')
    }
  }

  const handleDismiss = () => {
    setVisible(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!visible || !deferredPrompt) return null
  return (
    <div style={{ position: 'fixed', left: 16, right: 16, bottom: 20, zIndex: 2200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #FF4D00, #FF7A00)', padding: '12px 14px', borderRadius: 12, color: '#000', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>A</div>
          <div>
            <div style={{ fontWeight: 800 }}>Add AthleteEats to your home screen</div>
            <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.7)' }}>Install the app for quick access</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleDismiss} style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.08)', padding: '8px 10px', borderRadius: 8 }}>Dismiss</button>
          <button onClick={handleInstall} style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 8 }}>Add</button>
        </div>
      </div>
    </div>
  )
}
