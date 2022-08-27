import { useState } from "react";
import axios from "axios";

const QuestionsBoard = () => {


  return (
    <div className="bg-brand-beige flex flex-col  gap-[56px] pt-[56px] items-center w-100% h-[844px] isolate">
      <div className="flex flex-col justify-between items-end px-[32px] w-[390px] h-[133px] pt-[32px]">
        <div className="absolute w-[124px] h-[72px] font-[20px] -rotate-90 uppercase tracking-widest left-[32px] top-[32px]">
        Temp_RARV
        <div className="bg-brand-gray2 text-brand-beige2 -m-1">AN_NYMOUS</div>
        z_ne
        </div>
        <div className="uppercase absolute top-[76px] text-right flex flex-col">
          <div className="uppercase">devcon-bogota</div>
          <div className="uppercase font-bold text-3xl font-year">2022</div>
        </div>

      </div>
    </div>
  );
};

export default QuestionsBoard;
