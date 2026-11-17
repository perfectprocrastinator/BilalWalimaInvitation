import React from 'react';

const decorative = { 'aria-hidden': true, focusable: false };

function Leaf({ x = 0, y = 0, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0C-11-6-14-21-5-31C5-22 9-10 0 0Z" fill="currentColor" fillOpacity=".1" />
      <path d="M0 0C-11-6-14-21-5-31C5-22 9-10 0 0ZM0-1-5-27" />
    </g>
  );
}

function JasmineFlower({ x = 0, y = 0, scale = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0-2C-8-11-7-20 0-19C7-20 8-11 0-2ZM2 0C11-8 20-7 19 0C20 7 11 8 2 0ZM0 2C8 11 7 20 0 19C-7 20-8 11 0 2ZM-2 0C-11 8-20 7-19 0C-20-7-11-8-2 0Z" fill="var(--color-ivory, #f6f2e9)" />
      <path d="M2-2C3-13 10-18 14-13C19-8 12-2 2-2ZM2 2C13 3 18 10 13 14C8 19 2 12 2 2ZM-2 2C-3 13-10 18-14 13C-19 8-12 2-2 2ZM-2-2C-13-3-18-10-13-14C-8-19-2-12-2-2Z" fill="var(--color-ivory, #f6f2e9)" />
      <circle r="2.4" fill="currentColor" stroke="none" />
    </g>
  );
}

export function ArchFrame({ className = '' }) {
  return (
    <svg {...decorative} className={className} viewBox="0 0 640 800" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M22 799V339C22 293 46 255 85 235C82 201 111 166 150 155C156 120 185 98 221 96C243 61 281 48 320 17C359 48 397 61 419 96C455 98 484 120 490 155C529 166 558 201 555 235C594 255 618 293 618 339V799" />
      <path d="M33 799V341C33 299 56 264 97 242C92 209 119 176 160 165C165 132 193 109 229 107C250 73 286 60 320 32C354 60 390 73 411 107C447 109 475 132 480 165C521 176 548 209 543 242C584 264 607 299 607 341V799" opacity=".55" />
      <path d="M13 799H42M598 799H627M18 580H37M603 580H622M18 585H37M603 585H622" opacity=".65" />
      <path d="m320 5 3 4-3 4-3-4Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function JasmineSprig({ className = '', mirrored = false }) {
  return (
    <svg {...decorative} className={className} viewBox="0 0 180 380" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      <g transform={mirrored ? 'translate(180 0) scale(-1 1)' : undefined}>
        <path d="M143 372C125 335 113 307 111 273C108 233 128 199 112 160C94 118 70 83 78 22" />
        <path d="M110 276C80 254 58 224 40 201M114 242C135 222 146 205 151 180M113 167C132 145 140 126 138 105M92 110C64 99 45 80 34 62M79 67C94 51 105 34 110 16" />
        <Leaf x={134} y={351} rotate={-61} scale={1.1} />
        <Leaf x={117} y={312} rotate={34} scale={1.2} />
        <Leaf x={111} y={279} rotate={-52} scale={1.13} />
        <Leaf x={81} y={247} rotate={-47} scale={1.1} />
        <Leaf x={65} y={231} rotate={21} scale={.8} />
        <Leaf x={119} y={221} rotate={-46} scale={.92} />
        <Leaf x={140} y={206} rotate={48} scale={.85} />
        <Leaf x={118} y={182} rotate={55} scale={1.12} />
        <Leaf x={108} y={150} rotate={-47} scale={.95} />
        <Leaf x={131} y={135} rotate={32} scale={.8} />
        <Leaf x={88} y={100} rotate={35} scale={.8} />
        <Leaf x={63} y={95} rotate={-47} scale={.83} />
        <Leaf x={78} y={52} rotate={-28} scale={.72} />
        <JasmineFlower x={39} y={196} scale={.73} rotate={15} />
        <JasmineFlower x={151} y={176} scale={.63} rotate={-12} />
        <JasmineFlower x={137} y={99} scale={.76} rotate={20} />
        <JasmineFlower x={31} y={57} scale={.63} rotate={-5} />
        <path d="M108 24C100 12 106 4 111 5C119 8 114 18 108 24ZM77 29C68 19 71 11 77 11C83 13 82 22 77 29" fill="var(--color-ivory, #f6f2e9)" />
      </g>
    </svg>
  );
}

export function FloralFlourish({ className = '' }) {
  return (
    <svg {...decorative} className={className} viewBox="0 0 260 90" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M130 75C110 59 84 52 59 49C40 46 21 36 11 22M130 75C150 59 176 52 201 49C220 46 239 36 249 22M130 75V29" />
      <Leaf x={44} y={45} rotate={-41} scale={.65} />
      <Leaf x={65} y={50} rotate={28} scale={.76} />
      <Leaf x={82} y={55} rotate={-54} scale={.68} />
      <Leaf x={104} y={62} rotate={24} scale={.72} />
      <Leaf x={216} y={45} rotate={41} scale={.65} />
      <Leaf x={195} y={50} rotate={-28} scale={.76} />
      <Leaf x={178} y={55} rotate={54} scale={.68} />
      <Leaf x={156} y={62} rotate={-24} scale={.72} />
      <JasmineFlower x={130} y={25} scale={.78} rotate={22.5} />
      <path d="M13 24C3 24 0 16 5 13C10 11 14 17 13 24ZM247 24C257 24 260 16 255 13C250 11 246 17 247 24" fill="currentColor" fillOpacity=".12" />
    </svg>
  );
}

export function EmbroideryCorner({ className = '' }) {
  return (
    <svg {...decorative} className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth=".85" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 91V9H91M15 74V15H74" opacity=".55" />
      <path d="M26 67C28 46 44 29 68 26M27 59C39 59 43 51 43 43C35 43 28 47 27 59ZM42 43C54 42 59 35 59 27C50 28 43 34 42 43Z" />
      <path d="M28 47C17 42 21 31 26 30C34 29 35 40 28 47ZM47 28C42 17 31 21 30 26C29 34 40 35 47 28ZM28 69C20 68 17 61 20 58C26 54 31 63 28 69ZM69 28C68 20 61 17 58 20C54 26 63 31 69 28Z" />
      <path d="M28 68 24 76M68 28 76 24" strokeDasharray="1 3" />
      <circle cx="23" cy="23" r="2" fill="currentColor" fillOpacity=".45" stroke="none" />
      <path d="m82 13 2 2-2 2-2-2ZM13 82l2-2 2 2-2 2Z" fill="currentColor" fillOpacity=".5" stroke="none" />
    </svg>
  );
}

export function Crescent({ className = '' }) {
  return (
    <svg {...decorative} className={className} viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M68 17C45 17 27 34 27 57C27 80 45 97 68 97C40 107 13 85 13 57C13 29 40 7 68 17Z" fill="currentColor" fillOpacity=".16" />
      <path d="M79 22V30M75 26H83M88 58V64M85 61H91" strokeWidth=".8" />
      <circle cx="67" cy="45" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CourtyardDrawing({ className = '' }) {
  return (
    <svg {...decorative} className={className} viewBox="0 0 1000 360" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 324H999M12 331H988M66 313H934M83 309V145H309M691 145H917V309M92 146V137H312M688 137H908V146M101 135V127H312M688 127H899V135" />
      <path d="M313 312V111C313 89 332 72 359 65C358 39 384 27 410 27C431 27 449 18 463 5C477 18 495 27 516 27C542 27 568 39 567 65C594 72 613 89 613 111V312" transform="translate(37 0)" />
      <path d="M365 312V129C365 105 382 88 406 82C407 60 425 47 450 46C471 45 486 35 500 23C514 35 529 45 550 46C575 47 593 60 594 82C618 88 635 105 635 129V312" />
      <path d="M388 312V158C388 128 414 110 441 106C441 87 465 74 480 69L500 54L520 69C535 74 559 87 559 106C586 110 612 128 612 158V312" />
      <path d="M399 312V160C399 134 422 118 452 115C452 95 480 83 500 68C520 83 548 95 548 115C578 118 601 134 601 160V312M342 306H380M620 306H658M342 301H380M620 301H658" opacity=".65" />
      <path d="M112 310V211C112 191 128 178 147 173C151 161 164 157 175 148C186 157 199 161 203 173C222 178 238 191 238 211V310M122 309V213C122 194 140 184 155 182C159 171 167 167 175 161C183 167 191 171 195 182C210 184 228 194 228 213V309M257 310V211C257 191 273 178 292 173C296 161 309 157 320 148M762 310V211C762 191 778 178 797 173C801 161 814 157 825 148C836 157 849 161 853 173C872 178 888 191 888 211V310M772 309V213C772 194 790 184 805 182C809 171 817 167 825 161C833 167 841 171 845 182C860 184 878 194 878 213V309M743 310V211C743 191 727 178 708 173C704 161 691 157 680 148" />
      <path d="M70 310V100H91V310M909 310V100H930V310M65 101H96M904 101H935M67 95H94M906 95H933M73 94V73C73 64 80 59 80 59C80 59 88 64 88 73V94M912 94V73C912 64 920 59 920 59C920 59 927 64 927 73V94M80 59V49M920 59V49M75 112H87M913 112H925" />
      <path d="M120 145V150M140 140V148M160 139V146M180 139V146M200 139V146M220 139V146M240 139V146M260 139V146M280 139V146M720 139V146M740 139V146M760 139V146M780 139V146M800 139V146M820 139V146M840 139V146M860 140V148M880 145V150" opacity=".5" />
      <path d="M414 313H586M430 302H570M444 296H556M467 285H533M475 281H525M490 280V267H510V280M500 267V242M482 254C483 242 491 238 500 238C509 238 517 242 518 254M471 264C473 244 486 230 500 230C514 230 527 244 529 264" />
      <ellipse cx="500" cy="303" rx="71" ry="8" />
      <path d="M27 323C27 294 34 273 42 255M42 255C27 258 20 269 26 281C38 278 43 268 42 255ZM32 286C16 284 10 290 11 300C21 304 31 299 32 286ZM31 286C44 275 53 277 57 286C53 296 40 298 31 286ZM973 323C973 294 966 273 958 255M958 255C973 258 980 269 974 281C962 278 957 268 958 255ZM968 286C984 284 990 290 989 300C979 304 969 299 968 286ZM969 286C956 275 947 277 943 286C947 296 960 298 969 286Z" fill="currentColor" fillOpacity=".05" />
      <path d="M291 343H709M352 350H648M422 356H578" opacity=".4" />
    </svg>
  );
}

export function BrandMark({ className = '', monogram = '' }) {
  return (
    <svg {...decorative} className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth=".7">
      <circle cx="50" cy="50" r="43" />
      <circle cx="50" cy="50" r="38" opacity=".5" />
      <path d="M50 3V10M50 90V97M3 50H10M90 50H97" opacity=".6" />
      <text x="50" y="60" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="31" letterSpacing="-1">{monogram}</text>
    </svg>
  );
}
