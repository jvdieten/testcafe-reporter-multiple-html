import { cliArgs } from './command-line-args';

import {
  AppNameVersion,
  BrowserInfo,
  Fixture,
  HtmlReportResult,
  ReportRow,
  TestError,
  TestRunInfo,
} from './model';
import { generateReport } from './report-generator';

export class MultipleHtmlReport {
  private _startTime: Date = new Date();
  private _endTime: Date = new Date();
  private _userAgents: string[] = [];
  private _testCount = 0;
  private _passed!: number;
  private _skippedTests = 0;
  private _warnings!: string[];
  private _currentFixture: Fixture | undefined;
  private _testReportItems: ReportRow[] = [];
  private _currentApp: AppNameVersion | undefined = undefined;

  public get currentFixture(): Fixture | undefined {
    return this._currentFixture;
  }

  public set currentFixture(fixture: Fixture | undefined) {
    if (fixture === undefined) {
      return;
    }
    this._currentFixture = fixture;
  }

  public initialize = (
    startTime: Date,
    userAgents: string[],
    testCount: number,
  ): MultipleHtmlReport => {
    this._startTime = startTime;
    this._userAgents = userAgents;
    this._testCount = testCount;
    this._currentFixture = undefined;
    this._currentApp = cliArgs.appName ? { name: cliArgs.appName } : undefined;
    if (this._currentApp && cliArgs.appVersion) {
      this._currentApp.version = cliArgs.appVersion;
    }
    return this;
  };

  public finalize = (
    endTime: Date,
    passed: number,
    warnings: string[],
  ): MultipleHtmlReport => {
    this._endTime = endTime;
    this._passed = passed;
    this._warnings = warnings;

    let appName = '';
    let appVersion = '';
    if (this._currentApp) {
      appName = this._currentApp.name;
      if (this._currentApp.version) {
        appVersion = this._currentApp.version;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    const htmlReportResult: HtmlReportResult = {
      info: {
        appName: appName,
        appVersion: appVersion,
        browserCount: this._userAgents.length,
        endTime: this._endTime,
        passed: this._passed,
        skipped: this._skippedTests,
        failed: this._testCount - this._passed,
        startTime: this._startTime,
        testCount: this._testCount,
        userAgents: this._userAgents,
        warnings: this._warnings,
      },
      items: this._testReportItems,
    };
    generateReport(htmlReportResult);

    return this;
  };

  public createFixture = (name: string, path: string): MultipleHtmlReport => {
    this.currentFixture = {
      name: name,
      path: path,
    };
    return this;
  };

  public createTest = (
    name: string,
    testRunInfo: TestRunInfo,
    testErrors: TestError[] | undefined,
  ): MultipleHtmlReport => {
    testRunInfo.browsers.forEach((browserResult: BrowserInfo) => {
      let testResult = 'unknown';
      let error = '';
      if (testRunInfo.skipped) {
        this._skippedTests++;
        return;
      }
      const browserErrors = testErrors?.filter(
        (err) => err.testRunId === browserResult.testRunId,
      );

      if (browserErrors && browserErrors.length > 0) {
        testResult = 'failed';
        error = browserErrors[0].formattedError;
      } else {
        testResult = 'passed';
      }

      const screenshots = testRunInfo.screenshots
        .filter((s) => s.testRunId === browserResult.testRunId)
        .map((s) => s.screenshotPath.replace(__dirname, ''));

      const userAgent: string[] = browserResult.prettyUserAgent.split('/');
      let browser: string;
      let platform = 'unknown';
      let device = '';
      if (userAgent.length === 2) {
        browser = userAgent[0].trim();
        platform = userAgent[1].trim();
      } else {
        // backup for setting browser name
        browser = browserResult.alias;
      }
      if (browserResult.alias && browserResult.alias.startsWith('browserstack')) {
        const aliasParts = browserResult.alias.split(':');
        const browserstackDevicePart = aliasParts.pop();
        if (browserstackDevicePart) {
          device = browserstackDevicePart;
        }
      } else {
        if (browserResult.headless) {
          device = 'headless';
        }
      }

      const newReportRow: ReportRow = {
        testRunId: browserResult.testRunId,
        fixtureName: this.currentFixture?.name,
        testName: name,
        status: testResult,
        browser: browser,
        error: error,
        screenshotPaths: screenshots,
        platform: platform,
        device: device,
      };
      this._testReportItems.push(newReportRow);
    });

    return this;
  };
}
