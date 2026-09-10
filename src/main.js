import './style.css';

// ------------------------------------------------------------
// 商品数据：SKU、价格、可选规格统一管理。
// ------------------------------------------------------------

const products = [
  {
    id: 'shell-01',
    code: 'RG / 001',
    name: '界线 · 全天候外壳',
    en: 'BOUNDARY SHELL',
    category: 'wear',
    type: 'jacket',
    description: '简洁防护结构，可调节帽兜与通风开口，让穿着随环境变化。',
    price: 1280,
    color: '岩苔绿',
    specs: ['分层穿着', '可调帽兜'],
    sizes: ['S', 'M', 'L', 'XL'],
    label: '核心装备'
  },
  {
    id: 'pack-02',
    code: 'RG / 002',
    name: '行迹 · 28L 徒步背包',
    en: 'TRAVERSE PACK',
    category: 'carry',
    type: 'pack',
    description: '为单日行程整理负重。分区收纳、外部挂载，取用井然有序。',
    price: 860,
    color: '玄武黑',
    specs: ['28L 容量', '模块挂载'],
    sizes: ['28L'],
    label: '轻装出发'
  },
  {
    id: 'pants-03',
    code: 'RG / 003',
    name: '砾石 · 机能长裤',
    en: 'TERRAIN PANTS',
    category: 'wear',
    type: 'pants',
    description: '立体膝部与利落裤型，兼顾山路活动和日常通勤。',
    price: 680,
    color: '砂岩灰',
    specs: ['立体剪裁', '多口袋'],
    sizes: ['S', 'M', 'L', 'XL'],
    label: ''
  },
  {
    id: 'cap-04',
    code: 'RG / 004',
    name: '风径 · 五片折叠帽',
    en: 'WAYPOINT CAP',
    category: 'accessory',
    type: 'cap',
    description: '可收纳软帽檐与后部调节结构，给每次出门少一点负担。',
    price: 220,
    color: '信号黄绿',
    specs: ['柔性帽檐', '可调围度'],
    sizes: ['均码'],
    label: ''
  }
];

const endpoint = (import.meta.env.VITE_PREORDER_ENDPOINT || '').trim();
const money = value => `¥${value.toLocaleString('zh-CN')}`;

const arrow = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const logo = `<svg viewBox="0 0 38 30" fill="none" aria-hidden="true">
  <path d="M2 27 15 4l7 12 5-8 9 19H2Z" stroke="currentColor" stroke-width="2.7"/>
  <path d="m9 27 9-15 9 15" stroke="currentColor" stroke-width="2.7"/>
</svg>`;

// ------------------------------------------------------------
// 原创 SVG 产品插画：不请求外部资源。
// 每个实例使用唯一渐变 ID，避免重复 SVG 的 ID 冲突。
// ------------------------------------------------------------

