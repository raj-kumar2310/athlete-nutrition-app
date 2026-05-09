import { useState } from 'react'
import html2canvas from 'html2canvas'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'

async function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png')
  })
}

export default function ShareMealPlan({ targetRef, buildShareText, fileName = 'athleteeats-meal-plan.png' }) {
  const [busy, setBusy] = useState(false)

  const handleShare = async () => {
    const target = targetRef?.current
    if (!target || busy) return

    const shareText = buildShareText?.() || ''
    setBusy(true)

    try {
      const canvas = await html2canvas(target, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      })
      const blob = await canvasToBlob(canvas)

      if (blob) {
        const file = new File([blob], fileName, { type: 'image/png' })
        const canShareFiles = typeof navigator.canShare === 'function' ? navigator.canShare({ files: [file] }) : false

        if (navigator.share && canShareFiles) {
          await navigator.share({
            title: 'AthleteEats Meal Plan',
            text: shareText,
            files: [file],
          })
          return
        }
      }

      if (shareText && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText)
      }
    } catch {
      if (shareText && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(shareText)
        } catch {
          // ignore clipboard failures
        }
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleShare}
      disabled={busy}
      style={{
        width: '100%',
        padding: '14px',
        border: 'none',
        borderRadius: 12,
        cursor: busy ? 'not-allowed' : 'pointer',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 15,
        fontWeight: 800,
        letterSpacing: 2,
        color: '#fff',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: 'linear-gradient(135deg, #FF4D00, #FF7A00)',
        opacity: busy ? 0.72 : 1,
      }}
    >
      <Share2 size={14} /> {busy ? 'Sharing...' : 'Share'}
    </motion.button>
  )
}