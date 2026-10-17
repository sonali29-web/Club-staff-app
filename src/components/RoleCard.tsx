import React from "react";
import { ArrowRight } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  features,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/[0.07]
        p-4
        text-left
        backdrop-blur-xl

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-purple-400/40
        hover:bg-white/11
        hover:shadow-2xl
        hover:shadow-purple-950/30

        active:scale-[0.98]

        focus:outline-none
        focus:ring-2
        focus:ring-purple-400/60

        sm:p-5
      "
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-purple-400/20
            bg-purple-500/15
            text-purple-300

            transition-all
            duration-300

            group-hover:bg-purple-500/25
            group-hover:text-purple-200

            sm:h-12
            sm:w-12
          "
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">

          <h3
            className="
              text-base
              font-semibold
              leading-tight
              text-white

              sm:text-lg
            "
          >
            {title}
          </h3>


          <p
            className="
              mt-1
              text-xs
              leading-5
              text-white/50

              sm:text-sm
            "
          >
            {description}
          </p>


          <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  text-white/65

                  sm:text-xs
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-purple-400
                  "
                />

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>


        <div
          className="
            hidden
            shrink-0
            text-white/30
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:text-white/80

            sm:block
          "
        >
          <ArrowRight size={18} />
        </div>
      </div>
    </button>
  );
};

export default RoleCard;
