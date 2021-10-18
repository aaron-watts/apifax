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
    <li><span>Headline</span><span>P102</span></li>
    <li><span>Headline</span><span>P103</span></li>
    <li><span>Headline</span><span>P104</span></li>
    <li><span>Headline</span><span>P105</span></li>
    <li><span>Headline</span><span>P106</span></li>
    <li><span>Headline</span><span>P107</span></li>
    <li><span>Headline</span><span>P108</span></li>
    <li><span>Headline</span><span>P109</span></li>
    <li><span>Headline</span><span>P110</span></li>
    <li><span>Headline</span><span>P111</span></li>
</ul>
<footer>ApiFax Index P100</footer>`,

    '102': `
<div class="p102-12__header">
    <div class="p102-12__header--brand">
        <span>n</span><span>e</span><span>w</span><span>s</span>
    </div>
    <div class="p102-12__header--title">
    <div class="text">stories</div>
    </div>    
</div>
<div class="p102-12__headline">Headline</div>
<div class="p102-12__story">Story</div>
<footer>ApiFax Index P100</footer>`,
    
}

// for (let i = 3; i <= 12; i++) {
//     let index = i < 10 ? `0${i}` : i;
//     pageTemplates[`1${index}`] = pageTemplates['102']
//     // pageTemplates[`1${index}`] = () => pageTemplates['102'];
// }

module.exports = {pageTemplates};