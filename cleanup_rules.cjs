const fs = require('fs');
const files = [
  '1-brsr.html', '1-cdp.html', '1-gri.html', '1-sasb.html', '1-tcfd.html', 
  '2-ghg.html', '2-pcf.html', '2-carboncredits.html', '2-irec.html'
];
for (const file of files) {
  const p = 'v:/SustainCore/files/' + file;
  if(!fs.existsSync(p)) continue;
  let text = fs.readFileSync(p, 'utf8');
  
  // replace duplicate consecutive rule blocks separated by whitespace or comments
  // The first rule block could have a style attribute.
  text = text.replace(/(<div class="rule"[^>]*>\s*<\/div>\s*)+/g, (match) => {
     // if it was matched multiple times, just return one with margin-top if any had it
     if (match.includes('margin-top')) {
         return '<div class="rule" style="margin-top:3rem;"></div>\n';
     }
     return '<div class="rule"></div>\n';
  });
  
  // Also if we have a pattern where a rule is before a comment, and then another rule is after the comment:
  // e.g. <div class="rule"></div> \n <!-- comment --> \n <div class="rule"></div>
  text = text.replace(/<div class="rule"[^>]*>\s*<\/div>\s*(<!--.*?-->\s*)+<div class="rule"[^>]*>\s*<\/div>/g, (match, p1) => {
      if (match.includes('margin-top')) {
          return '<div class="rule" style="margin-top:3rem;"></div>\n' + p1;
      }
      return '<div class="rule"></div>\n' + p1;
  });

  fs.writeFileSync(p, text);
}
console.log('Cleanup script done.');
