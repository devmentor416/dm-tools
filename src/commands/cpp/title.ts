export function getTitles( filename: string, date: string ): string {
  const title = `
  /**
   * @file:   ${filename }
   * @brief:
   *
   * @author:
   * @date:   ${date }
   *
   * @description
   * <Enter long description here>
   *
   * License: MIT License (MIT)
   * License: GNU Public License (GNU GPL)
   * Copyright (c) <year> <copyright holders>
   *
   * Notice: This Software is provided as-is without warrant.
   *
   **************************************************************
   * CODE GUIDELINE TO BE FOLLOWED FOUND HERE:
   *
   * https://bitbucket.org/rajinder_yadav/cpp_code_guide
   *
   **************************************************************/

   `;

  return title;
}
