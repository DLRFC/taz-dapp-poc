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
      <div className="flex flex-col items-start isolate gap-[36px] relative">
        <div className="flex flex-row px-[32px] gap-[8px]">
          <div className="flex-none text-brand-red">Icon</div>
          <div className=" ml-1 font-xl text-brand-red" >TAZ Border Patrol</div>
        </div>
          <div className="flex flex-col items-center px-[24px] isolate">
            <div className="box-border flex  flex-col items-center p-0 border-2 border-brand-gray solid bg-brand-beige2 w-[342px] h-[494px] shadow-question">
              <div className="flex flex-row justify-between solid w-[342px] h-[68px] items-center py-[16px] px-[32px]">
                <div>Q&A</div>
                <div className="bg-white py-[6px] px-3 shadow-question border-2 solid border-brand-gray w-[165px]">Add question +</div>
              </div>
              <div className="inline-flex flex-col flex-start p-[16px] gap-[10px] bg-white w-[342px] border-2 solid border-brand-gray" >
                <div className="overflow-clip flex flex-row gap-[32px] items-center w-[310px] self-strech">
                  <p className="flex flex-col justify-start w-[263px]">How do I tell my wife’s boyfriend I want to sleep in the bed I bought?</p>
                  <p>icon</p>
                </div>
              </div>
              <div className="flex flex-col flex-start p-[16px] gap-[10px] bg-white w-[342px] h-[89px] border-2 solid border-brand-gray" >
                <div className="flex flex-row gap-[32px] items-center w-[310px] self-strech">
                  <p className="flex flex-col justify-start w-[263px]">How do I tell my wife’s boyfriend I want to sleep in the bed I bought?</p>
                  <p>icon</p>
                </div>
              </div>
              <div className="flex flex-col flex-start p-[16px] gap-[10px] bg-white w-[342px] h-[89px] border-2 solid border-brand-gray" >
                <div className="flex flex-row gap-[32px] items-center w-[310px] self-strech">
                  <p className="flex flex-col justify-start w-[263px]">How do I tell my wife’s boyfriend I want to sleep in the bed I bought?</p>
                  <p>icon</p>
                </div>
              </div>
              <div className="flex flex-col flex-start p-[16px] gap-[10px] bg-white w-[342px] h-[89px] border-2 solid border-brand-gray" >
                <div className="flex flex-row gap-[32px] items-center w-[310px] self-strech">
                  <p className="flex flex-col justify-start w-[263px]">How do I tell my wife’s boyfriend I want to sleep in the bed I bought?</p>
                  <p>icon</p>
                </div>
              </div>
          
       
              

            </div>

          </div>

        <div>

        </div>
      </div>

    </div>
  );
};

export default QuestionsBoard;