function gearSvg(type, key, title = '') {
  const id = `gear-${key}`;
  const pieces = {
    jacket: `
      <path d="M132 103 90 126 39 249l43 22 44-87-8 173
        Q200 379 282 357l-8-173 44 87 43-22-51-123-42-23Z"
        fill="url(#${id}-fabric)" stroke="#3d4639" stroke-width="2"/>
      <path d="m147 105 8-36q45-29 90 0l8 36-23 35h-60Z"
        fill="#75806a" stroke="#3d4639" stroke-width="2"/>
      <path d="m160 77 40 29 40-29-14 47h-52Z" fill="#303c31"/>
      <path d="M200 108v254" stroke="#273129" stroke-width="5"/>
      <path d="M203 110v250" stroke="#a7ae91" stroke-width="1"/>
      <path d="m129 190 36 21-7 66m113-87-36 21 7 66"
        fill="none" stroke="#a0a68d" stroke-width="2"/>
      <path d="m131 224 30 15m108-15-30 15" stroke="#29352c" stroke-width="4"/>
      <path d="m47 243 38 19m231 0 37-19M122 344q79 16 157 0"
        fill="none" stroke="#374232" stroke-width="5"/>
      <path d="m94 138 24 38m189-38-25 38M140 301l-6 37m129-37 5 37"
        stroke="#c4c8ac" opacity=".3" stroke-width="2"/>
      <path d="m229 161 8-13 8 13Zm7-2 5-8" fill="none"
        stroke="#d5e1b2" stroke-width="2"/>
      <rect x="197" y="174" width="7" height="19" rx="2" fill="#cadb66"/>
      <path d="M167 127v36m66-36v36" stroke="#252d23" stroke-width="2"/>
    `,
    pack: `
      <path d="M129 112q-46 53-30 176m172-176q46 53 30 176"
        fill="none" stroke="#262c28" stroke-width="17"/>
      <path d="M173 83V64q27-16 54 0v19" fill="none"
        stroke="#333b32" stroke-width="10"/>
      <path d="M118 111q82-24 164 0l21 208q-3 42-41 49H138
        q-38-7-41-49Z" fill="url(#${id}-fabric)" stroke="#242b26" stroke-width="2"/>
      <path d="M117 103q83-30 166 0l-9 74q-74 20-148 0Z"
        fill="#4c5648" stroke="#232c25" stroke-width="2"/>
      <path d="M128 214q72-16 144 0l9 106q-80 22-162 0Z"
        fill="#414a3d" stroke="#242b26" stroke-width="2"/>
      <path d="M133 222q67-14 134 0" stroke="#171f19" stroke-width="5" fill="none"/>
      <path d="m98 257-24 3 8 72 29 8m190-83 24 3-8 72-29 8"
        fill="#313d32" stroke="#19251d" stroke-width="2"/>
      <path d="M151 116v99m98-99v99" stroke="#222b23" stroke-width="12"/>
      <rect x="141" y="172" width="20" height="27" rx="3" fill="#20291f"/>
      <rect x="239" y="172" width="20" height="27" rx="3" fill="#20291f"/>
      <path d="M151 178v13m98-13v13" stroke="#838c69" stroke-width="3"/>
      <path d="M151 264h98m-98 21h98m-98 21h98" stroke="#202b22" stroke-width="8"/>
      <path d="M168 256v61m32-61v61m32-61v61" stroke="#616b55" stroke-width="2"/>
      <path d="m188 142 12-19 12 19Z" fill="none" stroke="#d0de9e" stroke-width="2"/>
      <path d="m266 221 8 15" stroke="#cce75c" stroke-width="4"/>
    `,
    pants: `
      <path d="M128 62h144l9 108-23 209-62-4 4-185-13 185-63 4-8-209Z"
        fill="url(#${id}-fabric)" stroke="#6d6c5d" stroke-width="2"/>
      <path d="M127 77h146" stroke="#5d6254" stroke-width="10"/>
      <path d="M150 65v27m99-27v27m-49-27v43"
        stroke="#c2c0a7" stroke-width="5"/>
      <path d="M128 100q16 25 42 26m103-26q-16 25-42 26"
        fill="none" stroke="#d0cbb5" stroke-width="2"/>
      <path d="M199 94v78l-12 18" stroke="#5c6353" stroke-width="2" fill="none"/>
      <path d="m122 162 44 3-3 74-43-1Zm114 3 42-3 2 76-44 1Z"
        fill="#959780" stroke="#6d705f" stroke-width="2"/>
      <path d="m121 172 44 3m72 0 42-3" stroke="#565d4c" stroke-width="3"/>
      <path d="m127 266 52-7m25 0 54 7m-131 17 50-8m28 0 51 8"
        stroke="#c9c5ac" opacity=".6" stroke-width="2"/>
      <path d="m128 361 59-2m11 0 59 2" stroke="#666b57" stroke-width="6"/>
      <rect x="234" y="183" width="5" height="18" fill="#d0e96b"/>
    `,
    cap: `
      <path d="M91 231q0-113 111-128 91-3 112 126l-96 35Z"
        fill="url(#${id}-fabric)" stroke="#808c39" stroke-width="2"/>
      <path d="M97 231q94-23 210-6 19 11 17 25-79 34-233 61
        -40 2-38-16 14-30 44-64Z"
        fill="#c2d66c" stroke="#8d9d43" stroke-width="2"/>
      <path d="M109 233q75-8 152 12-110 23-193 47"
        fill="none" stroke="#e5efb2" stroke-width="2"/>
      <path d="M200 106q-36 51-31 117m35-117q54 42 61 115"
        stroke="#e2ecb0" stroke-width="2" fill="none"/>
      <path d="M111 158q40 16 64 9m74 0 44-9"
        fill="none" stroke="#92a447" stroke-width="2"/>
      <path d="m193 192 14-22 14 22Z" stroke="#3e4927" stroke-width="3" fill="none"/>
      <path d="M294 183h9m-13-12h8M120 183h9m-4-13h9"
        stroke="#82943e" stroke-width="3"/>
      <path d="M302 254q-5 24-40 26" stroke="#4b5631" stroke-width="8" fill="none"/>
    `
  };

  const colors = {
    jacket: ['#929c7e', '#505e49'],
    pack: ['#65715b', '#29362c'],
    pants: ['#b9b7a0', '#858c74'],
    cap: ['#ddeb94', '#a8bf57']
  };

  const [light, dark] = colors[type];

  return `
    <svg class="gear-svg" viewBox="0 0 400 430"
      ${title ? `role="img" aria-label="${title}"` : 'aria-hidden="true"'}>
      <defs>
        <linearGradient id="${id}-fabric" x1="0" y1="0" x2="1" y2=".8">
          <stop stop-color="${light}"/>
          <stop offset="1" stop-color="${dark}"/>
        </linearGradient>
        <filter id="${id}-shadow" x="-40%" y="-30%" width="180%" height="180%">
          <feDropShadow dx="3" dy="17" stdDeviation="13"
            flood-color="#182019" flood-opacity=".20"/>
        </filter>
      </defs>
      <ellipse cx="200" cy="391" rx="98" ry="10" fill="#21291b" opacity=".07"/>
      <g filter="url(#${id}-shadow)">${pieces[type]}</g>
    </svg>
  `;
}

