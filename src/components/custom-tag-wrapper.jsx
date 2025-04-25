'use client';
import React from 'react';
import CustomTag from './custom-tag';
import { cn } from '@/lib/utils';
import ChooseSettingsModal from './modals/choose-settings';
import ChooseMetalModal from './modals/choose-metal';
import ChooseStonelModal from './modals/choose-stone';

export default function CustomTagWrapper({ className }) {
  const [openMetal, setOpenMetal] = React.useState(false);
  const [openShank, setOpenShank] = React.useState(false);
  const [openDiamond, setOpenDiamond] = React.useState(false);
  return (
    <>
      <div
        className={cn(
          // 'my-[5%] flex w-full items-center justify-between gap-3 md:flex-row md:gap-6 xl:my-10',
          'xs:gap-4 my-[5%] grid grid-cols-3 place-items-stretch gap-2.5 sm:gap-6 md:gap-8 lg:gap-10',
          className
        )}
      >
        <CustomTag
          no='1.'
          text='Select Your'
          bold='METAL'
          imgUrl='/icons/metal.svg'
          onClick={() => setOpenMetal(true)}
        />
        <CustomTag
          no='2.'
          text='Select Your'
          bold='SHANK'
          imgUrl='/icons/shank.svg'
          onClick={() => setOpenShank(true)}
        />
        <CustomTag
          no='3.'
          text='Select Your'
          bold='DIAMOND'
          imgUrl='/icons/diamond1.svg'
          onClick={() => setOpenDiamond(true)}
        />
      </div>
      <ChooseMetalModal open={openMetal} onOpenChange={setOpenMetal} />
      <ChooseSettingsModal open={openShank} onOpenChange={setOpenShank} />
      <ChooseStonelModal open={openDiamond} onOpenChange={setOpenDiamond} />
    </>
  );
}
export function ProductSelectionStepsForDiamonds({ className }) {
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openStone, setOpenStone] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false);
  console.log(openSettings);

  return (
    <>
      <div
        className={cn(
          // 'my-[5%] flex w-full items-center justify-between gap-3 md:flex-row md:gap-6 xl:my-10',
          'my-[5%] grid grid-cols-3 place-items-stretch gap-[3vw]',
          className
        )}
      >
        <CustomTag
          no='1.'
          text='Select Your'
          bold='DIAMOND'
          imgUrl='/icons/metal.svg'
          onClick={() => setOpenStone(true)}
        />
        <CustomTag
          no='2.'
          text='Select Your'
          bold='SETTINGS'
          imgUrl='/icons/shank.svg'
          onClick={() => setOpenSettings(true)}
        />
        <CustomTag
          no='3.'
          text='Select Your'
          bold='RING'
          imgUrl='/icons/diamond1.svg'
          // onClick={() => setOpenProduct(true)}
        />
      </div>
      <ChooseSettingsModal open={openSettings} onOpenChange={setOpenSettings} />
      <ChooseStonelModal open={openStone} onOpenChange={setOpenStone} />
      {/* <ChooseSettingsModal open={openProduct} onOpenChange={setOpenProduct} /> */}
    </>
  );
}
