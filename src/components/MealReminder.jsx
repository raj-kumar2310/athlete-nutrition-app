import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function MealReminder({ sessionTime, mealPlan }) {
  const theme = useTheme()
  const [banner, setBanner] = useState(null)
  const [notificationPermission, setNotificationPermission] = useState(null)
  const timeoutIds = []

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationPermission('granted')
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission)
        })
      } else {
        setNotificationPermission('denied')
      }
    }
  }, [])

  // Schedule meal reminders
  useEffect(() => {
    if (!sessionTime || !mealPlan) return

    const sessionDate = new Date(sessionTime)
    if (isNaN(sessionDate.getTime())) return

    // Calculate meal times
    const preWorkoutTime = new Date(sessionDate.getTime() - 2 * 60 * 60 * 1000) // 2 hrs before
    const snackTime = new Date(sessionDate.getTime() - 60 * 60 * 1000) // 1 hr before
    const postWorkoutTime = new Date(sessionDate.getTime() + 30 * 60 * 1000) // 30 min after

    const now = new Date()

    // Helper to schedule a reminder
    const scheduleReminder = (targetTime, mealName, mealDesc) => {
      const delay = targetTime.getTime() - now.getTime()

      if (delay > 0 && delay < 24 * 60 * 60 * 1000) {
        // Within 24 hours
        const timeoutId = setTimeout(() => {
          // Send notification if permission granted
          if (notificationPermission === 'granted' && 'Notification' in window) {
            new Notification(`⏰ ${mealName}`, {
              body: mealDesc,
              icon: '🍽️',
              tag: mealName,
            })
          }

          // Show in-app banner
          const minutesUntilMeal = 15
          setBanner({
            type: mealName,
            desc: mealDesc,
            emoji: '⏰',
          })

          // Auto-dismiss banner after 10 seconds
          const dismissId = setTimeout(() => setBanner(null), 10000)
          timeoutIds.push(dismissId)
        }, delay)

        timeoutIds.push(timeoutId)
      }
    }

    // Schedule all three reminders
    scheduleReminder(
      preWorkoutTime,
      'Pre-Workout Meal',
      mealPlan.preWorkout || 'Time to eat your pre-workout meal!'
    )
    scheduleReminder(
      snackTime,
      '1-Hour Pre-Workout Snack',
      mealPlan.snack || 'Quick snack time!'
    )
    scheduleReminder(
      postWorkoutTime,
      'Post-Workout Meal',
      mealPlan.postWorkout || 'Recovery meal time!'
    )

    // Cleanup
    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [sessionTime, mealPlan, notificationPermission])

  // Format meal description
  const getMealDescription = () => {
    if (!banner) return ''
    switch (banner.type) {
      case 'Pre-Workout Meal':
        return mealPlan?.preWorkout || 'Pre-workout meal ready!'
      case '1-Hour Pre-Workout Snack':
        return mealPlan?.snack || 'Snack time!'
      case 'Post-Workout Meal':
        return mealPlan?.postWorkout || 'Post-workout meal ready!'
      default:
        return ''
    }
  }

  return (
    <AnimatePresence>
      {banner && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            right: 16,
            zIndex: 1000,
            background: 'linear-gradient(135deg, #FF4D00, #FF7A00)',
            borderRadius: 14,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            boxShadow: '0 8px 24px rgba(255, 77, 0, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <Bell
              size={18}
              style={{
                color: '#fff',
                flexShrink: 0,
                animation: 'ring 1s ease-in-out infinite',
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: '#fff',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  marginBottom: 4,
                }}
              >
                {banner.type}
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: 12,
                  fontFamily: "'Barlow', sans-serif",
                  lineHeight: 1.4,
                }}
              >
                {getMealDescription()}
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setBanner(null)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: 8,
              padding: 6,
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <X size={16} />
          </motion.button>
        </motion.div>
      )}

      <style>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10%, 20% { transform: rotate(-10deg); }
          30%, 50%, 70%, 90% { transform: rotate(10deg); }
          40%, 60%, 80% { transform: rotate(-10deg); }
        }
      `}</style>
    </AnimatePresence>
  )
}
