'use client'

import { useCallback } from 'react'
import gsap from 'gsap'

export function useAnimation() {
  const animateIn = useCallback(
    (element: HTMLElement | string, options?: gsap.TweenVars) => {
      return gsap.from(element, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        ...options,
      })
    },
    []
  )

  const animateOut = useCallback(
    (element: HTMLElement | string, options?: gsap.TweenVars) => {
      return gsap.to(element, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
        ...options,
      })
    },
    []
  )

  const staggerIn = useCallback(
    (
      elements: (HTMLElement | string)[],
      options?: gsap.TweenVars
    ) => {
      return gsap.from(elements, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        ...options,
      })
    },
    []
  )

  const elasticSpring = useCallback(
    (element: HTMLElement | string, options?: gsap.TweenVars) => {
      return gsap.to(element, {
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
        ...options,
      })
    },
    []
  )

  const rippleEffect = useCallback(
    (element: HTMLElement, options?: gsap.TweenVars) => {
      const ripple = document.createElement('span')
      ripple.style.position = 'absolute'
      ripple.style.borderRadius = '50%'
      ripple.style.pointerEvents = 'none'
      ripple.style.width = '0'
      ripple.style.height = '0'
      ripple.style.background = 'rgba(255,255,255,0.3)'
      ripple.style.left = '50%'
      ripple.style.top = '50%'
      ripple.style.transform = 'translate(-50%, -50%)'
      element.appendChild(ripple)

      gsap.to(ripple, {
        width: 200,
        height: 200,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
        ...options,
      })
    },
    []
  )

  return { animateIn, animateOut, staggerIn, elasticSpring, rippleEffect }
}
