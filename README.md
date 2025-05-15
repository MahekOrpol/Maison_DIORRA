<!-- SOP -->

eslint-prettier rules

1. tailwind class names sorting :- layout, positioning, colors, typography, etc.

font family
-> outfit base font
-> rozha stylish font

swiper references:
https://swiperjs.com/demos
https://stackblitz.com/edit/react-ts-ggpeng?file=App.tsx,package.json,style.css,components%2FCoverFlow.tsx

best practices for token management in browsers
https://curity.medium.com/best-practices-for-storing-access-tokens-in-the-browser-6b3d515d9814#:~:text=For%20that%2C%20cookies%20need%20to,this%20is%20not%20the%20case.

<!-- nprogress bar -->

I wanted the progress bar to:

show when switching routes / pages
show when any fetch call is made
display only after a delay, I don't want to show a loader at EVERY interaction, only when the requests are "slow"

custom reference https://buildui.com/posts/global-progress-in-nextjs

<!-- Maintain folder structure -->

page.js : make all api calls here + pass data to components for SSR , ISR / SSG
features : prodcuts, carts, auth related Api calls, store and reusable components. etc.

<!-- references.. -->

1. https://www.jamesallen.com/
2. https://keyzarjewelry.com/

<!-- video keyzar -->

<video tabindex="0" class="w-full h-full aspect-square fadeIn object-cover" sizes="(min-width: 64em) 60vw, (min-width: 48em) 50vw, 90vw" 
options="[object Object]" width="100%" loop=""
preload="auto" id="gid://shopify/Video/24054323445811" playsinline=""
poster="https://cdn.shopify.com/s/files/1/0039/6994/1568/files/preview_images/a23cfeccd86a4dd8bee5f19192ff2f55.thumbnail.0000000000.jpg?v=1724662895">

<source src="https://checkout.keyzarjewelry.com/cdn/shop/videos/c/vp/a23cfeccd86a4dd8bee5f19192ff2f55/a23cfeccd86a4dd8bee5f19192ff2f55.HD-1080p-7.2Mbps-33725443.mp4" type="video/mp4">
<source src="https://checkout.keyzarjewelry.com/cdn/shop/videos/c/vp/a23cfeccd86a4dd8bee5f19192ff2f55/a23cfeccd86a4dd8bee5f19192ff2f55.m3u8" type="application/x-mpegURL">
<source src="https://checkout.keyzarjewelry.com/cdn/shop/videos/c/vp/a23cfeccd86a4dd8bee5f19192ff2f55/a23cfeccd86a4dd8bee5f19192ff2f55.HD-720p-4.5Mbps-33725443.mp4" type="video/mp4">
<source src="https://checkout.keyzarjewelry.com/cdn/shop/videos/c/vp/a23cfeccd86a4dd8bee5f19192ff2f55/a23cfeccd86a4dd8bee5f19192ff2f55.SD-480p-1.5Mbps-33725443.mp4" type="video/mp4"></video>
deep