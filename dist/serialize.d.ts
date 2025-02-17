/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import { VFileCompatible } from 'vfile'
import { MDXRemoteSerializeResult, SerializeOptions } from './types'
/**
 * Parses and compiles the provided MDX string. Returns a result which can be passed into <MDXRemote /> to be rendered.
 */
export declare function serialize<
  TScope = Record<string, unknown>,
  TFrontmatter = Record<string, unknown>
>(
  source: VFileCompatible,
  { scope, mdxOptions, parseFrontmatter }?: SerializeOptions,
  rsc?: boolean
): Promise<MDXRemoteSerializeResult<TScope, TFrontmatter>>
