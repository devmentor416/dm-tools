export interface Options {
  command: string;
  project: string;
  config: Config;
  type?: string;
  e2e?: boolean;
  web?: boolean;
  cpp?: string[];
  debug?: boolean;
  release?: boolean;
  eclipse?: boolean;
  xcode?: boolean;
  nmake?: boolean;
  make?: boolean;
}

export interface Config {
  author: string;
  email: string;
  project: Project;
}

export interface Project {
  copyholder: string;
  license: string;
  cmake: string;
}

export interface DownloadCallbackFn {
  ( err?: { message: string } ): void;
}
