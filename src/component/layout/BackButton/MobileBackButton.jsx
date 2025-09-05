import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

export default function MobileBackButton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  if (!isMobile) return null;

  return (
    <button
      onClick={handleBack}
      style={{
        backgroundColor: "transparent",
        border: "none",
        display: "flex",
      }}
    >
      <MdArrowBack size={25}  color="#000"/>
    </button>
  );
}