function landscape() {
  return `
    <svg class="landscape" viewBox="0 0 1500 850"
      preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x2="0" y2="1">
          <stop stop-color="#748075"/>
          <stop offset="1" stop-color="#b3b8a1"/>
        </linearGradient>
        <linearGradient id="rock" x2=".8" y2="1">
          <stop stop-color="#798273"/>
          <stop offset="1" stop-color="#303a30"/>
        </linearGradient>
        <pattern id="grain" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".65" fill="#fff" opacity=".07"/>
          <circle cx="4" cy="4" r=".5" fill="#000" opacity=".1"/>
        </pattern>
      </defs>
      <path fill="url(#sky)" d="M0 0h1500v850H0z"/>
      <path fill="#899484" d="m0 460 140-120 140 100 200-236 97 95
        104-120 180 185 140-113 191 140 161-76 147 166v369H0Z"/>
      <path fill="#687464" d="m0 588 167-175 146 92 188-137 132 91
        157-244 143 154 79-65 145 132 163-104 180 132v386H0Z"/>
      <path fill="url(#rock)" d="m332 850 116-172 95-87 158-194
        141-180 144 156 59 98 101 93 354 286Z"/>
      <path fill="#a2aa93" opacity=".43"
        d="m842 217-22 180-66 95-21 155-190 203H332l211-259 158-194Z"/>
      <path fill="#3b4639" d="m842 217 69 215 75-59-54 125 114-27
        -63 95 99 148-163-86-64-129Z"/>
      <path fill="#bfc4aa" opacity=".32"
        d="m701 397 141-180-30 148-45 45-17 92-37-21-81 93Z"/>
      <path fill="#27342a" d="m0 660 175-79 221 113 147-37 287 193H0Z"/>
      <path fill="#253029" d="m1500 578-129 14-81 60-143-29-202 227h555Z"/>
      <path d="m837 315-38 98 11 44-55 81 10 55-115 131"
        fill="none" stroke="#d1d6b5" stroke-opacity=".25" stroke-width="3"/>
      <path fill="url(#grain)" d="M0 0h1500v850H0z"/>
    </svg>
  `;
}

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="announcement">
    <span>LESS, BUT BUILT BETTER.</span>
    <span>少一点多余，多一点可靠。</span>
  </div>

  <header class="site-header">
    <a class="brand" href="#" aria-label="棱野 RIDGELINE 首页">
      ${logo}
      <span>RIDGELINE<small>棱 野 · 户 外 机 能</small></span>
    </a>

    <button class="menu-toggle" aria-label="打开导航"
      aria-expanded="false" aria-controls="navigation">
      <span></span><span></span>
    </button>

    <nav id="navigation" aria-label="主导航">
      <a href="#collection">装备系列</a>
      <a href="#principles">设计理念</a>
      <a href="#story">关于棱野</a>
    </nav>

    <a class="header-cta" href="#reserve">预订装备 ${arrow}</a>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      ${landscape()}
      <div class="hero-shade"></div>
      <div class="hero-grid"></div>

      <div class="hero-top">
        <span><i class="signal"></i> FIELD EQUIPMENT / SERIES 01</span>
        <span>山野与日常之间</span>
      </div>

      <div class="hero-copy">
        <p class="eyebrow light">PURPOSE IN EVERY DETAIL.</p>
        <h1 id="hero-title">为下一段路<br>而造<span>。</span></h1>
        <p class="hero-description">
          不追逐短暂的潮流，只关心长久的陪伴。<br>
          以扎实用料、实用结构，应对每一次出发。
        </p>
        <a class="button lime" href="#collection">探索装备系列 ${arrow}</a>
        <span class="hero-small">BUILT FOR THE LONG WAY.</span>
      </div>

      <div class="hero-equipment">
        <div class="orbit-ring"></div>
        <span class="equipment-coordinate">01 / THE ESSENTIAL SHELL</span>
        ${gearSvg('jacket', 'hero', '界线外壳夹克，岩苔绿色产品设计图')}
        <div class="equipment-tag">
          <span class="crosshair">+</span>
          <div><small>BOUNDARY SHELL</small><strong>界线 · 全天候外壳</strong></div>
          <a href="#collection" aria-label="查看界线外壳夹克">${arrow}</a>
        </div>
      </div>

      <div class="hero-bottom">
        <span>DESIGNED WITH INTENT. BUILT TO GO FURTHER.</span>
        <a href="#principles">向下探索 <span>↓</span></a>
      </div>
    </section>

    <section class="principles" id="principles" aria-label="品牌核心设计理念">
      <div class="principle">
        <span class="principle-number">01 /</span>
        <div>
          <h2>品质，是起点</h2>
          <p>关注触感、结构与每一处接缝</p>
        </div>
        <span class="principle-icon">◇</span>
      </div>
      <div class="principle">
        <span class="principle-number">02 /</span>
        <div>
          <h2>耐用，不止一季</h2>
          <p>少一点消耗，多一段同行</p>
        </div>
        <span class="principle-icon">⌁</span>
      </div>
      <div class="principle">
        <span class="principle-number">03 /</span>
        <div>
          <h2>功能，恰到好处</h2>
          <p>每一个设计，都有存在的理由</p>
        </div>
        <span class="principle-icon">↗</span>
      </div>
    </section>

    <section class="collection section-wrap" id="collection"
      aria-labelledby="collection-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">01 — THE EQUIPMENT</p>
          <h2 id="collection-title">精简装备。完整准备。</h2>
        </div>
        <p class="section-description">
          从穿着到携行，让功能回到真实需求。<br>
          四款基础装备，组成你的出发系统。
        </p>
      </div>

      <div class="collection-tools">
        <div class="filters" role="group" aria-label="按装备类型筛选">
          <button data-filter="all" class="selected" aria-pressed="true">全部装备 <span>04</span></button>
          <button data-filter="wear" aria-pressed="false">机能穿着</button>
          <button data-filter="carry" aria-pressed="false">背负系统</button>
          <button data-filter="accessory" aria-pressed="false">户外配件</button>
        </div>
        <span class="collection-season">CORE COLLECTION / 01</span>
      </div>

      <div class="product-grid" id="product-grid"></div>
      <p id="filter-status" class="sr-only" aria-live="polite"></p>
      <div class="collection-footnote">
        <span>FORM FOLLOWS FUNCTION.</span>
        <span>图示为设计展示，实际颜色及细节以最终产品说明为准。</span>
      </div>
    </section>

    <section class="story" id="story" aria-labelledby="story-title">
      <div class="story-visual">
        ${landscape()}
        <svg class="contours" viewBox="0 0 600 600" fill="none" aria-hidden="true">
          ${Array.from({ length: 12 }, (_, i) => `
            <path d="M${-160 + i * 24} 600
              C${30 + i * 17} 410,${270 - i * 9} 500,${200 + i * 12} 280
              S${320 + i * 12} 100,${470 + i * 24} -50"/>
          `).join('')}
        </svg>
        <span class="story-coordinate">FIELD NOTES / NO. 001</span>
        <div class="story-image-text">路会变。<br>可靠，不变。</div>
        <span class="story-caption">THE OUTDOORS IS NOT A DESTINATION. IT’S A WAY.</span>
      </div>

      <div class="story-copy">
        <p class="eyebrow">02 — OUR PHILOSOPHY</p>
        <h2 id="story-title">不是更多装备。<br>是更值得留下的装备。</h2>
        <p>
          棱野，始于一个简单的想法：一件好装备，不该只在抵达山顶时才有意义。
          它也应该适合清晨的通勤、周末的山径，以及那些没有计划的转弯。
        </p>
        <p>
          我们把注意力放在容易被忽略的地方：口袋是否顺手，调节是否直接，
          结构是否方便维护。去掉无用的装饰，把空间留给真正重要的功能。
        </p>
        <div class="story-signature">
          ${logo}
          <span>让装备回归工具，让人走进自然。<small>THE RIDGELINE APPROACH</small></span>
        </div>
        <a class="text-link" href="#reserve">一起，走得更远 ${arrow}</a>
      </div>
    </section>

    <section class="reserve section-wrap" id="reserve" aria-labelledby="reserve-title">
      <div class="reserve-copy">
        <p class="eyebrow">03 — YOUR NEXT CHAPTER</p>
        <h2 id="reserve-title">下一次出发，<br>从这里开始<span>↗</span></h2>
        <p>选择你的装备，留下预订意向。<br>提交意向不收取费用，也不代表订单成立。</p>

        <ol class="reservation-steps">
          <li><span>01</span><div><strong>选择装备</strong><small>确定款式与适合的规格</small></div></li>
          <li><span>02</span><div><strong>登记意向</strong><small>留下可联系的电子邮箱</small></div></li>
          <li><span>03</span><div><strong>确认后再出发</strong><small>价格、库存与交付时间另行确认</small></div></li>
        </ol>
      </div>

      <div class="form-card">
        <div class="form-heading">
          <h3>装备预订意向</h3>
          <span>NO PAYMENT REQUIRED</span>
        </div>

        <p class="mode-notice">
          ${endpoint
            ? '请核对信息后提交。我们将使用邮箱联系你确认意向。'
            : '当前为展示模式：仅预览清单，不发送或保存你的个人信息。'}
        </p>

        <form id="reservation-form">
          <div class="form-row">
            <label>装备款式
              <select name="product" id="product-select" required>
                ${products.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
              </select>
            </label>
            <label>规格
              <select name="size" id="size-select" required></select>
            </label>
          </div>

          <div class="form-row">
            <label>你的称呼
              <input name="name" autocomplete="name" required
                maxlength="40" placeholder="如何称呼你" />
            </label>
            <label>电子邮箱
              <input name="email" type="email" autocomplete="email"
                required maxlength="120" placeholder="you@example.com" />
            </label>
          </div>

          <div class="order-summary">
            <div>
              <span id="summary-name"></span>
              <small id="summary-detail"></small>
            </div>
            <strong id="summary-price"></strong>
          </div>

          <label class="checkbox-label">
            <input type="checkbox" name="consent" required />
            <span>我已阅读<button type="button" id="privacy-open"
              class="inline-button">信息使用说明</button>，并同意按说明处理本次预订意向。</span>
          </label>

          <button type="submit" class="button dark submit-button">
            <span id="submit-label">${endpoint ? '提交预订意向' : '生成预订清单'}</span>
            ${arrow}
          </button>

          <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
        </form>

        <div class="result-panel" id="result-panel" hidden>
          <span class="result-mark">✓</span>
          <h4 id="result-title"></h4>
          <p id="result-description"></p>
          <dl id="result-details"></dl>
          <button class="text-link" id="edit-reservation">返回修改 ${arrow}</button>
        </div>
      </div>
    </section>

    <section class="closing-line" aria-label="品牌宣言">
      <span>TAKE LESS.</span><span>GO FURTHER.</span>${logo}
    </section>
  </main>

  <footer class="footer">
    <div class="footer-top">
      <a href="#" class="brand footer-brand" aria-label="返回棱野首页">
        ${logo}<span>RIDGELINE<small>棱 野 · 户 外 机 能</small></span>
      </a>
      <p>为山野而生，为日常而用。<br><span>Equipment with purpose.</span></p>
      <nav aria-label="页脚导航">
        <a href="#collection">装备系列</a>
        <a href="#story">品牌故事</a>
        <a href="#reserve">预订咨询</a>
      </nav>
      <a class="back-top" href="#" aria-label="返回顶部">↑</a>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} RIDGELINE 棱野 · 品牌概念展示</span>
      <button id="privacy-footer">信息使用说明</button>
      <span>DESIGNED FOR THE LONG RUN.</span>
    </div>
  </footer>

  <dialog id="privacy-dialog" aria-labelledby="privacy-title">
    <div class="dialog-heading">
      <h2 id="privacy-title">信息使用说明</h2>
      <button id="privacy-close" aria-label="关闭信息使用说明">×</button>
    </div>
    <p>本页面不设置广告追踪，也不将表单个人信息写入浏览器本地存储。</p>
    <p>${endpoint
      ? '提交后，称呼、邮箱、装备与规格将发送至本网站配置的预订接口，用于联系和确认本次预订意向。'
      : '当前未接入预订接口。表单内容只用于本次页面内的清单预览；刷新或关闭页面后清除，不会发送给商家。'}</p>
    <p>本页面为品牌概念实现。正式运营前，运营方需补充真实主体、联系方式、保留期限和删除申请渠道，并发布正式隐私政策。</p>
    <p>本次操作不是付款，不锁定库存，也不构成已确认订单。</p>
    <button class="button dark" id="privacy-understood">我知道了 ${arrow}</button>
  </dialog>
