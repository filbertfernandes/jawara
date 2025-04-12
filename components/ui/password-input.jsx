import { useState } from "react";
import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = ({ placeholder, className, ...field }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Input
        required
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...field}
        className={className}
      />
      {showPassword ? (
        <EyeIcon
          className="select-none cursor-pointer absolute right-0 mr-3 size-5"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <EyeOffIcon
          className="select-none cursor-pointer absolute right-0 mr-3 size-5"
          onClick={() => setShowPassword(true)}
        />
      )}
    </>
  );
};

export { PasswordInput };
