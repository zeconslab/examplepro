import fs from 'fs';

const input = 'eslint-report.json';
const output = 'eslint-sonar-report.json';

const raw = JSON.parse(fs.readFileSync(input, 'utf-8'));

const sonarIssues = [];

raw.forEach(result => {
  const filePath = result.filePath.replace(/^.*?src[\\/]/, 'src/');

  result.messages.forEach(msg => {
  if (!msg.message) return;

  sonarIssues.push({
    engineId: "eslint",
    ruleId: msg.ruleId,
    severity: mapSeverity(msg.severity),
    type: "BUG",  // Fatal parsing errors pueden considerarse bugs
    primaryLocation: {
      message: msg.message,
      filePath: filePath,
      textRange: {
        startLine: msg.line || 1,
        endLine: msg.endLine || msg.line || 1,
        startColumn: msg.column || 1,
        endColumn: msg.endColumn || (msg.column || 1) + 1
      }
    }
  });
});
});

const sonarReport = { issues: sonarIssues };

fs.writeFileSync(output, JSON.stringify(sonarReport, null, 2));
console.log(`✅ Reporte generado: ${output}`);

function mapSeverity(sev) {
  return sev === 2 ? "MAJOR" : sev === 1 ? "MINOR" : "INFO";
}