`;

// ------------------------------------------------------------
// 产品区
// ------------------------------------------------------------

const grid = document.querySelector('#product-grid');

function renderProducts(filter = 'all') {
  const visible = products.filter(
    product => filter === 'all' || product.category === filter
  );

  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-visual">
        <div class="product-meta">
          <span>${product.code}</span>
          ${product.label ? `<span class="product-badge">${product.label}</span>` : ''}
        </div>
        ${gearSvg(product.type, product.id, `${product.name}，${product.color}产品设计图`)}
        <span class="product-color"><i class="swatch ${product.type}"></i>${product.color}</span>
        <button class="quick-reserve" data-reserve="${product.id}"
          aria-label="预订${product.name}">${arrow}</button>
      </div>
      <div class="product-info">
        <p class="product-english">${product.en}</p>
        <div class="product-title">
          <h3>${product.name}</h3>
          <strong>${money(product.price)}</strong>
        </div>
        <p class="product-description">${product.description}</p>
        <div class="product-specs">
          ${product.specs.map(spec => `<span>${spec}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  document.querySelector('#filter-status').textContent =
    `正在展示 ${visible.length} 款装备`;
}

renderProducts();

document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;

  document.querySelectorAll('[data-filter]').forEach(item => {
    const selected = item === button;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });

  renderProducts(button.dataset.filter);
});

