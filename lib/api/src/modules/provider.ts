import { ReactNode } from 'react';
import { Channel } from '@storybook/channels';
import { ThemeVars } from '@storybook/theming';

import { API, State, ModuleFn } from '../index';
import { Mapper, Refs } from './refs';
import { UIOptions } from './layout';

type IframeRenderer = (
  storyId: string,
  viewMode: State['viewMode'],
  id: string,
  baseUrl: string,
  scale: number,
  queryParams: Record<string, any>
) => ReactNode;

export interface Provider {
  channel?: Channel;
  renderPreview?: IframeRenderer;
  handleAPI(api: API): void;
  getConfig(): {
    theme?: ThemeVars;
    refs?: Refs;
    mapper?: Mapper;
    [k: string]: any;
  } & Partial<UIOptions>;
  [key: string]: any;
}

export interface SubAPI {
  renderPreview?: Provider['renderPreview'];
}

export const init: ModuleFn = ({ provider, fullAPI }) => {
  provider.handleAPI(fullAPI);

  return {
    api: provider.renderPreview ? { renderPreview: provider.renderPreview } : {},
  };
};
