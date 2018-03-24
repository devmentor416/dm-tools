'use strict';
export function getTemplateTitle( filename: string, config: any ): string {

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const today = new Intl.DateTimeFormat( 'en-US', options ).format( Date.now() );
  const year = ( new Date() ).getFullYear();
  const author = config.author || '<Full name>';
  const email = config.email || 'your@email.com';
  const copyholder = config.project.copyholder || author;
  const license = config.project.license || 'GNU Public License (GNU GPL)';
  const title = `/**
* @file:   ${ filename }
* @brief:  <Short description>
*
* @author: ${ author } <${ email }>
* @date:   ${ today }
*
* @description
* <Enter long description>
*
* License: ${ license }
* Copyright (c) ${ year } ${ copyholder }
*
* Notice: This Software is provided as-is without warrant.
*
*-------------------------------------------------------------
* CODE GUIDELINE TO BE FOLLOWED FOUND HERE:
* https://bitbucket.org/rajinder_yadav/cpp_code_guide
*------------------------------------------------------------*/`;
  return title;
}
