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
