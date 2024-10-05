import { useState, useEffect } from "react"

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false) // Initialize as false or true based on your preference

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    // Check on mount
    checkMobile()

    window.addEventListener("resize", checkMobile) // Add resize event listener
    return () => {
      window.removeEventListener("resize", checkMobile) // Cleanup
    }
  }, [])

  return isMobile
}

export default useIsMobile
