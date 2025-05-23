'use client';
import { cn } from '@/lib/utils';
import { ReactImageTurntable } from 'react-image-turntable';
import { PiArrowBendDoubleUpLeftThin } from 'react-icons/pi';
import { useState } from 'react';
export default function Jewelry360Viewer({ images, className }) {
  const [rotationDisabled, setRotationDisabled] = useState(false);
  const handleKeyDown = (ev) => {
    if (rotationDisabled) return;

    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      setRotationDisabled(true);
    }
  };
  return (
    <div className={cn('relative cursor-grab', className)}>
      <div className='h-full w-full'>
        <ReactImageTurntable
          images={images}
          autoRotate={{ disabled: rotationDisabled, interval: 150 }}
          onKeyDown={handleKeyDown}
          onKeyUp={() => setRotationDisabled(false)}
          movementSensitivity={-0.5}
          className='h-full w-full'
          style={{ display: 'block' }}
        />
      </div>
      <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4" width="151" height="18" viewBox="0 0 151 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150.417 0.644691C148.383 2.02048 146.196 3.1495 143.962 4.15117C143.812 4.21799 143.637 4.15134 143.571 4.00225C143.504 3.85317 143.571 3.67812 143.72 3.61131C143.722 3.61026 143.726 3.6085 143.728 3.60763C145.969 2.68138 148.164 1.62813 150.21 0.329868C150.298 0.273574 150.414 0.299178 150.47 0.386867C150.525 0.472991 150.501 0.587348 150.417 0.644691V0.644691Z" fill="#999999"></path><path d="M137.1 6.77542L130.053 8.8256C129.813 8.89523 129.563 8.75755 129.493 8.51813C129.423 8.27871 129.561 8.02826 129.8 7.95863L129.806 7.95705L129.835 7.94916L136.866 6.04L136.892 6.03298C137.097 5.97721 137.309 6.09857 137.365 6.30414C137.42 6.50725 137.302 6.71684 137.1 6.77542Z" fill="#999999"></path><path d="M122.906 10.4761L115.693 11.8112C115.376 11.8697 115.072 11.6607 115.014 11.3444C114.955 11.028 115.164 10.7241 115.481 10.6655C115.483 10.665 115.485 10.6646 115.488 10.6643L115.513 10.6601L122.706 9.46141L122.727 9.45791C123.008 9.41108 123.275 9.6012 123.322 9.88289C123.368 10.1612 123.182 10.4247 122.906 10.4761L122.906 10.4761Z" fill="#999999"></path><path d="M108.436 12.8532L101.146 13.6473C100.794 13.6856 100.477 13.4311 100.439 13.0789C100.4 12.7265 100.655 12.4099 101.007 12.3715L101.011 12.371L101.03 12.3691L108.286 11.6221L108.305 11.6201C108.646 11.5851 108.95 11.8327 108.985 12.1733C109.02 12.5127 108.774 12.8161 108.436 12.8531L108.436 12.8532Z" fill="#999999"></path><path d="M49.8932 13.6545L42.6008 12.8621C42.2598 12.8249 42.0135 12.5185 42.0506 12.1776C42.0875 11.838 42.3917 11.5923 42.7311 11.627L42.7503 11.6289L50.0093 12.3742L50.0283 12.3761C50.3815 12.4122 50.6384 12.7279 50.6021 13.0812C50.5659 13.4344 50.2502 13.6912 49.897 13.6551L49.8932 13.6545V13.6545Z" fill="#999999"></path><path d="M35.3374 11.8231L28.1195 10.4889C27.8375 10.4368 27.6512 10.166 27.7033 9.88392C27.7548 9.60522 28.02 9.42 28.2984 9.46613L28.3199 9.46964L35.5176 10.6664L35.5397 10.67C35.8586 10.723 36.0741 11.0245 36.0211 11.3434C35.9681 11.6622 35.6665 11.8778 35.3477 11.8248C35.3452 11.8245 35.3398 11.8234 35.3373 11.8231H35.3374Z" fill="#999999"></path><path d="M20.9636 8.83857L13.9126 6.79015C13.7073 6.73052 13.5891 6.51566 13.6488 6.31045C13.7078 6.10751 13.9183 5.98965 14.1215 6.04472L14.1474 6.05173L21.1818 7.95844L21.2087 7.96563C21.4503 8.03105 21.5931 8.28011 21.5276 8.5218C21.4621 8.76348 21.2132 8.90626 20.9715 8.84066C20.9696 8.84012 20.9655 8.83908 20.9636 8.83856L20.9636 8.83857Z" fill="#999999"></path><path d="M7.04703 4.16889C4.81005 3.16793 2.6207 2.03944 0.58358 0.665061C0.496767 0.606467 0.473878 0.488776 0.532458 0.401963C0.589902 0.316716 0.705308 0.293742 0.791604 0.348111C2.84108 1.6448 5.03842 2.69682 7.28126 3.62185C7.43332 3.68411 7.50611 3.85793 7.44394 4.00999C7.38168 4.16205 7.20794 4.23484 7.05588 4.17258C7.05359 4.17171 7.0493 4.16978 7.04703 4.1689V4.16889Z" fill="#999999"></path><path d="M65.0514 11.1752L58.1611 13.5809L64.6288 16.9225L65.0514 11.1752Z" fill="black"></path><path d="M86.8892 11.2564L87.2593 17.0035L93.7795 13.5937L86.8892 11.2564Z" fill="black"></path><ellipse cx="75.4999" cy="14.5645" rx="1.9306" ry="1.9306" fill="black"></ellipse></svg>
    </div>
  );
}

// export function Jewelry360Viewer2({ images }) {
//   // Extract base URL and count from your array
//   const baseApiUrl = images[0].substring(0, images[0].lastIndexOf('/') + '/');
//   const fileName = images[0].substring(images[0].lastIndexOf('/') + 1);
//   const fileType = fileName.split('.').pop();
//   const baseName = fileName.split('_')[0]; // Assumes "product_01.jpg" format
//   return (
//     <React360Viewer
//       imagesbaseApiUrl={baseApiUrl}
//       imagesPrefix={baseName + '_'} // e.g., "product_"
//       imagesCount={images.length}
//       imagesFiletype={fileType}
//       mouseDragSpeed={10}
//     />
//   );
// }
