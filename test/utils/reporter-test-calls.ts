import { testRunInfoErrorMultiBrowserMultiScreenshot } from '../mocks/test-run-info-error-multi-browser-multi-screenshot';
import { testRunInfoSingleBrowserNoError } from '../mocks/test-run-info-success-single-browser';
import { testRunInfoSuccessSingleBrowserMultiScreenshot } from '../mocks/test-run-info-success-single-browser-multi-screenshot';
import { testRunInfoSuccessSingleBrowserSingleScreenshot } from '../mocks/test-run-info-success-single-browser-single-screenshot';

export type CallSequence = Array<{ method: string; args: Array<any> }>;

export const sampleCalls: CallSequence = [
  {
    method: 'reportTaskStart',
    args: [
      new Date('1970-01-01T00:00:00.000Z'),
      ['Chrome 41.0.2227 / Mac OS X 10.10.1', 'Firefox 47 / Mac OS X 10.10.1'],
      7,
    ],
  },
  {
    method: 'reportFixtureStart',
    args: ['First fixture', './fixture1.js'],
  },
  {
    method: 'reportTestDone',
    args: ['First test in first fixture', testRunInfoErrorMultiBrowserMultiScreenshot],
  },
  {
    method: 'reportTestDone',
    args: [
      'Second test in first fixture',
      testRunInfoSuccessSingleBrowserSingleScreenshot,
    ],
  },
  {
    method: 'reportTestDone',
    args: ['Third test in first fixture', testRunInfoSingleBrowserNoError],
  },
  {
    method: 'reportFixtureStart',
    args: ['Second fixture', './fixture2.js'],
  },
  {
    method: 'reportTestDone',
    args: [
      'First test in second fixture',
      testRunInfoSuccessSingleBrowserMultiScreenshot,
    ],
  },
  {
    method: 'reportTestDone',
    args: ['Second test in second fixture', testRunInfoSingleBrowserNoError],
  },
  {
    method: 'reportTestDone',
    args: ['Third test in second fixture', testRunInfoErrorMultiBrowserMultiScreenshot],
  },
  {
    method: 'reportFixtureStart',
    args: ['Third fixture', './fixture3.js'],
  },
  {
    method: 'reportTestDone',
    args: ['First test in third fixture', testRunInfoSingleBrowserNoError],
  },
  {
    method: 'reportTaskDone',
    args: [
      new Date('1970-01-01T00:15:25.000Z'),
      4,
      [
        'Was unable to take a screenshot due to an error.\n\nReferenceError: someVar is not defined',
        'Was unable to take a screenshot due to an error.\n\nReferenceError: someOtherVar is not defined',
        'Was unable to take screenshots because the screenshot directory is not specified. To specify it, use the "-s" or "--screenshots" command line option or the "screenshots" method of the test runner in case you are using API.',
      ],
      { passedCount: 0, failedCount: 0, skippedCount: 0 },
    ],
  },
];
