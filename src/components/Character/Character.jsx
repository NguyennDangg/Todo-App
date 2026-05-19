import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Character.scss'

const expressions = {
  idle: '/assets/mio-idle.png',
  heh: '/assets/mio-heh.png',
  yaho: '/assets/mio-yaho.png',
}

function MioCharacter({ taskAdded }) {
  const [expression, setExpression] = useState('idle')

  if (taskAdded && expression !== 'yaho') {
    setExpression('yaho')
    setTimeout(() => setExpression('idle'), 1500)
  }

  return (
    <div className="mio-wrapper">
      <div className="mio-float-container">
      <AnimatePresence mode="wait">
        <motion.img
          key={expression}
          src={expressions[expression]}
          alt="Haimiya Mio"
          className="mio-image"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setExpression('heh')}
          onMouseLeave={() => setExpression('idle')}
        />
      </AnimatePresence>
      </div>
    </div>
  )
}

export default MioCharacter