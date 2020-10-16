import { options } from './options';
import { HtmlReportResult } from './model';
import * as handlebars from 'handlebars';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export const generateReport = (report: HtmlReportResult): void => {
  const template = readFileSync(__dirname + '/handlebars.template.html', 'utf8');
  const compiledTemplate = handlebars.compile(template, {});
  const html = compiledTemplate(report);

  let reportFolder = '';
  if (options.args) {
    if (options.args.reportFolder) {
      reportFolder = options.args.reportFolder;
    }
  }
  if (!existsSync(resolve(reportFolder))) {
    mkdirSync(reportFolder, { recursive: true });
  }

  writeFileSync(
    reportFolder + '/multiple-html-' + new Date().valueOf() + '.html',
    html,
    'utf8',
  );
};
