pageTemplates = {
    '100': `
<div class=\"p100__brand\">
    <span>a</span><span>p</span><span>i</span><span>f</span><span>a</span><span>x</span>
</div>
<div class=\"p100__updates\">
    <h2>News</h2>
    <div class=\"p100__updates--reel\"></div>
</div>
<div class=\"p100__contents\">
    <ul>
        <li><span>about apifax</span><span>199</span></li>
        <li><span>news</span><span>101</span></li>
        <li><span>uk weather</span><span>400</span></li>
        <li><span>finance</span><span>200</span></li>
        <li><span>test card</span><span>799</span></li>
    </ul>
    <ul>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
    </ul>
    <ul>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
    </ul>
    <ul>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
        <li><span>weather</span><span>100</span></li>
    </ul>
</div>
<footer>How to use the new ApiFax P198</footer>`,

    '101': `
<div class="p101__header">
    <span class="p101__header--text">headlines</span>
</div>
<ul class="p101__headlines">
    <li><span></span><span>P102</span></li>
    <li><span></span><span>P103</span></li>
    <li><span></span><span>P104</span></li>
    <li><span></span><span>P105</span></li>
    <li><span></span><span>P106</span></li>
    <li><span></span><span>P107</span></li>
    <li><span></span><span>P108</span></li>
    <li><span></span><span>P109</span></li>
    <li><span></span><span>P110</span></li>
    <li><span></span><span>P111</span></li>
</ul>
<footer>ApiFax Index P100</footer>`,

    '102': `
<div class="p102-11__header">
    <div class="p102-11__header--brand">
        <span>n</span><span>e</span><span>w</span><span>s</span>
    </div>
    <div class="p102-11__header--title">
        <div class="text">stories</div>
    </div>    
</div>
<div class="p102-11__test-mark">
    <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
<div class="p102-11__headline"></div>
<div class="p102-11__story"></div>
<div class="p102-11__footer">ApiFax Index P100</div>`,
    
    '400' : `
<div class="p400__header">weather</div>
<div class="p400__forecast">
    <div class="p400__forecast--summary">
        <div class="city"></div>
        <div class="description"></div>
    </div>
    <div class="ascii-art p400__forecast--weather-map">
  &#9622; &#9625;&#9608;&#9625;
    &#9628;&#9608;&#9608;&#9608;
    &#9631;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9627;
    &#9631;&#9608;&#9608;&#9608;&#9608;&#9608;&#9627;
    &#9631;&#9608;&#9608;&#9608;&#9608;&#9608;&#9625;
&#9623;&#9605;&#9622; &#9624; &#9608;&#9608;&#9608;&#9608;&#9608;&#9625;
&#9628;&#9608;&#9608;&#9627; &#9624; &#9628;&#9608;&#9608;&#9608;&#9625;
    &#9624;    &#9628;&#9608;&#9608;&#9608;&#9625;&#9622;
      &#9622; &#9631;&#9608;&#9608;&#9608;&#9608;&#9608;
      &#9628;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9627;
      &#9628;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9622;
    &#9628;&#9600;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9627;&#9600;
    &#9623;&#9631;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9627;
    &#9631;&#9627;&#9627;&#9600;&#9600;&#9600;&#9600;&#9620;&#9620;&#9620;&#9620;
    &#9629;
<div class="p400__forecast--weather-map--temp london" id="london"></div>
<div class="p400__forecast--weather-map--temp belfast" id="belfast"></div>
<div class="p400__forecast--weather-map--temp exeter" id="exeter"></div>
<div class="p400__forecast--weather-map--temp birmingham" id="birmingham"></div>
<div class="p400__forecast--weather-map--temp blackpool" id="blackpool"></div>
<div class="p400__forecast--weather-map--temp dumfries" id="dumfries"></div>
<div class="p400__forecast--weather-map--temp inverness" id="inverness"></div>
    </div>
</div>
<div class="p400__footer"><span class="slide">1</span> / 7</div>`
}

module.exports = {pageTemplates};