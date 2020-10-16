// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { testRunInfoErrorMultiBrowserMultiScreenshot } from './mocks/test-run-info-error-multi-browser-multi-screenshot';

// import { MultipleHtmlReport } from '../src/multiple-html';
import { createReport } from './utils/create-report';
import { sampleCalls } from './utils/reporter-test-calls';

// const userAgentsMock = [
//   'Chrome 41.0.2227 / Mac OS X 10.10.1',
//   'Firefox 47 / Mac OS X 10.10.1',
//];
test('testRunInfoErrorMultiBrowserMultiScreenshot', () => {
  // // Given
  // let report = new MultipleHtmlReport();
  //
  // // When
  // report = report.initialize(new Date(), userAgentsMock, 1);
  // report = report.createFixture('new fixture', 'path');
  // report = report.createTest('testName', testRunInfoErrorMultiBrowserMultiScreenshot);
  // report = report.finalize(new Date(), 4, []);
  // // Then
  // expect(report.currentFixture?.name).toBe('new fixture');

  createReport(sampleCalls);
});
