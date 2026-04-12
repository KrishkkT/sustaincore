const fs = require('fs');
const files = [
  '1-brsr.html', '1-cdp.html', '1-gri.html', '1-sasb.html', '1-tcfd.html', 
  '2-ghg.html', '2-pcf.html', '2-carboncredits.html', '2-irec.html'
];
for (const file of files) {
  const p = 'v:/SustainCore/files/' + file;
  if(!fs.existsSync(p)) continue;
  let lines = fs.readFileSync(p, 'utf8').split('\n');
  let result = [];
  let isFirstSection = true;
  for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(line.includes('class="svc-section') && !line.includes('inner')) {
      if (isFirstSection) {
        if (i > 0 && !lines[i-1].includes('rule')) {
          result.push('  <div class="rule" style="margin-top:3rem;"></div>');
          result.push('');
        }
        isFirstSection = false;
      } else {
        if (i > 0 && !lines[i-1].includes('rule') && !lines[i-2].includes('rule')) {
            result.push('  <div class="rule"></div>');
            result.push('');
        }
      }
    }
    result.push(line);
  }
  fs.writeFileSync(p, result.join('\n'));
}
console.log('Done script.');
