import {
  testCallsiteVariableLineNumberLength,
  testCallsiteAllLinesTwoDigitNumbers,
} from './../utils/test-callsite';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TestRunInfo } from '../../src/model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TestRunErrorFormattableAdapter = require('testcafe').embeddingUtils
  .TestRunErrorFormattableAdapter;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const UncaughtErrorOnPage = require('testcafe').embeddingUtils.testRunErrors
  .UncaughtErrorOnPage;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ActionElementNotFoundError = require('testcafe').embeddingUtils.testRunErrors
  .ActionElementNotFoundError;

export type ErrorDescription = { err: any; metaInfo: { [key: string]: any } };
const longSelector =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

function makeErrors(errDescrs: Array<ErrorDescription>) {
  return errDescrs.map(function (descr) {
    return new TestRunErrorFormattableAdapter(descr.err, descr.metaInfo);
  });
}
export const testRunInfoErrorMultiBrowserMultiScreenshot: TestRunInfo = {
  errs: makeErrors([
    {
      err: new UncaughtErrorOnPage('Some error', 'http://example.org'),

      metaInfo: {
        userAgent: 'Chrome 41.0.2227 / Mac OS X 10.10.1',
        screenshotPath: '/screenshots/1445437598847/errors',
        callsite: testCallsiteVariableLineNumberLength,
        testRunPhase: 'inTest',
      },
    },
    {
      err: new ActionElementNotFoundError({
        apiFnChain: [longSelector, 'one', 'two', 'three'],
        apiFnIndex: 1,
      }),

      metaInfo: {
        userAgent: 'Firefox 47 / Mac OS X 10.10.1',
        callsite: testCallsiteAllLinesTwoDigitNumbers,
        testRunPhase: 'inTest',
      },
    },
  ]),
  warnings: [],
  durationMs: 14917,
  screenshotPath: 'screenshots/2020-07-14_00-06-45/test-3',
  screenshots: [
    {
      testRunId: 'bQD2JMCQ4',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/1.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/thumbnails/1.png',
      userAgent: 'Chrome_83.0.4103.116_macOS_10.15.5',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: '7NO1y2nyO',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/1.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/thumbnails/1.png',
      userAgent: 'Firefox_78.0_macOS_10.15',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: 'bQD2JMCQ4',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/2.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/thumbnails/2.png',
      userAgent: 'Chrome_83.0.4103.116_macOS_10.15.5',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: '7NO1y2nyO',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/2.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/thumbnails/2.png',
      userAgent: 'Firefox_78.0_macOS_10.15',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: '7NO1y2nyO',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/3.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/thumbnails/3.png',
      userAgent: 'Firefox_78.0_macOS_10.15',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: 'bQD2JMCQ4',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/3.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/thumbnails/3.png',
      userAgent: 'Chrome_83.0.4103.116_macOS_10.15.5',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: '7NO1y2nyO',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/errors/1.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/errors/thumbnails/1.png',
      userAgent: 'Firefox_78.0_macOS_10.15',
      quarantineAttempt: null,
      takenOnFail: true,
    },
  ],
  videos: [],
  skipped: false,
  browsers: [
    {
      testRunId: 'bQD2JMCQ4',
      name: 'Chrome',
      version: '83.0.4103.116',
      platform: 'desktop',
      os: [Object],
      engine: [Object],
      prettyUserAgent: 'Chrome 83.0.4103.116 / macOS 10.15.5',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
      alias: 'chrome',
      headless: false,
    },
    {
      testRunId: '7NO1y2nyO',
      name: 'Firefox',
      version: '78.0',
      platform: 'desktop',
      os: [Object],
      engine: [Object],
      prettyUserAgent: 'Firefox 78.0 / macOS 10.15',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0',
      alias: 'firefox',
      headless: false,
    },
  ],
};
