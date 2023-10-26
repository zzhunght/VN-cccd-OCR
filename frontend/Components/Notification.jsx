import {
  faCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Notification = ({ setWarning, message, status }) => {
  return (
    <div>
      {(() => {
        switch (status) {
          case "Warning":
            return (
              <div className="fixed top-[40px] right-[40px] flex-center border-[#ffc021] bg-white min-w-[400px] max-w-[450px] rounded-sm border-l-[4px] border-solid shadow-4 py-5 z-50 animate-slideLeft">
                <div className="text-[#ffc021] text-24 px-4">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                </div>
                <div className="grow">
                  <h1 className="text-16 text-[#333] font-semibold">
                    {status}
                  </h1>
                  <p className="text-[#888] text-[14px] mt-1 leading-5">
                    {message}
                  </p>
                </div>
                <div className="px-4 text-20 text-[rgba(0,0,0,0.3)] cursor-pointer">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={(e) => setWarning(false)}
                  />
                </div>
              </div>
            );
          case "Success":
            return (
              <div className="fixed top-[40px] right-[40px] flex-center border-[#40a459] bg-white min-w-[400px] max-w-[450px] rounded-sm border-l-[4px] border-solid shadow-4 py-5 z-50 animate-slideLeft">
                <div className="text-[#40a459] text-24 px-4">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className="grow">
                  <h1 className="text-16 text-[#333] font-semibold">
                    {status}
                  </h1>
                  <p className="text-[#888] text-[14px] mt-1 leading-5">
                    {message}
                  </p>
                </div>
                <div className="px-4 text-20 text-[rgba(0,0,0,0.3)] cursor-pointer">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={(e) => setWarning(false)}
                  />
                </div>
              </div>
            );
          default:
            return (
              <div className="fixed top-[40px] right-[40px] flex-center border-[#FF0000] bg-white min-w-[400px] max-w-[450px] rounded-sm border-l-[4px] border-solid shadow-4 py-5 z-50 animate-slideLeft">
                <div className="text-[#FF0000] text-24 px-4">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                </div>
                <div className="grow">
                  <h1 className="text-16 text-[#333] font-semibold">
                    {status}
                  </h1>
                  <p className="text-[#888] text-[14px] mt-1 leading-5">
                    {message}
                  </p>
                </div>
                <div className="px-4 text-20 text-[rgba(0,0,0,0.3)] cursor-pointer">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={(e) => setWarning(false)}
                  />
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default Notification;
