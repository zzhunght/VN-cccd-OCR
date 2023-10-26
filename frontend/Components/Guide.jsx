import {
  faCode,
  faFile,
  faImage,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GuideList } from "../Contants/index";
import React from "react";
const Guide = () => {
  return (
    <div className="py-5">
      <h3 className="text-center font-bold text-32 leading-32 py-5 mb-4">
        Hướng dẫn sử dụng
      </h3>
      <div className="content">
        <ul className="list-none">
          {GuideList.map((item, index) => (
            <li
              key={index}
              className="text-20 md:leading-20 leading-28 p-3 gap-5"
            >
              <FontAwesomeIcon icon={faCode} className="text-[#17CDEA]" />
              <span className="pl-3">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Guide;
