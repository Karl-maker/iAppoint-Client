import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function GuardPage({ children, condition, redirect }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!condition) {
      navigate(redirect);
    }
  }, [condition]);

  return <>{children}</>;
}
