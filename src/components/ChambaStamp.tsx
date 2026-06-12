export function ChambaStamp() {
  return (
    <div className="chamba-stamp">
      <svg
        viewBox="0 0 600 750"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        <defs>
          {/* perforated stamp edge */}
          <mask id="stamp-perf">
            <rect width="600" height="750" fill="#fff" />
            <g fill="#000">
              <g id="stamp-ph">
                <circle cx="0" cy="0" r="13" />
                <circle cx="60" cy="0" r="13" />
                <circle cx="120" cy="0" r="13" />
                <circle cx="180" cy="0" r="13" />
                <circle cx="240" cy="0" r="13" />
                <circle cx="300" cy="0" r="13" />
                <circle cx="360" cy="0" r="13" />
                <circle cx="420" cy="0" r="13" />
                <circle cx="480" cy="0" r="13" />
                <circle cx="540" cy="0" r="13" />
                <circle cx="600" cy="0" r="13" />
              </g>
              <use href="#stamp-ph" y="750" />
              <g id="stamp-pv">
                <circle cx="0" cy="75" r="13" />
                <circle cx="0" cy="150" r="13" />
                <circle cx="0" cy="225" r="13" />
                <circle cx="0" cy="300" r="13" />
                <circle cx="0" cy="375" r="13" />
                <circle cx="0" cy="450" r="13" />
                <circle cx="0" cy="525" r="13" />
                <circle cx="0" cy="600" r="13" />
                <circle cx="0" cy="675" r="13" />
              </g>
              <use href="#stamp-pv" x="600" />
            </g>
          </mask>

          <linearGradient id="stamp-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--stamp-sky-a)" />
            <stop offset="1" stopColor="var(--stamp-sky-b)" />
          </linearGradient>
          <linearGradient id="stamp-river" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7FA8B8" />
            <stop offset="1" stopColor="#4F7E94" />
          </linearGradient>

          <clipPath id="stamp-scene">
            <rect x="62" y="118" width="476" height="400" rx="6" />
          </clipPath>

          {/* chain-stitch corner motif (nod to Chamba Rumal embroidery) */}
          <g id="stamp-rumal">
            <circle r="5" fill="none" stroke="var(--stamp-madder)" strokeWidth="2.5" />
            <circle r="11" fill="none" stroke="var(--stamp-ochre)" strokeWidth="2" strokeDasharray="3 4" />
            <path d="M0,-18 L4,-11 L-4,-11 Z" fill="var(--stamp-deodar)" />
            <path d="M0,18 L4,11 L-4,11 Z" fill="var(--stamp-deodar)" />
            <path d="M-18,0 L-11,4 L-11,-4 Z" fill="var(--stamp-deodar)" />
            <path d="M18,0 L11,4 L11,-4 Z" fill="var(--stamp-deodar)" />
          </g>

          {/* temple shikhara with Chamba's slate umbrella roof */}
          <g id="stamp-shikhara">
            <path d="M0,0 C-16,-12 -22,-58 0,-92 C22,-58 16,-12 0,0 Z" fill="var(--stamp-madder)" />
            <path
              d="M0,-6 C-12,-16 -16,-54 0,-82 C16,-54 12,-16 0,-6 Z"
              fill="none"
              stroke="var(--stamp-ochre)"
              strokeWidth="2"
            />
            <ellipse cx="0" cy="-92" rx="9" ry="4" fill="var(--stamp-indigo)" />
            <path d="M-20,-96 L20,-96 L0,-118 Z" fill="var(--stamp-indigo)" />
            <line x1="0" y1="-118" x2="0" y2="-132" stroke="var(--stamp-ink)" strokeWidth="2.5" />
          </g>
        </defs>

        {/* paper */}
        <g mask="url(#stamp-perf)">
          <rect width="600" height="750" fill="var(--stamp-paper)" />
          <rect width="600" height="750" fill="none" stroke="#E2D5B8" strokeWidth="2" />
        </g>

        {/* frames */}
        <rect x="40" y="40" width="520" height="670" fill="none" stroke="var(--stamp-madder)" strokeWidth="4" />
        <rect x="52" y="52" width="496" height="646" fill="none" stroke="var(--stamp-ochre)" strokeWidth="1.5" />

        {/* header */}
        <text
          x="300"
          y="98"
          textAnchor="middle"
          fontSize="26"
          letterSpacing="10"
          fill="var(--stamp-indigo)"
          fontWeight="bold"
        >
          खोज · KHOJ
        </text>

        {/* ================= SCENE ================= */}
        <g clipPath="url(#stamp-scene)">
          <rect x="62" y="118" width="476" height="400" fill="url(#stamp-sky)" />

          {/* sun */}
          <g className="sunrays" stroke="var(--stamp-ochre)" strokeWidth="3" opacity=".55">
            <line x1="300" y1="120" x2="300" y2="256" />
            <line x1="232" y1="140" x2="368" y2="236" />
            <line x1="232" y1="236" x2="368" y2="140" />
            <line x1="210" y1="188" x2="390" y2="188" />
          </g>
          <circle cx="300" cy="188" r="34" fill="var(--stamp-ochre)" />
          <circle cx="300" cy="188" r="34" fill="none" stroke="var(--stamp-madder)" strokeWidth="3" />

          {/* clouds */}
          <g className="cloud-1" fill="#FFFFFF" opacity=".85">
            <ellipse cx="120" cy="160" rx="42" ry="13" />
            <ellipse cx="150" cy="150" rx="28" ry="11" />
          </g>
          <g className="cloud-2" fill="#FFFFFF" opacity=".7">
            <ellipse cx="60" cy="215" rx="36" ry="11" />
            <ellipse cx="86" cy="207" rx="22" ry="9" />
          </g>

          {/* birds */}
          <g className="bird" stroke="var(--stamp-ink)" strokeWidth="3" fill="none" strokeLinecap="round">
            <g className="wingbeat">
              <path d="M120,200 q8,-9 16,0 q8,-9 16,0" />
            </g>
          </g>
          <g className="bird b2" stroke="var(--stamp-ink)" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <g className="wingbeat">
              <path d="M90,235 q6,-7 12,0 q6,-7 12,0" />
            </g>
          </g>

          {/* Pir Panjal peaks */}
          <path
            d="M62,330 L150,222 L208,300 L280,210 L356,308 L432,228 L538,330 L538,420 L62,420 Z"
            fill="var(--stamp-indigo)"
          />
          <path d="M150,222 L172,250 L150,252 L132,244 Z" fill="#EDE6D4" />
          <path d="M280,210 L304,242 L280,246 L258,238 Z" fill="#EDE6D4" />
          <path d="M432,228 L452,254 L432,258 L414,248 Z" fill="#EDE6D4" />

          {/* deodar ridge */}
          <path
            d="M62,372 L120,330 L178,372 L240,326 L306,374 L372,330 L438,372 L500,334 L538,372 L538,430 L62,430 Z"
            fill="var(--stamp-deodar)"
          />

          {/* Chaugan green */}
          <rect x="62" y="408" width="476" height="56" fill="#7E9B5E" />

          {/* Lakshmi Narayan temple group */}
          <g>
            <use href="#stamp-shikhara" transform="translate(232,420) scale(.78)" />
            <use href="#stamp-shikhara" transform="translate(368,420) scale(.78)" />
            <use href="#stamp-shikhara" transform="translate(300,428) scale(1.18)" />
            <path className="flag" d="M300,272 L300,288 L326,280 Z" fill="var(--stamp-madder)" />
            <rect x="216" y="418" width="168" height="14" fill="var(--stamp-ink)" opacity=".75" />
          </g>

          {/* Ravi river */}
          <path
            d="M62,470 C170,452 240,498 320,476 C400,454 470,492 538,470 L538,518 L62,518 Z"
            fill="url(#stamp-river)"
          />
          <path
            className="river-flow"
            d="M62,486 C170,468 240,510 320,490 C400,470 470,506 538,486"
            fill="none"
            stroke="#DCEAF0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="river-flow shimmer"
            d="M62,502 C180,488 250,520 330,504 C410,488 480,516 538,502"
            fill="none"
            stroke="#BFD9E2"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
        <rect x="62" y="118" width="476" height="400" fill="none" stroke="var(--stamp-indigo)" strokeWidth="3" rx="6" />

        {/* Rumal corner motifs */}
        <use href="#stamp-rumal" x="62" y="586" />
        <use href="#stamp-rumal" x="538" y="586" />

        {/* title block */}
        <text
          x="300"
          y="582"
          textAnchor="middle"
          fontSize="62"
          letterSpacing="14"
          fill="var(--stamp-madder)"
          fontWeight="bold"
        >
          CHAMBA
        </text>
        <text x="300" y="618" textAnchor="middle" fontSize="19" letterSpacing="5" fill="var(--stamp-ink)">
          HIMACHAL PRADESH · EST. 920 AD
        </text>
        <line x1="170" y1="638" x2="430" y2="638" stroke="var(--stamp-ochre)" strokeWidth="2" />
        <text
          x="300"
          y="668"
          textAnchor="middle"
          fontSize="16"
          letterSpacing="3"
          fill="var(--stamp-deodar)"
          fontStyle="italic"
        >
          Valley of the Ravi · Land of Temples &amp; Rumals
        </text>

        {/* denomination */}
        <text x="500" y="100" textAnchor="middle" fontSize="30" fill="var(--stamp-madder)" fontWeight="bold">
          ₹5
        </text>

        {/* postmark */}
        <g className="postmark" fill="none" stroke="var(--stamp-ink)" strokeWidth="3" opacity=".85">
          <circle cx="140" cy="552" r="46" />
          <circle cx="140" cy="552" r="36" strokeWidth="1.5" />
          <text
            x="140"
            y="546"
            textAnchor="middle"
            fontSize="12"
            letterSpacing="1.5"
            fill="var(--stamp-ink)"
            stroke="none"
            fontWeight="bold"
          >
            CHAMBA
          </text>
          <text x="140" y="564" textAnchor="middle" fontSize="10" letterSpacing="1" fill="var(--stamp-ink)" stroke="none">
            H.P. 176310
          </text>
        </g>
      </svg>
    </div>
  );
}