// ------------------------------------------------------------
// 移动端导航
// ------------------------------------------------------------

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开导航');
  navigation.classList.remove('open');
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  navigation.classList.toggle('open', open);
});

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const wasOpen = navigation.classList.contains('open');
    closeMenu();
    if (wasOpen) menuToggle.focus();
  }
});

window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

// ------------------------------------------------------------
// 预订表单：原生校验、请求防重入、超时处理、反馈。
// 未配置接口时绝不显示“已提交”。
// ------------------------------------------------------------

const form = document.querySelector('#reservation-form');
const productSelect = document.querySelector('#product-select');
const sizeSelect = document.querySelector('#size-select');
const status = document.querySelector('#form-status');
const resultPanel = document.querySelector('#result-panel');
const submitButton = form.querySelector('[type="submit"]');
const submitLabel = document.querySelector('#submit-label');

let submitting = false;
let pendingRequest = null;

function selectedProduct() {
  return products.find(product => product.id === productSelect.value);
}

function updateSummary() {
  const product = selectedProduct();
  document.querySelector('#summary-name').textContent = product.name;
  document.querySelector('#summary-detail').textContent =
    `${product.color} / ${sizeSelect.value} / 数量 1`;
  document.querySelector('#summary-price').textContent = money(product.price);
}

