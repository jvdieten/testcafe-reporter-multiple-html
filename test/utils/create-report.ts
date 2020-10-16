import { CallSequence } from './reporter-test-calls';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluginFactory = require('../../lib');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildReporterPlugin = require('testcafe').embeddingUtils.buildReporterPlugin;

export function createReport(reporterTestCalls: CallSequence) {
  const outStream = {
    data: '',

    write: function (text: string) {
      this.data += text;
    },
  };

  const plugin = buildReporterPlugin(pluginFactory, outStream);

  reporterTestCalls.forEach(function (call) {
    plugin[call.method](...call.args);
  });

  // Mock stack entries for test run consistency
  return outStream.data.replace(/\((.+?):\d+:\d+\)/g, ' ($1:1:1)');
}
