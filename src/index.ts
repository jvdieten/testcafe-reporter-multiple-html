import { CallsiteError, TestError, TestRunInfo } from './model';
import { MultipleHtmlReport } from './multiple-html';
import { filterStackFramesIn, getAllFilesIn, stackFramesOf } from './stack-frames-parser';

import Convert from 'ansi-to-html';

exports['default'] = () => {
  const convert = new Convert({
    newline: true,
  });
  let report = new MultipleHtmlReport();
  return {
    reportTaskStart(startTime: Date, userAgents: string[], testCount: number) {
      report = report.initialize(startTime, userAgents, testCount);
    },
    reportFixtureStart(name: string, path: string) {
      report = report.createFixture(name, path);
    },
    reportTestDone(name: string, testRunInfo: TestRunInfo) {
      const testErrors: TestError[] | undefined = this.formatErrors(testRunInfo.errs);
      report = report.createTest(name, testRunInfo, testErrors);
    },
    reportTaskDone(endTime: Date, passed: number, warnings: string[]) {
      report = report.finalize(endTime, passed, warnings);
    },
    formatErrors(errs: CallsiteError[]) {
      const result: TestError[] = [];
      if (!Array.isArray(errs)) {
        return;
      }

      const originalStackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 1000;
      errs.map((err) => {
        if (!err.callsite || (err && typeof err.callsite === 'string')) {
          return;
        }

        filterStackFramesIn(err.callsite);
        const originalStackFrames = [...err.callsite.stackFrames];
        const files = getAllFilesIn(err.callsite);
        files.map((filename: string, index: number) => {
          err.callsite.stackFrames = stackFramesOf(filename).in(originalStackFrames);
          err.callsite.filename = filename;
          err.callsite.lineNum = err.callsite.stackFrames[0].getLineNumber() - 1;
          const stackTrace = (this as any).formatError(err);

          if (index === 0) {
            const newError: TestError = {
              testRunId: err.testRunId,
              formattedError: encodeURI(convert.toHtml(stackTrace)),
            };
            result.push(newError);
            return;
          }
        });
      });

      Error.stackTraceLimit = originalStackTraceLimit;

      return result;
    },
  };
};

module.exports = exports['default'];