function updateProduct() {
  const product = selectedProduct();
  sizeSelect.innerHTML = product.sizes
    .map(size => `<option value="${size}">${size}</option>`).join('');
  updateSummary();
}

updateProduct();
productSelect.addEventListener('change', updateProduct);
sizeSelect.addEventListener('change', updateSummary);

form.addEventListener('input', event => {
  if (event.target instanceof HTMLInputElement) {
    event.target.setCustomValidity('');
  }
  status.textContent = '';
});

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-reserve]');
  if (!button) return;

  if (submitting) {
    status.textContent = '当前意向正在提交，请稍候再选择其他装备。';
    return;
  }

  form.hidden = false;
  resultPanel.hidden = true;
  productSelect.value = button.dataset.reserve;
  updateProduct();

  document.querySelector('#reserve').scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth'
  });

  sizeSelect.focus({ preventScroll: true });
});

function renderResult(payload, sent) {
  document.querySelector('#result-title').textContent =
    sent ? '预订意向已登记' : '清单已生成，尚未提交';

  document.querySelector('#result-description').textContent = sent
    ? '已收到你的意向。最终价格、库存及交付时间需进一步确认，请勿据此安排付款。'
    : '这是当前页面内的预览。个人信息未发送，装备未锁定，也不会产生费用。';

  const details = document.querySelector('#result-details');
  details.replaceChildren();

  const product = products.find(item => item.id === payload.productId);

  [
    ['装备', product.name],
    ['规格', `${product.color} / ${payload.size}`],
    ['展示价格', money(product.price)],
    ['联系邮箱', payload.email]
  ].forEach(([term, value]) => {
    const row = document.createElement('div');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = term;
    dd.textContent = value;
    row.append(dt, dd);
    details.append(row);
  });

  form.hidden = true;
  resultPanel.hidden = false;
  resultPanel.tabIndex = -1;
  resultPanel.focus({ preventScroll: true });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitting) return;

  const nameInput = form.elements.namedItem('name');
  const emailInput = form.elements.namedItem('email');

  nameInput.value = nameInput.value.trim();
  emailInput.value = emailInput.value.trim();

  if (!nameInput.value) {
    nameInput.setCustomValidity('请输入有效的称呼，不能只包含空格。');
  }

  if (!form.reportValidity()) return;

  const payload = {
    productId: productSelect.value,
    size: sizeSelect.value,
    quantity: 1,
    name: nameInput.value,
    email: emailInput.value,
    consent: true,
    source: 'ridgeline-landing',
    policyVersion: 'concept-1'
  };

  if (!endpoint) {
    renderResult(payload, false);
    return;
  }

  submitting = true;
  form.setAttribute('aria-busy', 'true');
  submitButton.disabled = true;
  submitLabel.textContent = '正在提交…';
  status.textContent = '';

  const controls = [...form.querySelectorAll('input, select')];
  controls.forEach(control => { control.disabled = true; });

  // 同一份载荷重试时保留 requestId，服务端可据此去重。
  const fingerprint = JSON.stringify(payload);
  if (!pendingRequest || pendingRequest.fingerprint !== fingerprint) {
    pendingRequest = {
      fingerprint,
      id: globalThis.crypto?.randomUUID?.()
        || `${Date.now()}-${Math.random().toString(36).slice(2)}`
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      signal: controller.signal,
      body: JSON.stringify({
        ...payload,
        requestId: pendingRequest.id
      })
    });

    if (!response.ok) {
      throw new Error(
        response.status === 429
          ? '提交较频繁，请稍后重试。'
          : '未能确认登记结果，请稍后重试。'
      );
    }

    const data = await response.json();

    // 接口必须明确确认成功，不能仅凭 HTTP 200 显示成功。
    if (data.ok !== true) {
      throw new Error('接口未确认登记成功，请稍后重试。');
    }

    pendingRequest = null;
    renderResult(payload, true);
  } catch (error) {
    status.textContent = error.name === 'AbortError'
      ? '请求超时，暂未确认结果。请稍后重试；系统将使用同一请求编号避免重复登记。'
      : error instanceof TypeError
        ? '网络连接失败，暂未确认结果。请检查网络后重试。'
        : error.message;
  } finally {
    clearTimeout(timeout);
    submitting = false;
    form.removeAttribute('aria-busy');
    submitButton.disabled = false;
    controls.forEach(control => { control.disabled = false; });
    submitLabel.textContent = '提交预订意向';
  }
});

document.querySelector('#edit-reservation').addEventListener('click', () => {
  resultPanel.hidden = true;
  form.hidden = false;
  productSelect.focus({ preventScroll: true });
});

// ------------------------------------------------------------
// 原生 dialog：键盘焦点约束与 Esc 关闭由浏览器提供。
// ------------------------------------------------------------

const privacyDialog = document.querySelector('#privacy-dialog');

['privacy-open', 'privacy-footer'].forEach(id => {
  document.querySelector(`#${id}`).addEventListener('click', () => {
    privacyDialog.showModal();
  });
});

['privacy-close', 'privacy-understood'].forEach(id => {
  document.querySelector(`#${id}`).addEventListener('click', () => {
    privacyDialog.close();
  });
});