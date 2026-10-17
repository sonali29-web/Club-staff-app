import React from "react";

interface LoginInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}

const LoginInput: React.FC<LoginInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">
        {label}
      </label>

      <div className="relative">

        <div
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            flex
            -translate-y-1/2
            items-center
            justify-center
            text-white/40
          "
        >
          {icon}
        </div>


        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/10
            py-3
            pl-10
            pr-4
            text-sm
            text-white
            outline-none
            placeholder:text-white/30

            transition

            focus:border-white/10
            focus:bg-white/10
            focus:ring-2
            focus:ring-purple-500/20
          "
        />
      </div>
    </div>
  );
};

export default LoginInput;