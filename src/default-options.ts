import { CliArgs } from './command-line-args';

export interface ReporterOption {
  args: Partial<CliArgs>;
}
export const defaultOptions: ReporterOption = {
  args: {
    appName: false,
    appVersion: false,
    reportFolder: 'multiple-html',
  },
};
